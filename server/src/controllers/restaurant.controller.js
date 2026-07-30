import Restaurant from "../models/restaurant.model.js";
import {
  uploadMultipleImages,
  deleteMultipleImages,
  UploadSingleImage,
  deleteSingleImage,
} from "../utils/image.service.js";
import Menu from "../models/menu.model.js";

export const RestaurantGetData = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const managerId = req.query.id;

    console.log("Current User:", currentUser);
    console.log("Manager ID:", managerId);

    if (currentUser._id.toString() !== managerId) {
      const error = new Error("Unauthorized Access");
      error.statusCode = 401;
      return next(error);
    }

    const restaurantData = await Restaurant.findOne({ managerId });

    if (restaurantData) {
      res.status(200).json({
        message: "Restaurant Fetched Successfully",
        data: restaurantData,
      });
    } else {
      res.status(200).json({
        message: "No restaurant Data Found",
        data: {},
      });
    }
  } catch (error) {
    console.log("RestaurantAddMenuItem error:", error);
    next(error);
  }
};

export const RestaurantUpdateProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const restaurantDataFromFE = req.body;
    const coverImageFromFE = req.files?.coverImage;
    const restaurantImageFromFE = req.files?.restaurantImage;

    const dataKeys = Object.keys(restaurantDataFromFE);

    dataKeys.forEach((key) => {
      if (!restaurantDataFromFE[key]) {
        const error = new Error(`Missing required field: ${key}`);
        error.statusCode = 400;
        return next(error);
      }
    });

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });

    if (!existingRestaurant) {
      if (coverImageFromFE) {
        const coverImage = await uploadSingleImage(
          coverImageFromFE,
          `restaurant/${currentUser.phone}/coverPhoto`,
        );
        dataKeys.push("coverImage");
        restaurantDataFromFE.coverImage = coverImage;
      }

      if (restaurantImageFromFE && restaurantImageFromFE.length > 0) {
        const restaurantImage = await uploadMultipleImages(
          restaurantImageFromFE,
          `restaurant/${currentUser.phone}/restaurantPhotos`,
        );
        dataKeys.push("restaurantImage");
        restaurantDataFromFE.restaurantImage = restaurantImage;
      }

      const newRestaurant = await Restaurant.create({
        managerId: currentUser._id,
        ...restaurantDataFromFE,
      });
      return res.status(201).json({
        message: "Restaurant profile created successfully",
        data: newRestaurant,
      });
    } else {
      if (coverImageFromFE) {
        await deleteSingleImage(existingRestaurant.coverImage);

        const coverImage = await uploadSingleImage(
          coverImageFromFE,
          `restaurant/${currentUser.phone}/coverPhoto`,
        );
        dataKeys.push("coverImage");
        restaurantDataFromFE.coverImage = coverImage;
      }
      if (restaurantImageFromFE && restaurantImageFromFE.length > 0) {
        await deleteMultipleImages(existingRestaurant.restaurantImage);

        const restaurantImage = await uploadMultipleImages(
          restaurantImageFromFE,
          `restaurant/${currentUser.phone}/restaurantPhotos`,
        );
        dataKeys.push("restaurantImage");
        restaurantDataFromFE.restaurantImage = restaurantImage;
      }
      dataKeys.forEach((key) => {
        existingRestaurant[key] =
          restaurantDataFromFE[key] || existingRestaurant[key];
      });
      await existingRestaurant.save();
      return res.status(200).json({
        message: "Restaurant profile updated successfully",
        data: existingRestaurant,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const RestaurantUpdateInfo = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      restaurantName,
      description,
      restaurantType,
      cuisineTypes,
      contactEmail,
      contactPhone,
      openingTime,
      closingTime,
    } = req.body;

    if (
      !restaurantName ||
      !description ||
      !restaurantType ||
      !cuisineTypes ||
      !contactEmail ||
      !contactPhone ||
      !openingTime ||
      !closingTime
    ) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const cuisineTypesArray = cuisineTypes
      .split(",")
      .map((type) => type.trim());
    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });
    if (!existingRestaurant) {
      const newRestaurant = await Restaurant.create({
        managerId: currentUser._id,
        restaurantName,
        description,
        restaurantType,
        cuisineTypes: cuisineTypesArray,
        contactDetails: {
          email: contactEmail,
          phone: contactPhone,
        },
        servingHours: {
          openingTime,
          closingTime,
        },
      });
      return res.status(201).json({
        message: "Restaurant profile created successfully",
        data: newRestaurant,
      });
    } else {
      existingRestaurant.restaurantName = restaurantName;
      existingRestaurant.description = description;
      existingRestaurant.restaurantType = restaurantType;
      existingRestaurant.cuisineTypes = cuisineTypesArray;
      existingRestaurant.contactDetails.email = contactEmail;
      existingRestaurant.contactDetails.phone = contactPhone;
      existingRestaurant.servingHours.openingTime = openingTime;
      existingRestaurant.servingHours.closingTime = closingTime;
      await existingRestaurant.save();
      return res.status(200).json({
        message: "Restaurant profile updated successfully",
        data: existingRestaurant,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const OpenRestaurant = async (req, res, next) => {
  try {
    const currentUser = req.user;
    console.log("currentUser :- ", currentUser);
    

    const OpenStatus = req.params.openStatus;
    console.log("openStatus :- ", OpenStatus);
    

    console.log("Open Status is", OpenStatus);

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });

    if (!existingRestaurant) {
      const error = new Error("Restaurant Not Found");
      error.statusCode = 404;
      return next(error);
    }

    existingRestaurant.isOpen = OpenStatus;

    await existingRestaurant.save();

    return res.status(200).json({
      message: `${OpenStatus ? "Restaurant is Live Now" : "Restaurant is Offline"}`,
      data: existingRestaurant,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const RestaurantUpdateLegalInfo = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { legalName, companyType } = req.body;

    if (!legalName || !companyType) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });

    if (!existingRestaurant) {
      const error = new Error("Restaurant Not Found");
      error.statusCode = 404;
      return next(error);
    }

    existingRestaurant.legal = {
      legalName,
      companyType,
    };

    await existingRestaurant.save();

    return res.status(200).json({
      message: "Legal information updated successfully",
      data: existingRestaurant,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const RestaurantAddMenuItem = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      itemName,
      description,
      price,
      category,
      foodType,
      status,
      isTopRated,
      isRecommended,
      isNew,
      isDeleted,
    } = req.body;
    const itemImageFromFE = req.file;

    console.log("Received data:", {
      itemName,
      description,
      price,
      category,
      foodType,
      status,
      isTopRated,
      isRecommended,
      isNew,
      isDeleted,
      itemImageFromFE,
    });

    if (
      !itemName ||
      !description ||
      !price ||
      !category ||
      !foodType ||
      !status
    ) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    if (!itemImageFromFE) {
      const error = new Error("Item image is required");
      error.statusCode = 400;
      return next(error);
    }

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });
    if (!existingRestaurant) {
      const error = new Error("Restaurant Not Found");
      error.statusCode = 404;
      return next(error);
    }

    console.log("Lets UploadImage");

    const itemImage = await UploadSingleImage(
      itemImageFromFE,
      `restaurant/${currentUser.phone}/menuItems`,
    );

    console.log("itemImage after upload:", itemImage);

    const existingMenuItem = await Menu.findOne({
      restaurantId: existingRestaurant._id,
    });

    console.log("Lets Add the Menu");

    if (existingMenuItem) {
      existingMenuItem.menuItems.push({
        itemName,
        description,
        price,
        category,
        foodType,
        status,
        isTopRated,
        isRecommended,
        isNew,
        isDeleted,
        image: itemImage,
      });

      console.log("Existing Menu Item after push");
      await existingMenuItem.save();
      return res.status(200).json({
        message: "Menu item added successfully",
        data: existingMenuItem,
      });
    } else {
      const newItem = {
        itemName,
        description,
        price,
        category,
        foodType,
        status,
        isTopRated,
        isRecommended,
        isNew,
        isDeleted,
        image: itemImage,
      };

      console.log("New Item to be added");
      const newMenuItem = await Menu.create({
        restaurantId: existingRestaurant._id,
        menuItems: [newItem],
      });

      return res.status(201).json({
        message: "Menu item added successfully",
        data: newMenuItem,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const GetAllItems = async (req, res, next) => {
  try {
    const currentUser = req.user;

    console.log("curent user = ", currentUser);

    // Find the restaurant document for the current manager (user)
    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });
    if (!existingRestaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found", data: [] });
    }

    const items = await Menu.findOne({ restaurantId: existingRestaurant._id });
    console.log("items = ", items);

    if (!items || !items.menuItems || items.menuItems.length === 0) {
      return res.status(200).json({
        message: "No items available",
        data: { menuItems: [] },
      });
    }

    return res.status(200).json({
      message: "All items",
      data: { menuItems: items.menuItems },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const UpdateMenuItem = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const menuItemId = req.params.menuItemId;
    const {
      itemName,
      description,
      price,
      category,
      foodType,
      status,
      isTopRated,
      isRecommended,
      isNew,
      isDeleted,
    } = req.body;
    const itemImageFromFE = req.file;

    if (!menuItemId) {
      const error = new Error("Menu item id is required");
      error.statusCode = 400;
      return next(error);
    }

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });
    if (!existingRestaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      return next(error);
    }

    const existingMenu = await Menu.findOne({
      restaurantId: existingRestaurant._id,
    });
    if (!existingMenu) {
      const error = new Error("Menu not found");
      error.statusCode = 404;
      return next(error);
    }

    const itemIndex = existingMenu.menuItems.findIndex(
      (menuItem) => menuItem._id.toString() === menuItemId,
    );
    if (itemIndex === -1) {
      const error = new Error("Menu item not found");
      error.statusCode = 404;
      return next(error);
    }

    const menuItem = existingMenu.menuItems[itemIndex];

    if (itemName !== undefined) menuItem.itemName = itemName;
    if (description !== undefined) menuItem.description = description;
    if (price !== undefined) menuItem.price = price;
    if (category !== undefined) menuItem.category = category;
    if (foodType !== undefined) menuItem.foodType = foodType;
    if (status !== undefined) menuItem.status = status;
    if (isTopRated !== undefined) menuItem.isTopRated = isTopRated;
    if (isRecommended !== undefined) menuItem.isRecommended = isRecommended;
    if (isNew !== undefined) menuItem.isNew = isNew;
    if (isDeleted !== undefined) menuItem.isDeleted = isDeleted;

    if (itemImageFromFE) {
      const itemImage = await UploadSingleImage(
        itemImageFromFE,
        `restaurant/${currentUser.phone}/menuItems`,
      );
      menuItem.image = itemImage;
    }

    existingMenu.menuItems[itemIndex] = menuItem;
    await existingMenu.save();

    return res.status(200).json({
      message: "Menu item updated successfully",
      data: existingMenu.menuItems[itemIndex],
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const DeleteMenuItem = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const menuItemId = req.params.menuItemId;

    if (!menuItemId) {
      const error = new Error("Menu item id is required");
      error.statusCode = 400;
      return next(error);
    }

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });
    if (!existingRestaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      return next(error);
    }

    const existingMenu = await Menu.findOne({
      restaurantId: existingRestaurant._id,
    });
    if (!existingMenu) {
      const error = new Error("Menu not found");
      error.statusCode = 404;
      return next(error);
    }

    const itemIndex = existingMenu.menuItems.findIndex(
      (menuItem) => menuItem._id.toString() === menuItemId,
    );
    if (itemIndex === -1) {
      const error = new Error("Menu item not found");
      error.statusCode = 404;
      return next(error);
    }

    const [deletedItem] = existingMenu.menuItems.splice(itemIndex, 1);

    if (deletedItem?.image?.publicId) {
      await deleteSingleImage(deletedItem.image);
    }

    await existingMenu.save();

    return res.status(200).json({
      message: "Menu item deleted successfully",
      data: existingMenu.menuItems,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
