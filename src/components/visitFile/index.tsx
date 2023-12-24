import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.sass";
import { useSelector, useDispatch } from "react-redux";
import {
  updateVisitWindowValue,
} from "../../app/GlobalRedux/Features/RegisterVisit/registerSlice";
import type { RootState } from "../../app/GlobalRedux/store";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Image } from 'antd';


export default function VisitFile() {
  const [uploadStatus, setUploadStatus] = useState<"success" | "error">("success");
  const userInfo = useSelector((state: RootState) => state.operation);
  const visitInfo = useSelector((state: RootState) => state.visit);
  const dispatch = useDispatch();
  const supabase = createClientComponentClient()

  async function uploadFile(event: any) {
    const tempFileName = uuidv4();
    const fileToUpload = event.target.files[0];
    const fileExtension = fileToUpload.name.split('.').pop();
    dispatch(updateVisitWindowValue({ property: "tempFileName", value: `${tempFileName}.${fileExtension}` }));
    const { data: uploadStatus, error: uploadError } = await supabase
      .storage
      .from('fichas')
      .upload(`temp/${tempFileName}.${fileExtension}`, fileToUpload, {
        cacheControl: '3600',
        upsert: false
      })

    const { data } = supabase
      .storage
      .from('fichas')
      .getPublicUrl(`temp/${tempFileName}.${fileExtension}`)
    dispatch(updateVisitWindowValue({ property: 'imageUrl', value: data?.publicUrl }))
    if (uploadError) {
      console.log("uploadError", uploadError);
      dispatch(updateVisitWindowValue({ property: "tempFileName", value: "" }));
      setUploadStatus("error");
    }
    if (data) {
      setUploadStatus("success");
    }
  }

  return (
    <>
      <div className={styles.imgContainer}>
        {
          <Image
            width={400}
            height={300}
            alt="avatar"
            src={visitInfo.imageUrl}
            className={styles.image}
          />
        }
      </div>
      {/* custom upload button with animantion using .sass */}
      <label htmlFor="imageUploader" className={styles.uploadButton}>
        <span>Upload</span>
        <input type="file" name="imageUploader" style={{ 'display': 'none' }} id="imageUploader" onChange={uploadFile} />
      </label>
    </>
  );
}
