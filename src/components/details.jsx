import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const Details = () => {
  const [form, setForm] = useState({});

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

  console.log(form);
  return (
    <div>
      <div className="form-group">
        <label htmlFor="name">Nume</label>
        <p>{form.name}</p>
      </div>
      <div className="form-group">
        <label htmlFor="name">Telefon</label>
        <p>{form.telefon}</p>
      </div>
      <div className="form-group">
        <label htmlFor="name">Adresa</label>
        <p>{form.Adresa}</p>
      </div>
      <div className="form-group">
        <label htmlFor="name">Data lucrare</label>
        <p>{form.Data}</p>
      </div>
      <div className="form-group">
        <label htmlFor="name">Tip Lucrare</label>
        <p>{form.Lucrare}</p>
      </div>
      <div className="form-group">
        <label htmlFor="name">Proiect</label>
        <p>{form.proiect}</p>
      </div>
    </div>
  );
};

export default Details;
