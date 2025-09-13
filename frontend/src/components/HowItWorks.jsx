import React from 'react';
import { Lightbulb, Users, DollarSign, Rocket } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Lightbulb,
      title: 'Share Your Idea',
      description: 'Create a compelling campaign with your story, goals, and rewards for backers.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      icon: Users,
      title: 'Build Community',
      description: 'Engage with potential backers and build a community around your project.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: DollarSign,
      title: 'Receive Funding',
      description: 'Collect secure payments from backers who believe in your vision.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      icon: Rocket,
      title: 'Launch Project',
      description: 'Use the funds to bring your project to life and deliver rewards to backers.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-emerald-700 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to turn your innovative ideas into reality
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative mb-6 flex justify-center">
                <div className={`inline-flex items-center justify-center p-5 ${step.bgColor} rounded-2xl shadow-lg border border-emerald-100 group-hover:shadow-2xl backdrop-blur transition-all duration-300`}>
                  <step.icon className={`h-9 w-9 ${step.color}`} />
                </div>
                {/* Connecting line (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-[-40px] w-20 h-1 bg-gradient-to-r from-emerald-200 to-blue-200 opacity-60 rounded-full -translate-y-1/2"></div>
                )}
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;