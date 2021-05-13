const base_url = 'http://192.168.1.4:40567';
export const Socket = () => {
  return new WebSocket(base_url);
};

export default Socket;
