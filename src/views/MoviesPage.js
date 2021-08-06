import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { fetchMoviesByQuery } from 'services/ApiService';

import s from './Views.module.css';

export default function MoviesPage() {
  const { pathname, search } = useLocation();
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const value = new URLSearchParams(location.search).get('query');
  console.log(value);

  useEffect(() => {
    if (search === '') {
      return;
    }

    // console.log(history);
    // console.log(value);
    // setQuery();
    fetchMoviesByQuery(value).then(setMovies);
    history.push({ search: `query=${value}` });
    console.log(history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    console.log(1);
    if (location.search === '') {
      return;
    }

    // console.log(2);
    // fetchMoviesByQuery(query).then(setMovies);
  }, [location.search, query]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetchMoviesByQuery(query).then(setMovies);
    history.push({ ...location, search: `query=${query}` });
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} /*className={s.SearchForm}*/>
        <input
          className={s.searchFormInput}
          type="text"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="It's time to find new movie!"
        />

        {
          <button type="submit" className={s.searchFormButton}>
            Search
          </button>
        }
      </form>

      {movies && (
        <ul>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `${pathname}/${id}`,
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

// MoviesPage.propTypes = { onSubmit: PropTypes.func.isRequired };
