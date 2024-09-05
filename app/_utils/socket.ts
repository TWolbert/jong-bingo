export function createSocket() {
  const ws = new WebSocket(
    "https://5e4e-2a02-a469-4503-1-208c-1f5-7cb5-ac08.ngrok-free.app/"
  );

  ws.onmessage = function (event) {
    console.log(event.data);
  }
}
