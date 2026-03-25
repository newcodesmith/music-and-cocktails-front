import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_TIMEOUT_MS } from '../../utils/constants';

function EditDrink({ drink, updateDrink, deleteDrink, refreshDrinks }) {
  const [fields, setFields] = useState({ ...drink });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateDrink(fields);
      await refreshDrinks();
      setMessage('Your drink was updated');
    } catch {
      setMessage('Failed to update drink. Please try again.');
    }
    setTimeout(() => setMessage(''), MESSAGE_TIMEOUT_MS);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDrink(drink.drink_id);
      await refreshDrinks();
    } catch {
      setMessage('Failed to delete drink. Please try again.');
      setTimeout(() => setMessage(''), MESSAGE_TIMEOUT_MS);
    }
  };

  return (
    <div className="drink-detail-card">
      <h1>Update Drink</h1>
      <div className="drink-detail-card-form">
        <form className="drink-input" onSubmit={handleSave}>
          <label>Drink Title:</label>
          <input type="text" name="drink_title" onChange={handleChange} defaultValue={drink.drink_title} />

          <label>Drink Description:</label>
          <textarea name="drink_description" onChange={handleChange} defaultValue={drink.drink_description} />

          <label>Ingredients:</label>
          <textarea name="ingredients" onChange={handleChange} defaultValue={drink.ingredients} />

          <label>Direction</label>
          <textarea name="direction" onChange={handleChange} defaultValue={drink.direction} />

          <label>Drink Pic URL</label>
          <input type="text" name="drink_pic_url" onChange={handleChange} defaultValue={drink.drink_pic_url} />

          <div>
            <h3>Drink Picture Preview</h3>
            <img
              className="admin-drink-image"
              src={fields.drink_pic_url}
              alt={drink.drink_title}
              height="250"
            />
          </div>

          <div className="drink-submit-buttons">
            <input type="submit" value="Update Drink" />
            <input type="button" value="Delete Drink" onClick={handleDelete} />
          </div>

          <p className="button-delete-message">
            **In order to delete a drink, this drink cannot be assigned to an
            album. First remove drink from album then delete.**
          </p>
          <p className="message">{message}</p>
        </form>
      </div>
    </div>
  );
}

EditDrink.propTypes = {
  drink: PropTypes.shape({
    drink_id: PropTypes.number,
    drink_title: PropTypes.string,
    drink_description: PropTypes.string,
    ingredients: PropTypes.string,
    direction: PropTypes.string,
    drink_pic_url: PropTypes.string,
  }).isRequired,
  updateDrink: PropTypes.func.isRequired,
  deleteDrink: PropTypes.func.isRequired,
  refreshDrinks: PropTypes.func.isRequired,
};

export default EditDrink;
