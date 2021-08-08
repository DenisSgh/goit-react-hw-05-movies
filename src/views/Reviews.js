import { useState, useEffect } from 'react';
import { fetchMovieReviews } from 'services/ApiService';

import s from './Views.module.css';

export default function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={s.reviewsItem}>
              <p className={s.reviewsName}>Author: {author}</p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie 🙁</p>
      )}
    </>
  );
}

// Reviews.propTypes = { onSubmit: PropTypes.func.isRequired };
