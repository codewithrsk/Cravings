import Restaurant from "../models/restaurant.model.js";
import Menu from "../models/menu.model.js";

// Get all menu items for a restaurant
export const getMenuItems = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;

    const menuItems = await Menu.find({ restaurantId }).sort({ createdAt: -1 });

    if (!menuItems) {
      return res.status(404).json({ message: "No menu items found" });
    }

    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    next(error);
  }
};

// Get single menu item
export const getMenuItemById = async (req, res, next) => {
  try {
    const { menuId } = req.params;

    const menuItem = await Menu.findById(menuId);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// Add new menu item
export const addMenuItem = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, price, category, foodType, status, image } =
      req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Create new menu item
    const newMenuItem = new Menu({
      restaurantId,
      name,
      description,
      price,
      category,
      foodType: foodType || "Veg",
      status: status || "available",
      image:
        image ||
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop",
    });

    await newMenuItem.save();

    res.status(201).json({
      success: true,
      message: "Menu item added successfully",
      data: newMenuItem,
    });
  } catch (error) {
    next(error);
  }
};

// Update menu item
export const updateMenuItem = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const { name, description, price, category, foodType, status, image } =
      req.body;

    // Check if menu item exists
    const menuItem = await Menu.findById(menuId);
    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    // Update fields if provided
    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (foodType) menuItem.foodType = foodType;
    if (status) menuItem.status = status;
    if (image) menuItem.image = image;

    await menuItem.save();

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// Update menu item status
export const updateMenuItemStatus = async (req, res, next) => {
  try {
    const { menuId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const menuItem = await Menu.findByIdAndUpdate(
      menuId,
      { status },
      { new: true },
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item status updated successfully",
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};

// Delete menu item
export const deleteMenuItem = async (req, res, next) => {
  try {
    const { menuId } = req.params;

    const menuItem = await Menu.findByIdAndDelete(menuId);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
      data: menuItem,
    });
  } catch (error) {
    next(error);
  }
};
// Bulk update menu items status
export const bulkUpdateMenuStatus = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const { menuIds, status } = req.body;

    if (!Array.isArray(menuIds) || !status) {
      return res.status(400).json({
        success: false,
        message: "Please provide menuIds array and status",
      });
    }

    const result = await Menu.updateMany(
      { _id: { $in: menuIds }, restaurantId },
      { status },
    );

    res.status(200).json({
      success: true,
      message: "Menu items status updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Menu update info (existing)
export const MenuUpdateInfo = async (req, res, next) => {
  try {
    const currentUser = req.body;

    // Add your logic here
    res.status(200).json({
      success: true,
      message: "Menu updated",
      data: currentUser,
    });
  } catch (error) {
    next(error);
  }
};
