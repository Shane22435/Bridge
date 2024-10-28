import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function useSocket(url: string) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket = io(url, {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      setConnected(true);
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Socket disconnected");
    });

    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [url]);

  const sendMessage = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return { socket, connected, messages, sendMessage };
}
