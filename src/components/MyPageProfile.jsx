import React, { useState } from "react";
import { storage } from "../api/firebase";
import { ImageSubmit, ImageSection, ImageUpload } from "./MyPageComp";
import MyPageAxiosApi from "../api/MyPageAxiosApi";
import { useUser } from "../contexts/Context";

const ProfileImage = () => {
  const { user } = useUser();

  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const saveImageUrlToDatabase = async (id, url) => {
    try {
      // 이미지 정보를 데이터베이스에 저장.
      const response = await MyPageAxiosApi.setImageUrl(id, url);
      console.log("이미지 URL이 데이터베이스에 저장되었습니다.", response);
      window.location.reload();
    } catch (error) {
      console.error(
        "이미지 URL을 데이터베이스에 저장하는 중에 오류가 발생했습니다.",
        error
      );
    }
  };

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("File uploaded successfully!");
      fileRef.getDownloadURL().then((url) => {
        console.log("저장경로 확인 : " + url);
        setUrl(url);
        saveImageUrlToDatabase(user.id, url);
      });
    });
  };

  return (
    <>
      <ImageSection>
        <ImageSubmit type="file" onChange={handleFileInputChange} />
        <ImageUpload onClick={handleUploadClick}>사진 등록</ImageUpload>
      </ImageSection>
    </>
  );
};

export default ProfileImage;
