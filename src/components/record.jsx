import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Factura from "./pdfs/factura";
import Contract from "./pdfs/contract";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Record = (props) => {
  return (
    <tr>
      <td onClick={() => props.handleModal(props.record)}>
        {props.record.nume}
      </td>
      <td>{props.record.telefon}</td>
      <td>{props.record.Data}</td>
      <td>
      <PDFDownloadLink
          document={<Contract record={props.record} />}
          fileName={`${"Contract "}${props.record.nume}${" "}${
            props.record.Data
          }${".pdf"}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Generating PDF..." : <Button>Contract</Button>
          }
        </PDFDownloadLink>
        |
        <PDFDownloadLink
          document={<Factura record={props.record} />}
          fileName={`${"Factura "}${props.record.nume}${" "}${
            props.record.Data
          }${".pdf"}`}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Generating PDF..." : <Button>Factura</Button>
          }
        </PDFDownloadLink>
        | {" "}
        <Link style={{ color: "black", textDecoration: 'none' }} to={`/edit/${props.record._id}`}>
          Edit
        </Link>{" "}
        {/* |
        <Button
          style={{ color: "red" }}
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </Button> */}
      </td>
    </tr>
  );
};

export default Record;
