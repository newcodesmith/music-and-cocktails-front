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
        this.setState({ drinkValue: element });
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
        const albumInfo = this.props.albumInfo;
        var options = drinkInfo.map((drink) => {
            return { value: `${drink.drink_id}`, label: `${drink.drink_title}` }
        });

        console.log(options);


        return (
            <Select
                name="drink-selection"
                value={this.state.drinkValue}
                options={options}
                onChange={this.updateState.bind(this)}
            />
        )
    }
}

export default DrinkOptions;