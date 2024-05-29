import React, { useState, useEffect } from 'react';
import '../styles/ListingDetails.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { facilities } from '../data';
import 'react-date-range/dist/styles.css'; // ajusta si la ruta ha cambiado
import 'react-date-range/dist/theme/default.css'; // ajusta si la ruta ha cambiado
import { DateRange } from 'react-date-range';

import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import WeatherProperty from '../components/WeatherProperty'; // Importa WeatherProperty
import MapComponent from '../components/MapComponent'; // Importa MapComponent

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/properties/${listingId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log('Fetch Listing Details Failed', err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24)); // Calculate the difference in day unit
  const totalPrice = listing ? listing.price * dayCount : 0;

  /* PAYMENT STATES */
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleCardNumberChange = (e) => setCardNumber(e.target.value);
  const handleExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const handleCvvChange = (e) => setCvv(e.target.value);

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (totalPrice === 0 || (fullName && cardNumber.length === 16 && expiryDate && cvv)) {
      try {
        const bookingForm = {
          customerId,
          listingId,
          hostId: listing.creator._id,
          startDate: dateRange[0].startDate.toDateString(),
          endDate: dateRange[0].endDate.toDateString(),
          totalPrice: totalPrice,
          paymentDetails: totalPrice > 0 ? { fullName, cardNumber, expiryDate, cvv } : null,
        };

        const response = await fetch('http://localhost:3001/bookings/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingForm),
        });

        if (response.ok) {
          navigate(`/${customerId}/trips`);
        }
      } catch (err) {
        console.log('Submit Booking Failed.', err.message);
      }
    } else {
      alert('Please fill in all payment details with a valid 16-digit card number');
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img src={`http://localhost:3001/${item.replace('public', '')}`} alt="listing photo" />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province}, {listing.country}
        </h2>
        <p>
          {listing.guestCount} - {listing.bedroomCount} (s) - {listing.bedCount} (s) -{' '}
          {listing.bathroomCount} ()
        </p>
        <hr />

        <div className="profile">
          <img src={`http://localhost:3001/${listing.creator.profileImagePath.replace('public', '')}`} />
          <h3>
            Creador {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>¿Qué ofrece este lugar?</h2>
            <div className="amenities">
              {listing.amenities[0].split(',').map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {facilities.find((facility) => facility.name === item)?.icon}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="booking-container">
            <div className="booking-calendar">
              <h2>Fecha</h2>
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ${listing.price} x {dayCount}
                </h2>
              ) : (
                <h2>
                  ${listing.price} x {dayCount} night
                </h2>
              )}
              <h2>Precio total: ${totalPrice}</h2>
              <p>Fecha de inicio: {dateRange[0].startDate.toDateString()}</p>
              <p>Fecha final: {dateRange[0].endDate.toDateString()}</p>
            </div>

            {totalPrice > 0 && (
              <div className="card-details">
                <h2>Detalles de la Tarjeta</h2>
                <input
                  type="text"
                  placeholder="Nombre Completo"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
                <input
                  type="text"
                  placeholder="Número de Tarjeta"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
                <input
                  type="text"
                  placeholder="Fecha de Expiración (MM/AA)"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </div>
            )}
          </div>

          <button className="button" type="submit" onClick={handleSubmit}>
            RESERVA
          </button>
        </div>
      </div>

      <WeatherProperty city={`${listing.city},${listing.province},${listing.country}`} />
    </>
  );
};

export default ListingDetails;
