import { useState, useEffect } from 'react';
import {
  Route,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { fetchMovieById } from 'services/ApiService';

import Cast from 'views/Cast';
import Reviews from 'views/Reviews';
import s from './Views.module.css';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const {
    url,
    params: { movieId },
  } = useRouteMatch();
  const { state } = useLocation();
  const history = useHistory();
  // console.log(state);

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    // history.push(state?.backUrl || '/movies');
    // console.log(state?.from?.location);
    // console.log(state?.backUrl);
    // console.log(state);
    console.log(state);
    history.push({
      pathname: state?.from?.pathname ?? '/movies',
    });

    if (state?.from.pathname !== '/') {
      history.push({
        search: state.from.search,
      });
    }
  };

  // useEffect(() => {
  //   console.log(movie);
  // }, [movie]);

  return (
    <>
      <button
        type="button"
        className={s.searchFormButton}
        onClick={handleGoBack}
      >
        Go back
      </button>

      {movie && (
        <section>
          <img
            src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
            alt={movie.title}
          />
          <h1>{movie.title}</h1>
          <p>User Score: {movie.vote_average * 10}%</p>
          <b>Overview</b>
          <p>{movie.overview}</p>
          <b>Genres</b>
          <ul>
            {movie.genres.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </section>
      )}

      <NavLink
        to={`${url}/cast`}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Cast
      </NavLink>
      <NavLink
        to={`${url}/reviews`}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Reviews
      </NavLink>
      <hr />

      <Route
        path={`${url}/cast`}
        render={() => <Cast movieId={movieId} />}
      ></Route>
      <Route
        path={`${url}/reviews`}
        render={() => <Reviews movieId={movieId} />}
      ></Route>
    </>
  );
}

// MovieDetailsPage.propTypes = { onSubmit: PropTypes.func.isRequired };
