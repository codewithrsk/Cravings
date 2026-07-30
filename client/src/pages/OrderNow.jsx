import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch, IoStar } from "react-icons/io5";
import { MdRestaurant, MdLocalDining, MdFastfood, MdCake, MdLunchDining } from "react-icons/md";
import api from "../config/api.config";
import DataNotFound from "../assets/NodataFound.gif";

const OrderNow = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All", icon: MdRestaurant },
    { id: "veg", label: "Vegetarian", icon: MdLocalDining },
    { id: "nonveg", label: "Non-veg", icon: MdFastfood },
    { id: "dessert", label: "Desserts", icon: MdCake },
    { id: "others", label: "Other", icon: MdLunchDining },
  ];

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const response = await api.get("/public/restaurants");
        const restaurantData = response.data.data || [];
        const formattedRestaurants = restaurantData.map((restaurant) => ({
          id: restaurant._id,
          name: restaurant.restaurantName || restaurant.name || "Restaurant",
          description:
            restaurant.description ||
            restaurant.cuisineTypes?.join(", ") ||
            "Delicious food delivered to your door",
          rating: restaurant.rating || 4.5,
          image:
            restaurant.coverImage?.url ||
            restaurant.restaurantImage?.[0]?.url ||
            "https://placehold.co/400x280?text=Restaurant",
          cuisines: restaurant.cuisineTypes?.join(", ") || "Mixed",
          city: restaurant.city || restaurant.address || "Unknown",
        }));
        setRestaurants(formattedRestaurants);
        setFilteredRestaurants(formattedRestaurants);
      } catch (error) {
        console.error("Error loading restaurants:", error);
        setRestaurants([]);
        setFilteredRestaurants([]);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    if (searchQuery) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisines.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.city.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      const categoryMap = {
        veg: "vegetarian",
        nonveg: "non-vegetarian",
        dessert: "desserts",
        others: "other",
      };
      const searchTerm = categoryMap[selectedCategory];
      filtered = filtered.filter((restaurant) =>
        restaurant.cuisines.toLowerCase().includes(searchTerm),
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery, selectedCategory, restaurants]);

  return (
    <div className="min-h-screen bg-(--color-base-100)">
      <section className="relative py-16 bg-(--color-primary) text-(--color-primary-content)">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Order Your Favorite Meals Now
            </h1>
            <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
              Browse nearby restaurants, search dishes, and place your order with one click.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-(--color-base-100) rounded-3xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-primary) text-xl" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search restaurants, cuisines, or dishes..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-(--color-secondary) outline-none text-(--color-primary)"
                />
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="bg-(--color-primary) text-(--color-primary-content) px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 border px-4 py-3 rounded-full transition ${
                  selectedCategory === category.id
                    ? "bg-(--color-primary) text-(--color-primary-content)"
                    : "bg-(--color-base-100) text-(--color-base-content) hover:bg-(--color-base-200)"
                }`}
              >
                <Icon />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-(--color-primary) border-t-transparent"></div>
            <p className="mt-4 text-(--color-primary)">Loading restaurants...</p>
          </div>
        ) : filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => navigate(`/restaurant-menu/${restaurant.id}`)}
                className="cursor-pointer bg-(--color-base-100) rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="relative h-56 overflow-hidden bg-(--color-base-200)">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-(--color-primary) text-(--color-primary-content) px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <IoStar />
                    {restaurant.rating}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="text-lg font-semibold text-(--color-primary)">{restaurant.name}</div>
                  <p className="text-sm text-(--color-base-content) line-clamp-2">{restaurant.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-(--color-primary-content)">
                    {restaurant.cuisines.split(",").map((cuisine, index) => (
                      <span key={index} className="bg-(--color-base-200) rounded-full px-3 py-1">
                        {cuisine.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-(--color-secondary)">Location: {restaurant.city}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <img src={DataNotFound} alt="No Restaurants Found" className="mx-auto max-w-xs" />
            <p className="mt-6 text-lg text-(--color-base-content)">No restaurants found.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 bg-(--color-primary) text-(--color-primary-content) px-6 py-3 rounded-full"
            >
              Show All Restaurants
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderNow;
