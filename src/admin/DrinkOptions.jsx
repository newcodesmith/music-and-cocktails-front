import React, { Component } from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class DrinkOptions extends Component {
    constructor() {
        super();
        this.state = {
            drinksData: []
        };
    }


    getDrinks() {
        const drinksUrl = "http://localhost:3000/drinks";
        let drinksDataGrab = response => {
            this.setState({ drinksData: response });
        };
        return fetch(drinksUrl)
            .then(response => response.json())
            .then(drinksDataGrab)
            .catch();
    }

    updateState(element) {
        this.setState({ drinkValue: parseInt(element.value) });
    }

    componentDidMount() {
        this.getDrinks()
        const newState = {
            ...this.state,
            ...this.props
        }
        this.setState(newState)
    }

    render() {
        const drinkInfo = this.state.drinksData;
        var options = drinkInfo.sort((a, b) => a.drink_title - b.drink_title).map((drink) => {
            return { value: `${drink.drink_id}`, label: `${drink.drink_title}` }
        });


        return (
            <Select
                name="album_drink_id"
                value={this.props.drinkValue}
                options={options}
                onChange={this.updateState.bind(this)}
                onChange={this.props.updateDrinkSelection}
            />
        )
    }
}

export default DrinkOptions;