import React, { Component } from "react";
import EditDrink from "./EditDrink.jsx";
import AddDrink from "./AddDrink.jsx"


class AdminDrinks extends Component {

    state = {
        drinksData: []
    };

    getDrinks = () => {
        const drinksUrl = "https://music-and-cocktails-api.herokuapp.com/drinks";
        let drinksDataGrab = response => {
            this.setState({ drinksData: response });
        };
        return fetch(drinksUrl)
            .then(response => response.json())
            .then(drinksDataGrab)
    }

    updateDrinkData = (drink) => {
        console.log(drink);

        let updateUrl = `http://localhost:3000/drinks/${drink.drink_id}`;
        return fetch(updateUrl, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(drink)
        })
            .then(response => response.json())
            .catch(err => console.error(err));
    }

    deleteDrinkData = (drinkId) => {
        let id = drinkId;
        let deleteUrl = `http://localhost:3000/drinks/${id}`;

        return fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .catch(err => console.log(err));
    }

    addDrinkData = (drink) => {
        let updateUrl = "https://music-and-cocktails-api.herokuapp.com/drinks";
        return fetch(updateUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(drink)
        })
            .then(response => response.json())
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.getDrinks();
    }

    render() {
        const drinkInfo = this.state.drinksData;

        return (
            <div>
                <AddDrink
                    getDrinks={this.getDrinks}
                    addDrinkData={this.addDrinkData}
                />
                {drinkInfo.sort((a, b) => a.drink_id - b.drink_id)
                    .map(drink =>
                        <EditDrink
                            key={drink.drink_id} {...drink}
                            drinksData={this.state.drinksData}
                            getDrinks={this.getDrinks}
                            updateDrinkData={this.updateDrinkData}
                            deleteDrinkData={this.deleteDrinkData}
                        />
                    )}
            </div>
        )
    }
}

export default AdminDrinks;