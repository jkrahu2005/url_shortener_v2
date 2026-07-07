import MainLayout from "../components/layout/MainLayout";

import Hero from "../components/common/Hero";
import Metrics from "../components/common/Metrics";
import Features from "../components/common/Features";
import HowItWorks from "../components/common/HowItWorks";
import CTA from "../components/common/CTA";

function Home() {
  return (
    <MainLayout>
      <Hero />

      <Metrics />

      <Features />

      <HowItWorks />

      <CTA />
    </MainLayout>
  );
}

export default Home;