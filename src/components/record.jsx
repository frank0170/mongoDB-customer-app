import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Record = (props) => (
    <tr>
      <td>{props.record.nume}</td>
      <td>{props.record.telefon}</td>
      <td>{props.record.Data}</td>
      <td>
        <Link style={{color: 'black'}} to={`/edit/${props.record._id}`}>
          Edit
        </Link>{" "}
        |
        <Button
          style={{color: 'red'}}
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );

  export default Record