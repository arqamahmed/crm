import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import firebase from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Dashboard() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setdata] = useState(rows);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const userDataArray = [];

    getDocs(usersRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          userDataArray.push(userData);
          // Perform any additional actions with the user data
        });

        console.log("User data:", userDataArray);
        setdata(userDataArray);
      })
      .catch((error) => {
        console.log("Error retrieving user data:", error);
        // Handle the error and provide appropriate feedback to the user
      });
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          {/* TableHead code... */}
          <TableHead>
            <TableRow>
              <StyledTableCell>user name</StyledTableCell>
              <StyledTableCell align="right">email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id} onClick={() => handleRowClick(row)}>
                <StyledTableCell component="th" scope="row">
                  {row.UserName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{selectedRow && selectedRow.UserName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Userid: {selectedRow && selectedRow.id}
          </DialogContentText>
          <DialogContentText>
            email: {selectedRow && selectedRow.email}
          </DialogContentText>
          <DialogContentText>
            Department: {selectedRow && selectedRow.department}
          </DialogContentText>
          <DialogContentText>
            Designation: {selectedRow && selectedRow.designation}
          </DialogContentText>

          {/* Add more content for other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
