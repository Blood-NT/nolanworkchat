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
import { getAllUser, lockUser, setRole } from "../../api/apiUser";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PickRoom from "../../components/pickroom/pickroom";

const columns = [
  { id: "avatar", label: "Avatar" },
  { id: "id", label: "username" },
  {
    id: "firstName",
    label: "Họ",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "lastName",
    label: "Tên",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    format: (value) => value.toFixed(2),
  },

  {
    id: "room",
    label: "Phòng",
    format: (value) => value.toFixed(2),

  
  },
  {
    id: "lock",
    label: "role",
    format: (value) => value.toFixed(2),

  },
  {
    id: "status",
    label: "Trạng thái",
    format: (value) => value.toFixed(2),
  },
  {
    id: "handle",
    label: "Thao tác",
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const UserMagager = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const { setNotifi } = useContext(NotifiContext);
  const { user } = useContext(UserContext);
  // const [rolee, setRole] = React.useState('leader');

  const fetchData = async () => {
    const res = await getAllUser();
    if (res.statusCode === "200") {
      setRows(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleLockUser = async (email, lock) => {
    const res = await lockUser(user.id, email, lock);
    if (res.statusCode !== "200") {
      setNotifi([res.message]);
      return;
    }
    await fetchData();
    if (lock === true) {
      setNotifi(["Khóa tài khoản thành công", "success"]);
      return;
    }
    setNotifi(["Mở khóa tài khoản thành công", "success"]);
  };


  const handlesetRole = async (id, role) => {



    console.log(id, role)

    const res = await setRole(id, role);
    if (res.statusCode !== "200") {
      setNotifi([res.message]);
      return;
    }
    await fetchData();
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = async () => {
    const rowsData = (await getAllUser()).data;
    if (textSearch === "") {
      setRows(rowsData);
      return;
    }
    let text = textSearch.toLowerCase();
    let newRows = [];
    rowsData.map((row) => {
      if (
        row.id.toLowerCase().includes(text) ||
        row.firstName.toLowerCase().includes(text) ||
        row.lastName.toLowerCase().includes(text) ||
        row.email.toLowerCase().includes(text) ||
        row.lock.toString() == text ||
        row.status.toString() == text
      ) {
        newRows.push(row);
      }
    });
    setRows(newRows);
  };

  return (
    <>
      <Topbar setConversations={null} />
      <Paper
        sx={{
          width: "98%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TableContainer sx={{ maxHeight: "75%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <h1>Quản lý người dùng</h1>
                </TableCell>
                <TableCell align="center" colSpan={4}>
                  <div style={{ marginLeft: "20%" }}>
                    <TextField
                      id="outlined-basic"
                      label="Tìm kiếm"
                      variant="outlined"
                      size="small"
                      value={textSearch}
                      onChange={(e) => {
                        setTextSearch(e.target.value);
                      }}
                    />
                    <Button
                      variant="outlined"
                      style={{ marginLeft: "10px", marginTop: "2px" }}
                      onClick={handleSearch}
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >{console.log("colum nè", columns)}
                      {
                        console.log("row", row)
                      }
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "avatar") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Avatar alt="avatar" src={value} />
                            </TableCell>
                          );
                        }

                        if (column.id === "room") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                            <PickRoom user={row}/>
                            </TableCell>
                            );
                        }
                        
                      
                        
                        if (column.id === "lock") {
                          return (
                            // <TableCell key={column.id} align={column.align}>
                            //   {value === false ? "Chưa khóa" : "Bị khóa"}

                          <TableCell>
                              <Box sx={{ maxWidth: "250px"}} >
                              <FormControl fullWidth size="small" sx={{m: 1}}>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={row["role"]}
                                  onChange={(e) => handlesetRole(row["id"], e.target.value)}
                                >
                                  <MenuItem value={'admin'}>admin</MenuItem>
                                  <MenuItem value={'project'}>projectManager</MenuItem>
                                  <MenuItem value={'leader'}>leader</MenuItem>
                                  <MenuItem value={'user'}>member</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </TableCell>
                          );
                        }
                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value === true ? (
                                <p style={{ color: "#013ADF" }}>
                                  Đang hoạt động
                                </p>
                              ) : (
                                <p style={{ color: "#424242" }}>Ngoại tuyến</p>
                              )}
                            </TableCell>
                          );
                        }
                      



                        if (column.id === "handle") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row["lock"] === false ? (
                                <Button
                                  variant="contained"
                                  sx={{ backgroundColor: "red" }}
                                  onClick={() => {
                                    handleLockUser(row["email"], true);
                                  }}
                                >
                                  Khóa
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    handleLockUser(row["email"], false);
                                  }}
                                >
                                  Hủy khóa
                                </Button>
                              )}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default UserMagager;
