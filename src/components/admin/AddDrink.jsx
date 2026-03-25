import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_TIMEOUT_MS } from '../../utils/constants';

const emptyForm = {
  drink_title: '',
  drink_description: '',
  ingredients: '',
  direction: '',
  drink_pic_url: '',
};

function AddDrink({ addDrink, refreshDrinks }) {
  const [fields, setFields] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addDrink(fields);
      await refreshDrinks();
      setFields(emptyForm);
      formRef.current && formRef.current.reset();
      setMessage('Your drink was submitted');
    } catch {
      setMessage('Failed to add drink. Please try again.');
    }
    setTimeout(() => setMessage(''), MESSAGE_TIMEOUT_MS);
  };

  return (
    <div className="drink-detail-card">
      <h1>Add Drink</h1>
      <div className="drink-detail-card-form">
        <form ref={formRef} id="add-drink-form" className="drink-input" onSubmit={handleSave}>
          <label>Drink Title:</label>
          <input type="text" name="drink_title" onChange={handleChange} />

          <label>Drink Description:</label>
          <textarea name="drink_description" onChange={handleChange} />

          <label>Ingredients:</label>
          <textarea name="ingredients" onChange={handleChange} />

          <label>Direction</label>
          <textarea name="direction" onChange={handleChange} />

          <label>Drink Pic URL</label>
          <input type="text" name="drink_pic_url" onChange={handleChange} />

          <div>
            <h3>Drink Picture Preview</h3>
            <img
              className="admin-drink-image"
              src={fields.drink_pic_url}
              alt={fields.drink_title}
            />
          </div>

          <div className="drink-submit-buttons">
            <input type="submit" value="Add Drink" />
            <input type="reset" value="Clear Form" />
            <p className="message">{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

AddDrink.propTypes = {
  addDrink: PropTypes.func.isRequired,
  refreshDrinks: PropTypes.func.isRequired,
};

export default AddDrink;
