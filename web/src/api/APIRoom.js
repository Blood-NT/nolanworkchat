import axios from "axios";
import { apiURL } from "../config/config";

const createRoom = async (id, roomName) => {
    try {
        const body = {
            id:id,
            tenphong:roomName
        };
        const res = await axios.post(`${apiURL}/room/create`,body);
        return res.data;
    } catch (error) {
      console.log(`${error}`);
    }
  };


  export { 
    

    createRoom,
   };
