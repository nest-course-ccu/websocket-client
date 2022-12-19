import { Manager, Socket } from "socket.io-client"

let socket:Socket;

export const connectToServer = (token: string) => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
    extraHeaders: {
      authentication: token
    }
  });

  socket?.removeAllListeners();

  socket = manager.socket('/');

  addListerners();
}

const addListerners = () => {
  const serverStatusLabel = document.querySelector('#server-status')!;
  const clientsUl = document.querySelector('#clients-ul')!;

  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

  const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

  socket.on('connect', () => {
    //console.log('Connected')
    serverStatusLabel.innerHTML = 'Connected';
  })

  socket.on('disconnect', () => {
    //console.log('Disconnected')
    serverStatusLabel.innerHTML = 'Disconnected'
  })

  socket.on('clients-updated', (clients: string[]) => {
    console.log(clients)
    let clientsHtml = '';
    clients.forEach(clientId => {
      clientsHtml += `
      <li>${clientId}</li>
      `;
    });

    clientsUl.innerHTML = clientsHtml;
  })

  messageForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if(!messageInput.value.trim().length) {
      return;
    }
    console.log({ id: 'Me', message: messageInput.value })
    socket.emit('message-from-client', { 
      id: 'Me', 
      message: messageInput.value 
    });

    messageInput.value = ''
  })

  socket.on('messages-from-server', (payload: { fullName: string, message: string }) => {
    const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <strong>${payload.message}</strong>
      </li>
    `;
    const li = document.createElement('li');
    li.innerHTML = newMessage;
    messagesUl.append(li);

    console.log(payload);
  })
}