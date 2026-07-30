import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/api.config";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();

  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRestaurantDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/public/restaurant-detail/${restaurantId}`,
      );
      setRestaurantDetails(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while loading restaurant details. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!restaurantId) return;
    fetchRestaurantDetails();
  }, [restaurantId]);

  const restaurant = restaurantDetails?.restaurantId;
  const menuItems =
    restaurantDetails?.menuItems?.filter((item) => !item.isDeleted) || [];
  const coverImage = restaurant?.coverImage?.url;

  const groupedMenuItems = menuItems.reduce((groups, item) => {
    const category = item.category || "Other";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  const categoryEntries = Object.entries(groupedMenuItems);

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center py-24">
          <div className="text-center">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-(--color-primary) border-t-transparent"></div>
            <Loader />
            <p className="mt-4 text-lg text-(--color-primary)">
              Loading restaurant menu...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex bg-(--color-base-300) items-center justify-center py-24 px-4 text-center">
        <div className="max-w-xl bg-(--color-base-100) rounded-3xl p-10 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
          <p className="text-(--color-base-content)">
            We could not load the restaurant details. Please verify the link or
            try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-base-100) pb-16">
      <div className="max-w-full bg-(--color-base-200)  shadow-2xl h-[30vh]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 py-8 ">
          <div className="flex flex-col md:flex-row gap-6 items-stretch h-full">
            {/* Restaurant Image */}
            <div className="w-full h-full md:w-80 lg:w-96">
              <img
                src={
                  coverImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqpWjq-XjOXk6Ic7WnphdWRJZvxOoeRCEbzZ8Q_NiSWw&s=10"
                }
                alt={restaurant.restaurantName}
                className="w-full h-full rounded-2xl object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqpWjq-XjOXk6Ic7WnphdWRJZvxOoeRCEbzZZ8Q_NiSWw&s=10";
                }}
              />
            </div>

            {/* Restaurant Details */}
            <div className="flex-1 h-full flex flex-col justify-between">
              <h1 className="text-3xl md:text-2xl font-bold text-(--color-primary)">
                {restaurant.restaurantName}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500 text-xl">★</span>

                <span className="text-lg font-semibold">
                  {restaurant.averageRating?.toFixed(1) || "4.7"}
                </span>

                <span className="text-(--color-secondary)">
                  ({restaurant.totalReviews || 0} reviews)
                </span>
              </div>

              {/* Cuisine */}
              <p className="mt-2  text-(--color-base-content)">
                {restaurant.cuisineTypes?.join(", ")}
              </p>

              {/* Address */}
              <div className="flex items-start gap-3 mt-1">
                <span className="text-xl">📍</span>

                <p className="text-xs text-(--color-base-content)">
                  {restaurant.address}, {restaurant.city}, {restaurant.state}
                </p>
              </div>

              {/* Opening Hours */}
              <div className="flex items-center gap-3 mt-1">
                <span className="">🕒</span>

                <p className="text-lg text-(--color-base-content)">
                  {restaurant.openingTime || "09:00"} -{" "}
                  {restaurant.closingTime || "21:00"}
                </p>
              </div>

              {/* Status & Items */}
              {/* <div className="flex flex-wrap gap-3 mt-2">
                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    restaurant.isOpen
                      ? "bg-(--color-success)"
                      : "bg-(--color-secondary)"
                  }`}
                >
                  {restaurant.isOpen ? "Open Now" : "Closed"}
                </span>

                <span className="px-4 py-2 rounded-full bg-(--color-base-200)">
                  🍽 {menuItems.length} Items
                </span>

                <span className="px-4 py-2 rounded-full bg-(--color-base-200)">
                  {restaurant.restaurantType}
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl  mx-auto px-4 sm:px-6 lg:px-8 mt-24  gap-8 ">
        <main className="space-y-10">
          {categoryEntries.length === 0 ? (
            <div className="rounded-3xl bg-(--color-base-100) p-8 shadow-lg border border-(--color-base-200)">
              <p className="text-(--color-base-content)">
                No menu items available yet.
              </p>
            </div>
          ) : (
            categoryEntries.map(([category, items]) => (
              <section
                key={category}
                className="rounded-3xl bg-(--color-base-200) p-6 shadow-lg border border-(--color-base-200)"
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-(--color-primary)">
                      {category}
                    </h2>
                    <p className="text-sm text-(--color-secondary)">
                      {items.length} items
                    </p>
                  </div>
                  <span className="rounded-full bg-(--color-base-200) px-3 py-1 text-sm text-(--color-secondary)">
                    {items.length} items
                  </span>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <article
                      key={`${item._id || item.itemName}-${index}`}
                      className="grid gap-4 rounded-3xl border border-(--color-base-200) bg-(--color-base-100) p-4 sm:grid-cols-[1fr_2fr_170px] sm:items-center"
                    >
                      <div className="relative h-30 overflow-hidden rounded-3xl bg-(--color-base-200)">
                        <img
                          src={
                            item.image?.url ||
                            "https://placehold.co/300x300?text=Food"
                          }
                          alt={item.itemName}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="">
                        <div>
                          <h3 className="text-xl font-semibold text-(--color-primary)">
                            {item.itemName}
                          </h3>
                          <p className="mt-1 text-sm text-(--color-base-content) line-clamp-2">
                            {item.description || "No description provided."}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-(--color-secondary)">
                          <span className="rounded-full bg-white px-3 py-1 shadow-sm">
                            ₹{item.price?.toFixed(0) || "0"}
                          </span>
                          {item.isRecommended && (
                            <span className="rounded-full bg-(--color-primary) px-3 py-1 text-white">
                              Recommended
                            </span>
                          )}
                          {item.isTopRated && (
                            <span className="rounded-full bg-(--color-success) px-3 py-1 text-white">
                              Top Rated
                            </span>
                          )}
                          {item.isNew && (
                            <span className="rounded-full bg-(--color-info) px-3 py-1 text-white">
                              New
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-start justify-between gap-3 sm:items-end">
                        <button
                          type="button"
                          className="rounded-full border border-(--color-primary) bg-white px-8 py-3 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
                        >
                          ADD
                        </button>
                        <span className="text-xs text-(--color-secondary)">
                          Customisable
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
