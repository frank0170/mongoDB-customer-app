import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import Record from "./record";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  Button,
  TextareaAutosize,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";

import Factura from "./pdfs/factura";
import Contract from "./pdfs/contract";
import { PDFDownloadLink } from "@react-pdf/renderer";

import Login from "./login";

export default function RecordList() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const currentDateInput = `${day}-${month}-${year}`;
   const logIn = localStorage.getItem('login')


  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");
  const [recordModal, setRecordModal] = useState({
    nume: "",
    telefon: "",
    Adresa: "",
    Data: "",
    Lucrare: "",

  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenInv(false);
    setDateInv(currentDateInput);
    setItems([]);
    setItemName("");
    setItemQuantity("");
    setItemPrice("");
    setTva(19);
  };
  const [openInv, setOpenInv] = React.useState(false);
  const [dateInv, setDateInv] = React.useState(currentDateInput);
  const [pretTotal, setPretTotal] = React.useState();
  const [tva, setTva] = React.useState(19);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const styleInv = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

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

  const handleModal = (record) => {
    setRecordModal(record);
    setOpen(true);
  };

  const handleInv = (record) => {
    setRecordModal(record);
    setOpenInv(true);
  };

  const handleSearch = (e) => {
    setCurrentPage(1);
    setInputText(e.target.value.toLowerCase());
  };

  //-----------------------------

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1); // Track the index of the item being edited

  const handleAddItem = () => {
    const newItem = {
      name: itemName,
      quantity: itemQuantity,
      price: itemPrice,
    };

    setItems([...items, newItem]);
    setItemName("");
    setItemQuantity(1);
    setItemPrice("");
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleEditItem = (index, newName, newQuantity, newPrice) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      name: newName,
      quantity: newQuantity,
      price: newPrice,
    };
    setItems(updatedItems);
    setEditingIndex(-1); // Stop editing mode
  };
  //----------------------------------

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
        handleInv={handleInv}
      />
    ));
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += parseFloat(item.price) * parseInt(item.quantity);
    });

    let totalTax = totalPrice + (totalPrice * tva) / 100;
    setPretTotal(totalTax.toFixed(2));
  };

  let dateFactura = {
    pretTotal,
    tva,
    items,
    dateInv,
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [items, tva]);

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
          {logIn ? (
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
      <table
        className="table table-striped"
        style={{ marginTop: 20, borderSpacing: "50px" }}
      >
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
      </div>
          ) : <Login /> }

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
        </Box>
      </Modal>

      <Modal
        open={openInv}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleInv}>
          <div>
            <h1 style={{ marginBottom: "20px" }}>Factura</h1>
            <span
              style={{ marginRight: "10px", fontSize: "20px", color: "grey" }}
            >
              {" "}
              Data:{" "}
            </span>
            <TextField
              type="text"
              placeholder="Data"
              value={dateInv}
              onChange={(e) => setDateInv(e.target.value)}
            />
            <div style={{ marginTop: "20px" }}>
              <TextField
                type="text"
                placeholder="Nume"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <TextField
                type="number"
                placeholder="Cantitate"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
              />
              <TextField
                type="number"
                placeholder="Pret"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
              <Button onClick={handleAddItem}>Adauga</Button>
              <List>
                {items.map((item, index) => (
                  <ListItem key={index}>
                    {editingIndex === index ? (
                      <>
                        <TextField
                          type="text"
                          placeholder="Nume"
                          value={item.name}
                          onChange={(e) => {
                            const updatedName = e.target.value;
                            handleEditItem(
                              index,
                              updatedName,
                              item.quantity,
                              item.price
                            );
                          }}
                        />
                        <TextField
                          type="number"
                          placeholder="Cantitate"
                          value={item.quantity}
                          onChange={(e) => {
                            const updatedQuantity = e.target.value;
                            handleEditItem(
                              index,
                              item.name,
                              updatedQuantity,
                              item.price
                            );
                          }}
                        />
                        <TextField
                          type="number"
                          placeholder="Pret"
                          value={item.price}
                          onChange={(e) => {
                            const updatedPrice = e.target.value;
                            handleEditItem(
                              index,
                              item.name,
                              item.quantity,
                              updatedPrice
                            );
                          }}
                        />
                        <Button
                          onClick={() =>
                            handleEditItem(
                              index,
                              item.name,
                              item.quantity,
                              item.price
                            )
                          }
                        >
                          Salveaza
                        </Button>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            border: "1px solid grey",
                            borderRadius: "5px",
                            padding: "10px",
                            marginRight: "5px",
                            fontSize: "20px",
                            color: "grey",
                          }}
                        >
                          Nume: {item.name}
                        </div>
                        <div
                          style={{
                            border: "1px solid grey",
                            borderRadius: "5px",
                            padding: "10px",
                            marginRight: "5px",
                            fontSize: "20px",
                            color: "grey",
                          }}
                        >
                          Cantitate: {item.quantity}
                        </div>
                        <div
                          style={{
                            border: "1px solid grey",
                            borderRadius: "5px",
                            padding: "10px",
                            marginRight: "5px",
                            fontSize: "20px",
                            color: "grey",
                          }}
                        >
                          Pret: {item.price}
                        </div>

                        {/* <Button onClick={() => setEditingIndex(index)}>
                          Editeza
                        </Button> */}

                        <Button onClick={() => handleDeleteItem(index)}>
                          Sterge
                        </Button>
                      </>
                    )}
                  </ListItem>
                ))}
              </List>
            </div>
            <span
              style={{ marginRight: "10px", fontSize: "20px", color: "grey" }}
            >
              {" "}
              TVA:{" "}
            </span>
            <TextField
              type="text"
              placeholder="TVA"
              value={tva}
              onChange={(e) => setTva(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h5 style={{ marginTop: "20px" }}>Pret Total</h5>
                {pretTotal}
              </div>

              <PDFDownloadLink
                document={
                  <Factura record={recordModal} dateFactura={dateFactura} />
                }
                fileName={`${"Factura "}${recordModal.nume}${" "}${
                  recordModal.Data
                }${".pdf"}`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    "Generating PDF..."
                  ) : (
                    <Button variant="outlined"> Genereaza Factura</Button>
                  )
                }
              </PDFDownloadLink>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
