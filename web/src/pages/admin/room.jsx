import * as React from "react";

import { useEffect, useState, useContext } from "react";
import { NotifiContext } from "../../context/notifiContext";
import { UserContext } from "../../context/userContext";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Topbar from "../../components/topbar/Topbar";
import Button from "@mui/material/Button";



import PropTypes from 'prop-types';
import TextField from "@mui/material/TextField";

import Typography from '@mui/material/Typography';
import { createRoom } from "../../api/APIRoom";


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


  const handleChangeTab = (event, newValue) => {
    settValue(newValue);
    console.log("vallll", tvalue);
  };
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

              <>


                <Button
                  variant="contained"
                  onClick={() => {
                    // handleDoneJob(jobPick)
                  }

                  }
                >
                  sửa
                </Button>

                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red" }}

                  onClick={() => {
                    // handleDoneJob(jobPick)
                  }

                  }
                >
                  xóa
                </Button>
              </>



            </TabPanel>


          </Box>

        </div>

      </div >

    </>
  );

};

export default Room;
