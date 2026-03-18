const socket = io();

let username = "";
const emojis = ["😄","😎","🦄","🐱","🐼","🔥","⚡","🎧"];

function setUsername() {
  const input = document.getElementById("usernameInput");
  if (input.value.trim() !== "") {
    username = input.value;
    document.getElementById("username-section").style.display = "none";
    document.getElementById("chat-section").style.display = "block";
  }
}

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", {
      user: username,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      text: input.value
    });
    input.value = "";
  }
});

socket.on("chat message", function (msg) {
  const item = document.createElement("li");
  item.textContent = `${msg.emoji} ${msg.user}: ${msg.text}`;
  messages.appendChild(item);
});
