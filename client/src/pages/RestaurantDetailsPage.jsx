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
        `/public/restaurant-detail/${restaurantId}`
      );
      setRestaurantDetails(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unknown error occurred while loading restaurant details. Please try again."
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

  // 1. Modern Skeleton Loader (Using your base-300 for pulse)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-(--color-base-200) pb-20">
        <div className="h-80 w-full animate-pulse bg-(--color-base-300)" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-16 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="h-96 animate-pulse rounded-2xl bg-(--color-base-100) shadow-sm" />
            <div className="h-64 animate-pulse rounded-2xl bg-(--color-base-100) shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Not Found State
  if (!restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--color-base-200) py-24 px-4">
        <div className="max-w-md rounded-2xl bg-(--color-base-100) p-8 text-center shadow-xl border border-(--color-base-200)">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--color-base-200) text-(--color-primary)">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-(--color-primary)">Restaurant not found</h2>
          <p className="mt-2 text-(--color-secondary)">
            We couldn't load the restaurant details. It may have been removed or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-base-200) pb-20">
      {/* 3. Immersive Hero Section */}
      <header className="relative h-96 w-full bg-[#111827]">
        {coverImage ? (
          <img
            src={coverImage}
            alt={restaurant.restaurantName}
            className="h-full w-full object-cover opacity-60"
          />
        ) : (
          <div className="absolute inset-0 bg-(--color-primary) opacity-80" />
        )}
        {/* Dark gradient overlay to ensure text is always readable over the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 w-full">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${
                restaurant.isOpen ? "bg-(--color-success)" : "bg-(--color-secondary)"
              }`}>
                {restaurant.isOpen ? "• Open Now" : "Closed"}
              </span>
              <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {restaurant.restaurantType?.toUpperCase() || "ALL"}
              </span>
            </div>
            
            <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl drop-shadow-md">
              {restaurant.restaurantName}
            </h1>
            
            <p className="mt-4 max-w-2xl text-lg text-white/90 drop-shadow">
              {restaurant.cuisineTypes?.join(" • ") || "Multi-cuisine"}
            </p>
          </div>
        </div>
      </header>

      {/* 4. Main Layout Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-6 grid gap-8 lg:grid-cols-[2.5fr_1fr]">
          
          {/* Left Column: Content & Menu */}
          <div className="space-y-8">
            {/* About Card */}
            <div className="rounded-2xl border border-(--color-base-200) bg-(--color-base-100) p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-(--color-primary)">About</h2>
              <p className="mt-3 leading-relaxed text-(--color-secondary)">
                {restaurant.description || "A delightful dining experience with a menu curated for lovers of fresh flavors and beautiful presentation."}
              </p>
            </div>

            {/* Menu Sections */}
            {categoryEntries.length === 0 ? (
              <div className="rounded-2xl border border-(--color-base-200) bg-(--color-base-100) p-12 text-center shadow-sm">
                <p className="text-lg text-(--color-secondary)">No menu items available right now.</p>
              </div>
            ) : (
              categoryEntries.map(([category, items]) => (
                <section key={category} className="rounded-2xl border border-(--color-base-200) bg-(--color-base-100) p-6 shadow-sm sm:p-8">
                  <div className="mb-6 flex items-baseline justify-between border-b border-(--color-base-200) pb-4">
                    <h3 className="text-2xl font-bold text-(--color-primary)">{category}</h3>
                    <span className="rounded-full bg-(--color-base-200) px-3 py-1 text-sm font-medium text-(--color-secondary)">
                      {items.length} items
                    </span>
                  </div>

                  <div className="grid gap-6">
                    {items.map((item) => (
                      <article
                        key={item._id}
                        className="group flex flex-col gap-4 rounded-xl border border-(--color-base-200) p-4 transition-all hover:border-(--color-primary) hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex flex-1 gap-5">
                          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-(--color-base-200)">
                            <img
                              src={item.image?.url || "https://placehold.co/400x400?text=Food"}
                              alt={item.itemName}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-lg font-bold text-(--color-primary)">{item.itemName}</h4>
                              {item.isRecommended && (
                                <span className="rounded bg-(--color-primary) px-2 py-0.5 text-[10px] font-bold uppercase text-white">Recommended</span>
                              )}
                              {item.isTopRated && (
                                <span className="rounded bg-(--color-success) px-2 py-0.5 text-[10px] font-bold uppercase text-white">Top Rated</span>
                              )}
                              {item.isNew && (
                                <span className="rounded bg-(--color-info) px-2 py-0.5 text-[10px] font-bold uppercase text-white">New</span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-(--color-secondary) line-clamp-2">
                              {item.description || "No description available."}
                            </p>
                            <p className="mt-3 text-lg font-bold text-(--color-primary)">
                              ₹{item.price?.toFixed(0) || "0"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-center sm:min-w-[120px]">
                          <button
                            type="button"
                            className="w-full rounded-lg border border-(--color-primary) bg-transparent py-2 font-bold text-(--color-primary) transition-colors hover:bg-(--color-primary) hover:text-white"
                          >
                            ADD
                          </button>
                          <span className="mt-2 text-[10px] text-(--color-secondary)">Customisable</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>

          {/* Right Column: Sticky Sidebar Info */}
          <aside className="space-y-6">
            <div className="sticky top-6 space-y-6">
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-(--color-base-200) bg-(--color-base-100) p-5 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-(--color-base-200) text-(--color-primary)">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-(--color-primary)">{restaurant.averageRating?.toFixed(1) || "4.7"}</p>
                  <p className="text-xs font-medium uppercase text-(--color-secondary)">{restaurant.totalReviews || 0} Ratings</p>
                </div>
                <div className="rounded-2xl border border-(--color-base-200) bg-(--color-base-100) p-5 text-center shadow-sm">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-(--color-base-200) text-(--color-primary)">
                     <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-(--color-primary)">{menuItems.length}</p>
                  <p className="text-xs font-medium uppercase text-(--color-secondary)">Menu Items</p>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="rounded-2xl border border-(--color-base-200) bg-(--color-base-100) p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-(--color-secondary)">Restaurant Info</h3>
                <div className="mt-4 space-y-4 text-sm text-(--color-secondary)">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-(--color-primary)">📍</span>
                    <p>{restaurant.address}, {restaurant.city}, {restaurant.state} - {restaurant.pinCode}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-(--color-primary)">✉️</span>
                    <p>{restaurant.contactDetails?.email || "N/A"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-(--color-primary)">📞</span>
                    <p>{restaurant.contactDetails?.phone || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Legal Details Card */}
              <div className="rounded-2xl border border-(--color-base-200) bg-(--color-base-100) p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-(--color-secondary)">Legal Details</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-(--color-base-200) pb-2">
                    <span className="text-(--color-secondary)">Legal Name</span>
                    <span className="font-medium text-(--color-primary) text-right max-w-[60%] truncate">{restaurant.documents?.legalName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-(--color-base-200) pb-2">
                    <span className="text-(--color-secondary)">Company Type</span>
                    <span className="font-medium text-(--color-primary)">{restaurant.documents?.companyType || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b border-(--color-base-200) pb-2">
                    <span className="text-(--color-secondary)">FSSAI</span>
                    <span className="font-medium text-(--color-primary)">{restaurant.documents?.fssaiCertificate || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-(--color-secondary)">GST</span>
                    <span className="font-medium text-(--color-primary)">{restaurant.documents?.gstCertificate || "N/A"}</span>
                  </div>
                </div>
              </div>
              
            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
};

export default RestaurantDetailsPage;