import React, { Component } from "react";
import EditDrink from "./EditDrink.jsx"

class AdminDrinks extends Component {

    state = {
        drinksData: []
    };

    getDrinks = () => {
        const drinksUrl = "http://localhost:3000/drinks";
        let drinksDataGrab = response => {
            this.setState({ drinksData: response });
        };
        return fetch(drinksUrl)
            .then(response => response.json())
            .then(drinksDataGrab)
    }

    updateDrinkData = (drink) => {        
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

    deleteDrinkData = (theId) => {
        let thisId = theId;
        let deleteUrl = `http://localhost:3000/drinks/${thisId}`;

        return fetch(deleteUrl, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.getDrinks();
    }

    render() {
        const drinkInfo = this.state.drinksData;

        return (

            drinkInfo.sort((a, b) => a.drink_id - b.drink_id)
                .map(data =>
                    <EditDrink
                        key={data.drink_id} {...data}
                        updateDrinkData={this.updateDrinkData}
                        getDrinks={this.getDrinks}
                        deleteDrinkData={this.deleteDrinkData}
                        
                    />
                )
        );
    }
}

export default AdminDrinks;