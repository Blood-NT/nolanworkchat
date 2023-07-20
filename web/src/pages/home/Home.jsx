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
import "./home.css";

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


    return (
        <>
            <Topbar setConversations={null} />
<div className="homee">

            <div className="left_home">
            <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tvalue}
        onChange={handleChangeTab}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Item One" />
        <Tab label="Item Two"  />
        <Tab label="Item Three" />
        <Tab label="Item Four"  />
        <Tab label="Item Five"/>
        <Tab label="Item Six"  />
        <Tab label="Item Seven" />
      </Tabs>
      <TabPanel tvalue={tvalue} index={0}>
        Item One
      </TabPanel>
      <TabPanel tvalue={tvalue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel tvalue={tvalue} index={2}>
        Item Three
      </TabPanel>
      <TabPanel tvalue={tvalue} index={3}>
        Item Four
      </TabPanel>
      <TabPanel tvalue={tvalue} index={4}>
        Item Five
      </TabPanel>
      <TabPanel tvalue={tvalue} index={5}>
        Item Six
      </TabPanel>
      <TabPanel tvalue={tvalue} index={6}>
        Item Seven
      </TabPanel>
    </Box>
          
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
                   
                        sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" ,marginTop:"20px"}}
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
