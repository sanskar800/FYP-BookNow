import validator from "validator";
import bycrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import hotelModel from "../models/hotelModel.js";
import jwt from "jsonwebtoken";

// API for adding hotel

const addHotel = async (req, res) => {

    try {
        const { name, email, password, image, location, amenities, about, available, pricePerNight, address } = req.body
        const imageFile = req.file

        // check if all data to add hotel

        if (!name || !email || !password || !image || !location || !amenities || !about || !available || !pricePerNight || !address) {
            return res.json({ success: false, message: 'All fields are required' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Email is required' })
        }

        // validating strong password

        if (password.length < 8) {
            return res.json({ success: false, message: 'Strong Password is required' })
        }

        // hashing hotel password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        // upload image to cloudinart

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const hotelData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            location,
            amenities,
            about,
            available,
            pricePerNight,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newHotel = new hotelModel(hotelData);
        await newHotel.save();

        res.json({ success: true, message: 'Hotel added successfully' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for admin login

const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: 'Invalid Credentials' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addHotel, loginAdmin }