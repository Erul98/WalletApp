import API from './API.service';
export const Socket = () => {
  return new WebSocket(API.URL.base_socket_url);
};

export default Socket;
