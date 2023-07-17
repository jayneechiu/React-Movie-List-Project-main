import axios from "axios";

export const API_KEY = `a673202e33dc6c3ced211135f08ea604`;

export const fetchMoviesByCategory = (category, page) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};

export const fetchMovieDetails = (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};

export const fetchUserInformation = (category, page) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};

export const fetchFavouriteMovie = (movie, accountId, sessionId, liked) => {
  axios.post(
    `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
    {
      media_type: "movie",
      media_id: movie.id,
      favorite: !liked
    }
  );
};

export const fetchFavouriteMovieList = (accountId, sessionId) => {
  const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};

export const postRating = (movieId, rating) => {
  axios.post(
    `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}`,
    {
      value: rating
    }
  );
};

export const fetchRatedMovies = (accountId, sessionId) => {
  const url = `https://api.themoviedb.org/3/account/${accountId}/rated/movies?api_key=${API_KEY}&language=en-US&session_id=${sessionId}&sort_by=created_at.asc&page=1`;

  return fetch(url).then((resp) => {
    return resp.json();
  });
};
