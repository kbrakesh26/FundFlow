import React from 'react';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: DollarSign,
      value: '$50M+',
      label: 'Total Raised',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      icon: Users,
      value: '25K+',
      label: 'Active Backers',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Target,
      value: '1,200+',
      label: 'Successful Campaigns',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: TrendingUp,
      value: '85%',
      label: 'Success Rate',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300 p-8"
            >
              <div
                className={`inline-flex items-center justify-center p-4 ${stat.bgColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow`}
              >
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;