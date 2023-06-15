import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Navbar() {
  const handleLogOut = () => {
    localStorage.removeItem("login");
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

        <div>
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              gap: '50px',
              color: 'red'
            }}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
          <NavLink
            className="nav-link"
            to="/create"
            style={{ marginRight: "50px" }}
          >
            Adauga client
          </NavLink>
        </div>
      </div>
    </div>
  );
}
