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
import Slider from '@mui/material/Slider';

import Button from "@mui/material/Button";

import { getGroupByUser, getGroup } from "../../api/apiGroup";
import { getTaskByUser, checkTask, createReport, getAllReport, getDataReport } from "../../api/apiTask";
import { getTaskMess, createTaskMessages } from "../../api/apiMessages";
import { getUserByUsername } from "../../api/apiUser";

import { uploadImage } from "../../ultis/uploadFile";
import { NotifiContext } from "../../context/notifiContext";
import { UserContext } from "../../context/userContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
  const [tmpDone, setTmpDone] = useState(0);
  const [tmpCheck, setTmpCheck] = useState(false);
  const inputFile = useRef(null);

  const [open, setOpen] = useState(false);
  const [openDialogData, setOpenDialogData] = useState(false);
  const [tomTat, settomTat] = useState('');
  const [noiDung, setnoiDung] = useState('');
  const [allReport, setAllReport] = useState([]);

  const tomTatInputRef = useRef(null);
  const noiDungInputRef = useRef(null);


  const [missingField, setMissingField] = useState(null);

  useEffect(() => {
    if (missingField) {
      const inputElement = document.getElementById(missingField);
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [missingField]);

  const handleClickOpenData = () => {

    setOpenDialogData(!openDialogData)
  };


  const handleClickOpen = () => {
    setOpen(!open);
    settomTat('');
    setnoiDung('');
    console.log("nolannnnnjkknkln",currentChat);
  };

  const handelGetAllReport = async () => {
    let res = await getAllReport(currentChat.id);
    console.log("report ne ", res);
    setAllReport(res.data)

  }
  const handleSubscribe = async () => {
    if (!tomTat) {
      setMissingField('tomTat');
      return;
    }
    if (!noiDung) {
      setMissingField('noiDung');
      return;
    }
    let res = await createReport(currentChat.id, user.id, tomTat, noiDung,valueSlide);
    setNotifi([res.message]);
    handleClickOpen();
    handelGetAllReport();

    socket.emit("sendReport", {
     
      receiverId: currentChat.leaderid,
 
    });



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

    socket.on("getreport", () => {
      handelGetAllReport();
      
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
        console.log("searchhhh", res)

        const searchConversation = [];
        res.data.map((c) => {
          const check = c.taskname
          if (check.includes(textSearch) === true) {

            searchConversation.push(c);
            console.log("search", searchConversation)

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

    setTmpDone(0)
    const fetchUser = async () => {
      let oppositeId = c.leaderid === user.id ? c.memid : c.leaderid;
      const res = await getUserByUsername(oppositeId);
      if (res.statusCode === "200") {
        setOppositeUser(res.data);
      }
      let ress = await getAllReport(c.id);
      setAllReport(ress.data)

    }
    fetchUser();
    setValueSlide(c.isdone)
    setTmpCheck(c.ischeck)
    setCurrentChat(c);
    setTmpDone(c.isdone);
    console.log("chekk", currentChat)
  };


  const handelCheckTask = async(taskId, check) => {
      const res = await checkTask(taskId, user.id, check);
      if (res.statusCode === "200") {
        console.log("checktask", res);
    
        setTmpCheck(true)

        /////
      }
  

    // setCurrentChat(c);
    console.log("chekk", currentChat)
  }


  const [valueSlide, setValueSlide] = useState(30);

  const handleChangeSlide = (event, newValue) => {
      setValueSlide(newValue);
    
  };


  const [reportNote, setReportNote] = useState("");
  const [reportTittle, setReportTittle] = useState("");


  const handelPickReport = async (idReport) => {

    let res = await getDataReport(idReport);
    console.log("report ne ", res);
    handleClickOpenData()
    setReportNote(res.data.note)
    setReportTittle(res.data.title)
  }


  return (
    <>
      {user && (
        <>
          <Topbar setConversations={setConversations} socket={socket} />
          <div className="messenger">
            <div className="chatMenu" style={{ backgroundColor: "#202123" }}>
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
            <div className="chatOnline" style={{ backgroundColor: "#202123" }}>
              <div className="chatOnlineWrapper">
                {currentChat ? (
                  <div className="infotask">
                    <span>id: {currentChat.id}<br></br></span> 
                    <span>taskname: {currentChat.taskname}<br></br></span>
                    <span>jobid: {currentChat.jobid}<br></br></span>
                    <span>lead: {oppositeUser.firstName + " " + oppositeUser.lastName}<br></br></span>
                    <span>start: {currentChat.start}<br></br></span>
                    <span>end: {currentChat.end}<br></br></span>
                    <span>nội dung: {currentChat.tasknote}<br></br></span>
                    
                    <span>tiến độ<br></br> </span>
                    <div className="tienDo" style={{ display: "flex", justifyContent: "center" }}>

                    <Slider defaultValue={valueSlide} value={valueSlide}  disabled />

                    <span style={{ top: "-15px" }}>{valueSlide}</span>
                    </div>
                    <div className="btnCheck">

                      {
                        console.log("nolannnn", allReport)
                      }
                      {
                        user.id == currentChat.memid ?
                          (tmpCheck === false ? (
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "red" }}
                              onClick={() => {
                                handelCheckTask(currentChat.id, true)
                              }}
                            >
                              chưa nhận
                            </Button>
                          ) : (

                            <>


                              <Button
                                variant="contained"
                                onClick={
                                  handleClickOpen
                                }
                              >
                                Báo cáo
                              </Button>


                              <Dialog open={open} onClose={handleClickOpen}>
                                <DialogTitle>Báo Cáo Công Việc</DialogTitle>
                                <DialogContent>
                                  <TextField
                                    inputRef={tomTatInputRef}

                                    margin="dense"
                                    id="tomTat"
                                    label="Tóm tất nội dung"
                                    type='text'
                                    fullWidth
                                    variant="standard"
                                    value={tomTat}
                                    onChange={(e) => {
                                      settomTat(e.target.value);
                                    }}
                                    F />
                                  <TextField
                                    inputRef={noiDungInputRef}

                                    multiline
                                    margin="dense"
                                    id="noiDung"
                                    label="chi tiết báo cáo"
                                    type='text'
                                    rows={4}
                                    fullWidth
                                    variant="standard"
                                    value={noiDung}
                                    onChange={(e) => {
                                      setnoiDung(e.target.value);
                                    }}
                                  />

                                         <div className="tienDo" style={{ display: "flex", justifyContent: "center" }}>
                      <Slider
                        value={valueSlide}
                        onChange={handleChangeSlide}
                        defaultValue={valueSlide}
                        sx={{
                          width: 300,

                          color: '#C1DDFF', // Mã màu HEX cho neon xanh dương
                          '& .MuiSlider-thumb': {

                            '&:hover, &.Mui-focusVisible': {
                              boxShadow: '0px 0px 0px 8px rgba(0, 191, 255, 0.16)', // Mã màu HEX cho hover thumb neon xanh dương
                            },
                          },
                          }
                        }
                          />
                          <span style={{ top: "-15px" }}>{valueSlide}</span>
                    </div>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClickOpen}>Cancel</Button>
                                  <Button onClick={handleSubscribe}>Báo cáo</Button>
                                </DialogActions>
                              </Dialog>


                            </>
                          )) :
                          (
                            <>
                              {/* <Button
                              sx={{margin:"10px"}}
                                variant="contained"
                                onClick={() => {
                                }}
                              >
                                đánh dấu đã xong
                              </Button> */}
                            </>


                          )

                      }




                    </div>

                    {allReport.map((c, index) => (
                      <div

                        key={index}
                      >
                        <div className="tasklist" onClick={() => {
                          handelPickReport(c.id)
                        }}>
                          <span>{c.title}</span>

                          <div className="dialogg">
                            <Dialog open={openDialogData} onClose={handleClickOpenData}>
                              <DialogTitle>{reportTittle}</DialogTitle>
                              <DialogContent>
                                <span>{reportNote}</span>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClickOpenData}>close</Button>
                              </DialogActions>
                            </Dialog>

                          </div>
                        </div>
                      </div>
                    ))}


             






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
