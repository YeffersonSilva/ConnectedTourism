import React, { useState } from 'react';
import "../styles/Footer.scss";
import { useTheme } from '../contexts/ThemeContext';
import { LocationOn, LocalPhone, Email, Chat } from "@mui/icons-material";
import Contenido from './Contenido'; // Asegúrate de importar el componente del chatbot

const Footer = () => {
  const { theme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className={`footer ${theme}`}>
      <div className="footer_left">
        <a href="/"><img src="/assets/logo01.png" alt="logo" /></a>
      </div>

      <div className="footer_center">
        {/* Aquí puedes colocar contenido adicional si es necesario */}
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info" onClick={toggleChat}>
          <img src="/icons8-charla.gif" alt="Chat Icon" style={{ cursor: 'pointer', width: '24px', height: '24px' }} />
          <p>Chat para ayuda al Usuario</p>
</div>

         


<div className="footer_right_info">
    <img src="/telegram.png" alt="Telegram Icon" style={{ width: '24px', height: '24px', marginRight: '5px' }} />
    <a href="https://t.me/NaviExplore_bot" target="_blank">Contacto Telegram</a>
</div>

        {isChatOpen && <Contenido />} {/* Muestra el chatbot cuando se activa */}
      </div>
    </div>
  );
}

export default Footer;
