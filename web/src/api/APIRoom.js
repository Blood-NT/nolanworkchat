import axios from "axios";
import { apiURL } from "../config/config";

const createRoom = async (id, roomName) => {
    try {
        const body = {
            id:id,
            tenphong:roomName,
            isdelete: false
        };
        const res = await axios.post(`${apiURL}/room/create`,body);
        return res.data;
    } catch (error) {
      console.log(`${error}`);
    }
  };
  const getRoom = async () => {
    try {
      const res = await axios.get(`${apiURL}/room/get-room`);
      return res.data;
    } catch (error) {
      console.log(`${error}`);
    }
  };


  const setRoom = async (uid, idphongban) => {
    try {
        const body = {
          uid:uid,
          idphongban:idphongban
        };
        const res = await axios.post(`${apiURL}/user/set-room`,body);
        return res.data;
    } catch (error) {
      console.log(`${error}`);
    }
  };


  
  const updateRoom = async (id, ten) => {
    try {
        const body = {
          roomId:id,
          roomName:ten
        }
        const res = await axios.put(`${apiURL}/room/update`,body);
        return res.data;
    } catch (error) {
      console.log(`${error}`);
    }
  };


  const deleteRoom = async (id, ) => {
    try {
        const body = {
          roomId:id
        }
        const res = await axios.put(`${apiURL}/room/delete`,body);
        return res.data;
    } catch (error) {
      console.log(`${error}`);
    }
  };
  export { 
    

    createRoom,
    getRoom,
    setRoom,
    updateRoom,
    deleteRoom
   };
