// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';
// import CampaignsPage from './pages/CampaignsPage';
// import CampaignDetailPage from './pages/CampaignDetailPage';
// import CreateCampaignPage from './pages/CreateCampaignPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import ProfilePage from './pages/ProfilePage';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <main className="min-h-screen">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/campaigns" element={<CampaignsPage />} />
//           <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
//           <Route path="/create-campaign" element={
//             <ProtectedRoute>  <CreateCampaignPage/></ProtectedRoute>
          
            
//           } />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path='/register' element={<SignupPage />} />
//           <Route path="/profile" element={
//             <ProtectedRoute>
//               <ProfilePage />
//             </ProtectedRoute>
//           } />
//           <Route path="/admin" element={
//             <ProtectedRoute requireAdmin={true}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           } />
//         </Routes>
//       </main>
//       <Footer />
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CampaignsPage from './pages/CampaignsPage';
import CampaignDetailPage from './pages/CampaignDetailPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ContactSupport from "./pages/ContactSupport";
import Testimonial from './components/Testimonial';
import Leaderboard from './components/Leaderboard';

import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
          <Route
            path="/create-campaign"
            element={
              <ProtectedRoute>
                <CreateCampaignPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/testi" element={<Testimonial />} />
          <Route path="/profile" element={<ProtectedRoute>
                <ProfilePage />
                </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
                </ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
      
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
};

export default App;
