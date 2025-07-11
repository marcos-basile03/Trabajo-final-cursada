// src/components/ChatWindow.jsx
import React, { useEffect, useRef } from 'react'; // Mantén estos si quieres el scroll
import { useParams, useNavigate } from 'react-router-dom';
import { playersData } from '../data/playersData'; // **VERIFICAR ESTA RUTA**
import Message from './Message'; // **VERIFICAR ESTA RUTA**
import MessageInput from './MessageInput'; // **VERIFICAR ESTA RUTA**
import '../styles/ChatWindow.css'; // **VERIFICAR ESTA RUTA**

// Datos de mensajes ficticios (COPIA Y PEGA ESTO COMPLETO AQUÍ)
const dummyMessages = {
  'lionel_messi': [
    { id: 1, text: '¡Hola Leo! ¿Todo bien para la práctica de mañana?', sender: 'other', time: '10:00' },
    { id: 2, text: '¡Hola! Sí, todo listo. Con muchas ganas.', sender: 'me', time: '10:05' },
    { id: 3, text: 'Genial. Tenemos que afinar la puntería.', sender: 'other', time: '10:10' },
    { id: 4, text: 'Siempre! La Pulga no falla.', sender: 'me', time: '10:15' },
    { id: 5, text: 'Jajaja, seguro. Nos vemos en el próximo partido.', sender: 'other', time: '10:30' },
  ],
  'cristiano_ronaldo': [
    { id: 1, text: 'Siuuuu! 💪', sender: 'other', time: 'Ayer' },
    { id: 2, text: 'Dale, a seguir sumando!', sender: 'me', time: 'Ayer' },
    { id: 3, text: '¿Entrenamos más tarde, Cris?', sender: 'me', time: '14:30' },
    { id: 4, text: 'Hoy no puedo, mañana sin falta!', sender: 'other', time: '14:35' },
  ],
  'kylian_mbappe': [
    { id: 1, text: 'A seguir sumando!', sender: 'other', time: 'Lunes' },
    { id: 2, text: 'Listo para el partido del fin de semana, Kylian?', sender: 'me', time: '10:00' },
    { id: 3, text: '¡Claro! Con todo para ganar.', sender: 'other', time: '10:05' },
  ],
  'diego_maradona': [
    { id: 1, text: 'La mano de Dios presente siempre.', sender: 'other', time: '10:00' },
    { id: 2, text: 'Grande, Diego! Siempre en el corazón de la gente.', sender: 'me', time: '10:05' },
  ],
  'pele': [
    { id: 1, text: 'Obrigado!', sender: 'other', time: '30/06/2025' },
    { id: 2, text: 'Un honor chatear con una leyenda.', sender: 'me', time: '30/06/2025' },
  ],
  'don_ramon': [
    { id: 1, text: '¿Encima que me ofreces ayuda?!', sender: 'other', time: '14:19' },
    { id: 2, text: 'Ocupado en descansar... ¿eso cuenta?', sender: 'me', time: '15:01' },
    { id: 3, text: 'Si es dinero, yo no tengo. 💸', sender: 'other', time: '15:03' },
    { id: 4, text: 'No, era para jugar al fútbol. ⚽', sender: 'me', time: '15:08' },
    { id: 5, text: '¿Nos presta una peluca? 💇‍♂️', sender: 'other', time: '15:09' },
    { id: 6, text: 'Le prometo que no. 😅', sender: 'me', time: '15:10' },
    { id: 7, text: '¡Ah! Entonces sí, ¿Qué necesitas?', sender: 'other', time: '15:11' },
    { id: 8, text: 'Fiesta que no rompas una ventana! 🚪', sender: 'me', time: '15:12' },
    { id: 9, text: 'Prometer no cuesta nada...', sender: 'other', time: '15:13' },
    { id: 10, text: '¡Callate! Que ya viene el Señor Barriga. 😩', sender: 'me', time: '15:14' },
    { id: 11, text: '¿Otra vez? ¡Siempre! 😂', sender: 'other', time: '15:15' },
    { id: 12, text: 'Bueno, traeme una soda y media torta de jamón. 😋', sender: 'me', time: '15:16' },
    { id: 13, text: '¿Y cómo anda con el alquiler? 🏠', sender: 'other', time: '15:17' },
    { id: 14, text: '¿Otra vez arrasado? 😅', sender: 'me', time: '15:18' },
    { id: 15, text: 'Le puedo ayudar con algo si quiere. 👍', sender: 'other', time: '15:19' },
    { id: 16, text: '¿Me da plata? 💰', sender: 'me', time: '15:20' },
    { id: 17, text: '¿Encima que me ofreces ayuda?!', sender: 'other', time: '15:21' },
  ],
  'chavo_del_8': [
    { id: 1, text: 'Eso, eso, eso!', sender: 'other', time: '15:19' },
    { id: 2, text: '¿No quieres jugar a la pelota, Chavo?', sender: 'me', time: '15:20' },
    { id: 3, text: '¡Sí, sí, sí! ¡Pero con mi pelota!', sender: 'other', time: '15:21' },
  ],
  'chilindrina': [
    { id: 1, text: '¡Correle antes que despierte mi papá!', sender: 'other', time: '17:19' },
    { id: 2, text: 'Jajaja, no te preocupes Chilindrina.', sender: 'me', time: '17:20' },
  ],
  'dona_florinda': [
    { id: 1, text: '¡Vaya ya, y no se entretenga!', sender: 'other', time: '17:19' },
    { id: 2, text: 'Con permiso, Doña Florinda.', sender: 'me', time: '17:20' },
  ],
  'godinez': [
    { id: 1, text: '¿Y para qué? Si así estoy cómodo.', sender: 'other', time: '17:19' },
    { id: 2, text: 'Deberías estudiar más, Godínez.', sender: 'me', time: '17:20' },
  ],
  'quico': [
    { id: 1, text: 'Sí, pero primero inflá mi pelota!', sender: 'other', time: '17:19' },
    { id: 2, text: 'Jajaja, está bien Quico, la inflamos.', sender: 'me', time: '17:20' },
  ],
  'senor_barriga': [
    { id: 1, text: 'Gracias... y cuidado con los barriles.', sender: 'other', time: '17:19' },
    { id: 2, text: 'No se preocupe, Señor Barriga.', sender: 'me', time: '17:20' },
  ],
  'profesor_jirafales': [
    { id: 1, text: 'Hasta mañana, jovencito. ¡Y estudie!', sender: 'other', time: '17:19' },
    { id: 2, text: 'Maestro Longaniza!', sender: 'me', time: '17:20' },
    { id: 3, text: '¡Ta ta ta ta TÁ!', sender: 'other', time: '17:21' },
  ],
};

function ChatWindow() {
  const { playerId } = useParams();
  const navigate = useNavigate();


  const player = playersData.find(p => p.id === playerId);
  const currentMessages = dummyMessages[playerId] || []; 

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleGoBack = () => {
    navigate('/');
  };

  if (!player) {
    return (
      <div className="chat-window-container no-chat-selected">
        <p>Jugador no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="chat-window-container">
      <div className="chat-header">
        <button onClick={handleGoBack} className="back-button">
          &#8592;
        </button>
        <img src={player.avatar} alt={player.name} className="chat-header-avatar" />
        <h3>{player.name}</h3>
      </div>
      <div className="messages-container">
        {currentMessages.map(msg => (
          <Message key={msg.id} text={msg.text} sender={msg.sender} time={msg.time} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    
      <MessageInput />
    </div>
  );
}

export default ChatWindow;