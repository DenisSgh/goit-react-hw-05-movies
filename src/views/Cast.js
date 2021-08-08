import { useState, useEffect } from 'react';
import { fetchActorsCast } from 'services/ApiService';

import s from './Views.module.css';

export default function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchActorsCast(movieId).then(setCast);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cast.length > 0 ? (
        <ul className={s.castList}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={s.castItem}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                  alt={name}
                />
              ) : (
                <img
                  src={
                    'https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg'
                  }
                  alt={name}
                  width="200"
                />
              )}
              <p className={s.castName}>{name}</p>
              <p className={s.castCharacter}>
                <span className={s.boldSpan}>Character: </span>
                {character}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any information about cast for this movie 🙁</p>
      )}
    </>
  );
}

// Cast.propTypes = { onSubmit: PropTypes.func.isRequired };
