import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export default function Create() {
 const [form, setForm] = useState({
   name: "",
   phone: "",
   verificare: "",
   smsTrimis: false,
   adresa: {strada: '', numar: ''}
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
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setForm({
    name: "",
    phone: "",
    verificare: "",
    smsTrimis: false,
    adresa: {strada: '', numar: ''}
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
         <label htmlFor="position">Strada</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.adresa.strada}
           onChange={(e) => updateForm({ strada: e.target.value })}
         />
       </div>
       </div>
       <div style={{ marginTop: "10px" }}>

       <div className="form-group">
         <label htmlFor="position">Numar</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.adresa.numar}
           onChange={(e) => updateForm({ numar: e.target.value })}
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
