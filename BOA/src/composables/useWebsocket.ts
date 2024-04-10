import { ref, onBeforeUnmount, toValue } from "vue";
import { Distance } from "@/services/Sensor/types";

export function useWebSocket(URL: URL) {
  const websocketUrl = toValue(URL);
  const websocket = ref<WebSocket | null>(null);
  //FIXME: change to queue --> object size grows with each new entry
  const messages = ref<Distance[]>([]);
  const lastMessage = ref<Distance>();
  const errors = ref<string | null>(null);

  const connectWebSocket = () => {
    try {
      console.log("trying to connect");
      websocket.value = new WebSocket(websocketUrl);

      websocket.value.addEventListener("open", (event) => {
        console.log("WebSocket is now open");
      });

      websocket.value.addEventListener("message", (event) => {
        const data: Distance = JSON.parse(event.data);
        messages.value.push(data);
        lastMessage.value = data;
      });

      websocket.value.addEventListener("error", (event) => {
        errors.value = "Error in WebSocket";
        console.error("WebSocket error:", event);
        closeWebSocket();
      });
    } catch (error) {
      errors.value = "Error connecting to WebSocket";
      console.error("Error connecting to WebSocket:", error);
      closeWebSocket();
    }
  };

  const sendMessage = (message: string) => {
    if (websocket.value && websocket.value.readyState === WebSocket.OPEN) {
      websocket.value.send(message);
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  const closeWebSocket = () => {
    if (websocket.value) {
      websocket.value.close();
    }
  };

  onBeforeUnmount(() => {
    closeWebSocket();
  });

  return {
    connectWebSocket,
    sendMessage,
    closeWebSocket,
    messages,
    lastMessage,
    errors,
  };
}
