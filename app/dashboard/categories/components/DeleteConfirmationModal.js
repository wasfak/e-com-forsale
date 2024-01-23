"use client";

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 w-full h-full flex items-center justify-center z-50`}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="bg-white p-6 rounded-lg z-10 w-[50vw] h-[50vh] flex items-center justify-center flex-col">
        <p className="mb-4 text-lg font-semibold">Are you sure?</p>
        <div className="flex justify-end">
          <button
            className="mr-2 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
