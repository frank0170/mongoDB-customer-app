import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@mui/material";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
    records: [],
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
      name: form.name,
      phone: form.phone,
      verificare: form.verificare,
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>


        <div style={{ marginTop: "10px" }}>

        <div className="form-group">
          <label htmlFor="position">Phone</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.phone}
            onChange={(e) => updateForm({ phone: e.target.value })}
          />
        </div>
        </div>
        <div style={{ marginTop: "10px" }}>

        <div className="form-group">
          <label htmlFor="position">Verificare</label>
          <input
            type="text"
            className="form-control"
            id="position"
            value={form.verificare}
            onChange={(e) => updateForm({ verificare: e.target.value })}
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
