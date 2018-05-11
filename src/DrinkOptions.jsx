import React, { Component } from "react";

class DrinkOptions extends Component {
    constructor() {
        super();
        this.state = {
            drinksData: [],
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

    componentDidMount() {
        this.getDrinks();
    }

    render() {
        const drinkInfo = this.state.drinksData;

        return (
            <select>
                <option></option>
                {
                    drinkInfo.map((drink) => {
                        return <option key={"drink" + drink.drink_id}
                            selected={drink.drink_title === this.props.selected}
                            value={drink.drink_id}>{drink.drink_title}</option>;
                    })
                }
            </select>


        )
    }
}

export default DrinkOptions;
