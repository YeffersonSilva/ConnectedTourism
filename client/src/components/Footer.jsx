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
      
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
    <a href="https://t.me/NaviExplore_bot" target="_blank">
        <LocalPhone />
        <p>Chat de ayuda al Usuario</p>
    </a>
</div>

        <div className="footer_right_info">
          <Email />
          <p>yefferson@gmail.com</p>
        </div>
       
      </div>
    </div>
  );
}

export default Footer;
