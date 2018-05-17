import React, { Component } from "react";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DrinkInfoCard from './DrinkInfoCard';



class DrinkOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drinksData: []
        };
    }


    getDrinks = () => {
        const drinksUrl = "http://localhost:3000/drinks";
        let drinksDataGrab = response => {
            this.setState({ drinksData: response });
        };
        return fetch(drinksUrl)
            .then(response => response.json())
            .then(drinksDataGrab)
            .catch();
    }

    updateState = (drink) => {
        this.setState({ drinkValue: parseInt(drink.value) });
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
        var options = drinkInfo.sort((a, b) => a - b).map((drink) => {
            return { value: `${drink.drink_id}`, label: `${drink.drink_title}` }
        });


        return (
            <div>
                <Select
                    name="album_drink_id"
                    value={this.props.drinkValue}
                    options={options}
                    onChange={this.updateState.bind(this)}
                    onChange={this.props.updateDrinkSelection}
                />
                <DrinkInfoCard
                    drinksData={this.state.drinksData}
                    drinkId={this.props.drinkValue}
                />
            </div>
        )
    }
}

export default DrinkOptions;