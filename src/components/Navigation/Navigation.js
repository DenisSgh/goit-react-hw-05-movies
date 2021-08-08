import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={s.navigation}>
      <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>
        Movies
      </NavLink>
    </nav>
  );
}

// Navigation.propTypes = { onSubmit: PropTypes.func.isRequired };
