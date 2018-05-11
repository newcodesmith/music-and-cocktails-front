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
        const albumAndDrink = this.state.drinksData;

        return (
            <select
                ref={input => (this.drink_id = input)}
                defaultValue=""
            >
                <option></option>

                {
                    albumAndDrink.map(function (drink) {
                        return <option key={drink.drink_id}
                            value={drink.drink_id}>{drink.drink_title}</option>;
                    })
                }
            </select>


        )
    }
}

export default DrinkOptions;
