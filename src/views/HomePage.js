import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendMovies } from 'services/ApiService';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrendMovies().then(setMovies);
  }, []);

  return (
    <>
      <h1>Trending today</h1>

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                {/* <img src={movie.poster_path} alt={movie.title} /> */}
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// HomePage.propTypes = { onSubmit: PropTypes.func.isRequired };
