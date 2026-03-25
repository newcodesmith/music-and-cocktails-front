import { useState, useEffect, useCallback } from 'react';
import { getDrinks } from '../services/drinkService';

export function useDrinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    getDrinks()
      .then(setDrinks)
      .catch(() => setError('Could not load drinks. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { drinks, loading, error, refresh };
}
