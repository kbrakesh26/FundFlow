// import React from 'react';
// import { Heart, Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Logo and Description */}
//           <div className="col-span-1 md:col-span-2">
//             <div className="flex items-center space-x-2 mb-4">
//               <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg">
//                 <Heart className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-xl font-bold">FundFlow</span>
//             </div>
//             <p className="text-gray-300 max-w-md mb-6">
//               Empowering dreams and connecting communities through innovative crowdfunding solutions.
//               Join thousands of creators and backers making ideas come to life.
//             </p>
//             <div className="flex space-x-4">
//               <a href="mailto:rakeshkbind729@gmail.com?subject=Hello&body=This is a test email" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
//                 <Mail className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
//                 <Phone className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors duration-200">
//                 <MapPin className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">How It Works</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Success Stories</a>
//               </li>
            
//             <li>
//                 <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">FAQ</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Contact Support</a>
//               </li>
//             </ul>
//           </div>
//           {/* Legal */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Legal</h3>
//             <ul className="space-y-2">
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Privacy Policy</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Terms of Service</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Cookie Policy</a>
//               </li>
//               <li>
//                 <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors duration-200">Refund Policy</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center">
//           <p className="text-gray-400">© 2025 FundFlow. All rights reserved. Made with ❤️ for creators everywhere.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-emerald-900 via-blue-900 to-emerald-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-emerald-100 p-8 mb-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg shadow">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                FundFlow
              </span>
            </div>
            <p className="text-gray-700 max-w-md mb-6">
              Empowering dreams and connecting communities through innovative crowdfunding solutions.
              Join thousands of creators and backers making ideas come to life.
            </p>
            <div className="flex space-x-4 mt-2">
              {/* Email */}
              <a
                href="mailto:rakeshkbind729@gmail.com"
                className="text-emerald-700 hover:text-emerald-900 transition-colors duration-200 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              {/* Phone */}
              <a
                href="tel:+918808568200"
                className="text-emerald-700 hover:text-emerald-900 transition-colors duration-200 transform hover:scale-110"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5" />
              </a>
              {/* Location */}
              <a
                href="https://www.google.com/maps/place/India"
                className="text-emerald-700 hover:text-emerald-900 transition-colors duration-200 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Location"
              >
                <MapPin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="text-gray-700 hover:text-emerald-700 transition-colors duration-200">How It Works</Link>
              </li>
              <li>
                <Link to="/#testi" className="text-gray-700 hover:text-emerald-700 transition-colors duration-200">Success Stories</Link>
              </li>
              <li>
                <Link to="/contact-support#faq" className="text-gray-700 hover:text-emerald-700 transition-colors duration-200">FAQ</Link>
              </li>
              <li>
                <Link to="/contact-support" className="text-gray-700 hover:text-emerald-700 transition-colors duration-200">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-800">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-700 hover:text-emerald-700 transition-colors duration-200">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-700 hover:text-emerald-700 transition-colors duration-200">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-700 hover:text-emerald-700 transition-colors duration-200">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-700 hover:text-emerald-700 transition-colors duration-200">Refund Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-900 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 FundFlow. All rights reserved. Made with <span className="text-emerald-400">❤️</span> for creators everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;