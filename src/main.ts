import './style.css'
import { connectToServer } from './socket-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websocket client</h1>

    <input id="jwt-input" placeholder="Json web token" />

    <br>

    <button id="connect-btn">Connect</button>

    <br>

    <span id="server-status">offline</span>

    <ul id="clients-ul">
    </ul>

    <form id="message-form">
      <input placeholder="Enter a message" id="message-input" />
    </form>

    <h3>Messages</h3>

    <ul id="messages-ul">
    </ul>

  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const jwtInput = document.querySelector<HTMLInputElement>('#jwt-input')!;
const connectBtn = document.querySelector('#connect-btn')!;

connectBtn.addEventListener('click', () => {
  if(!jwtInput.value.trim().length) {
    alert('Enter a valid jwt')
    return;
  }

  connectToServer(jwtInput.value.trim());
})