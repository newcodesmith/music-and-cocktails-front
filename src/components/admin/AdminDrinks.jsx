import React from 'react';
import PropTypes from 'prop-types';
import EditDrink from './EditDrink';
import AddDrink from './AddDrink';
import { updateDrink, deleteDrink, addDrink } from '../../services/drinkService';

function AdminDrinks({ drinksData, refreshDrinks }) {
  return (
    <div>
      <AddDrink addDrink={addDrink} refreshDrinks={refreshDrinks} />
      {drinksData
        .slice()
        .sort((a, b) => a.drink_id - b.drink_id)
        .map((drink) => (
          <EditDrink
            key={drink.drink_id}
            drink={drink}
            updateDrink={updateDrink}
            deleteDrink={deleteDrink}
            refreshDrinks={refreshDrinks}
          />
        ))}
    </div>
  );
}

AdminDrinks.propTypes = {
  drinksData: PropTypes.array.isRequired,
  refreshDrinks: PropTypes.func.isRequired,
};

export default AdminDrinks;
