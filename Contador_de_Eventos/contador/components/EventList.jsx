// EventList.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate

// css
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Inicialize o hook useNavigate

  useEffect(() => {
    // Recuperar eventos do localStorage quando o componente é montado
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  return (
    <div className='list'>
      <h2>Lista de Eventos</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.title} - {event.date}
          </li>
        ))}
      </ul>
      <div className='button_back'>
        {/* botão para voltar na tela inicial usando o navigate */}
        <button onClick={() => navigate('/')}>Voltar</button>
      </div>
    </div>
  );
};

export default EventList;
