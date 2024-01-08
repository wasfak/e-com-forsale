import { OrdersList } from "@/components/OrdersList";
import db from "@/db";
import ItemModel from "@/models/itemSchema";
import OrderModel from "@/models/ordersSchema";
import { auth } from "@clerk/nextjs";

export default async function ProcessingOrders() {
  let orders;
  const { userId } = auth();
  try {
    await db.connectDb();
    orders = await OrderModel.find({ userId, status: "processing" });
    /*     const items = await ItemModel.find({ _id: orders[0].orderItems }); */
  } catch (error) {
    console.log(error);
  } finally {
    db.disconnectDb();
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-2 ">Processing Orders..</h1>
      <div className="grid grid-cols-3 gap-4 ">
        {orders.map((order) => (
          <OrdersList order={order} key={order.id} />
        ))}
      </div>
    </>
  );
}
