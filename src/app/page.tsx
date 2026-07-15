import HeroSection from "../components/home/HeroSection";
import PropertyCategories from "../components/home/PropertyCategories";
import FeaturedProperties from "../components/home/FeaturedProperties";
import WhyChooseRedSand from "../components/home/WhyChooseRedSand";
import PropertyServices from "../components/home/PropertyServices";
import PopularLocations from "../components/home/PopularLocations";
import InvestmentBenefits from "../components/home/InvestmentBenefits";
import StatisticsCounter from "../components/home/StatisticsCounter";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PropertyCategories />
      <FeaturedProperties />
      <WhyChooseRedSand />
      <PropertyServices />
      <PopularLocations />
      <InvestmentBenefits />
      <StatisticsCounter />
      <Testimonials />
      <FAQ />
    </>
  );
}