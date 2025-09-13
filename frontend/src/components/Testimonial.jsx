import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ankit Kumar",
    role: "Startup Founder",
    feedback:
      "FundFlow made it incredibly easy to raise funds for my startup idea. The support from backers was overwhelming!",
    rating: 5,
    image: "https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg",
  },
  {
    name: "Priya Yadav",
    role: "Creative Artist",
    feedback:
      "The platform connected me with amazing people who believed in my art. FundFlow helped me turn my dream project into reality.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Manu Omar",
    role: "Community Organizer",
    feedback:
      "Thanks to FundFlow, we successfully raised money for our community event. The process was smooth and transparent.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const Testimonials = () => {
  return (
    <section id="testi" className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-emerald-700 mb-12">
          What People Say About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl transition transform hover:-translate-y-1 p-8 flex flex-col items-center"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-emerald-200 mb-4 shadow"
              />
              <h3 className="text-lg font-semibold text-emerald-700">{t.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{t.role}</p>
              <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
              <div className="flex justify-center space-x-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 transition-all duration-300 ${
                      i < t.rating
                        ? "text-yellow-400 fill-yellow-400 scale-110"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;