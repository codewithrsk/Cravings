import Contact from "../models/contact.model.js";
import Restaurant from "../models/restaurant.model.js";
import Menu from "../models/menu.model.js";

export const ContactUsForm = async (req, res, next) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;
    if (!fullName || !email || !phone || !subject || !message) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const NewContactMessage = await Contact.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      message: "Thanks for Contacting us! You will hear back from us soon",
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const AllRestaurants = async (req, res, next) => {
  try {
    const allrestaurants = await Restaurant.find();
    res.status(200).json({ message: "all resturent", data: allrestaurants });
  } catch (error) {
    console.log(error);
    next();
  }
};

export const GetRestaurantDetails = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const restaurantDetails = await Menu.findOne({ restaurantId }).populate({
      path: "restaurantId",
      populate: {
        path: "managerId",
      },
    });
    console.log("restaurantDetails :- ", restaurantDetails);

    if (!restaurantDetails) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ data: restaurantDetails });
  } catch (error) {
    console.log(error.message);
    next();
  }
};
