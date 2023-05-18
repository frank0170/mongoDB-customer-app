import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./pagination";
import Record from "./record";

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState();

  let search = records;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(search.length / itemsPerPage);


  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentData = search.slice(start, end);

  if (inputText) {
    search = records.filter((name) => name.nume.includes(inputText));
  }

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
  }

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return currentData.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  

  const handleSearch = (e) => {
    setCurrentPage(1);
    setInputText(e.target.value.toLowerCase());
  };

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);


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
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nume</th>
            <th>Telefon</th>
            <th>Verificare</th>
            <th>Actiuni</th>
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
  );
}