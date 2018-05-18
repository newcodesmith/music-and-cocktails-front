import React, { Component } from "react";

class AddDrink extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            drink_title: null,
            drink_description: null,
            ingredients: null,
            direction: null,
            drink_pic_url: null
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSave = (event) => {
        event.preventDefault();
        event.target.reset();
        const DrinkInfo = {
            drink_id: this.state.drink_id,
            drink_title: this.state.drink_title,
            drink_description: this.state.drink_description,
            ingredients: this.state.ingredients,
            direction: this.state.direction,
            drink_pic_url: this.state.drink_pic_url
        }
        this.props.addDrinkData(DrinkInfo)
            .then(() => this.props.getDrinks())
            .then(response => {
                this.setState({
                    message: "Your drink was submitted",
                    drink_title: null,
                    drink_description: null,
                    ingredients: null,
                    direction: null,
                    drink_pic_url: null
                })
                setTimeout(() => {
                    this.setState({ message: "" })
                }, 4000);
            })

    }


    render() {
        return (
            <div className="drink-detail-card">
                <h1>Add Drink</h1>
                <div className="drink-detail-card-form">
                    <form
                        id="add-drink-form"
                        className="drink-input"
                        onSubmit={this.handleSave}
                    >

                        <label>Drink Title:</label>
                        <input
                            name="drink_title"
                            className="drink_title"
                            type="text"
                            onChange={this.handleChange}
                        />

                        <label>Drink Description:</label>
                        <textarea
                            className="drink_description"
                            type="text"
                            name="drink_description"
                            onChange={this.handleChange}
                        />

                        <label>Ingredients:</label>
                        <textarea
                            className="ingredients"
                            type="text"
                            name="ingredients"
                            onChange={this.handleChange}
                        />

                        <label>Direction</label>
                        <textarea
                            className="direction"
                            type="text"
                            name="direction"
                            onChange={this.handleChange}
                        />

                        <label>Drink Pic URL</label>
                        <input
                            className="drink_pic_url"
                            type="text"
                            name="drink_pic_url"
                            onChange={this.handleChange}
                        />

                        <div>
                            <h3>Drink Picture Preview</h3>
                            <img className="admin-drink-image" src={this.state.drink_pic_url} alt={this.state.drink_title} />
                        </div>

                        <div className="drink-submit-buttons">
                            <input id="add-drink" type="submit" value="Add Drink" />
                            <input type="reset" value="Clear Form" />
                            <p className="message">{this.state.message}</p>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}


export default AddDrink;