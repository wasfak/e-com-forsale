// UploadPic.js
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import toast from "react-hot-toast";

function UploadPic({
  onImageUpload,
  resetImage,
  resetImageUrl,
  resetImageUrlState,
}) {
  const [url, setUrl] = useState("");

  const handleImageUpload = (result) => {
    if (result.event === "success" && result.info.secure_url) {
      setUrl(result.info.secure_url);
      onImageUpload(result.info.secure_url);
    }
    resetImage(); // Call the resetImage function passed from UploadPage
  };

  // Reset image URL when the form is submitted
  useEffect(() => {
    setUrl(""); // Reset the image URL when the form is submitted
  }, [resetImageUrl]);

  // Pass the setUrl function to the parent component
  useEffect(() => {
    resetImageUrlState(setUrl);
  }, [resetImageUrlState]);

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
      <CldUploadWidget uploadPreset="avhlxw7g" onUpload={handleImageUpload}>
        {({ open }) => (
          <button
            onClick={() => open()}
            type="button"
            className="flex items-center justify-center bg-black text-white p-3 rounded-2xl"
          >
            Upload Image
          </button>
        )}
      </CldUploadWidget>
    </>
  );
}

export default UploadPic;
