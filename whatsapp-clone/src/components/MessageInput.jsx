// src/components/MessageInput.jsx
import React, { useState } from 'react'; // Importamos useState
import '../styles/MessageInput.css';

function MessageInput({ onSendMessage }) { // Recibe onSendMessage como prop
  const [messageText, setMessageText] = useState(''); // Estado para el texto del input

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    if (messageText.trim()) { // Asegura que el mensaje no esté vacío
      onSendMessage(messageText); // Llama a la función pasada por prop
      setMessageText(''); // Limpia el input después de enviar
    }
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}> {/* Usamos un form */}
      <input
        type="text"
        placeholder="Escribe un mensaje..."
        className="message-input"
        value={messageText} // El valor del input está controlado por el estado
        onChange={(e) => setMessageText(e.target.value)} // Actualiza el estado al escribir
      />
      <button type="submit" className="send-button">
        {/* Puedes poner un ícono de enviar aquí, por ejemplo con Font Awesome */}
        ➡️ {/* Un simple emoji por ahora para el botón de enviar */}
      </button>
    </form>
  );
}

export default MessageInput;