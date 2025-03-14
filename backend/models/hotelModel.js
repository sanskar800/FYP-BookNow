import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    amenities: { type: [String], required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    pricePerNight: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} }


}, { minimize: false })

const hotelModel = mongoose.models.hotel || mongoose.model('hotel', hotelSchema)

export default hotelModel;