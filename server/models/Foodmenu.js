import mongoose from "mongoose";

const foodmenuSchema = new mongoose.Schema(
    {
        fooodmenu_name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

const Foodmenu = mongoose.model("Foodmenu", foodmenuSchema);
export default Foodmenu;
