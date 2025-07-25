



import { useAuth } from "../context/AuthContext"
import { Base_Url } from "../service/Endpoints"
const Profile = () => {

    const { user } = useAuth()

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8 mt-10 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold text-center text-teal-700 mb-8">
                Profile Details

            </h2>
            <div className="flex flex-col md:flex-row items-center gap-10">

                <div className="w-full md:w-1/2 space-y-5 text-gray-700">
                    <div className="flex">
                        <p className="w-40 font-semibold">Name:</p>
                        <p>{user?.name}</p>
                    </div>
                    <div className="flex">
                        <p className="w-40 font-semibold">Email:</p>
                        <p>{user?.email}</p>
                    </div>

                    <div className="flex">
                        <p className="w-40 font-semibold">Role:</p>
                        <p>{user?.role}</p>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Profile;

