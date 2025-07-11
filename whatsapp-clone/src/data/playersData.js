// src/data/playersData.js

export const playersData = [
  {
    id: 'messi',
    name: 'Lionel Messi',
    avatar: 'https://via.placeholder.com/50/f0f0f0/808080?text=LM', // URL de una imagen de Messi
    lastMessage: 'Nos vemos en el próximo partido.',
    lastMessageTime: '18:30',
    messages: [
      { id: 1, sender: 'other', text: '¡Hola Leo! ¿Todo bien para la práctica de mañana?', time: '10:00' },
      { id: 2, sender: 'me', text: 'Hola! Sí, todo listo. Con muchas ganas.', time: '10:05' },
      { id: 3, sender: 'other', text: 'Genial. Tenemos que afinar la puntería.', time: '10:10' },
      { id: 4, sender: 'me', text: 'Siempre! La Pulga no falla.', time: '10:15' },
      { id: 5, sender: 'other', text: 'Jajaja, seguro. Nos vemos en el próximo partido.', time: '18:30' },
    ],
  },
  {
    id: 'cristiano',
    name: 'Cristiano Ronaldo',
    avatar: 'https://via.placeholder.com/50/f0f0f0/808080?text=CR', // URL de una imagen de CR7
    lastMessage: 'Siuuuu! 💪',
    lastMessageTime: 'Ayer',
    messages: [
      { id: 1, sender: 'other', text: '¡Grande Cris! Otro golazo.', time: '14:00' },
      { id: 2, sender: 'me', text: 'Gracias! Trabajo duro siempre da sus frutos.', time: '14:05' },
      { id: 3, sender: 'other', text: 'Sos el mejor, GOAT!', time: '14:10' },
      { id: 4, sender: 'me', text: 'Siuuuu! 💪', time: 'Ayer' },
    ],
  },
  {
    id: 'mbappe',
    name: 'Kylian Mbappé',
    avatar: 'https://via.placeholder.com/50/f0f0f0/808080?text=KM', // URL de una imagen de Mbappé
    lastMessage: 'A seguir sumando!',
    lastMessageTime: 'Lunes',
    messages: [
      { id: 1, sender: 'other', text: 'Kylian, ¿listo para el próximo desafío?', time: '09:00' },
      { id: 2, sender: 'me', text: 'Siempre listo! Con muchas expectativas.', time: '09:05' },
      { id: 3, sender: 'other', text: 'Esa es la actitud. A seguir sumando!', time: 'Lunes' },
    ],
  },
  {
    id: 'maradona',
    name: 'Diego Maradona',
    avatar: 'https://via.placeholder.com/50/f0f0f0/808080?text=DM', // URL de una imagen de Maradona
    lastMessage: 'La mano de Dios presente siempre.',
    lastMessageTime: '01/07/2025',
    messages: [
        { id: 1, sender: 'other', text: '¡Diego, qué grande fuiste!', time: '11:00' },
        { id: 2, sender: 'me', text: 'Gracias, che! El fútbol es mi vida.', time: '11:05' },
        { id: 3, sender: 'other', text: 'Un genio inigualable.', time: '11:10' },
        { id: 4, sender: 'me', text: 'La mano de Dios presente siempre.', time: '01/07/2025' },
    ],
  },
  {
    id: 'pele',
    name: 'Pelé',
    avatar: 'https://via.placeholder.com/50/f0f0f0/808080?text=PE', // URL de una imagen de Pelé
    lastMessage: 'Obrigado!',
    lastMessageTime: '30/06/2025',
    messages: [
        { id: 1, sender: 'other', text: 'Rey Pelé, ¿cómo estás?', time: '15:00' },
        { id: 2, sender: 'me', text: 'Muy bien, gracias a Dios. Disfrutando del fútbol.', time: '15:05' },
        { id: 3, sender: 'other', text: 'Un placer hablar con la leyenda.', time: '15:10' },
        { id: 4, sender: 'me', text: 'Obrigado!', time: '30/06/2025' },
    ],
  },
];