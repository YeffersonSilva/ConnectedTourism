import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import WikipediaSearch from './WikipediaSearch/WikipediaSearch';

const theme = {
    background: '#f5f8fb',        // Mantiene el color de fondo claro
    headerBgColor: '#007bff',     // Azul principal para la cabecera
    headerFontColor: '#fff',       // Texto blanco en la cabecera
    headerFontSize: '20px',       // Tamaño de fuente en la cabecera
    botBubbleColor: '#007bff',    // Color de la burbuja del bot
    botFontColor: '#fff',         // Color de texto del bot
    userBubbleColor: '#0056b3',   // Color más oscuro para la burbuja del usuario
    userFontColor: '#fff'         // Texto blanco para el usuario
};


export default class Contenido extends Component {
    state = { isChatOpen: false };

    toggleChat = () => this.setState(prevState => ({ isChatOpen: !prevState.isChatOpen }));

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
                    <button onClick={this.toggleChat}>
                        <img src="/icons8-charla.gif" alt="Chat Icon" style={{ cursor: 'pointer' }} />
                    </button>
                    {this.state.isChatOpen && (
                       <ChatBot
                       key={this.state.isChatOpen} // Este ejemplo usa isChatOpen, asumiendo que cada vez que se abre, podría necesitar un estado limpio.
                        steps={[
                            {
                                id: '1',
                                message: "¡Hola! ¿En qué puedo ayudarte hoy?",
                                trigger: 'options'
                            },
                            {
                                id: 'options',
                                options: [
                                    { value: 'atracciones', label: 'Buscar atracciones', trigger: 'search_attractions' },
                                    { value: 'eventos', label: 'Buscar eventos', trigger: 'search_events' },
                                    { value: 'informacion', label: 'Información general', trigger: 'general_info' },
                                ]
                            },
                            {
                                id: 'search_attractions',
                                message: "Puedes ver atracciones cerca de ti o buscar por categorías como Restaurantes o Conciertos. ¿Qué prefieres?",
                                trigger: 'attraction_categories'
                            },
                            {
                                id: 'attraction_categories',
                                options: [
                                    { value: 'cerca', label: 'Cerca de mí', trigger: 'near_me' },
                                    { value: 'categoria', label: 'Por categoría', trigger: 'by_category' }
                                ]
                            },
                            {
                                id: 'search_events',
                                message: "Te puedo ayudar a encontrar eventos locales o actividades específicas. ¿Qué buscas exactamente?",
                                trigger: 'event_categories'
                            },
                            {
                                id: 'event_categories',
                                options: [
                                    { value: 'locales', label: 'Eventos locales', trigger: 'local_events' },
                                    { value: 'actividades', label: 'Actividades', trigger: 'activities' }
                                ]
                            },
                            {
                                id: 'general_info',
                                message: "Puedo proporcionarte información sobre transporte, alojamientos, o servicios locales. ¿Qué necesitas saber?",
                                trigger: 'info_options'
                            },
                            {
                                id: 'info_options',
                                options: [
                                    { value: 'transporte', label: 'Transporte', trigger: 'transport_info' },
                                    { value: 'alojamiento', label: 'Alojamiento', trigger: 'accommodation_info' },
                                    { value: 'servicios', label: 'Servicios', trigger: 'services_info' }
                                ]
                            },
                            {
                                id: 'near_me',
                                message: "Mostrando atracciones cercanas a tu ubicación actual...",
                                end: true
                            },
                            {
                                id: 'by_category',
                                message: "Selecciona la categoría de atracciones que deseas explorar...",
                                end: true
                            },
                            {
                                id: 'local_events',
                                message: "Aquí están los eventos locales próximos...",
                                end: true
                            },
                            {
                                id: 'activities',
                                message: "Explora las actividades disponibles...",
                                end: true
                            },
                            {
                                id: 'transport_info',
                                message: "Información sobre opciones de transporte en la zona...",
                                end: true
                            },
                            {
                                id: 'accommodation_info',
                                message: "Información sobre alojamientos disponibles...",
                                end: true
                            },
                                {
                                    id: 'services_info',
                                    message: "Detalles de servicios locales disponibles...",
                                    end: true
                                }
                            ]}
                            floating={true}
                          />
                    )}
                </div>
            </ThemeProvider>
        );
    }
}
