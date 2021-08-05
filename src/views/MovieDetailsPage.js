import { useState, useEffect } from 'react';
import { /*Link*/ useParams, useLocation, useHistory } from 'react-router-dom';
import { fetchMovieById } from 'services/ApiService';

import s from './Views.module.css';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const { movieId } = useParams();
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);
    // console.log(movie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGoBack = () => {
    history.push({
      pathname: state?.backUrl || '/movies',
      search: `query=${state.query}`,
    });
  };

  return (
    <>
      <button
        type="button"
        className={s.searchFormButton}
        onClick={handleGoBack}
      >
        Go back
      </button>

      <h2>{movie.title}</h2>
      {/* <Link to={`/movies/:movieId/cast`}>Cast</Link>
      <Link to={`/movies/:movieId/reviews `}>Rewievs</Link> */}
    </>
  );
}

// MovieDetailsPage.propTypes = { onSubmit: PropTypes.func.isRequired };
