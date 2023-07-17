import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MovieCardList from "./components/MovieCardList";
import { MyContext } from "./App";
import { fetchRatedMovies } from "./api";

const AppContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;

export default function Rated() {
  const { loggedinInfo, userInfo, likedListInfo, ratedListInfo } = useContext(
    MyContext
  );
  const [loggedin, setLoggedin] = loggedinInfo;
  const [user, setUser] = userInfo;
  const [likedList, setLikedList] = likedListInfo;
  const [ratedList, setRatedList] = ratedListInfo;
  const [activeMovieId, setActiveMovieId] = useState(null);
  const navigate = useNavigate();

  const likedMoviesMap = useMemo(() => {
    if (likedList?.length) {
      return likedList.reduce((acc, likedMovie) => {
        acc[likedMovie.id] = likedMovie;
        return acc;
      }, {});
    }
  }, [likedList]);

  useEffect(() => {
    fetchRatedMovies(user.accountId, user.sessionId).then((data) => {
      setRatedList(data.results);
    });
  }, [loggedin]);

  const handleToggleLike = (movie) => {
    const hasLiked = likedMoviesMap[movie.id];

    if (loggedin) {
      if (hasLiked) {
        setLikedList(
          likedList.filter((likedMovie) => {
            return likedMovie.id !== movie.id;
          })
        );
      } else {
        setLikedList([...likedList, movie]);
      }
    } else return null;
  };

  const handleMovieTitleClick = (movieId) => {
    setActiveMovieId(movieId);
    navigate("/detail");
  };

  const currentMovieList = ratedList;

  return (
    <AppContainer>
      {loggedin && (
        <MovieCardList
          movieList={currentMovieList}
          likedMovieList={likedList}
          likedMoviesMap={likedMoviesMap}
          onToggleLike={handleToggleLike}
          onTitleClick={handleMovieTitleClick}
        />
      )}
    </AppContainer>
  );
}
