import React from "react";
import { MdAccessTime, MdPeopleAlt, MdOutlineLocalOffer } from "react-icons/md";

const StorySection = () => {
  const stats = [
    {
      icon: <MdAccessTime size={24} />,
      title: "24/7 support",
      text: "From order tracking to help with issues, we are always here.",
    },
    {
      icon: <MdPeopleAlt size={24} />,
      title: "Community focused",
      text: "We support local restaurants and delivery partners across the city.",
    },
    {
      icon: <MdOutlineLocalOffer size={24} />,
      title: "Fresh deals",
      text: "Enjoy promotions, bundle offers, and special discounts every week.",
    },
  ];

  return (
    <section className="bg-(--color-base-100) px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-(--color-primary)">
              Our story
            </p>
            <h2 className="mb-5 text-3xl font-bold text-(--color-base-content) sm:text-4xl">
              Built for busy days and great cravings.
            </h2>
            <p className="text-lg leading-8 text-(--color-secondary)">
              Cravings started with a simple idea: make ordering food fast,
              personal, and dependable. Today, we connect customers with their
              favorite meals while helping restaurants and riders grow.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {stats.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-(--color-base-300) bg-white p-5 shadow-sm"
              >
                <div className="mb-3 inline-flex rounded-xl bg-(--color-primary)/10 p-2 text-(--color-primary)">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-semibold text-(--color-base-content)">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-(--color-secondary)">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
