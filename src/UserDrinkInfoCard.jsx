import React, { Component } from 'react';


class UserDrinkInfoCard extends Component {

    render() {
        const drinkInfo = this.props.drinkInfo;
        const drinkIngredients = drinkInfo && drinkInfo.ingredients.split('; ');
        
        return (
            <div className="drink-info-card">
                <h3>{drinkInfo.drink_title}</h3>
                <p>{drinkInfo.drink_description}</p>
                <div className="drink-info">
                    <div className="drink-img">
                        <img src={drinkInfo.drink_pic_url} alt={drinkInfo.drink_title} height="150" />
                    </div>
                    <div className="drink-ingredients">
                        <ul>
                            {drinkIngredients && drinkIngredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            )) }
                        </ul>
                    </div>
                </div>
                <p>{drinkInfo.direction}</p>
            </div>
        )
    }
}

export default UserDrinkInfoCard;