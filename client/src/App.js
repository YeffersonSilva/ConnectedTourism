import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import TripList from "./pages/TripList";
import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";
import ReservationList from "./pages/ReservationList";
import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import Mapadire from "./pages/Mapadire";
import AdminPage from "./pages/AdminPage";
import AdminPublicationsPage from "./pages/AdminPublicationsPage";
import AdminListingsPage from './components/AdminListingsPage'; // Importa el nuevo componente
import Categories from './components/Categories';
import EditListing from './components/EditListingAdmin';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/mapadire" element={<Mapadire />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/publications" element={<AdminPublicationsPage />} />
          <Route path="/admin/listings" element={<AdminListingsPage />} /> 
          <Route path="/categories" element={<Categories />} />
          <Route path="/edit/:id" element={<EditListing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
