import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const handleLogOut = () => {
    localStorage.removeItem("login");
    window.location.reload();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          height: "65px",
          backgroundColor: "#DEDEDE",
        }}
      >
        <NavLink className="navbar-brand" to="/">
          <h2 style={{ marginLeft: "20px" }}>Vimato</h2>{" "}
        </NavLink>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: "50px",
          }}
        >
          <NavLink
            className="nav-link"
            to="/create"
            style={{ marginRight: "50px" }}
          >
            Adauga client
          </NavLink>

          <button
            type="button"
            class="btn btn-danger"
            onClick={handleLogOut}
            style={{ marginRight: "30px" }}
          >
            {" "}
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
