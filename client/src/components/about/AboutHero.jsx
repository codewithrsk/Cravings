import React from "react";
import { MdRestaurantMenu, MdDeliveryDining, MdSecurity } from "react-icons/md";

const AboutHero = () => {
  const highlights = [
    {
      icon: <MdRestaurantMenu size={24} />,
      title: "Diverse restaurants",
      text: "Discover local favorites, trending cafés, and everyday essentials in one place.",
    },
    {
      icon: <MdDeliveryDining size={24} />,
      title: "Fast delivery",
      text: "Reliable riders bring your food quickly and safely, right to your doorstep.",
    },
    {
      icon: <MdSecurity size={24} />,
      title: "Trusted experience",
      text: "Secure payments, verified partners, and reliable support keep every order smooth.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-(--color-primary) via-orange-500 to-red-500 px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="max-w-2xl text-(--color-primary-content)">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-100">
              About Cravings
            </p>
            <h1 className="mb-5 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Food made easy, delivered with care.
            </h1>
            <p className="text-lg leading-8 text-orange-50/90">
              Cravings brings together restaurants, riders, and hungry customers into one seamless food experience. Whether you are ordering lunch, planning dinner, or discovering a new favorite spot, we make it simple.
            </p>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
            <div className="rounded-2xl bg-(--color-base-100) p-6 text-(--color-base-content)">
              <h2 className="mb-4 text-2xl font-semibold">Why people choose Cravings</h2>
              <div className="space-y-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex gap-3 rounded-xl border border-(--color-base-300) p-3">
                    <div className="mt-1 rounded-lg bg-(--color-primary)/10 p-2 text-(--color-primary)">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-(--color-secondary)">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
