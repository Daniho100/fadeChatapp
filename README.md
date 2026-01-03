💬 Real-Time Chat Application

A full-stack real-time chat application built with NestJS, MongoDB, Socket.IO, and React.
Users can register, log in, send messages in real time, edit/delete their own messages, and see messages from all users instantly.

🚀 Features
✅ Authentication

User registration & login

JWT-based authentication

Session persistence using sessionStorage

Protected chat access

✅ Real-Time Messaging

Real-time message delivery using Socket.IO

Messages stored permanently in MongoDB

Fetch chat history on login

Live updates for:

new messages

edits

deletions

✅ Message Management

Users can:

send messages

edit their own messages

delete their own messages

Right-click menu for edit/delete

Message timestamps

Username displayed for each sender

✅ UI / UX

Clean chat layout

Username shown in header

Logout button

Right-click context menu

Auto message refresh

Simple responsive styling (CSS)

🧱 Tech Stack
Backend

NestJS

MongoDB + Mongoose

Socket.IO

JWT Authentication

Passport

bcrypt

Frontend

React

Socket.IO Client

Context API

CSS (custom styling)

📁 Project Structure
chat-app/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── chat/
│   │   ├── main.ts
│   │   └── app.module.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── components/
│   │   └── main.jsx
│   └── package.json
│
└── README.md

⚙️ Backend Setup
1️⃣ Install dependencies
cd backend
npm install

2️⃣ Environment variables

Create a .env file:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chat
JWT_SECRET=super_secret_key
PORT=8081

3️⃣ Run backend
npm run start:dev


Backend runs on:

http://localhost:8081

⚙️ Frontend Setup
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Start frontend
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Authentication Flow

User registers → backend stores hashed password

User logs in → JWT is returned

JWT stored in sessionStorage

Socket connects with:

auth: { token }


Backend verifies JWT on socket connection

User can send/receive messages

🔌 Socket Events
Client → Server
Event	Payload
getMessages	—
sendMessage	string
editMessage	{ id, text }
deleteMessage	messageId
Server → Client
Event	Description
getMessages	Initial message list
newMessage	New message broadcast
messageUpdated	Updated message
messageDeleted	Deleted message ID
🧠 Message Schema
{
  text: string;
  sender: ObjectId;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

🧩 Socket Authentication Logic

Token is sent during connection:

io("http://localhost:8081", {
  auth: { token }
});


Verified in backend:

this.jwtService.verify(token);


User data attached to socket:

client.data.user = { id, username };

🛡 Permissions

✔ Only message owners can edit/delete
✔ All users can view all messages
✔ Unauthorized socket connections are rejected

🎯 Future Improvements (Optional)

✅ Typing indicators

✅ Online user list

✅ Message reactions

✅ Emojis

✅ File uploads

✅ Chat rooms / channels

✅ Message pagination

✅ Read receipts

✅ Dark mode

✅ User avatars

📸 Preview (concept)
[ Global Chat                 @john  ⎋ ]

Alice:
Hey everyone 👋          12:32

You:
Hello!                  12:33

(right click → edit / delete)

🧠 Author

Built with ❤️ using NestJS + React + Socket.IO
Perfect foundation for scalable real-time apps.
