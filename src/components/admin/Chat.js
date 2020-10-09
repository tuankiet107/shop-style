import React, { useEffect, useState } from "react";
import firebase from "firebase";
import MenuLeft from "./MenuLeft";
import { Col, Form, Row } from "react-bootstrap";

function Chat() {
  const [message, setMessage] = useState();
  const [chat, setChat] = useState();
  const [userFriend, setUserfriend] = useState();
  const [selected, setSelected] = useState();
  const [active, setActiveIndex] = useState(0);

  let listUser, viewChat;
  let userAdmin = localStorage.getItem("user");

  useEffect(() => {
    let email = localStorage.getItem("user");
    window.onload = function () {
      var objDiv = document.getElementsByClassName("view-chat");
      objDiv.scrollTop = objDiv.scrollHeight;
    };
    async function getListUserChat() {
      firebase
        .firestore()
        .collection("chats")
        .where("users", "array-contains", email)
        .onSnapshot(async (snapshot) => {
          const chats = await snapshot.docs.map((doc) => doc.data());
          setChat(chats);
        });
    }

    getListUserChat();
  }, []);

  function buildDockey(user) {
    return ["admin@gmail.com", user].sort().join(":");
  }

  function selectedChat(user, index) {
    setSelected(index);
    setUserfriend(user);
    setActiveIndex(index);
  }

  function sendMessage(e) {
    e.preventDefault();
    const docKey = buildDockey(userFriend);

    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          message: message,
          sender: userAdmin,
          timestamp: Date.now(),
        }),
      });

    document.getElementById("text-input").value = "";
  }

  if (chat) {
    let tempUser = chat.map((info) => {
      return info.users.filter((_usr) => {
        return _usr !== userAdmin;
      })[0];
    });
    listUser = tempUser.map((user, index) => {
      return (
        <div
          key={index}
          className={
            active === index ? "view-user active-selected" : "view-user"
          }
          onClick={() => selectedChat(user, index)}
        >
          {user}
        </div>
      );
    });

    viewChat = chat.map((info, index1) => {
      return info.messages.map((msg, index2) => {
        if (index1 === selected) {
          return (
            <div key={index2}>
              {msg.sender === userAdmin ? (
                <div className="user-admin">{msg.message}</div>
              ) : (
                <div className="user-friend">{msg.message}</div>
              )}
            </div>
          );
        }
      });
    });
  }

  return (
    <Row>
      <MenuLeft />

      <Col xl={12} lg={12} md={12} sm={12}>
        <div className="admin-chat-page">
          <Row>
            <Col xl={3} lg={3} md={3} sm={3} className="col-left">
              <div className="list-user">{listUser}</div>
            </Col>
            <Col xl={9} lg={9} md={9} sm={9} className="col-right">
              <div className="view-chat">{viewChat}</div>
            </Col>
            <div className="send-message">
              <form onSubmit={sendMessage}>
                <Form.Control
                  id="text-input"
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn" onClick={sendMessage}>
                  Gửi
                </button>
              </form>
            </div>
          </Row>
        </div>
      </Col>
    </Row>
  );
}

export default Chat;
