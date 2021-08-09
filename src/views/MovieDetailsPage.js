import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { fetchMovieById } from 'services/ApiService';
import Loader from 'components/Loader';

import s from './Views.module.css';

const Cast = lazy(() => import('views/Cast' /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import('views/Reviews' /* webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const {
    url,
    params: { movieId },
  } = useRouteMatch();
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    history.push({
      pathname: state?.from?.pathname ?? '/movies',
    });

    if (state?.from?.pathname !== '/') {
      history.push({
        search: state?.from?.search ?? '',
      });
    }
  };

  return (
    <>
      <button type="button" className={s.goBackButton} onClick={handleGoBack}>
        Go back
      </button>

      {movie && (
        <section className={s.detailsSection}>
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={s.detailsContainer}>
            <h1 className={s.detailsTitle}>{movie.title}</h1>
            <p className={s.detailsScore}>
              User Score: {movie.vote_average * 10}%
            </p>
            <p className={s.detailsOverview}>Overview</p>
            <p>{movie.overview}</p>
            <p className={s.detailsGenres}>Genres:</p>
            <ul className={s.detailsGenresList}>
              {movie.genres.map(({ id, name }) => (
                <li key={id} className={s.detailsGenresItem}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <NavLink
        to={{
          pathname: `${url}/cast`,
          state: {
            from: {
              pathname: state?.from?.pathname,
              search: state?.from?.search,
            },
          },
        }}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Cast
      </NavLink>
      <NavLink
        to={{
          pathname: `${url}/reviews`,
          state: {
            from: {
              pathname: state?.from?.pathname,
              search: state?.from?.search,
            },
          },
        }}
        className={s.link}
        activeClassName={s.activeLink}
      >
        Reviews
      </NavLink>

      <Suspense fallback={<Loader />}>
        <Route
          path={`${url}/cast`}
          render={() => <Cast movieId={movieId} />}
        ></Route>
        <Route
          path={`${url}/reviews`}
          render={() => <Reviews movieId={movieId} />}
        ></Route>
      </Suspense>
    </>
  );
}

// MovieDetailsPage.propTypes = { onSubmit: PropTypes.func.isRequired };
