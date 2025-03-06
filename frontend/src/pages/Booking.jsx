import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedHotels from "../components/RelatedHotels";

const Booking = () => {
  const { hotId } = useParams();
  const { hotels, currencySymbol } = useContext(AppContext);

  const [hotInfo, setHotInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [roomQuantity, setRoomQuantity] = useState(1);

  useEffect(() => {
    const hotInfo = hotels.find(hot => hot._id === hotId);
    setHotInfo(hotInfo);
  }, [hotels, hotId]);

  const getNext7Days = () => {
    const days = [];
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        day: dayNames[date.getDay()],
        date: date.getDate(),
        fullDate: date.toISOString().split("T")[0]
      });
    }
    return days;
  };

  const handleBooking = () => {
    if (!selectedDate) {
      alert("Please select a date before booking.");
      return;
    }
    alert(`Booking confirmed for ${selectedDate} with ${roomQuantity} room(s).`);
  };

  return hotInfo && (
    <div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img className="w-full sm:w-72 h-48 sm:h-full object-cover rounded-lg" src={hotInfo.image} alt="Hotel" />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">{hotInfo.name} <img className="w-5" src={assets.verified_icon} alt="Verified" /></p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>{hotInfo.location}</p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">About <img src={assets.info_icon} alt="Info" /></p>
            <p className="text-sm text-gray-500 mt-1">{hotInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">Room Charge: <span className="text-gray-600">{currencySymbol}{hotInfo.pricePerNight}</span></p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white">
        <p className="text-lg font-medium text-gray-900">Select Booking Date:</p>
        <div className="flex gap-2 mt-2">
          {getNext7Days().map(({ day, date, fullDate }) => (
            <button
              key={fullDate}
              className={`flex flex-col items-center px-4 py-2 rounded-full border ${selectedDate === fullDate ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              onClick={() => setSelectedDate(fullDate)}
            >
              <span className="text-sm font-medium">{day}</span>
              <span className="text-lg font-semibold">{date}</span>
            </button>
          ))}
        </div>

        {/* Room Quantity Selection */}
        <p className="mt-4 text-lg font-medium text-gray-900">Select Room Quantity:</p>
        <input
          type="number"
          min="1"
          value={roomQuantity}
          onChange={(e) => setRoomQuantity(e.target.value)}
          className="w-20 mt-2 p-2 border border-gray-300 rounded-md"
        />

        {/* Book Appointment Button */}
        <button
          onClick={handleBooking}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </div>
      {/* Related Doctors */}
      <RelatedHotels hotId={hotId} location={hotInfo.location} />
    </div>
  );
};

export default Booking;
