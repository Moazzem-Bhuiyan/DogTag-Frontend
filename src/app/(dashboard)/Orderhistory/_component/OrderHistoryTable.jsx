"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const OrderHistoryTable = () => {
    const TABLE_HEADERS = [
        "Order ID",
        "Quantity",
        "Total Amount",
        "Date",
        "Order Status",
    ];

    // State to hold orders
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get( `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders/my-orders`,{

               headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }); 
            const fetchedOrders = response.data.data.data; 
            const formattedOrders = fetchedOrders.map((order) => ({
                id: order.id,
                quantity: order.quantity,
                totalAmount: order.totalAmount,
                date: new Date(order.createdAt).toLocaleDateString(),
                status: order.status,
            }));
            setOrders(formattedOrders);
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to fetch orders.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="flex flex-col w-full my-20 px-10">
            <div className="flex justify-between items-center py-4 border-b border-primary-black/40">
                <h2 className="text-base font-semibold text-primary-black">
                    Order History
                </h2>
            </div>
            <div className="max-h-[700px] overflow-auto">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <Table className="rounded-lg border border-primary-black/40">
                        <TableCaption>A list of your orders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                {TABLE_HEADERS.map((header) => (
                                    <TableHead
                                        key={header}
                                        className="border border-primary-black/40 text-base font-semibold text-primary-black">
                                        {header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="border border-primary-black/40 text-base font-medium text-primary-black">
                                        {order.id}
                                    </TableCell>
                                    <TableCell className="border border-primary-black/40 text-base font-medium text-primary-black">
                                        {order.quantity}
                                    </TableCell>
                                    <TableCell className="border border-primary-black/40 text-base font-medium text-primary-black">
                                        ${order.totalAmount.toFixed(2)}
                                    </TableCell>
                                    <TableCell className="border border-primary-black/40 text-base font-medium text-primary-black">
                                        {order.date}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className={`text-base font-medium ${
                                                order.status === "delivered"
                                                    ? "text-success"
                                                    : order.status ===
                                                      "processing"
                                                    ? "text-black bg-green-300"
                                                    : "text-red-500 bg-white"
                                            }`}>
                                            {order.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                order.status.slice(1)}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryTable;
