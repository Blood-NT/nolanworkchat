import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { updateUser ,changePass} from "../../api/apiUser";
import { NotifiContext } from "../../context/notifiContext";
import { uploadFile } from "../../ultis/uploadFile";

export default function InfoPersonal({ user, setUser }) {
  const MAX_SIZE = useRef(5242880); // 5mb
  const { setNotifi } = useContext(NotifiContext);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [describe, setDescribe] = useState("");
  const [avatar, setAvatar] = useState();

  const [open, setOpen] = React.useState(false);
  const [pass, setPass] = React.useState('');
  const [newPass, setNewPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordMismatch, setPasswordMismatch] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
    setPass('');
    setNewPass('');
    setConfirmPass('');
  };

  const handleSubscribe = async() => {
    if (newPass === confirmPass) {

      let res = await changePass(user.email,pass,newPass);
      console.log(res);
      if (res.statusCode === "200") {

        setNotifi(["Xác thực email của bạn để thay đổi mật khẩu", "success"]);
      handleClickOpen();

        return;
      }
      else{
        if(res.statusCode==="400" && res.message==="mật khẩu không đúng")
        {

          setNotifi(["Mật khẩu bạn nhập không đúng"]);

          return;
        }
        else{
        setNotifi([res.message]);
        }
      }
      handleClickOpen();
    } else {
      setPasswordMismatch(true);
    }
  };
  useEffect(() => {
    console.log("reset ");
    setId(user?.id || "");
    setEmail(user?.email || "");
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setDescribe(user?.describe);
  }, [user]);

  const handleUpdateUser = async () => {
    if (avatar?.size > MAX_SIZE.current) {
      setNotifi(["Ảnh phải nhỏ hơn 5 mb"]);
      return;
    }
    let url = null;
    if (avatar) {
      url = await uploadFile(avatar);
    }
    let newUser = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      describe: describe,
      avatar: url,
    };
    const res = await updateUser(newUser);
    if (res.statusCode === "200") {
      setNotifi(["Cập nhật dữ liệu thành công", "success"]);
      newUser = user;
      newUser.firstName = firstName || user.firstName;
      newUser.lastName = lastName || user.lastName;
      newUser.describe = describe || user.describe;
      newUser.avatar = url || user.avatar;
      setUser(newUser);
      return;
    }
    setNotifi([res?.message]);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
     <div style={{ display:"flex", justifyContent:"center"}}>
        <TextField disabled id="outlined-required" label="Id" value={id} />
        <TextField
          disabled
          id="outlined-disabled"
          label="Email"
          value={email}
        />
      </div>
      <div style={{ display:"flex", justifyContent:"center"}}>
        <TextField
          required
          id="outlined-read-only-input"
          label="First name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          id="outlined-read-only-input"
          label="Last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>

      <div style={{ display:"flex", justifyContent:"center"}}>

      <TextField
        label="Describe"
        multiline
        rows={2}
        maxRows={6}
        value={describe}
        onChange={(e) => {
          setDescribe(e.target.value);
        }}
        sx={{ width: "52ch !important" }}
      />
   </div>

<div style={{ display:"flex", justifyContent:"center"}}>

      <TextField
        id="outlined-basic-7"
        label="Ảnh đại diện"
        variant="outlined"
        type="file"
        required
        onChange={(e) => {
          setAvatar(e.target.files[0]);
        }}
        sx={{ paddingLeft: "150px", width: "35ch !important" }}
      />
      </div>

      <div style={{ marginTop: "10px" ,display:"flex", justifyContent: "space-evenly", }}>

        <div className="ok" >
        <Button variant="outlined" onClick={handleClickOpen}>
          Thay đổi mật khẩu 
        </Button>
        <Dialog open={open} onClose={handleClickOpen}>
          <DialogTitle>Thay đổi mật khẩu</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Mật khẩu cũ"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="standard"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <TextField
              
              margin="dense"
              id="newPass"
              label="Mật khẩu Mới"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="standard"
              value={newPass}
              onChange={(e) => {
                setNewPass(e.target.value);
                setPasswordMismatch(false);
              }}
              error={passwordMismatch}
              helperText={passwordMismatch ? "mật khẩu mới nhập lại phải giống nhau" : ''}
            />
            <TextField
              
              margin="dense"
              id="confirmPass"
              label="Xác nhận mật khẩu"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="standard"
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
                setPasswordMismatch(false);
              }}
              error={passwordMismatch}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickOpen}>Cancel</Button>
            <Button onClick={handleSubscribe}>Đổi mật khẩu</Button>
          </DialogActions>
        </Dialog>
        </div>
        <Button variant="contained" onClick={handleUpdateUser}>
          Lưu thay đổi
        </Button>
      </div>
    </Box>
  );
}
