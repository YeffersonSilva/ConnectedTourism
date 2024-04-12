// Importaciones consolidadas de 'react-icons/gi'
// Asumiendo que encontraste un icono alternativo válido como GiBookshelf
import {
  GiPartyPopper,
  GiPill,
  GiRomanToga,
  GiCompass,
  GiForkKnifeSpoon,
  GiParkBench,
  GiTheater,
  GiArchBridge,
  GiChefToque,
  GiBookshelf // Asumiendo que este es el icono alternativo correcto
} from 'react-icons/gi';

import {
  FaInfo, // Para centros o puntos de información turística
  FaWheelchair, // Para accesibilidad
  FaMapSigns, // Para señalización y guías
  FaTree, // Para áreas naturales o jardines
  FaParking, // Para estacionamiento
  FaRestroom, // Para servicios sanitarios
  FaCoffee, // Para cafeterías o lugares de comida
  FaGift, // Para tiendas de souvenirs
  FaWifi, // Para WiFi gratuito
  FaBaby, // Para áreas o servicios para familias con bebés
  FaCameraRetro, // Para zonas fotogénicas
  FaBus, // Para información sobre transporte público
  FaWalking, // Para rutas de senderismo o caminata
  FaBicycle, // Para puntos de alquiler de bicicletas
  FaDog, // Para sitios pet-friendly
  FaLeaf, // Para promover la sostenibilidad y prácticas ecológicas
} from 'react-icons/fa';
// Importaciones de 'react-icons/fa'
import { FaLandmark, FaPaintBrush } from "react-icons/fa";

// Importaciones de 'react-icons/md'
import { MdEvent, MdLocalFlorist } from "react-icons/md";


import {
  
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import {  MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "assets/01.jpg",
    label: "Eventos",
    icon: <GiPartyPopper />, 
    description: "Descubre eventos y actividades cerca de ti!",
  },
  {
    img: "assets/farmacia.jpg",

    label: "Farmacia",
    icon: <GiPill />,
    description: "Encuentra farmacias cerca de ti",
  },
  {
    
    img: "assets/lugarHistoria.jpg",
    label: "Lugares Históricos",
    icon: <GiRomanToga />,
    description: "Descubre la historia que te rodea",
  },
  {
    img: "assets/sitio.jpg",

    label: "Sitios",
    icon: <GiCompass />,
    description: "Explora sitios de interés",
  },
  {
    img: "assets/restaurante.jpg",

    label: "Restaurantes",
    icon: <GiForkKnifeSpoon />,
    description: "Saborea la mejor comida local",
  },
  {
    img: "assets/plaza.jpg",
    label: "Plaza",
    icon: <GiParkBench />,
    description: "Relájate y disfruta de las plazas de la ciudad",
  },
  {
    img: "assets/educational_event.jpg",
    label: "Evento Educativo",
    icon: <GiBookshelf />, // Cambiado a GiBookshelf u otro icono válido
    description: "Participa en eventos educativos y talleres.",
  },
  
  {
    img: "assets/cultural_event.jpg",
    label: "Evento Cultural",
    icon: <FaLandmark />,
    description: "Explora eventos culturales y tradiciones locales.",
  },
  {
    img: "assets/art_exhibition.jpg",
    label: "Exposiciones de Arte",
    icon: <FaPaintBrush />,
    description: "Visita galerías de arte y exposiciones.",
  },
  {
    img: "assets/gastronomic_event.jpg",
    label: "Evento Gastronómico",
    icon: <GiChefToque />,
    description: "Descubre la gastronomía local a través de eventos y ferias.",
  },
  {
    img: "assets/nature_event.jpg",
    label: "Eventos de Naturaleza",
    icon: <MdLocalFlorist />,
    description: "Conecta con la naturaleza en parques y reservas.",
  },
  {
    img: "assets/bridge_tour.jpg",
    label: "Tours Históricos",
    icon: <GiArchBridge />,
    description: "Descubre la historia y arquitectura a través de tours guiados.",
  },
  {
    img: "assets/theater_performance.jpg",
    label: "Espectáculos Teatrales",
    icon: <GiTheater />,
    description: "Disfruta de obras de teatro y espectáculos en vivo.",
  }
];

export const types = [
  {
    name: "Lugar",
    description: "Privado solo con cadastro previo",
    icon: <FaHouseUser />,
  },
  {
    name: "Sitio",
    description:
      "Al aire libre",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "Evento",
    description:
      "Evento Publico a la comunidad",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Puntos históricos",
    icon: <FaLandmark />,
  },
  {
    name: "Información turística",
    icon: <FaInfo />,
  },
  {
    name: "Accesibilidad para discapacitados",
    icon: <FaWheelchair />,
  },
  {
    name: "Tours guiados",
    icon: <FaMapSigns />,
  },
  {
    name: "Áreas naturales",
    icon: <FaTree />,
  },
  {
    name: "Estacionamiento disponible",
    icon: <FaParking />,
  },
  {
    name: "Baños",
    icon: <FaRestroom />,
  },
  {
    name: "Áreas recreativas",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Comida y bebidas",
    icon: <FaCoffee />,
  },
  {
    name: "Tienda de souvenirs",
    icon: <FaGift />,
  },
  {
    name: "Wifi gratis",
    icon: <FaWifi />,
  },
  {
    name: "Servicios para familias",
    icon: <FaBaby />,
  },
  {
    name: "Zonas fotogénicas",
    icon: <FaCameraRetro />,
  },
  {
    name: "Información de transporte público",
    icon: <FaBus />,
  },
  {
    name: "Rutas de senderismo",
    icon: <FaWalking />,
  },
  {
    name: "Alquiler de bicicletas",
    icon: <FaBicycle />,
  },
  {
    name: "Admite mascotas",
    icon: <FaDog />,
  },
  {
    name: "Prácticas ecológicas",
    icon: <FaLeaf />,
  },
];