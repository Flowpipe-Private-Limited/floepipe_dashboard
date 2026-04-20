import { io } from "socket.io-client";

let socket = null;
const SOCKET_URL = import.meta.env.REACT_APP_SOCKET_URL;

// export const connectSocket = (paymentOrderId, onPaymentUpdate) => {
//   if (!socket) {
//     socket = io(BACKEND_URL, {
//       transports: ["websocket"],
//       reconnection: true,
//     });

//     socket.on("connect", () => {
//       console.log("Connected:", socket.id);

//       if (paymentOrderId) {
//         socket.emit("join_order_room", paymentOrderId);
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected");
//     });
//   }

//   // remove old listener before adding new one
//   socket.off("payment_update");

//   socket.on("payment_update", (data) => {
//     console.log("Payment Update:", data);

//     if (onPaymentUpdate) {
//       onPaymentUpdate(data);
//     }

//     const status = data?.paymentStatus?.toLowerCase();

//     if (status === "success" || status === "failed") {
//       disconnectSocket();
//     }
//   });

//   return socket;
// };

// export const connectSocket = (paymentOrderId, onPaymentUpdate) => {
//   console.log("paymentOrderId =====>>", paymentOrderId);
//   if (!socket) {
//     socket = io(SOCKET_URL, {
//       transports: ["websocket"],
//       reconnection: true,
//     });

//     socket.on("connect", () => {
//       console.log("✅ Connected:", socket.id);

//       socket.emit("join_order_room", paymentOrderId);
//     });

//     socket.on("connect_error", (err) => {
//       console.log("❌ Connect Error:", err.message);
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected");
//     });
//   }

//   socket.off("payment_update");

//   socket.on("payment_update", (data) => {
//     if (onPaymentUpdate) onPaymentUpdate(data);
//   });

//   return socket;
// };

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.removeAllListeners();
//     socket.disconnect();
//     socket = null;
//   }
// };

let currentRoom = null;

export const connectSocket = (paymentOrderId, onPaymentUpdate) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  }

  // leave previous room
  if (currentRoom) {
    socket.emit("leave_order_room", currentRoom);
  }

  // join new room
  if (paymentOrderId) {
    socket.emit("join_order_room", paymentOrderId);
    currentRoom = paymentOrderId;
  }

  // prevent duplicate listeners
  socket.off("payment_update");

  socket.on("payment_update", (data) => {
    if (onPaymentUpdate) onPaymentUpdate(data);

    const status = data?.paymentStatus?.toLowerCase();

    if (status === "success" || status === "failed") {
      disconnectSocket();
    }
  });

  return socket;
};

export const disconnectSocket = () => {
  if (!socket) return;

  socket.off("payment_update");
  socket.disconnect();
  socket = null;
  currentRoom = null;
};
