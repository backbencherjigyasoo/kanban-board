// WebSocket.js
class WebSocketService {
  constructor() {
    this.socket = null;
    this.messageQueue = []; // Queue for messages when the socket is not ready
    this.messageHandlers = []; // Array to store message handlers
  }

  connect(url) {
    if (this.socket) {
      console.warn('WebSocket connection already established');
      return; // Prevent creating multiple connections
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket connection opened');
      // Send any messages that were queued while waiting for connection
      this.messageQueue.forEach((message) => this.sendMessage(message));
      this.messageQueue = []; // Clear the queue
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    this.socket.onmessage = (event) => {
      // Check if the message is a Blob
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        
        reader.onload = () => {
          // Convert the Blob to string
          const textData = reader.result;
          this.messageHandlers.forEach(callback => callback(textData));
        };
        
        reader.readAsText(event.data); // Read the Blob as text
      } else {
        // If the message is not a Blob (e.g., it's already a string)
        this.messageHandlers.forEach(callback => callback(event.data));
      }
    };
  }

  onMessage(callback) {
    this.messageHandlers.push(callback);
  }

  offMessage(callback) {
    this.messageHandlers = this.messageHandlers.filter(handler => handler !== callback);
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      // If the socket is open, send the message
      this.socket.send(message);
    } else {
      // If the socket is not open yet, queue the message
      console.warn('WebSocket is not ready. Queueing message:', message);
      this.messageQueue.push(message);
    }
  }
}

export const webSocketService = new WebSocketService();
