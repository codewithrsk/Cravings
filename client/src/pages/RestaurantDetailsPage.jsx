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
      const response = await api.get(`/public/restaurant-detail/${restaurantId}`);
      setRestaurantDetails(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while loading restaurant details. Please try again.",
      );
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (!restaurantId) return;
    fetchRestaurantDetails();
  }, [restaurantId]);

  const restaurant = restaurantDetails?.restaurantId;
  const menuItems = restaurantDetails?.menuItems?.filter((item) => !item.isDeleted) || [];
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
        <Loader />
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="text-center">
            <Loader />    
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-(--color-primary) border-t-transparent"></div>
          <p className="mt-4 text-lg text-(--color-primary)">Loading restaurant menu...</p>
        </div>
      </div>
      </>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24 px-4 text-center">
        <div className="max-w-xl bg-(--color-base-100) rounded-3xl p-10 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
          <p className="text-(--color-base-content)">We could not load the restaurant details. Please verify the link or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-base-100) pb-16">
      <div className="relative overflow-hidden bg-white shadow-sm">
        <div className="h-80 bg-(--color-base-300)">
          {coverImage ? (
            <img
              src={coverImage}
              alt={restaurant.restaurantName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-3xl font-semibold text-(--color-secondary)">
              No Cover Image
            </div>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto rounded-3xl bg-white p-6 shadow-2xl transform translate-y-1/2">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-(--color-base-200) px-4 py-2 text-sm font-semibold text-(--color-secondary)">
                  {restaurant.restaurantType || "Restaurant"}
                </div>
                <h1 className="mt-4 text-4xl font-bold text-(--color-primary)">{restaurant.restaurantName}</h1>
                <p className="mt-3 max-w-3xl text-base text-(--color-base-content)">{restaurant.description}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-(--color-secondary)">
                  {restaurant.cuisineTypes?.map((cuisine) => (
                    <span key={cuisine} className="rounded-full bg-(--color-base-200) px-3 py-1">{cuisine}</span>
                  ))}
                  <span className="rounded-full bg-(--color-base-200) px-3 py-1">{restaurant.city}, {restaurant.state}</span>
                  <span className={`rounded-full px-3 py-1 ${restaurant.isOpen ? "bg-(--color-success) text-white" : "bg-(--color-secondary) text-white"}`}>
                    {restaurant.isOpen ? "Open Now" : "Closed"}
                  </span>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-auto">
                <div className="rounded-3xl bg-(--color-base-100) p-4 text-center">
                  <p className="text-sm text-(--color-secondary)">Rating</p>
                  <p className="mt-2 text-2xl font-semibold text-(--color-primary)">{restaurant.averageRating?.toFixed(1) || "4.7"}</p>
                </div>
                <div className="rounded-3xl bg-(--color-base-100) p-4 text-center">
                  <p className="text-sm text-(--color-secondary)">Items</p>
                  <p className="mt-2 text-2xl font-semibold text-(--color-primary)">{menuItems.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 grid gap-8 lg:grid-cols-[2.2fr_0.8fr]">
        <main className="space-y-10">
          {categoryEntries.length === 0 ? (
            <div className="rounded-3xl bg-white p-8 shadow-lg border border-(--color-base-200)">
              <p className="text-(--color-base-content)">No menu items available yet.</p>
            </div>
          ) : (
            categoryEntries.map(([category, items]) => (
              <section key={category} className="rounded-3xl bg-white p-6 shadow-lg border border-(--color-base-200)">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold text-(--color-primary)">{category}</h2>
                    <p className="text-sm text-(--color-secondary)">{items.length} items</p>
                  </div>
                  <span className="rounded-full bg-(--color-base-200) px-3 py-1 text-sm text-(--color-secondary)">{items.length} items</span>
                </div>

                <div className="space-y-4">
                  {items.map((item, index) => (
                    <article
                      key={`${item._id || item.itemName}-${index}`}
                      className="grid gap-4 rounded-3xl border border-(--color-base-200) bg-(--color-base-100) p-4 sm:grid-cols-[1fr_2fr_170px] sm:items-center"
                    >
                      <div className="relative h-28 overflow-hidden rounded-3xl bg-(--color-base-200)">
                        <img
                          src={item.image?.url || "https://placehold.co/300x300?text=Food"}
                          alt={item.itemName}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-(--color-primary)">
                          {item.foodType === "veg" ? "Veg" : item.foodType === "non-veg" ? "Non-Veg" : "Other"}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold text-(--color-primary)">{item.itemName}</h3>
                          <p className="mt-1 text-sm text-(--color-base-content) line-clamp-2">{item.description || "No description provided."}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-(--color-secondary)">
                          <span className="rounded-full bg-white px-3 py-1 shadow-sm">₹{item.price?.toFixed(0) || "0"}</span>
                          {item.isRecommended && <span className="rounded-full bg-(--color-primary) px-3 py-1 text-white">Recommended</span>}
                          {item.isTopRated && <span className="rounded-full bg-(--color-success) px-3 py-1 text-white">Top Rated</span>}
                          {item.isNew && <span className="rounded-full bg-(--color-info) px-3 py-1 text-white">New</span>}
                        </div>
                      </div>

                      <div className="flex flex-col items-start justify-between gap-3 sm:items-end">
                        <button
                          type="button"
                          className="rounded-full border border-(--color-primary) bg-white px-8 py-3 text-sm font-semibold text-(--color-primary) transition hover:bg-(--color-primary) hover:text-white"
                        >
                          ADD
                        </button>
                        <span className="text-xs text-(--color-secondary)">Customisable</span>
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
