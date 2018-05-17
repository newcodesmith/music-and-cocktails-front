import React, { Component } from 'react';

class DrinkInfoCard extends Component {

    render() {
        const drinkInfo = this.props.drinksData;
        const selectedDrink = this.props.drinkId;
        const singleDrink = drinkInfo.filter(drink => {
            if (drink.drink_id === selectedDrink) {
                return drink
            }
        })[0];

        return (
            <div className="admin-drink-info-card">
                <h1>Paired Drink Preview</h1>
                <h3>{singleDrink && singleDrink.drink_title}</h3>
                <div className="admin-drink-info">
                    <div className="">
                        <img src={singleDrink && singleDrink.drink_pic_url} alt={singleDrink && singleDrink.drink_title} height="150" />
                    </div>
                    <div className="">
                        <ul>
                            <li>{singleDrink && singleDrink.drink_description}</li>
                            <li>{singleDrink && singleDrink.ingredients}</li>
                            <li>{singleDrink && singleDrink.direction}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
        // }
        // }
    }
}

export default DrinkInfoCard;