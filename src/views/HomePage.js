import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendMovies } from 'services/ApiService';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrendMovies().then(setMovies);
  }, []);

  return (
    <>
      <h1>Trending today</h1>

      {movies && (
        <ul>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt={title}
                />
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// HomePage.propTypes = { onSubmit: PropTypes.func.isRequired };
