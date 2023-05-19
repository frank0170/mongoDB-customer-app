import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import Record from "./record";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");

  const itemsPerPage = 10;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const filteredRecords = inputText
    ? records.filter((record) =>
        record.nume.toLowerCase().includes(inputText.toLowerCase())
      )
    : records;

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const currentData = filteredRecords.slice(start, end);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return currentData.map((record) => (
      <Record
        record={record}
        deleteRecord={() => deleteRecord(record._id)}
        key={record._id}
        handleModal={handleModal}
      />
    ));
  }

  const [recordModal, setRecordModal] = useState({
    nume: "",
    telefon: "",
    Adresa: "",
    Data: "",
    Lucrare: "",
    proiect: "",
    RTL: "",
    Localitate: ""
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  const handleModal = (record) => {
    setRecordModal(record);
    setOpen(true);
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setInputText(e.target.value.toLowerCase());
  };

  useEffect(() => {
    async function getRecords() {
      const response = await fetch("http://localhost:5050/record/");

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, []);

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <h3>Lista Clienti</h3>
        <input
          onChange={(e) => handleSearch(e)}
          placeholder="Cauta clienti..."
        />
      </div>
      <table className="table table-striped" style={{ marginTop: 20, borderSpacing: '50px' }}>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Telefon</th>
            <th>Verificare</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
      <Pagination
        total={totalPages}
        current={currentPage}
        onClick={handlePageClick}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h4>Nume</h4>
            <p>{recordModal?.nume}</p>
          </div>
          <div className="form-group">
            <h4>Telefon</h4>
            <p>{recordModal?.telefon}</p>
          </div>
          <div className="form-group">
            <h4>Adresa</h4>
            {recordModal?.Adresa ? (
              <p>{recordModal?.Adresa}</p>
            ) : (
              <p style={{ color: "red" }}>nedeterminat</p>
            )}
          </div>
          <div className="form-group">
            <h4>Data lucrare</h4>
            {recordModal?.Data ? (
              <p>{recordModal?.Data}</p>
            ) : (
              <p style={{ color: "red" }}>nedeterminat</p>
            )}
          </div>
          <div className="form-group">
            <h4>Tip Lucrare</h4>
            {recordModal?.Lucrare ? (
              <p>{recordModal?.Lucrare}</p>
            ) : (
              <p style={{ color: "red" }}>nedeterminat</p>
            )}
          </div>

          <div className="form-group">
            <h4>Proiect</h4>
            {recordModal?.proiect ? (
              <p>{recordModal?.proiect}</p>
            ) : (
              <p style={{ color: "red" }}>nedeterminat</p>
            )}
          </div>

          <div className="form-group">
            <h4>Localitate</h4>
            {recordModal?.Localitate ? (
              <p>{recordModal?.Localitate}</p>
            ) : (
              <p style={{ color: "red" }}>nedeterminat</p>
            )}
          </div>

          <div className="form-group">
            <h4>RTL</h4>
            {recordModal?.RTL ? (
              <p>{recordModal?.RTL}</p>
            ) : (
              <p style={{ color: "red" }}>nedeterminat</p>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
