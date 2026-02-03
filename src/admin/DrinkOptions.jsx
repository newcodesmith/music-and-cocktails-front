import React, { Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import DrinkInfoCard from "./DrinkInfoCard";

class DrinkOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinksData: [],
    };
  }

  getDrinks = () => {
    const drinksUrl = "https://music-and-cocktails-api-1c87360d2e0b.herokuapp.com/drinks";
    let drinksDataGrab = (response) => {
      this.setState({ drinksData: response });
    };
    return fetch(drinksUrl)
      .then((response) => response.json())
      .then(drinksDataGrab)
      .catch();
  };

  updateSelectedDrink = (drink) => {
    this.setState({ drinkValue: parseInt(drink.value, 10) });
    this.props.updateDrinkSelection(drink);
  };

  componentDidMount() {
    this.getDrinks();
    const newState = {
      ...this.state,
      ...this.props,
    };
    this.setState(newState);
  }

  render() {
    const drinkInfo = this.state.drinksData;
    var options = drinkInfo
      .sort((a, b) => a - b)
      .map((drink) => {
        return { value: `${drink.drink_id}`, label: `${drink.drink_title}` };
      });

    return (
      <div>
        <Select
          name="album_drink_id"
          value={this.props.drinkValue}
          options={options}
          onChange={(drink) => {
            this.updateSelectedDrink(drink);
          }}
        />
        <DrinkInfoCard
          drinksData={this.state.drinksData}
          drinkId={this.props.drinkValue}
        />
      </div>
    );
  }
}

export default DrinkOptions;
