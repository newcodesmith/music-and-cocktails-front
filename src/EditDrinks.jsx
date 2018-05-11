import React, { Component } from "react";

class EditDrinks extends Component {
    
    state={message: ""};

    constructor() {
        super();
        this.state = {
            drinksData: []
        };

        this._onClick = this._onClick.bind(this);
    }

    getDrinks() {
        const drinksUrl = "http://localhost:3000/drinks";
        let drinksDataGrab = response => {
            this.setState({ drinksData: response });
        };
        return fetch(drinksUrl)
            .then(response => response.json())
            .then(drinksDataGrab)
    }

    getFormData(e) {
        return {
            drink_title: e.target.parentNode.querySelectorAll("input")[1].value,
            drink_description: e.target.parentNode.querySelectorAll("textarea")[0].value,
            ingredients: e.target.parentNode.querySelectorAll("textarea")[1].value,
            direction: e.target.parentNode.querySelectorAll("textarea")[2].value,
            drink_pic_url: e.target.parentNode.querySelectorAll("input")[2].value,
        };
    }



    updateDrinksData(daData, theId) {
        let myData = JSON.stringify(daData);
        let thisId = theId;

        let updateUrl = `http://localhost:3000/drinks/${thisId}`;

        return fetch(updateUrl, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: myData
        })
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    deleteDrinksData(theId) {
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

    _onClick(e) {
        e.preventDefault();
        if (e.target.id === "update") {
            let theId = e.target.parentNode.querySelector(".drink-id").value;
            let daData = this.getFormData(e);
            this.updateDrinksData(daData, theId)
                .then(() => this.getDrinks())
                .then(response => {
                    this.setState({message: "Your drink was updated"})
                    setTimeout(() => {
                        this.setState({message: ""})
                    }, 4000);
                })
        } else if (e.target.id === "delete") {
            let theId = e.target.parentNode.querySelector(".drink-id").value;
            this.deleteDrinksData(theId)
                .then(() => this.getDrinks());
        }
    }

    componentDidMount() {
        this.getDrinks();
    }

    render() {
        const drinksInfo = this.state.drinksData;

        return (

            drinksInfo.sort((a, b) => a.drink_id - b.drink_id)
                .map(drinkInfo => {

                    return (
                        <div key={"drink" + drinkInfo.drink_id} className="drink-detail-card" >
                            <div className="drink-detail-card-form">
                                <h1>Update Drink</h1>
                                <form
                                    className="drink-input"
                                    onClick={this._onClick}
                                    onSubmit={e => this.onSubmit(e)}
                                >

                                    <label>Drink ID:</label>
                                    <input
                                        id="drink_id"
                                        className="drink-id"
                                        type="text"
                                        ref={input => (this.id = input)}
                                        readOnly value={drinkInfo.drink_id}
                                    />

                                    <label>Drink Title:</label>
                                    <input
                                        id="drink_title"
                                        type="text"
                                        ref={input => (this.drink_title = input)}
                                        defaultValue={drinkInfo.drink_title}
                                    />

                                    <label>Drink Description:</label>
                                    <textarea
                                        id="drink_description"
                                        type="text"
                                        ref={input => (this.drink_description = input)}
                                        defaultValue={drinkInfo.drink_description}
                                    />

                                    <label>Ingredients:</label>
                                    <textarea
                                        id="ingredients"
                                        type="text"
                                        ref={input => (this.ingredients = input)}
                                        defaultValue={drinkInfo.ingredients}
                                    />

                                    <label>Direction</label>
                                    <textarea
                                        id="direction"
                                        type="text"
                                        ref={input => (this.direction = input)}
                                        defaultValue={drinkInfo.direction}
                                    />

                                    <label>Drink Pic URL</label>
                                    <input
                                        id="drink_pic_url"
                                        type="text"
                                        ref={input => (this.drink_pic_url = input)}
                                        defaultValue={drinkInfo.drink_pic_url}
                                    />
                                    <div>
                                        <h3>Current Drink Picture</h3>
                                        <img src={drinkInfo.drink_pic_url} alt={drinkInfo.drink_title} height="150" />
                                    </div>
                                    <input id="update" type="submit" value="Update Drink" />
                                    <input id="delete" type="submit" value="Delete Drink" />
                                    <p className="message">{this.state.message}</p>
                                </form>
                            </div>

                        </div>
                    )
                })
        );
    }
}

export default EditDrinks;