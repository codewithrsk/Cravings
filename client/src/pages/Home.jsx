import React from "react";

const Home = () => {
  return (
    <>
      <main className="min-h-screen bg-(--secondary) flex justify-center items-center">
        <div class="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              Your Favorite Food,
              <br />
              Delivered Fast
            </h1>
            <p class="text-lg md:text-xl opacity-90 mb-8">
              Order from thousands of restaurants and get it delivered to your
              doorstep
            </p>
            <div class="flex gap-4 justify-center">
              <button class="bg-(--accent) text-(--color-primary-content) px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Sign Up
              </button>
              <button class="bg-(--background) text-(--color-base-content) px-8 py-3 rounded-lg font-semibold hover:bg-(--accent) transition">
                Order Now
              </button>
            </div>
          </div>
          <div class="flex items-center bg-(--background) rounded-lg px-4 py-3 max-w-4xl mx-auto">
            <svg
              viewBox="0 0 512 512"
              class="text-(--color-base-content) text-xl mr-3"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M456.69 421.39 362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3zM97.92 222.72a124.8 124.8 0 1 1 124.8 124.8 124.95 124.95 0 0 1-124.8-124.8z"></path>
            </svg>
            <input
              placeholder="Search restaurants or dishes..."
              class="bg-(--color-base-100) w-full outline-none text-(--color-primary)"
              type="text"
              value=""
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
