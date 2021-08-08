import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import Container from 'components/Container';
import Navigation from 'components/Navigation';
import Loader from 'components/Loader';

const HomePage = lazy(() =>
  import('views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    'views/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);

export default function App() {
  return (
    <Container>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/movies/:movieId" component={MovieDetailsPage}></Route>
          <Route path="/movies" component={MoviesPage}></Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
