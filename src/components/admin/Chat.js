import React, { useEffect, useRef, useState } from "react";
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
  const messageEl = useRef(null);

  useEffect(() => {
    let email = localStorage.getItem("user");
    async function getListUserChat() {
      firebase
        .firestore()
        .collection("chats")
        .where("users", "array-contains", email)
        .onSnapshot(async (snapshot) => {
          const chats = snapshot.docs.map((doc) => doc.data());
          setChat(chats);
        });
    }

    getListUserChat();
  }, []);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  function buildDockey(user) {
    return [userAdmin, user].sort().join(":");
  }

  async function selectedChat(user, index) {
    await setSelected(index);
    await setUserfriend(user);
    setActiveIndex(index);
    // messageRead(index);
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
        receiverHasRead: false,
      });
    document.getElementById("text-input").value = "";
  }

  // const messageRead = (index) => {
  //   const docKey = buildDockey(
  //     chat[index].users.filter((_usr) => _usr !== userAdmin)[0]
  //   );
  //   if (clickedChatWhereNotSender(index)) {
  //     firebase.firestore().collection("chats").doc(docKey).update({
  //       receiverHasRead: true,
  //     });
  //   } else {
  //     console.log("clicked message where not sender");
  //   }
  // };

  // const clickedChatWhereNotSender = (chatIndex) =>
  //   chat[chatIndex].messages[chat[chatIndex].messages.length - 1].sender !==
  //   userAdmin;

  // const userIsSender = (chat) =>
  //   chat.messages[chat.messages.length - 1].sender === userFriend;

  if (chat) {
    let tempUser = chat.map((info) => {
      return info.users.filter((_usr) => {
        return _usr !== userAdmin;
      })[0];
    });

    viewChat = chat.map((info, index1) =>
      info.messages.map((msg, index2) =>
        index1 === selected ? (
          <div key={index2}>
            {msg.sender === userAdmin ? (
              <div className="user-admin">{msg.message}</div>
            ) : (
              <div className="user-friend">{msg.message}</div>
            )}
          </div>
        ) : (
          ""
        )
      )
    );

    chat.forEach((_chat) => {
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
            {/* {_chat.receiverHasRead === false ? null : (
              null
            )} */}
          </div>
        );
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
              <div className="chat-scrollview" ref={messageEl}>
                <div className="view-chat">{viewChat}</div>
              </div>
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
