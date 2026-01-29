import React, { Component } from "react";
import EditDrink from "./EditDrink.jsx";
import AddDrink from "./AddDrink.jsx";

class AdminDrinks extends Component {
  updateDrinkData = (drink) => {
    let updateUrl = `http://localhost:3300/drinks/${drink.drink_id}`;
    return fetch(updateUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drink),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  deleteDrinkData = (drinkId) => {
    let id = drinkId;
    let deleteUrl = `http://localhost:3300/drinks/${id}`;

    return fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).catch((err) => console.log(err));
  };

  addDrinkData = (drink) => {
    let updateUrl = "http://localhost:3300/drinks";
    return fetch(updateUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(drink),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  };

  render() {
    const drinkInfo = this.props.drinksData;

    return (
      <div>
        <AddDrink getDrinks={this.getDrinks} addDrinkData={this.addDrinkData} />
        {drinkInfo
          .sort((a, b) => a.drink_id - b.drink_id)
          .map((drink) => (
            <EditDrink
              key={drink.drink_id}
              {...drink}
              drinksData={this.props.drinksData}
              getDrinks={this.getDrinks}
              updateDrinkData={this.updateDrinkData}
              deleteDrinkData={this.deleteDrinkData}
            />
          ))}
      </div>
    );
  }
}

export default AdminDrinks;
