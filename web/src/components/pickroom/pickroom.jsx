import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const names = [
    "admin",
    "admin1",
    "admin2",
];

export default function PickRoom({ user }) {
  const [personName, setPersonName] = useState(user.id || 'kdjvnasjdvn');

  const handleChange = (event) => {
    setPersonName(event.target.value);
    console.log(event.target.value);
    console.log("pick ne",user.id);
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
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
