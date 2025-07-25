import React, { useState, useEffect } from "react";

const OrderTable = ({ orders }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Order List</h2>

            <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-2 border">#</th>
                        <th className="p-2 border">User</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Items</th>
                        <th className="p-2 border">Total Amount</th>
                        <th className="p-2 border">Payment ID</th>
                        <th className="p-2 border">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order, index) => (
                        <tr key={order._id} className="text-center">
                            <td className="p-2 border">{indexOfFirstOrder + index + 1}</td>
                            <td className="p-2 border">{order.user_id.name}</td>
                            <td className="p-2 border">{order.user_id.email}</td>
                            <td className="p-2 border text-left">
                                <ul className="list-disc pl-4">
                                    {order.items.map((item) => (
                                        <li key={item._id}>
                                            {item.item_name} x {item.quantity} (₹{item.item_price})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td className="p-2 border font-semibold">₹{order.total_amount}</td>
                            <td className="p-2 border text-xs">{order.payment_id}</td>
                            <td className="p-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>

                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OrderTable;
