import React, { Component } from "react";

class DrinkInfoCard extends Component {
  render() {
    const drinkInfo = this.props.drinksData;
    const selectedDrink = this.props.drinkId;
    const singleDrink = drinkInfo.filter((drink) => {
      if (drink.drink_id === selectedDrink) {
        return drink;
      } else {
        return null;
      }
    })[0];

    const drinkIngredients = singleDrink
      ? singleDrink.ingredients.split("; ")
      : [];

    return (
      <div className="admin-drink-info-card">
        <h1>Paired Drink Preview</h1>
        <h3>{singleDrink && singleDrink.drink_title}</h3>
        <div className="admin-drink-info-container">
          <div className="admin-drink-image-container">
            <img
              className="admin-drink-image"
              src={singleDrink && singleDrink.drink_pic_url}
              alt={singleDrink && singleDrink.drink_title}
            />
          </div>
          <div className="admin-drink-details">
            <ul>
              <li>{singleDrink && singleDrink.drink_description}</li>
              <li>
                <ul>{singleDrink && drinkIngredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}</ul>
              </li>
              <li>{singleDrink && singleDrink.direction}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default DrinkInfoCard;
