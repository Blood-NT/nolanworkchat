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
import { getAllUser, lockUser } from "../../api/apiUser";
import Autocomplete from '@mui/material/Autocomplete';
import "./leader.css";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState([]);
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);


    const [tvalue, settValue] = React.useState(0);

    const handleChangeTab = (event, newValue) => {
      settValue(newValue);
    };

    
    
    const fetchData = async () => {
        const res = await getAllUser();
        if (res.statusCode === "200") {
            setDataUser(res.data);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    const filteredData = dataUser.filter(item => item.lock === false);

    const options = filteredData.map(({ id, firstName, lastName, avatar }) => ({
        id,
        ten: `${firstName} ${lastName}`,
        avatar
    }));


    const handleLogin = async (e) => {
        // e.preventDefault();
        // let res = await login(email, password);
        // console.log("new user ", res);
        // if (res.statusCode === "200") {
        //   localStorage.setItem("accessToken", res.data.accessToken);
        //   localStorage.setItem("refreshToken", res.data.refreshToken);
        //   setUser(res.data);
        //   navigate("/messenger");
        //   setNotifi(["Đăng nhập thành công", "success"]);
        //   return;
        // }
        // setNotifi([res.message]);
    };

    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);

    const handleDateChange2 = (newDateRange) => {
        setDateRange(newDateRange);
    };

    const startDate = dateRange[0] ? dayjs(dateRange[0]).format('DD/MM/YYYY') : '';
    const endDate = dateRange[1] ? dayjs(dateRange[1]).format('DD/MM/YYYY') : '';
    const totalDays = dateRange[0] && dateRange[1] ? Math.abs(dayjs(dateRange[0]).diff(dateRange[1], 'day')) + 1 : 0;

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
              <Tab className="tabPick" label="PROJECT" />
              <Tab className="tabPick" label="LỊCH" />
              <Tab className="tabPick" label="TASK" />
              <Tab className="tabPick" label="DEADLINE" />
              <Tab className="tabPick" label="TASKEND" />


            </Tabs>
            <div className="tabsSlider" style={{ left: `${tvalue * 20}%` }} />

            <TabPanel tvalue={tvalue} index={0}>
              
            </TabPanel>
            <TabPanel tvalue={tvalue} index={1}>
              Item Two
            </TabPanel>
            <TabPanel tvalue={tvalue} index={2}>
              Item Three
            </TabPanel>

          </Box>

        </div>
                <div className="right_home" style={{ border: '3px solid #F5F5F5' }}>
                    <form
                        className="loginBox"
                        onSubmit={handleLogin}
                        style={{ height: "400px", width: "500px" }}
                    >
                        <h1 style={{ textAlign: "center" }}> tạo Job </h1>
                        <TextField
                            required
                            type="text"
                            id="outlined-basic"
                            label="jobid"
                            variant="outlined"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
                        />
                        <TextField
                            required
                            type="text"
                            id="outlined-basic"
                            label="tasskName"
                            variant="outlined"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
                        />

                        <TextField
                            required
                            type="text"
                            id="outlined-basic"
                            label="taskId"
                            variant="outlined"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
                        />
                        <div>
                            <div>{`value: ${value ? `'${value.id}` : 'null'}`}</div>
                            <div>{`inputValue: '${inputValue}'`}</div>
                            <br />
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
                                sx={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}
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
                                sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}

                            />
                        </LocalizationProvider>

                        <div>Total Days: {totalDays}</div>
                        <div>Start Date: {startDate}</div>
                        <div>End Date: {endDate}</div>
                        <TextField
                            required
                            type="text"
                            id="outlined-basic"
                            label="job note"
                            variant="outlined"
                            multiline
                            rows={5} // Số dòng mặc định
                            maxRows={10} // Giới hạn số dòng tối đa
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}

                            sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}
                        />


                        <button
                            className="loginButton"
                            type="submit"
                            style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
                        >
                            Tạo task
                        </button>

                    </form>
                </div>
            </div>

        </>
    );
};

export default Home;
