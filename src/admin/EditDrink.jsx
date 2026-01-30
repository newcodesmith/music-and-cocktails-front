import React, { Component } from "react";

class EditDrink extends Component {
  constructor() {
    super();
    this.state = {
      ...this.props,
    };
  }
  

  componentDidMount() {
    const newState = {
      ...this.state,
      ...this.props,
    };
    this.setState(newState);    
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSave = (event) => {
    event.preventDefault();
    const updatedDrinkInfo = {
      drink_id: this.state.drink_id,
      drink_title: this.state.drink_title,
      drink_description: this.state.drink_description,
      ingredients: this.state.ingredients,
      direction: this.state.direction,
      drink_pic_url: this.state.drink_pic_url,
    };
    this.props
      .updateDrinkData(updatedDrinkInfo)
      .then(() => this.props.getDrinks())
      .then((response) => {
        this.setState({ message: "Your drink was updated" });
        setTimeout(() => {
          this.setState({ message: "" });
        }, 4000);
      });
  };

  handleDelete = (event) => {
    event.preventDefault();
    let drinkId = this.state.drink_id;
    this.props.deleteDrinkData(drinkId).then(() => this.props.getDrinks());
  };

  render() {
    return (
      <div className="drink-detail-card">
        <h1>Update Drink</h1>
        <div className="drink-detail-card-form">
          <form className="drink-input" onSubmit={this.handleSave}>
            <div className="form-id" hidden>
              <label>Drink ID:</label>
              <input
                className="drink-id"
                type="text"
                name="drink_id"
                value={this.props.drink_id}
                onChange={this.handleChange}
              />
            </div>

            <label>Drink Title:</label>
            <input
              name="drink_title"
              className="drink_title"
              type="text"
              onChange={this.handleChange}
              defaultValue={this.props.drink_title}
            />

            <label>Drink Description:</label>
            <textarea
              className="drink_description"
              type="text"
              name="drink_description"
              onChange={this.handleChange}
              defaultValue={this.props.drink_description}
            />

            <label>Ingredients:</label>
            <textarea
              className="ingredients"
              type="text"
              name="ingredients"
              onChange={this.handleChange}
              defaultValue={this.props.ingredients}
            />

            <label>Direction</label>
            <textarea
              className="direction"
              type="text"
              name="direction"
              onChange={this.handleChange}
              defaultValue={this.props.direction}
            />

            <label>Drink Pic URL</label>
            <input
              className="drink_pic_url"
              type="text"
              name="drink_pic_url"
              onChange={this.handleChange}
              defaultValue={this.props.drink_pic_url}
            />

            <div>
              <h3>Drink Picture Preview</h3>
              <img
                className="admin-drink-image"
                src={this.props.drink_pic_url}
                alt={this.props.drink_title}
                height="250"
              />
            </div>

            <div className="drink-submit-buttons">
              <input
                name="update-drink"
                type="submit"
                onClick={this.handleSave.bind(this)}
                value="Update Drink"
              />
              <input
                name="delete-drink"
                type="submit"
                onClick={this.handleDelete.bind(this)}
                value="Delete Drink"
              />
            </div>
            <p className="button-delete-message">
              **In order to delete a drink, this drink cannot be assigned to an
              album. First remove drink from album then delete.**
            </p>
            <p className="message">{this.state.message}</p>
          </form>
        </div>
      </div>
    );
  }
}

export default EditDrink;
