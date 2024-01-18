"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OwnerUsers({ user }) {
  const { createdAt, email, userStatus: initialUserStatus, _id } = user;

  // Format the createdAt date
  const originalDate = new Date(createdAt);
  const formattedDate = originalDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [userStatus, setUserStatus] = useState(initialUserStatus);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(_id);
    setIsCopied(true);

    // Reset the "Copied" state after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleUserStatusChange = (event) => {
    setUserStatus(event.target.value);
  };

  const handleSave = async () => {
    const apiUrl = "/api/ownerRoute";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ userStatus, _id }),
      });
      const data = await response.json();

      if (data.status === 200) {
        toast.success("Updated Successfully!!");
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
    // Add your backend API call here
  };

  return (
    <div className="flex flex-col items-left justify-start shadow-2xl rounded-2xl p-4 my-2">
      <p className="my-2">created: {formattedDate}</p>
      <p className="my-2">email: {email}</p>
      <div className="my-2">
        <label htmlFor="userStatus" className="mr-2">
          User Status:
        </label>
        <select
          id="userStatus"
          value={userStatus}
          onChange={handleUserStatusChange}
        >
          <option value="new">New</option>
          <option value="active">Active</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="flex items-center my-2">
        <p className="mr-2">user id: {_id}</p>
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isCopied ? "Copied!" : "Copy ID"}
        </button>
      </div>
      <button
        onClick={handleSave}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  );
}
