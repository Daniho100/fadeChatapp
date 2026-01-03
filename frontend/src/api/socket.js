import { io } from "socket.io-client";

export const createSocket = (token) => {
  if (!token) return null;

  return io("https://fadechatapp-backend.onrender.com", {
    auth: {
      token,
    },
  });
};
