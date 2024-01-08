import db from "@/db";
import ItemModel from "@/models/itemSchema";
import OrderModel from "@/models/ordersSchema";
import { auth } from "@clerk/nextjs";

export default async function FinishedOrders() {
  let orders;
  const { userId } = auth();
  try {
    await db.connectDb();
    orders = await OrderModel.find({ userId, status: "finished" });
    if (orders.length === 0) {
      return (
        <div className="">
          <h1>Finished Orders..</h1>
          <h2>No New Orders</h2>
        </div>
      );
    }
    const items = await ItemModel.find({ _id: orders[0].orderItems });

    console.log(items);
  } catch (error) {
    console.log(error);
  } finally {
    db.disconnectDb();
  }

  return (
    <>
      <h1>Finished Orders..</h1>
      {orders && (
        <div className="flex flex-col items-center justify-center">
          <span>items</span>
          <span>{orders[0].isPaid}</span>
          <span>{orders[0].phone}</span>
          <span>{orders[0].address}</span>
          <span>{orders[0].createdAt.toDateString()}</span>
        </div>
      )}
    </>
  );
}
