import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export default function Create() {
  const [form, setForm] = useState({
    nume: "",
    telefon: "",
    Adresa: "",
    Data: "",
    Lucrare: "",
    proiect: "",
    RTL: "",
    Localitate: "",
    smsTrimis: false,
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };

    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({
      nume: "",
      telefon: "",
      Adresa: "",
      Data: "",
      Lucrare: "",
      proiect: "",
      RTL: "",
      Localitate: "",
      smsTrimis: false,
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
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
        <h3>Adauga Client Nou</h3>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Inapoi
        </Button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nume</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.nume}
            onChange={(e) => updateForm({ nume: e.target.value })}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="position">Telefon</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.telefon}
              onChange={(e) => updateForm({ telefon: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="position">Adresa</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.Adresa}
              onChange={(e) => updateForm({ Adresa: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="position">Data</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.Data}
              onChange={(e) => updateForm({ Data: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="position">Lucrare</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.Lucrare}
              onChange={(e) => updateForm({ Lucrare: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="position">Proiect</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.proiect}
              onChange={(e) => updateForm({ proiect: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="position">RTL</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.RTL}
              onChange={(e) => updateForm({ RTL: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="position">Localitate</label>
            <input
              type="text"
              className="form-control"
              id="position"
              value={form.Localitate}
              onChange={(e) => updateForm({ Localitate: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div className="form-group">
            <input
              type="submit"
              value="Adauga Client"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
