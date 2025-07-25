import { useState } from "react"
import BookingSalon from './BookingSalon';
import SalonBookingHistory from './SalonBookingHistory';


const BookingPage = () => {
    const [reload, setReload] = useState(false);

    const handleBooking = () => {
        setReload(prev => !prev); // trigger refresh
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <BookingSalon onBooked={handleBooking} />
            <SalonBookingHistory key={reload} />
        </div>
    );
};

export default BookingPage;
