
import { useNavigate } from "react-router-dom";
import Bg from "../assets/Auth_Bg.jpg";
import { IoCloseCircle } from "react-icons/io5";


const UnauthorizedPage = () => {
    const navigate = useNavigate();
    return (
        <div
            className="w-full h-[100vh] bg-cover flex justify-center items-center"
            style={{ backgroundImage: `url(${Bg})` }}>
            <div className="w-120 h-100 text-center p-8 bg-[0000] backdrop-blur shadow-md rounded  ">
                <IoCloseCircle size={50} /> <h1 className="text-3xl font-bold text-red-500 mb-4">Unauthorized

                </h1>
                <p className="text-gray-100 mb-4  text-3xl">
                    You do not have permission to access this page.
                </p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
