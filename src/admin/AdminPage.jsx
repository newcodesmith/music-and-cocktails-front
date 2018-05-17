import React, { Component } from "react";
import AdminAlbums from "./AdminAlbums.jsx";
// import AddAlbum from "./AddAlbum.jsx";
import AdminDrinks from "./AdminDrinks";
import AddDrink from "./AddDrink.jsx";


class AdminPage extends Component {

  render() {
    return (
      <div>
        <h1 className="admin-heading">Admin Panel</h1>
        <div>
          <h1>Albums</h1>
          <AdminAlbums
          />
          {/* <h1>Add Album</h1>
          <AddAlbum
            drinksData={this.state.drinksData}
          /> */}
          <h1>Drinks</h1>
          <AdminDrinks
          />
          <h1>Add Drink</h1>
          <AddDrink
          />
        </div>
      </div>
    );
  }
}

export default AdminPage;
