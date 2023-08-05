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
import { getuserWithRole, getAllJob, createJobRes } from "../../api/apiUser";
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

  const [jobname, setJobName] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobnote, setJobnote] = useState("");
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [jobList, setJobList] = useState([])
  const [jobDone, setjobDone] = useState([])
  const [jobNotDone, setjobNotDone] = useState([])
  const [tvalue, settValue] = useState(0);


  const [jobPick, setJobPick] = useState([]);
  const [datePick, setDatePick] = useState([]);

  const[leadPick,setLeadPick]=useState("");


  const handleChangeTab = (event, newValue) => {
    settValue(newValue);
    console.log("vallll",tvalue);
    setJobPick([])
    setLeadPick([])   
     };


  useEffect(() => {

    const fetchData = async () => {
      const res = await getuserWithRole("leader");
      if (res.statusCode === "200") {
        setDataUser(res.data);
      }


      const ress = await getAllJob(user.id);
      if (ress.statusCode === "200") {
        setJobList(ress.data);
      }
      const jobDoneTmp = [];
      const jobnotDoneTmp = [];
      ress.data.map((c) => {
        const check = c.jobdone
        if (check == false) {
          jobnotDoneTmp.push(c);
        }
        else
          jobDoneTmp.push(c)
      });
      setjobDone(jobDoneTmp);
      setjobNotDone(jobnotDoneTmp)

    };
    fetchData();
  }, []);
  const filteredData = dataUser.filter(item => item.lock === false);

  const options = filteredData.map(({ id, firstName, lastName, avatar }) => ({
    id,
    ten: `${firstName} ${lastName}`,
    avatar
  }));


  const handleCreateJob = async (e) => {
    e.preventDefault();
    let res = await createJobRes(jobId, jobname, jobnote, value.id, user.id);
    console.log("new user ", res);

    setNotifi([res.message]);
  };


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
              <Tab className="tabPick" label="create" />
              <Tab className="tabPick" label="working" />
              <Tab className="tabPick" label="done" />
              <Tab className="tabPick" label="leader" />



            </Tabs>
            <div className="tabsSlider" style={{ left: `${tvalue * 20}%` }} />

            <TabPanel tvalue={tvalue} index={0}>
              <form
                className="loginBox"
                onSubmit={handleCreateJob}
                
                style={{ height: "90%", width: "100%" }}
              >
                <h1 style={{ textAlign: "center" }}> tạo project </h1>
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="project id"
                  variant="outlined"
                  value={jobId}
                  onChange={(e) => {
                    setJobId(e.target.value);
                  }}
                  sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: '20px' }}
                />
                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="Tên project"
                  variant="outlined"
                  value={jobname}
                  onChange={(e) => {
                    setJobName(e.target.value);
                  }}
                  sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: '20px' }}
                />



                <div>
                  {/* <div>{`value: ${value ? `'${value.id}` : 'null'}`}</div>
              <div>{`inputValue: '${inputValue}'`}</div>
              <br /> */}
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
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
                      <TextField {...params} required label="leader" sx={{ marginTop: '20px' }} />
                    )}
                  />
                </div>

                <TextField
                  required
                  type="text"
                  id="outlined-basic"
                  label="project note"
                  variant="outlined"
                  multiline
                  rows={5} // Số dòng mặc định
                  maxRows={10} // Giới hạn số dòng tối đa
                  value={jobnote}
                  onChange={(e) => {
                    setJobnote(e.target.value);
                  }}

                  sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}
                />


                <button
                  className="loginButton"
                  type="submit"
                  style={{ width: "80%", marginLeft: "auto", marginRight: "auto", marginTop: '20px' }}
                >
                  Tạo project
                </button>

              </form>
            </TabPanel>
            <TabPanel tvalue={tvalue} index={1}>

              {jobNotDone.map((c, index) => (

                <div className="conversation"
                onClick={() => {
                  
                  setJobPick(c)      
                  console.log("jobPick", c);           
                }}
                  key={index}
                >
                  <span>{c.jobname}</span>
                </div>
              ))
              }


            </TabPanel>
            <TabPanel tvalue={tvalue} index={2}>
              {jobDone.map((c, index) => (

                <div className="conversation"

                onClick={() => {
                  
                  setJobPick(c)
                  console.log("jobpick",c)
                  
                }}
                  key={index}
                >
                  <span>{c.jobname}</span>
                </div>
              ))
              }
            </TabPanel>
            <TabPanel tvalue={tvalue} index={3}>
              {filteredData.map((c, index) => (

                <div className="conversation"
                onClick={() => {
                  
                  setLeadPick(c)
                  console.log("picklead",leadPick)
                  
                }}
                  key={index}
                >
                  <span>{c.id}</span>
                </div>
              ))
              }
            </TabPanel>

          </Box>

        </div>
        <div className="rightJob">
          {
            tvalue==0? (<span>ddoongf hoof cho vui ^^</span>):( tvalue==1?(<span>{jobPick.jobname}</span>): (tvalue==2?(<span>{jobPick.jobname}</span>): (<span>{leadPick.id}</span>) )   )      }
        </div>
      </div>

    </>
  );
};

export default Home;
