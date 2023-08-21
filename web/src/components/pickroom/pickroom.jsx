import React, { useState,useEffect,useContext } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getRoom, setRoom } from '../../api/APIRoom';

import { NotifiContext } from "../../context/notifiContext";

export default function PickRoom({ user }) {
  const [personName, setPersonName] = useState(user.idphongban || "xoa01");
  const [allRoom, setAllRoom] = useState([]);
  const { setNotifi } = useContext(NotifiContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRoom();
      if (res.statusCode === "200") {
        console.log("rooom ne",res.data);
      }
      setAllRoom(res.data)
    };
    fetchData();

  }, []);


  const handleChange = async(event) => {
    setPersonName(event.target.value);
    console.log(event.target.value);
    console.log("pick ne",user.id);
    const res= await setRoom(user.id,event.target.value)
    if (res.statusCode === "200") {
      setNotifi(["thay đổi Phòng thành công", "success"]);
      return
    }
    setNotifi(["thay đổi phòng thất bại"]);


  };

  return (
    
      <FormControl sx={{width: 200 }} size="small">
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
        >
          {allRoom.map((room) => (
            <MenuItem key={room.id} value={room.id}>
              {room.tenphong}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
