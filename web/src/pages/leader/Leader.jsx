import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Topbar from "../../components/topbar/Topbar";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useContext } from "react";
import { NotifiContext } from "../../context/notifiContext";
import { UserContext } from "../../context/userContext";
import { getAllUser, getAllJob, createTaskRes, getTaskByUser } from "../../api/apiUser";
import Autocomplete from '@mui/material/Autocomplete';
import Picker from "../tabAndJobPick/Picker";
import "./leader.css";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


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



const Home = () => {
  const [textSearch, setTextSearch] = useState("");
  const { setNotifi } = useContext(NotifiContext);
  const { user } = useContext(UserContext);

  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [datajob, setDatajob] = useState([]);

  const [value, setValue] = useState("");
  const [jobvalue, setJobValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [inputjobValue, setInputjobValue] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [taskList, setTaskList] = useState([])

  const [tvalue, settValue] = React.useState(0);

  const [taskidShow, setTaskIdShow] = useState('')
  const handleChangeTab = (event, newValue) => {
    settValue(newValue);
    console.log(newValue)
  };
  const handleTaskPick = (value) => {

    console.log('ahehe', taskidShow)
  };


  const fetchData = async () => {
    const res = await getAllUser();
    if (res.statusCode === "200") {
      setDataUser(res.data);
    }

    const ress = await getAllJob(user.id);
    if (ress.statusCode === "200") {
      setDatajob(ress.data);
    }

  };
  useEffect(() => {
    fetchData();
  }, []);
  const filteredData = dataUser.filter(item => item.lock === false);
  const filteredData2 = datajob.filter(item => item.jobdone === false);

  const options = filteredData.map(({ id, firstName, lastName, avatar }) => ({
    id,
    ten: `${firstName} ${lastName}`,
    avatar
  }));


  const options2 = filteredData2.map(({ id, jobname }) => ({
    id,
    jobname
  }));

  const handleLogin = async (e) => {
    e.preventDefault();
    let res = await createTaskRes(jobvalue.id, taskId, taskName, taskNote, startDate, endDate, user.id, value.id);
    console.log("new user ", res);

    setNotifi([res.message]);


    if (res.message == 'tạo kết nối thành công') {

      const res2 = await getTaskByUser(user?.id);

      const searchConversation = [];
      res2.data.map((c) => {

        searchConversation.push(c);
      }
      );
      setTaskList(searchConversation);
    }
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange2 = (newValue) => {
    // Lưu giá trị vào state
    setDateRange(newValue);

    // Kiểm tra nếu cả "check-in" và "check-out" đã được chọn
    if (newValue[0] && newValue[1]) {
      // Lấy giá trị "check-in" và "check-out" và định dạng theo kiểu DATETIME
      setStartDate(newValue[0].format("YYYY-MM-DD"));
      setEndDate(newValue[1].format("YYYY-MM-DD"));

      // Log ra console để kiểm tra kết quả
      console.log("Check-in date:", startDate);
      console.log("Check-out date:", endDate);

      // Gửi giá trị check-in và check-out vào cơ sở dữ liệu bằng cách gọi hàm lưu vào cơ sở dữ liệu
      // Ví dụ sử dụng hàm saveToDatabase() để thực hiện việc lưu
    }
  };


  //get tassk list
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTaskByUser(user?.id);

      const searchConversation = [];
      res.data.map((c) => {

        searchConversation.push(c);
      }
      );
      setTaskList(searchConversation.sort((a, b) => a.taskname.localeCompare(b.taskname)));
    };
    fetchData();
  }, [user?.id]);


  return (
    <>
      <Topbar setConversations={null} />
      <div className="homee">

        <div className="left_home"
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
              <Tab className="tabPick" label="tạo task" />
              <Tab className="tabPick" label="LỊCH" />
              <Tab className="tabPick" label="TASK" />
              <Tab className="tabPick" label="DEADLINE" />
              <Tab className="tabPick" label="TASKEND" />


            </Tabs>
            <div className="tabsSlider" style={{ left: `${tvalue * 20}%` }} />

            <TabPanel tvalue={tvalue} index={0}>


              <form
                className="loginBox"
                onSubmit={handleLogin}
                style={{ height: "90%", width: "100%" }}
              >
                <h1 style={{ textAlign: "center" }}> tạo task </h1>

                <Autocomplete

                  value={jobvalue}
                  onChange={(event, newValue) => {
                    setJobValue(newValue);
                    console.log(jobvalue.id)
                  }}
                  inputValue={inputjobValue}
                  onInputChange={(event, newInputValue) => {
                    setInputjobValue(newInputValue);
                  }}
                  sx={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px' }}
                  id="controllable-states-demo"
                  options={options2}
                  getOptionLabel={(option) => option.jobname}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option.id} - {option.jobname}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} required label="Controllable" />
                  )}
                />
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="task id"
                  variant="outlined"
                  value={taskId}
                  onChange={(e) => {
                    setTaskId(e.target.value);
                  }}
                  sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: '20px', marginTop: '20px' }}
                />

                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="task name"
                  variant="outlined"
                  value={taskName}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                  sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: '20px' }}
                />
                <div>

                  <Autocomplete

                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                      console.log(value.id)
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    sx={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px' }}
                    id="controllable-states-demo"
                    options={options}
                    getOptionLabel={(option) => option.ten}
                    renderOption={(props, option) => (
                      <li {...props}>
                        {option.ten} - {option.id}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} required label="Controllable" />
                    )}
                  />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateRangePicker
                    value={dateRange}
                    onChange={handleDateChange2}
                    localeText={{ start: 'start', end: 'end' }}
                    // inputFormat="DD/MM/YYYY" 
                    format="DD-MM-YYYY"
                    sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginTop: '20px' }}

                  />
                </LocalizationProvider>
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="job note"
                  variant="outlined"
                  multiline
                  rows={5} // Số dòng mặc định
                  maxRows={10} // Giới hạn số dòng tối đa
                  value={taskNote}
                  onChange={(e) => {
                    setTaskNote(e.target.value);
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
              LỊCH
            </TabPanel>
            <TabPanel tvalue={tvalue} index={2}>
              {taskList.map((c, index) => (
                <div
                  onClick={() => {
                    handleTaskPick(c);
                    console.log(c, user) // 
                    setTaskIdShow(c.id)
                  }}
                  key={index}
                >
                  <Picker conversation={c} />
                </div>
              ))}
            </TabPanel>
          </Box>

        </div>
        <div className="right_home" style={{ border: '3px solid #F5F5F5' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(e) => {
                console.log(e.format('DD-MM-YYYY')); // Log the selected date to the console
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

    </>
  );
};

export default Home;
