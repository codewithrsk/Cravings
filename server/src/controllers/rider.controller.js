import cloudinary from "../config/cloudinary.config.js";
import User from "../models/user.model.js";
import Rider from "../models/rider.model.js";

export const getRiderProfile = async (req, res, next) => {
  try {
    const currentUser = req.user?._id
      ? await User.findById(req.user._id)
      : await User.findOne({ email: req.query.email });

    if (!currentUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    const riderDetails = await Rider.findOne({ riderId: currentUser._id });
    const responseData = currentUser.toObject();
    responseData.riderDetails = riderDetails ? riderDetails.toObject() : {};

    res
      .status(200)
      .json({
        message: "Rider profile fetched successfully",
        data: responseData,
      });
  } catch (error) {
    next(error);
  }
};

export const toggleRiderAvailability = async (req, res, next) => {
  try {
    const currentUser = req.user?._id
      ? await User.findById(req.user._id)
      : null;

    if (!currentUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    let riderDetails = await Rider.findOne({ riderId: currentUser._id });
    const isAvailable = req.params.status === "true";

    if (!riderDetails) {
      riderDetails = await Rider.create({
        riderId: currentUser._id,
        isAvailable,
      });
    } else {
      riderDetails.isAvailable = isAvailable;
      await riderDetails.save();
    }

    const responseData = currentUser.toObject();
    responseData.riderDetails = riderDetails.toObject();

    res
      .status(200)
      .json({
        message: "Availability updated successfully",
        data: responseData,
      });
  } catch (error) {
    next(error);
  }
};

export const updateRiderProfile = async (req, res, next) => {
  try {
    const {
      email,
      fullName,
      phone,
      dateOfBirth,
      gender,
      nationality,
      emergencyContactName,
      emergencyContactPhone,
      vehicleType,
      vehicleNumber,
      vehicleModel,
      vehicleColor,
      drivingLicense,
      insuranceCertificate,
      aadharCard,
      panCard,
      address,
      city,
      state,
      pinCode,
      country,
    } = req.body;

    const newPhoto = req.file;

    if (!email || !fullName || !phone) {
      const error = new Error("All fields Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = req.user?._id
      ? await User.findById(req.user._id)
      : await User.findOne({ email });

    if (!existingUser) {
      const error = new Error("Email not registred");
      error.statusCode = 404;
      return next(error);
    }

    if (newPhoto) {
      existingUser?.photo?.publicId &&
        (await cloudinary.uploader.destroy(existingUser.photo.publicId));
      const b64 = Buffer.from(newPhoto.buffer).toString("base64");
      const dataURI = `data:${newPhoto.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "Cravings678/profile",
        width: 500,
        height: 500,
        crop: "fill",
      });

      existingUser.photo.url = result.secure_url;
      existingUser.photo.publicId = result.public_id;
    }

    existingUser.fullName = fullName;
    existingUser.phone = phone;
    await existingUser.save();

    let riderDetails = await Rider.findOne({ riderId: existingUser._id });

    const riderPayload = {
      riderId: existingUser._id,
      dateOfBirth: dateOfBirth || "",
      gender: gender || "",
      nationality: nationality || "",
      emergencyContactName: emergencyContactName || "",
      emergencyContactPhone: emergencyContactPhone || "",
      vehicleDetails: {
        vehicleType: vehicleType || "",
        vehicleNumber: vehicleNumber || "",
        vehicleModel: vehicleModel || "",
        vehicleColor: vehicleColor || "",
      },
      documents: {
        drivingLicense: drivingLicense || "",
        vehicleRegistrationCertificate: "",
        insuranceCertificate: insuranceCertificate || "",
        aadharCard: aadharCard || "",
        panCard: panCard || "",
      },
      currentAddress: {
        address: address || "",
        city: city || "",
        state: state || "",
        pinCode: pinCode || "",
        country: country || "",
      },
    };

    if (riderDetails) {
      riderDetails.set(riderPayload);
      await riderDetails.save();
    } else {
      riderDetails = await Rider.create(riderPayload);
    }

    const responseData = existingUser.toObject();
    responseData.riderDetails = riderDetails.toObject();

    res.status(200).json({
      message: "Rider profile updated successfully",
      data: responseData,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
