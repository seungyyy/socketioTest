"use strict"

const socket = io();
const nickName = document.getElementById("nickname");
const chatList = document.querySelector(".chat-list");
const chatInput = document.querySelector('.chat-input');
const button = document.querySelector('.send-button');
const displayContainer = document.querySelector('.display-container');

button.addEventListener('click', handleClickButton);
chatInput.addEventListener('keypress', (event) => { 
  if (event.keyCode === 13) { 
    handleClickButton();
  }
} )

function handleClickButton() {
  const param = {
    name: nickName.value,
    msg: chatInput.value,
  };
  socket.emit('chatting', param);
}

socket.on("chatting", (data) => {
  const { name, msg, time } = data
  const item = new LiModal(name, msg, time);
  item.makeLi();
  displayContainer.scrollTo(0, displayContainer.scrollHeight);
})

function LiModal(name, msg, time) { 
  this.name = name;
  this.msg = msg;
  this.time = time;

  this.makeLi = () => { 
    const li = document.createElement('li');
    li.classList.add(nickName.value === this.name ? 'sent' : 'resived');
    const dom = `  
      <div class="profile">
        <span>${this.name}</span>
        <img src="https://placeimg.com/50/50/any" alt="any">
      </div>
      <span class="message">${this.msg}</span>
      <span class="time">${this.time}</span>`;
    
    li.innerHTML = dom;
    chatList.appendChild(li);
  }
}