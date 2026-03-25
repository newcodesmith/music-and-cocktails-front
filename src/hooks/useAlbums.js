import { useState, useEffect, useCallback } from 'react';
import { getAlbums } from '../services/albumService';

export function useAlbums() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    getAlbums()
      .then(setAlbums)
      .catch(() => setError('Could not load albums. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { albums, loading, error, refresh };
}
