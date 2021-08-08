import axios from 'axios';

const OPTIONS = {
  BASE_URL: 'https://api.themoviedb.org/3',
  BASE_KEY: '7afb37c16bf112edc982358dc9ffe64a',
  MEDIA_TYPE: 'movie',
  TIME_WINDOW: 'day',
};

async function fetchTrendMovies() {
  const { BASE_URL, BASE_KEY, MEDIA_TYPE, TIME_WINDOW } = OPTIONS;

  const data = await axios
    .get(
      `${BASE_URL}/trending/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${BASE_KEY}&language=en-US&page=1&include_adult=false`,
    )
    .then(resp => resp.data.results);
  return data;
}

async function fetchMoviesByQuery(query) {
  const { BASE_URL, BASE_KEY } = OPTIONS;

  const data = await axios
    .get(
      `${BASE_URL}/search/movie?api_key=${BASE_KEY}&query=${query}&language=en-US&page=1&include_adult=false`,
    )
    .then(resp => resp.data.results);
  return data;
}

async function fetchMovieById(id) {
  const { BASE_URL, BASE_KEY } = OPTIONS;

  const data = await axios
    .get(`${BASE_URL}/movie/${id}?api_key=${BASE_KEY}&language=en-US`)
    .then(resp => resp.data);
  return data;
}

async function fetchActorsCast(id) {
  const { BASE_URL, BASE_KEY } = OPTIONS;

  const data = await axios
    .get(`${BASE_URL}/movie/${id}/credits?api_key=${BASE_KEY}&language=en-US`)
    .then(resp => resp.data.cast);
  return data;
}

async function fetchMovieReviews(id) {
  const { BASE_URL, BASE_KEY } = OPTIONS;

  const data = await axios
    .get(
      `${BASE_URL}/movie/${id}/reviews?api_key=${BASE_KEY}&language=en-US&page=1`,
    )
    .then(resp => resp.data.results);
  return data;
}

export {
  fetchTrendMovies,
  fetchMoviesByQuery,
  fetchMovieById,
  fetchActorsCast,
  fetchMovieReviews,
};
