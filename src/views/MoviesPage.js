import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { fetchMoviesByQuery } from 'services/ApiService';

import s from './Views.module.css';

export default function MoviesPage() {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (search !== '') {
      return;
    }

    history.push({ search: `query=${query}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    fetchMoviesByQuery(query).then(setMovies);
    // setQuery('');
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
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `${pathname}/${id}`,
                  state: { backUrl: pathname, query },
                }}
              >
                {/* <img src={poster_path} alt={title} /> */}
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
