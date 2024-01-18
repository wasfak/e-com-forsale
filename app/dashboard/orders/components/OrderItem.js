import useCartStore from "@/cartStore";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrderItem = ({ item }) => {
  const getItemById = useCartStore((state) => state.getItemById);

  const [itemInStore, setItemInStore] = useState(null);

  useEffect(() => {
    // Fetch the item from the store once the component is mounted
    const fetchedItem = getItemById(item.itemId);

    setItemInStore(fetchedItem);
  }, [getItemById, item.itemId]);

  return (
    <div className="mb-2">
      {/* Render the item details */}
      {itemInStore && (
        <>
          <div className="flex items-center justify-between w-[50vw]">
            <p>
              Item Name <br /> {itemInStore.name}
            </p>
            <p>
              Quantity <br /> {item.quantity}
            </p>
            <Image
              src={itemInStore.imageUrl}
              alt={itemInStore.name}
              width={100}
              height={100}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderItem;
