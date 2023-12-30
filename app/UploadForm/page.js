"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export default function UploadPic() {
  const [url, setUrl] = useState("");
  const onUpload = (result) => {
    setUrl(result.info.secure_url);
  };
  return (
    <>
      <div className="">
        {url && (
          <Image
            className="object-cover"
            alt="Image"
            src={url}
            width={200}
            height={200}
          />
        )}
      </div>
      <CldUploadWidget uploadPreset="avhlxw7g" onUpload={onUpload}>
        {({ open }) => {
          return <button onClick={() => open()}>Upload an Image</button>;
        }}
      </CldUploadWidget>
    </>
  );
}
