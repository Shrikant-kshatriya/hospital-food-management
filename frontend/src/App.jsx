import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Layout from './Layout';
import Login from './global/Login';
import Dashboard from './pages/managerPage/Dashboard';
import PantryDashboard from './pages/pantryStaffPage/Dashboard';
import DeliveryDashboard from './pages/deliveryPage/Dashboard';
import axios from 'axios';
import ManagePatient from './pages/managerPage/ManagePatient';
import ManagePantry from './pages/managerPage/ManagePantry';
import MealOrderMonitor from './pages/managerPage/TrackMealOrders';
import DeliveryPersonnelManager from './pages/pantryStaffPage/ManageDeliveryPersonnel';
import MealOrders from './pages/pantryStaffPage/ManageMealOrders';
import TrackMealBox from './pages/pantryStaffPage/TrackMealBoxes';
import ManageMealBox from './pages/deliveryPage/ManageMealBox';

function App() {
  const { user, login } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/user');
        if (res.data.user) {
          login(res.data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [login]);

  const renderManagerRoutes = () => (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/manage-patient" element={<ManagePatient />} />
      <Route path="/manage-pantry" element={<ManagePantry />} />
      <Route path="/track-orders" element={<MealOrderMonitor />} />
    </Routes>
  );

  const renderPantryRoutes = () => (
    <Routes>
      <Route path='/dashboard' element={<PantryDashboard />} />
      <Route path='/manage-personnel' element={<DeliveryPersonnelManager />} />
      <Route path='/manage-orders' element={<MealOrders />} />
      <Route path='/manage-boxes' element={<TrackMealBox />} />
    </Routes>
  );

  const renderDeliveryPersonnelRoutes = () => (
    <Routes>
      <Route path='/dashboard' element={<DeliveryDashboard />} />
      <Route path='/boxes' element={<ManageMealBox />} />
    </Routes>
  );

  return (
    <Router>
      <Routes>
        {user ? (
          <Route
            path="/*"
            element={
              <Layout>
                {user.role === 'manager' && renderManagerRoutes()}
                {user.role === 'pantry' && renderPantryRoutes()}
                {user.role === 'delivery' && renderDeliveryPersonnelRoutes()}
              </Layout>
            }
          />
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
