import React from 'react';
import PropTypes from 'prop-types';
import { findById, parseIngredients } from '../../utils/dataTransformers';

function DrinkInfoCard({ drinksData, drinkId }) {
  const drink = findById(drinksData, drinkId, 'drink_id');
  const ingredients = parseIngredients(drink && drink.ingredients);

  return (
    <div className="admin-drink-info-card">
      <h1>Paired Drink Preview</h1>
      <h3>{drink && drink.drink_title}</h3>
      <div className="admin-drink-info-container">
        <div className="admin-drink-image-container">
          <img
            className="admin-drink-image"
            src={drink && drink.drink_pic_url}
            alt={drink && drink.drink_title}
          />
        </div>
        <div className="admin-drink-details">
          <ul>
            <li>{drink && drink.drink_description}</li>
            <li>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </li>
            <li>{drink && drink.direction}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

DrinkInfoCard.propTypes = {
  drinksData: PropTypes.array.isRequired,
  drinkId: PropTypes.number,
};

export default DrinkInfoCard;
