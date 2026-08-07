import React from "react";
import AboutHero from "../components/about/AboutHero";
import StorySection from "../components/about/StorySection";
import TeamSection from "../components/about/TeamSection";

const About = () => {
  return (
    <div className="min-h-screen bg-(--color-base-100)">
      <AboutHero />
      <StorySection />
      <TeamSection />
    </div>
  );
};

export default About;
