import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Record = (props) => {
  return (
    <tr>
      <td onClick={() => props.handleModal(props.record)}>
        {props.record.nume}
      </td>
      <td>{props.record.telefon}</td>
      <td>{props.record.Data}</td>
      <td>
        {/* <Link style={{color: 'black'}} to={`/details/${props.record._id}`}>
          Detalii
        </Link>{" "}
        | */}
        <Link style={{ color: "black" }} to={`/edit/${props.record._id}`}>
          Edit
        </Link>{" "}
        |
        <Button
          style={{ color: "red" }}
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default Record;
