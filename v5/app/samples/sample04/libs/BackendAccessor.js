const API_ENDPOINT = 'http://localhost:3000';

import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json',
})

export const createChatSession = async () => {
  const res = await axios.get('/chat/session');
  
  return res.data;
};

export const sendChatMessage = async (sessionId, message) => {
  const res = await axios.post(
    '/chat/message',
    {
      sessionId: sessionId,
      message: message,
    }
  );

  return res.data;
};

export const deleteChatSession = async (sessionId) => {
  const res = await axios.delete(`/chat/session/${sessionId}`);
  
  return res.data;
};
