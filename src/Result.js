import React, { useState } from "react";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { useData } from "./DataContext";
import { MainContainer } from "./components/MainContainer";
import { PrimaryButton } from "./components/PrimaryButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
});

export const Result = () => {
  const URL = "http://localhost:4000/"
  const [success, setSuccess] = useState(false);
  const styles = useStyles();
  const { data } = useData();
  const history = useHistory();

   const entries = Object.entries(data)
  

  const onSubmit = async () => {
    const formData = new FormData();
    alert(JSON.stringify(data))
 

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    const res = await fetch(URL, {
      method: "POST",
      body: formData, 
    });

    if (res.status === 200) {
      Swal.fire("Thank You!", "Order is on the way!", "success");
      setSuccess(true);
    }
  };

  if (success) {
    return <Confetti />;
  }

  return (
    <>
      <MainContainer>
        <Typography component="h2" variant="h5">
          📋 Form Values
        </Typography>
        <TableContainer className={styles.root} component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell component="th" scope="row">
                    {entry[0]}
                  </TableCell>
                  <TableCell align="right">
                    {entry[1]
                    .toString()
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
        <Link to="/">Start over</Link>
      </MainContainer>
    </>
  );
};
