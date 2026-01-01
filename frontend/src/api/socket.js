import { io } from "socket.io-client";

export const createSocket = (token) => {
  if (!token) return null;

  return io("http://localhost:8081", {
    auth: {
      token,
    },
  });
};
