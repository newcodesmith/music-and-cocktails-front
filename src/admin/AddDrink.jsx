import React, { Component } from "react";

class AddDrink extends Component {
    
    state={message: ""};

    constructor() {
        super();
        this._onClick = this._onClick.bind(this);
    }

    getFormData(e) {
        return {
            drink_title: this.drink_title.value,
            drink_description: this.drink_description.value,
            ingredients: this.ingredients.value,
            direction: this.direction.value,
            drink_pic_url: this.drink_pic_url.value,
        };
    }

    postFormData() {
        const postUrl = "http://localhost:3000/drinks";
        let myData = JSON.stringify(this.getFormData());
        console.log(myData);

        fetch(postUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: myData
        })
            .then(response => response.json())
            .then(response => {
                this.setState({message: "Your drink was submitted"})
                setTimeout(() => {
                    this.setState({message: ""})
                }, 4000);
            })
            .catch(err => console.log(err));
        document.querySelector(".drink-input").reset();
    }

    _onClick(e) {
        if (e.target.id === "add-drink") {
            this.getFormData();
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.postFormData();
    }

    render() {
        return (
            <div className="drink-detail-card" >
                <div className="drink-detail-card-form">
                    <h1>Add Drink</h1>
                    <form
                        className="drink-input"
                        onClick={this._onClick}
                        onSubmit={e => this.onSubmit(e)}
                    >

                        <label>Drink Title:</label>
                        <input
                            id="drink_title"
                            type="text"
                            ref={input => (this.drink_title = input)}
                        />

                        <label>Drink Description:</label>
                        <textarea
                            id="drink_description"
                            type="text"
                            ref={input => (this.drink_description = input)}
                        />

                        <label>Ingredients:</label>
                        <textarea
                            id="ingredients"
                            type="text"
                            ref={input => (this.ingredients = input)}
                        />

                        <label>Direction</label>
                        <textarea
                            id="direction"
                            type="text"
                            ref={input => (this.direction = input)}
                        />

                        <label>Drink Pic URL</label>
                        <input
                            id="drink_pic_url"
                            type="text"
                            ref={input => (this.drink_pic_url = input)}
                        />

                        <input id="add-drink" type="submit" value="Add Drink" />
                        <input type="reset" value="Clear Form" />
                        <p className="message">{this.state.message}</p>
                    </form>
                </div>
            </div>
        )
    }
}


export default AddDrink;