import { useEffect, useState, useRef, useContext } from "react";
import "./taskmessenger.css";
import send from "../../assets/send.png";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import MessageText from "../../components/message/messageText";
import MessageImage from "../../components/message/messageImage";
import InfoUser from "../../components/infoUser/infoUser";
import { getGroupByUser, getGroup } from "../../api/apiGroup";
import { getTaskByUser } from "../../api/apiTask";
import { getTaskMess, createTaskMessages } from "../../api/apiMessages";
import { getUserByUsername } from "../../api/apiUser";

import { uploadImage } from "../../ultis/uploadFile";
import { NotifiContext } from "../../context/notifiContext";
import { UserContext } from "../../context/userContext";

const Taskmess = () => {
  const MAX_SIZE = useRef(2097000); // 2mb
  const { user, socket } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [oppositeUser, setOppositeUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [image, setImage] = useState();
  const [base64image, setBase64image] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  const { setNotifi } = useContext(NotifiContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const inputFile = useRef(null);

  const openChatIfNull = async (users) => {

    const found = await getGroup(user.id, users.senderId);
    setCurrentChat(found.data)
    console.log("ok", found.data)
    handleCurrentChat(found.data)
    console.log("ok2", currentChat)
  };

  useEffect(() => {
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        messages: data.text,
        type: data.type,
        createAt: Date.now(),
      });
      console.log("ok021")
    });
    socket.on("getDeleteMessage", () => {
      setLoadData((loadData) => ++loadData);
    });
  }, []);
  //?????
  useEffect(() => {
    arrivalMessage &&
      (arrivalMessage.sender === currentChat?.leaderid ||
        arrivalMessage.sender === currentChat.memid) &&
      setMessages((messages) => [...messages, arrivalMessage]);

  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", { id: user?.id, avatar: user?.avatar });
  }, []);


  const fetchOnlineUser = async (users) => {
    const newUser = [];
    users.map(async (u) => {
      const found = await getGroup(user.id, u.id);
      if (found.data) {
        newUser.push(u);
        setOnlineUsers(newUser);
      }
    });
  };

  useEffect(() => {
    socket.on("getUsers", (users) => {
      fetchOnlineUser(users);
    });
  }, []);

  useEffect(() => {
    socket.on("getConversations", async (users) => {
      const res = await getTaskByUser(user?.id);
      if (res.statusCode === "200") {
        setConversations(res.data || []);
        console.log("heheok", res)
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTaskByUser(user?.id);
      if (res.statusCode === "200") {
        if (textSearch === "") {
          setConversations(res.data || []);
          return;
        }
        console.log("searchhhh",res)

        const searchConversation = [];
        res.data.map((c) => {
          const check = c.taskname
          if (check.includes(textSearch) === true) {
            
            searchConversation.push(c);
        console.log("search",searchConversation)

          }
        });
        setConversations(searchConversation);
      }
    };
    fetchData();
  }, [user?.id, textSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTaskMess(currentChat.id);
      if (res.statusCode === "200") {
        setMessages(res.data);
      }
    };
    fetchData();
  }, [currentChat, loadData]);

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setBase64image(event.target.result.toString());
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sendMessage = newMessage;
    if (sendMessage === "" && !image) {
      return;
    }
    const receiverId =
      currentChat.leaderid === user.id ? currentChat.memid : currentChat.leaderid;
    let type = "text";
    if (image) {
      if (image.size > MAX_SIZE.current) {
        setNotifi(["Ảnh phải nhỏ hơn 2 mb"]);
        return;
      }
      setLoading(true);
      type = "image";
      sendMessage = await uploadImage(image);
    }

    socket.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: sendMessage,
      type: type,
    });

    try {
      const res = await createTaskMessages(
        currentChat.id,
        sendMessage,
        user.id,
        type
      );
      if (res.statusCode === "200") {
        setMessages([...messages, res.data]);

      }
      setNewMessage("");
      setImage(null);
      setBase64image("");
      setLoading(false);
    } catch (error) {
    }
  };

  const handleCurrentChat = (c) => {

    const fetchUser = async () => {
      let oppositeId = c.leaderid === user.id ? c.memid : c.leaderid;
      const res = await getUserByUsername(oppositeId);
      if (res.statusCode === "200") {
        setOppositeUser(res.data);
      }
    };

    fetchUser();
    setCurrentChat(c);
    console.log("chekk", currentChat)
  };
  return (
    <>
      {user && (
        <>
          <Topbar setConversations={setConversations} socket={socket} />
          <div className="messenger">
            <div className="chatMenu" style={{ backgroundColor: "#EFFBFB" }}>
              <div className="chatMenuWrapper">
                <h3>Tất cả các task</h3>
                <Box sx={{ width: "80%" }}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Tìm kiếm"
                    variant="standard"
                    value={textSearch}
                    onChange={(e) => {
                      setTextSearch(e.target.value);
                    }}
                  />
                </Box>
                {conversations.map((c, index) => (
                  <div
                    onClick={() => {
                      handleCurrentChat(c);
                      // console.log( c.id)
                    }}
                    key={index}
                  >
                    <div className="tasklist">
                      <span>{c.taskname}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chatBox">

              <div className="chatBoxWrapper">

                {currentChat ? (
                  <>
                    <div className="chatBoxTop">

                      {oppositeUser?.id &&
                        messages.map((m, index) => {
                          return (
                            <>

                              {m.type === "text" ? (
                                <MessageText

                                  message={m}
                                  own={m.sender === user.id}
                                  messages={messages}
                                  profilePicture={
                                    m.sender === user.id
                                      ? user.avatar
                                      : oppositeUser.avatar
                                  }
                                  index={index}
                                  userId={user.id}
                                  setMessages={setMessages}
                                  socket={socket}
                                  currentChat={currentChat}
                                  key={index}
                                />
                              ) : (
                                <MessageImage
                                  own={m.sender === user.id}
                                  messages={messages}
                                  profilePicture={
                                    m.sender === user.id
                                      ? user.avatar
                                      : oppositeUser.avatar
                                  }
                                  index={index}
                                  userId={user.id}
                                  setMessages={setMessages}
                                  socket={socket}
                                  currentChat={currentChat}
                                  key={index}
                                />
                              )}
                            </>
                          );
                        })}
                    </div>
                    <div className="chatBoxBottom">
                      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <input
                          type="file"
                          id="file"
                          ref={inputFile}
                          style={{ display: "none" }}
                          onChange={onChangeFile}
                        />
                        <img
                          src="https://img.icons8.com/fluency/48/null/image.png"
                          style={{
                            ...styles.icon,
                            marginLeft: "5px",
                            marginRight: "15px",
                          }}
                          onClick={() => {
                            inputFile.current.click();
                          }}
                        />
                        {loading === true ? (
                          <CircularProgress />
                        ) : !image ? (
                          <TextField
                            label="Nhập tin nhắn"
                            id="fullWidth"
                            // variant="standard"
                            sx={{ width: "80%" }}
                            value={newMessage}
                            onChange={(e) => {
                              setNewMessage(e.target.value);
                            }}
                          />
                        ) : (
                          <>
                            <img
                              style={{
                                width: "auto",
                                height: "120px",
                                marginLeft: "20px",
                              }}
                              src={base64image}
                            />
                            <img
                              src="https://img.icons8.com/color/48/null/delete-forever.png"
                              style={{ ...styles.icon, marginLeft: "50px" }}
                              onClick={() => {
                                setImage(null);
                                setBase64image("");
                              }}
                            />
                          </>
                        )}

                        <img
                          src={send}
                          style={{ ...styles.icon, marginLeft: "3%" }}
                          onClick={handleSubmit}
                        />
                      </form>
                    </div>
                  </>
                ) : (
                  <span className="noCoverSactionText">
                    Nhấn vào người dùng để bắt đầu nhắn tin
                  </span>
                )}
              </div>
            </div>
            <div className="chatOnline" style={{ backgroundColor: "#EFFBFB" }}>
              <div className="chatOnlineWrapper">

                {currentChat ? (
                  <div className="infotask">
                    <span>task id: {currentChat.id}</span>
                    <span>task taskname: {currentChat.taskname}</span>
                    <span>task jobid: {currentChat.jobid}</span>
                    <span>task lead: {oppositeUser.firstName + " " + oppositeUser.lastName}</span>
                    <span>task start: {currentChat.start}</span>
                    <span>task end: {currentChat.end}</span>
                  </div>) : (<span>hãy mở task</span>)
                }

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Taskmess;

let styles = {
  icon: {
    marginTop: "10px",
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
};
