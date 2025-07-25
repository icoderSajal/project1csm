// controllers/orderController.js
import Order from "../models/Order.js"
import Item from "../models/Item.js"

export const createOrder = async (req, res) => {
    try {
        const { user_id, items, total_amount, payment_id } = req.body;

        const order = new Order({
            user_id,
            items,
            total_amount,
            payment_id,
            payment_status: "paid", // You can change this based on Stripe status
        });

        await order.save();

        res.status(201).json({ success: true, message: "Order placed", order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Order failed", error });
    }
};



// Get all orders with user name



export const getAllUserOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user_id", "name email") // Only fetch name and email
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map(order => ({
            order_id: order._id,
            user_name: order.user_id?.name || "Unknown",
            user_email: order.user_id?.email || "Unknown",
            items: order.items,
            total_amount: order.total_amount,
            payment_status: order.payment_status,
            payment_id: order.payment_id,
            createdAt: order.createdAt,
        }));

        res.status(200).json({
            success: true,
            orders: formattedOrders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ user_id: userId })
            .populate("user_id", "name email") // Only fetch name and email
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map(order => ({
            order_id: order._id,
            user_name: order.user_id?.name || "Unknown",
            user_email: order.user_id?.email || "Unknown",
            items: order.items,
            total_amount: order.total_amount,
            payment_status: order.payment_status,
            payment_id: order.payment_id,
            createdAt: order.createdAt,
        }));

        res.status(200).json({
            success: true,
            orders: formattedOrders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}



// GET orders that contain Catering items
//router.get("/catering",
// routes/orderRoutes.js


// Get orders that include any Catering item

export const getCateringOrders = async (req, res) => {
    try {
        const orders = await Order.aggregate([
            {
                // Unwind order items
                $unwind: "$items"
            },
            {
                // Join with items collection
                $lookup: {
                    from: "items", // must match actual MongoDB collection name
                    localField: "items._id",
                    foreignField: "_id",
                    as: "itemDetails"
                }
            },
            {
                // Flatten itemDetails array
                $unwind: "$itemDetails"
            },
            {
                // Match only if item is from Catering menu
                $match: {
                    "itemDetails.menu_name": "Catering"
                }
            },
            {
                // Group back orders by their fields
                $group: {
                    _id: "$_id",
                    order_id: { $first: "$order_id" },
                    user_name: { $first: "$user_name" },
                    user_email: { $first: "$user_email" },
                    items: { $push: "$items" },
                    total_amount: { $first: "$total_amount" },
                    payment_status: { $first: "$payment_status" },
                    payment_id: { $first: "$payment_id" },
                    createdAt: { $first: "$createdAt" }
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Aggregation error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getOrdersByMenuId = async (req, res) => {
    const { menuId } = req.params;

    try {
        // Get item IDs that belong to this menuId
        const items = await Item.find({ menu_id: menuId });
        const itemIds = items.map(item => item._id.toString());

        // Get orders where any item matches the menu's item IDs
        const orders = await Order.find({
            items: { $elemMatch: { _id: { $in: itemIds } } }
        }).populate("user_id");

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders by menu ID:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};













