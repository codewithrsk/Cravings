import React from "react";

const TeamSection = () => {
  const values = [
    "Fast and friendly service",
    "Trusted restaurant partnerships",
    "Reliable delivery experiences",
    "Simple, secure ordering",
  ];

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-(--color-base-300) bg-(--color-base-100) p-8 shadow-sm sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-(--color-primary)">
              What drives us
            </p>
            <h2 className="mb-5 text-3xl font-bold text-(--color-base-content) sm:text-4xl">
              A platform built around convenience and trust.
            </h2>
            <p className="text-lg leading-8 text-(--color-secondary)">
              From the first order to every repeat visit, we focus on making the
              experience feel easy, transparent, and rewarding for everyone
              involved.
            </p>
          </div>

          <div className="rounded-2xl bg-linear-to-br from-(--color-primary)/10 to-orange-100 p-6">
            <ul className="space-y-3">
              {values.map((value, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm"
                >
                  <span className="text-lg font-semibold text-(--color-primary)">
                    {index + 1}
                  </span>
                  <span className="text-(--color-base-content)">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
