
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Bg from "../assets/Auth_Bg.jpg";

const NotFound = () => {
    return (
        <>
            <div
                className="w-full h-[100vh] bg-cover flex justify-center items-center"
                style={{ backgroundImage: `url(${Bg})` }}
            >

                <div className="text-2xl text-blue-400 bg-[0000] backdrop-blur p-4 rounded-2xl ">
                    <img src="/notFound.svg" alt="notFound" />
                    <h1>LOOKS LIKE YOU'RE LOST</h1>
                    <p>We can't seem to find you the page you're looking for</p>
                    <div className="flex justify-center items-center gap-1 bg-blue-600 rounded mt-4">
                        <Link to={-1} className="p-4 text-blue-100  ">
                            Back to Home

                        </Link>
                        <span>
                            <HiOutlineArrowNarrowRight />
                        </span>
                    </div>

                </div>

            </div>
        </>
    );
};

export default NotFound;
