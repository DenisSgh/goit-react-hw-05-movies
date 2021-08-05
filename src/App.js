// import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from 'components/Container';
import Navigation from 'components/Navigation';
import HomePage from 'views/HomePage';
import MoviesPage from 'views/MoviesPage';
import MovieDetailsPage from 'views/MovieDetailsPage';

export default function App() {
  return (
    <Container>
      <Navigation />

      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/movies" component={MoviesPage}></Route>
        <Route path="/movies/:movieId" component={MovieDetailsPage}></Route>
      </Switch>
    </Container>
  );
}
