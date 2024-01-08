import ItemModel from "@/models/itemSchema";
import { Button } from "./ui/button";
import MyButton from "./MyButton";

export const OrdersList = async ({ order }) => {
  const items = await ItemModel.find({ _id: order.orderItems });
  const addressLines = order.address.split(", ");
  /*   console.log(items); */
  return (
    <div className="flex flex-col items-start justify-start shadow-2xl rounded-2xl p-4 gap-y-2">
      <span>
        Order Items:
        {items.map((item) => (
          <h4 key={item.name}>{item.name}</h4>
        ))}
      </span>
      <span>Stipe payment: {order.isPaid ? "Completed" : "Denied"}</span>
      <span>Phone number: {order.phone}</span>
      <div className="">
        <h3>Info:</h3>
        <span>
          {addressLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </span>
      </div>

      <span>Order date: {order.createdAt.toDateString()}</span>
      <MyButton orderId={order.id}>change to finished</MyButton>
    </div>
  );
};
