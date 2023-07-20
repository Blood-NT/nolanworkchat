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

                <div className="left_home">
                </div>
                <div className="right_home">
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
                            label="Tên job"
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
                                localeText={{ start: 'start', end:'end' }}
                                // inputFormat="DD/MM/YYYY" 
                                format="DD-MM-YYYY"
                                sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" , marginTop:"20px"}}

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
                            Tạo job
                        </button>

                    </form>
                </div>
            </div>

        </>
    );
};

export default Home;
