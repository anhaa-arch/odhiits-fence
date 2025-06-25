import { BrowserRouter as Router, Routes, Route, useSearchParams, Navigate, Outlet } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Fences from './screens/Fences';
import FenceDetail from './screens/FenceDetail';
import Contact from './screens/Contact';
import Pricing from './screens/Pricing';
import Blog from './screens/Blog';
import NotFound from './screens/NotFound';
import Gates from './screens/Gates';
import GateDetail from './screens/GateDetail';
import OrderForm from './components/OrderForm';
import AnonymousReview from './components/AnonymousReview';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';
import './App.css';

function OrderPage() {
  const [search] = useSearchParams();
  const type = search.get('type') || 'fence';
  const id = search.get('id') || '';
  return <OrderForm initialType={type} initialId={id} />;
}

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('admin_auth') === 'true';
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/fences" element={<Fences />} />
        <Route path="/fences/:id" element={<FenceDetail />} />
        <Route path="/gates" element={<Gates />} />
        <Route path="/gates/:id" element={<GateDetail />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/review" element={<AnonymousReview />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
