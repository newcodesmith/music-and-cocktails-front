import React, { Component } from "react";
import AdminAlbums from "./AdminAlbums.jsx";
import AdminDrinks from "./AdminDrinks";
import AddDrink from "./AddDrink.jsx";


class AdminPage extends Component {

  render() {
    return (
      <div>
        <div>
          <h1 className="admin-heading">Admin Panel</h1>
        </div>

        <h1>Albums</h1>
        <AdminAlbums
        />

        <h1>Drinks</h1>
        <AdminDrinks
        />

      </div>
    );
  }
}

export default AdminPage;
