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
    img: "assets/evento.jpg",
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
  },
  {
    img: "assets/public_speaking.jpg",
    label: "Charlas y Conferencias",
    icon: <MdEvent />,
    description: "Asiste a charlas educativas y conferencias sobre diversos temas.",
  },
  {
    img: "assets/urban_parks.jpg",
    label: "Parques Urbanos",
    icon: <GiParkBench />,
    description: "Relájate y disfruta de los espacios verdes en la ciudad.",
  },
];

export const types = [
  {
    name: "An entire place",
    description: "Guests have the whole place to themselves",
    icon: <FaHouseUser />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that maybe shared with you or others",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Personal care products",
    icon: <FaPumpSoap />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Hangers",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Cooking set",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "Barbecue grill",
    icon: <GiBarbecue />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Private patio or Balcony",
    icon: <MdBalcony />,
  },
  {
    name: "Camp fire",
    icon: <GiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: "Self check-in",
    icon: <FaKey />
  },
  {
    name: " Pet allowed",
    icon: <MdPets />
  }
];
