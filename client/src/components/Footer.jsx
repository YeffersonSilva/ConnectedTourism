import React from 'react';
import "../styles/Footer.scss";
import { useTheme } from '../contexts/ThemeContext'; // Importa useTheme
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";

const Footer = () => {
  const { theme } = useTheme(); // Usar useTheme para obtener el tema actual

  return (
    <div className={`footer ${theme}`}>  {/* Agregar clase dinámica basada en el tema */}
      <div className="footer_left">
        <a href="/"><img src="/assets/logo01.png" alt="logo" /></a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+1 23456</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>yefferson@gmail.com</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  );
}

export default Footer;
