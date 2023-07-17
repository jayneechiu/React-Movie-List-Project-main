import React, { useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MovieCardList from "./components/MovieCardList";
import { MyContext } from "./App";

const AppContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;

export default function Favourite() {
  const { loggedinInfo, userInfo, likedListInfo } = useContext(MyContext);
  const [loggedin, setLoggedin] = loggedinInfo;
  const [likedList, setLikedList] = likedListInfo;
  const navigate = useNavigate();

  const likedMoviesMap = useMemo(() => {
    if (likedList?.length) {
      return likedList.reduce((acc, likedMovie) => {
        acc[likedMovie.id] = likedMovie;
        return acc;
      }, {});
    }
  }, [likedList]);

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
    navigate("/detail");
  };

  const currentMovieList = likedList;

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
