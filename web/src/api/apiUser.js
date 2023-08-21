import axios from "axios";
import { apiURL } from "../config/config";

//jobb
const createJobRes = async (jobId, jobName, jobNote, leader, admin) => {
  try {
    const body = {
      id: jobId,
      jobname: jobName,
      leaderid: leader,
      adminid: admin,
      jobnote: jobNote

    };
    const res = await axios.post(`${apiURL}/job/create-job`, body);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};
const getAllJob = async (username) => {
  try {
    const res = await axios.get(`${apiURL}/job/get-jobs/${username}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};


//task
const createTaskRes = async (jobvalue, taskId, taskName, taskNote, startDate, endDate, lead, mem) => {
  try {
    const body = {

      id:taskId,
      start:startDate,
      end:endDate,
      jobid: jobvalue,
      taskname: taskName,
      leaderid: lead,
      memid: mem,
      tasknote: taskNote

    };
    const res = await axios.post(`${apiURL}/task/create-task`, body);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getTaskByUser = async(username) =>
{
  try {
    const res = await axios.get(`${apiURL}/task/get-task/${username}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const login = async (email, password) => {
  try {
    const body = {
      email: email,
      password: password,
    };
    const res = await axios.post(`${apiURL}/user/login`, body);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};



const loginByToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const body = {
      refreshToken: refreshToken,
    };
    const res = await axios.post(`${apiURL}/user/login-token`, body);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const registerUser = async (user) => {
  try {
    const res = await axios.post(`${apiURL}/user/create-user`, user);
    return res.data;
  } catch (err) { }
};

const forgotPassword = async (email, password) => {
  try {
    const body = {
      email,
      password,
    };
    const res = await axios.post(`${apiURL}/user/forgot-password`, body);
    return res.data;
  } catch (err) { }
};

const getUserByUsername = async (username) => {
  try {
    const res = await axios.get(`${apiURL}/user/get-user?id=${username}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const updateUser = async (newUser) => {
  try {
    const fetchData = async () => {
      const res = await axios.put(`${apiURL}/user/update-user`, newUser, {
        headers: { access_token: localStorage.getItem("accessToken") },
      });
      return res.data;
    };
    let data = await fetchData();
    if (data.statusCode === "410") {
      const user = await loginByToken();
      localStorage.setItem("accessToken", user.data.accessToken);
      data = await fetchData();
    }
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getUser = async (textSearch) => {
  try {
    const res = await axios.get(
      `${apiURL}/user/get-user?id=${textSearch}&email=${textSearch}`
    );
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getAllUser = async () => {
  try {
    const res = await axios.get(`${apiURL}/user/get-all-user`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};
const getuserWithRole = async (role) => {
  try {
    const res = await axios.get(`${apiURL}/user/get-all-${role}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const setRole = async ( uid, role) => {
  try {
    const fetchData = async () => {
      const body = { uid, role };
      const headers = {
        headers: { access_token: localStorage.getItem("accessToken") },
      };
      console.log("tokennnn", localStorage.getItem("accessToken"));
      const res = await axios.post(`${apiURL}/user/set-role`, body, headers);
      console.log(res,"hehe")
      return res.data;
    };
    let data = await fetchData();
    if (data.statusCode === "410") {
      const user = await loginByToken();
      localStorage.setItem("accessToken", user.data.accessToken);
      data = await fetchData();
    }
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const lockUser = async (sender, email, lock) => {
  try {
    const fetchData = async () => {
      const body = { sender, email, lock };
      const headers = {
        headers: { access_token: localStorage.getItem("accessToken") },
      };
      const res = await axios.post(`${apiURL}/user/lock-user`, body, headers);
      return res.data;
    };
    let data = await fetchData();
    if (data.statusCode === "410") {
      const user = await loginByToken();
      localStorage.setItem("accessToken", user.data.accessToken);
      data = await fetchData();
    }
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};
const changePass = async (email, oldPass,newPass) => {
  try {
    const body = {
      email,
      oldPass,
      newPass
    };
    const res = await axios.post(`${apiURL}/user/change-password`, body);
    return res.data;
  } catch (err) { }
};

const doneJob = async (id, donetmp) => {
  try {
    const fetchData = async () => {
      const body = {
        id,
        donetmp
      };
      const res = await axios.put(
        `${apiURL}/job/jobDone`, body
      );
      return res.data;
    };
    let data = await fetchData();
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export {
  login,
  registerUser,
  loginByToken,
  getUserByUsername,
  updateUser,
  getUser,
  forgotPassword,
  getAllUser,
  getuserWithRole,
  setRole,
  lockUser,
  createJobRes,
  getAllJob,
  createTaskRes,
  getTaskByUser,
  changePass,
  doneJob
};
