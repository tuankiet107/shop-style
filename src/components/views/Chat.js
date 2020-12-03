import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase";

function Chat() {
  const [message, setMessage] = useState();
  const [chat, setChat] = useState();
  const welcome = "Xin chào, bạn cần tư vấn gì ?";
  let result;
  const messageEl = useRef(null);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  useEffect(() => {
    async function getDataFromFB() {
      let user = localStorage.getItem("user");
      if (user === null) {
        user = sessionStorage.getItem("user");
      }
      const docKey = buildDockey(user);
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .onSnapshot(async (doc) => {
          setChat(doc.data());
        });
    }

    getDataFromFB();
  }, []);

  function buildDockey(user) {
    return ["nhanvien2@gmail.com", user].sort().join(":");
  }

  function handleSubmit(e) {
    e.preventDefault();
    let user = localStorage.getItem("user");
    if (user === null) {
      user = sessionStorage.getItem("user");
    }
    let docKey = buildDockey(user);

    if (message) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            message: message,
            sender: user,
            timestamp: Date.now(),
          }),
          receiverHasRead: false,
          users: ["nhanvien2@gmail.com", user],
        });
      setMessage("");
    } else {
      alert("Bạn chưa nhập tin nhắn.");
    }
  }

  function onShowListChat() {
    const listChat = document.querySelector(".list-chat");
    const wrapperChat = document.querySelector(".wrapper-chat");
    wrapperChat.classList.toggle("show-wrapper");
    listChat.classList.toggle("show-chat");
    document.querySelector(".hello").style.display = "none";

    let id = "user";
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    if (localStorage.getItem("user")) {
      return;
    } else if (sessionStorage.getItem("user")) {
      return;
    } else {
      sessionStorage.setItem("user", id);
    }
  }

  function onStartChatUser() {
    var user = localStorage.getItem("user");
    if (user === null) {
      user = sessionStorage.getItem("user");
    }
    const docKey = buildDockey(user);
    if (chat) {
      document.querySelector(".form-chat").style.display = "flex";
      document.querySelector(".btn-to-chat").style.display = "none";
    } else {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .set({
          messages: [],
          users: ["nhanvien2@gmail.com", user],
        });
    }
    document.querySelector(".form-chat").style.display = "flex !important";
    document.querySelector(".btn-to-chat").style.display = "none";
  }

  let userCurrent = localStorage.getItem("user");
  if (userCurrent === null) {
    userCurrent = sessionStorage.getItem("user");
  }

  if (chat) {
    result = chat.messages.map((msg, index) => {
      return (
        <div key={index}>
          {msg.sender === userCurrent ? (
            <div className="user-current">{msg.message}</div>
          ) : (
            <div className="user-friend">{msg.message}</div>
          )}
        </div>
      );
    });
  }

  return (
    <div className="chat-box">
      <div className="wrapper-chat">
        <div className="header-chat">
          <h4>KStore</h4>
          <div className="close-chat" onClick={onShowListChat}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="list-chat">
          {localStorage.getItem("user") ? (
            <button className="btn-to-chat" onClick={onStartChatUser}>
              Tiếp tục với vai trò {localStorage.getItem("user").split("@")[0]}
            </button>
          ) : (
            <button className="btn-to-chat" onClick={onStartChatUser}>
              Tiếp tục với vai trò khách
            </button>
          )}

          <div className="view-chat" id="view-list-chat" ref={messageEl}>
            {result}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-chat">
          <input
            id="input-val"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="icon-send" onClick={handleSubmit}>
            <button className="btn btn-send">Gửi</button>
          </div>
        </form>
      </div>

      <div className="mini-chat-icon" onClick={onShowListChat}>
        <div className="icon-message">
          <i className="fab fa-facebook-messenger"></i>
        </div>

        <span className="hello">{welcome}</span>
      </div>
    </div>
  );
}

export default Chat;
