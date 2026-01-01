// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { createSocket } from "../api/socket";

// export default function ChatRoom() {
//   const { user, token } = useContext(AuthContext);
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [editingId, setEditingId] = useState(null);


// useEffect(() => {
//     if (!token) return;

//     const s = createSocket(token);
//     if (!s) return;

//     setSocket(s);

//     s.on("connect", () => {
//       console.log("connected to socket");
//       s.emit("getMessages");
//     });

//     s.on("newMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     s.on("messageUpdated", (updated) => {
//       setMessages((prev) =>
//         prev.map((m) => (m._id === updated._id ? updated : m))
//       );
//     });

//     s.on("messageDeleted", (id) => {
//       setMessages((prev) => prev.filter((m) => m._id !== id));
//     });

//     s.on("getMessages", (msgs) => {
//       setMessages(msgs);
//     });

//     return () => {
//       s.disconnect();
//     };
//   }, [token]);


//   const send = () => {
//     if (!text.trim()) return;

//     if (editingId) {
//       socket.emit("editMessage", { id: editingId, text });
//       setEditingId(null);
//     } else {
//       socket.emit("sendMessage", text);
//     }

//     setText("");
//   };

//   return (
//     <div className="chat-page">
//       <div className="chat-header">Global Chat</div>

//       <div className="chat-messages">
//         {messages.map((msg) => (
//           <div
//             key={msg._id}
//             className={`message ${
//               msg.sender === user.id ? "me" : "other"
//             }`}
//           >
//             <div>{msg.text}</div>

//             {msg.sender === user.id && (
//               <div style={{ marginTop: 4, fontSize: 12 }}>
//                 <button onClick={() => {
//                   setEditingId(msg._id);
//                   setText(msg.text);
//                 }}>
//                   ✏ Edit
//                 </button>

//                 <button
//                   style={{ marginLeft: 8 }}
//                   onClick={() => socket.emit("deleteMessage", msg._id)}
//                 >
//                   🗑 Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           value={text}
//           placeholder="Type a message..."
//           onChange={(e) => setText(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && send()}
//         />
//         <button onClick={send}>
//           {editingId ? "Update" : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }




























import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { createSocket } from "../api/socket";

export default function ChatRoom() {
  const { user, token, logout } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [menuMessageId, setMenuMessageId] = useState(null);

  useEffect(() => {
    if (!token) return;

    const s = createSocket(token);
    if (!s) return;

    setSocket(s);

    s.on("connect", () => {
      s.emit("getMessages");
    });

    s.on("getMessages", setMessages);

    s.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    s.on("messageUpdated", (updated) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m))
      );
    });

    s.on("messageDeleted", (id) => {
      setMessages((prev) => prev.filter((m) => m._id !== id));
    });

    return () => s.disconnect();
  }, [token]);

  const send = () => {
    if (!text.trim()) return;

    if (editingId) {
      socket.emit("editMessage", { id: editingId, text });
      setEditingId(null);
    } else {
      socket.emit("sendMessage", text);
    }

    setText("");
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="chat-page" onClick={() => setMenuMessageId(null)}>
      {/* HEADER */}
      <div className="chat-header">
        <span className="chat-title">Fade Global Chat</span>

        <div className="chat-user">
          <span className="username">@{user.username}</span>
          <button className="logout-btn" onClick={logout}>⎋</button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="chat-messages">
        {messages.map((msg) => {
          const isMine = msg.sender === user.id;

          return (
            <div
              key={msg._id}
              className={`message ${isMine ? "me" : "other"}`}
              onContextMenu={(e) => {
                if (!isMine) return;
                e.preventDefault();
                setMenuMessageId(msg._id);
              }}
            >

              {msg.sender !== user.id && (
                <div className="message-username">
                  {msg.username}
                </div>
              )}

              <div className="message-text">{msg.text}</div>

              <div className="message-meta">
                <span className="time">
                  {formatTime(msg.createdAt)}
                </span>
              </div>

              {menuMessageId === msg._id && isMine && (
                <div className="message-menu">
                  <button
                    onClick={() => {
                      setEditingId(msg._id);
                      setText(msg.text);
                      setMenuMessageId(null);
                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => {
                      socket.emit("deleteMessage", msg._id);
                      setMenuMessageId(null);
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="chat-input">
        <input
          value={text}
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={send}>
          {editingId ? "Update" : "Send"}
        </button>
      </div>
    </div>
  );
}
