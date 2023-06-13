import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@mui/material";

export default function Edit() {
  const [form, setForm] = useState({
    nume: "",
    telefon: "",
    Adresa: "",
    Data: "",
    Lucrare: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      nume: form.nume,
      telefon: form.telefon,
      Adresa: form.Adresa,
      Data: form.Data,
      Lucrare: form.Lucrare,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5050/record/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
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
        <h3>Actualizare Client</h3>
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
            <input
              type="submit"
              value="Actualizare"
              className="btn btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
