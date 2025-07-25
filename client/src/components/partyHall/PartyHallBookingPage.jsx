
import { useState } from "react"
import BookingPartyHall from './BookingPartyHall';
import BookingPartyHallHistory from './BookingPartyHallHistory';


const PartyHallBookingPage = () => {
    const [reload, setReload] = useState(false);

    const handleBooking = () => {
        setReload(prev => !prev); // trigger refresh
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <BookingPartyHall onBooked={handleBooking} />
            <BookingPartyHallHistory key={reload} />
        </div>
    );
};

export default PartyHallBookingPage;

