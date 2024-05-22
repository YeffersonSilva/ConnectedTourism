import React, { useState, useEffect } from 'react';
import { categories } from "../data";
import "../styles/Categories.scss";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from '../contexts/ThemeContext'; // Importa useTheme
import { motion } from 'framer-motion'; // Importa motion de framer-motion

const Categories = () => {
  const { theme } = useTheme(); // Usa useTheme para obtener el tema actual
  const [animateKey, setAnimateKey] = useState(0);
  const location = useLocation(); // Usa useLocation para detectar cambios de ruta

  useEffect(() => {
    setAnimateKey(prevKey => prevKey + 1);
  }, [location.pathname]); // Cambia la clave de animación cuando cambia la ruta

  return (
    <div className={`categories ${theme}`}> {/* Agrega la clase de tema aquí */}
      <motion.h1
        key={animateKey}
        initial={{ opacity: 0, y: -50 }} // Empieza arriba
        animate={{ opacity: 1, y: 0 }} // Termina en su posición original
        transition={{ duration: 0.9 }}
      >
        Explora las Categorías Destacadas
      </motion.h1>
      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`} key={`${category.label}-${animateKey}`}>
            <motion.div
              key={`${category.label}-${animateKey}`}
              className="category"
              initial={{ opacity: 0, x: -50 }} // Empieza a la izquierda
              animate={{ opacity: 1, x: 0 }} // Termina en su posición original
              transition={{ duration: 0.6, delay: index * 0.4 }}
            >
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
