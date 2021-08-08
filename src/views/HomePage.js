import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendMovies } from 'services/ApiService';

import s from './Views.module.css';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrendMovies().then(setMovies);
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <>
      <h1 className={s.homePageTitle}>Trending today</h1>

      {movies && (
        <ul className={s.homePageList}>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id} className={s.homePageItem}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: {
                    from: location,
                  },
                }}
                className={s.homePageLink}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt={title}
                  className={s.movieImage}
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
