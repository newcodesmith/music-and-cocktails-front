import React from 'react';
import PropTypes from 'prop-types';
import { parseIngredients } from '../../utils/dataTransformers';

function UserDrinkInfoCard({ drinkInfo }) {
  const ingredients = parseIngredients(drinkInfo && drinkInfo.ingredients);

  return (
    <div className="drink-info-card">
      <h3>{drinkInfo.drink_title}</h3>
      <p>{drinkInfo.drink_description}</p>
      <div className="drink-info">
        <div className="drink-img">
          <img
            src={drinkInfo.drink_pic_url}
            alt={drinkInfo.drink_title}
            height="150"
          />
        </div>
        <div className="drink-ingredients">
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      <p>{drinkInfo.direction}</p>
    </div>
  );
}

UserDrinkInfoCard.propTypes = {
  drinkInfo: PropTypes.shape({
    drink_title: PropTypes.string,
    drink_description: PropTypes.string,
    drink_pic_url: PropTypes.string,
    ingredients: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
};

export default UserDrinkInfoCard;
