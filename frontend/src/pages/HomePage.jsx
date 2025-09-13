import React from 'react';
import Hero from '../components/Hero';
import FeaturedCampaigns from '../components/FeaturedCampaigns';
import HowItWorks from '../components/HowItWorks';
import Stats from '../components/Stats';
import Testimonial from '../components/Testimonial';
const HomePage = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <FeaturedCampaigns />
      <HowItWorks />
      <section id= "te"><Testimonial/></section>
      
    </div>
  );
};

export default HomePage;
