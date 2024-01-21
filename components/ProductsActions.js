import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useCartStore from "@/cartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProductsActions() {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const { selectedProducts, clearSelectedItems } = useCartStore();
  useEffect(() => {
    clearSelectedItems();
  }, []);

  const toggleActions = () => {
    setShowActions((prev) => !prev);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal((prev) => !prev);
  };

  const handelPublish = async () => {
    const res = await fetch("/api/modifyItem", {
      method: "POST",
      body: JSON.stringify({ selectedProducts }),
    });
    const response = await res.json();
    toast.success(response.message);
    clearSelectedItems();
    window.location.reload();
  };

  const handelUnpublish = async () => {
    const res = await fetch("/api/modifyUnpItem", {
      method: "POST",
      body: JSON.stringify({ selectedProducts }),
    });
    const response = await res.json();
    clearSelectedItems();
    toast.success(response.message);
    window.location.reload();
  };

  const handleDelete = async () => {
    const res = await fetch("/api/modifyUnpItem", {
      method: "DELETE",
      body: JSON.stringify({ selectedProducts }),
    });
    const response = await res.json();
    clearSelectedItems();
    toast.success(response.message);
    window.location.reload();
    setShowDeleteModal(false);
  };

  return (
    <div className="flex w-[100px]">
      <Button onClick={toggleActions}>Actions</Button>
      {showActions && (
        <div className="flex justify-between items-center w-full ">
          <Button className="mx-3">Category</Button>
          <Button className="mx-3" onClick={handelPublish}>
            Publish
          </Button>
          <Button className="mx-3" onClick={handelUnpublish}>
            Unpublish
          </Button>

          {/* Delete Button with Modal */}
          <Button
            variant="destructive"
            onClick={toggleDeleteModal}
            className="bg-red-500 text-white"
          >
            Delete
          </Button>

          {/* Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center z-20">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-lg font-bold mb-4">
                  Are you sure you want to delete this item?
                </p>
                <div className="flex justify-end">
                  <Button
                    onClick={handleDelete}
                    className="bg-red-500 text-white mr-2"
                  >
                    Yes
                  </Button>
                  <Button onClick={toggleDeleteModal}>No</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
