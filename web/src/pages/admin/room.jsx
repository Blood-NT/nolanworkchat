import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { NotifiContext } from "../../context/notifiContext";
import { UserContext } from "../../context/userContext";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Topbar from "../../components/topbar/Topbar";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";

import Typography from '@mui/material/Typography';
import { createRoom, deleteRoom, getRoom, updateRoom } from "../../api/APIRoom";


import "./admin.css";


function TabPanel(props) {
  const { children, tvalue, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={tvalue !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {tvalue === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  tvalue: PropTypes.number.isRequired,
};



const Room = () => {


  const [tvalue, settValue] = useState(0);
  const [idRoom, setIdRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [allRoom, setAllRoom] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [newRoomName, setNewRoomName] = useState('kkk');
  const [tmpId, setTmpId] = useState("");
  const [tmpName, setTmpName] = useState("");


  
  const handleClickEditOpen = () => {
    setOpenEdit(!openEdit);

  };

  
  const handleClickDeleteOpen = () => {
    setOpenDelete(!openDelete);
  };

  const getRoomAll = async () => {
    const res = await getRoom();
    if (res.statusCode === "200") {
    }
    setAllRoom(res.data.filter(item => item.id !== "xoa01"))
    console.log("rooom ne", allRoom);

  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getRoom();
  //     if (res.statusCode === "200") {
  //     }
  //     setAllRoom(res.data.filter(item => item.id !== "xoa01"))
  //     console.log("rooom ne", allRoom);
  

  //   };
  //   fetchData();
  //   getRoomAll()
  // }, []);
  

  const handleChangeTab =(event, newValue) => {
    settValue(newValue);
    console.log("vallll", tvalue);

   getRoomAll()

  }
  
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteRoom(tmpId);
    getRoomAll()
    console.log("new room ", res);
    handleClickDeleteOpen()

  }

  const handleEdit = async (e) => {
    const res = await updateRoom(tmpId, tmpName);
    console.log("edit ", idRoom +   "   "+tmpName);
    getRoomAll()
handleClickEditOpen()

  }


  const handleCreateRoom = async (e) => {
    e.preventDefault();
    const res = await createRoom(idRoom, roomName);
    console.log("new room ", res);

  }

  return (
    <>
      <Topbar setConversations={null} />
      <div className="jobHome">

        <div className="leftJob"
          style={{ border: '3px solid #F5F5F5' }}>
          <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tvalue}
              onChange={handleChangeTab}
              aria-label="Vertical tabs example"

              // sx={{ borderRight: 1, borderColor: 'divider', width: "30%"}}

              sx={{
                borderRight: 1,
                borderColor: 'divider',
                width: "30%",
                position: 'relative',
                "& .tabPick": {
                  fontSize: 16, // Thay đổi cỡ chữ tại đây
                  // color: 'blue', // Thay đổi mã màu (#ff0000) thành màu bạn muốn
                  '&.Mui-selected': {
                    borderRadius: '15px',
                    background: '#1987DE',
                    color: 'white', // Thay đổi mã màu (#ff0000) thành màu bạn muốn
                    // Thay đổi mã màu (#00ff00) thành màu nền bạn muốn khi tab được chọn
                  },
                },
              }}
            >
              <Tab className="tabPick" label="Tạo phòng" />
              <Tab className="tabPick" label="Danh sách" />
            </Tabs>
            <div className="tabsSlider" style={{ left: `${tvalue * 20}%` }} />
            <TabPanel tvalue={tvalue} index={0}>
              <form
                className="loginBox"
                onSubmit={handleCreateRoom}
                style={{ height: "90%", width: "100%" }}
              >
                <h1 style={{ textAlign: "center" }}> Tạo phòng </h1>
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="id phòng"
                  variant="outlined"
                  value={idRoom}
                  onChange={(e) => {
                    setIdRoom(e.target.value);
                  }}
                  sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: '20px' }}
                />
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="Tên phòng"
                  variant="outlined"
                  multiline
                  rows={5} // Số dòng mặc định
                  maxRows={10} // Giới hạn số dòng tối đa
                  value={roomName}
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                  sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginTop: '20px' }}
                />
                <button
                  className="loginButton"
                  type="submit"
                  style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: '20px' }}
                >
                  Tạo task
                </button>
              </form>
            </TabPanel>
            <TabPanel tvalue={tvalue} index={1}>
              {
                allRoom.map((room) => (
                  <>

                    <div className="showRoom">
                      <span>{room.tenphong}</span>

                      <div className="btnne">
                        <Button
                          variant="contained"
                          onClick={() => {
                            setTmpId(room.id)
                            setTmpName(room.tenphong)
                            handleClickEditOpen()
                          }
                          }
                        >
                          sửa
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "red" }}

                          onClick={() => {
                            setTmpId(room.id)
                            setTmpName(room.tenphong)
                            handleClickDeleteOpen()
                          }
                          }
                        >
                          xóa
                        </Button>
                      </div>
                    </div>
                  </>
                )
                )}
            </TabPanel>
          </Box>
        </div>
        <Dialog open={openDelete} onClose={handleClickDeleteOpen}>
          <DialogTitle>Xác nhận</DialogTitle>
          <DialogContent>
           <span>Bạn muốn xóa phòng  {tmpId} ???</span>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickDeleteOpen}>hủy</Button>
            <Button onClick={handleDelete}>Xác nhận</Button>
          </DialogActions>
        </Dialog>


        <Dialog open={openEdit} onClose={handleClickEditOpen}>
          <DialogTitle>Chỉnh sửa phòng</DialogTitle>
          <DialogContent>

          <TextField
          sx={{
            marginTop:"15px"
          }}
          size="small"
          disabled
          id="outlined-disabled"
          label="ID Phòng"
          value={tmpId}
        />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Tên phòng"
              fullWidth
              variant="standard"
              value={tmpName}
              onChange={(e) => {
                setTmpName(e.target.value);
              }}
            />
   
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickEditOpen}>hủy</Button>
            <Button onClick={handleEdit}>Xác nhận</Button>
          </DialogActions>
        </Dialog>


      </div >

    </>
  )

};

export default Room;
