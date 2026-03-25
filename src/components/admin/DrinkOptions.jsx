import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DrinkInfoCard from './DrinkInfoCard';
import { getDrinks } from '../../services/drinkService';

function DrinkOptions({ drinkValue, updateDrinkSelection }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    getDrinks()
      .then(setDrinks)
      .catch((err) => console.error('Failed to load drinks for selector:', err));
  }, []);

  const options = drinks
    .slice()
    .sort((a, b) => a.drink_id - b.drink_id)
    .map((drink) => ({ value: `${drink.drink_id}`, label: drink.drink_title }));

  const selectedOption = options.find((o) => parseInt(o.value, 10) === drinkValue) || null;

  return (
    <div>
      <Select
        name="album_drink_id"
        value={selectedOption}
        options={options}
        onChange={updateDrinkSelection}
      />
      <DrinkInfoCard drinksData={drinks} drinkId={drinkValue} />
    </div>
  );
}

DrinkOptions.propTypes = {
  drinkValue: PropTypes.number,
  updateDrinkSelection: PropTypes.func.isRequired,
};

export default DrinkOptions;
