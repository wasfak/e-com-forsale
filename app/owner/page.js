"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import OwnerUsers from "./components/OwnerUsers";
import { Loader } from "@/components/Loader";

const OwnerPage = () => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setMounted(true);

    // Redirect user if their ID matches a specific value
    if (!user?.id === "user_2a59AvSfOfCZq3D5AVL3ZO0xlfd") {
      router.push("/");
    }
  }, [user]); // Adding user to the dependency array

  const fetchUsers = async () => {
    setLoading(true);
    const apiUrl = "/api/ownerRoute";

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
      });
      const data = await response.json();

      if (data.status === 200) {
        setUsers(data.data); // Assuming your data structure has a 'data' field containing an array of users
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {/* Your form fields go here */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Fetch Users
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between w-full">
        {/* Render the users */}
        {users.map((user) => (
          <OwnerUsers key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default OwnerPage;
