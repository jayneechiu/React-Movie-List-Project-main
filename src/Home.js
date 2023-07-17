import React, { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Pagination from "./components/Pagination";
import MovieCardList from "./components/MovieCardList";
import { CATEGORIES, TABS } from "./contants";
import CategorySelector from "./components/CategorySelector";
import {
  fetchFavouriteMovieList,
  fetchMoviesByCategory,
  fetchRatedMovies
} from "./api";
import { MyContext } from "./App";

const AppContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;

export default function Home() {
  const {
    loggedinInfo,
    userInfo,
    likedListInfo,
    activeMovieIdInfo,
    ratedListInfo
  } = useContext(MyContext);
  const [loggedin, setLoggedin] = loggedinInfo;
  const [user, setUser] = userInfo;
  const [likedList, setLikedList] = likedListInfo;
  const [activeMovieId, setActiveMovieId] = activeMovieIdInfo;
  const [ratedList, setRatedList] = ratedListInfo;
  const [movieList, setMovieList] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
  const [currentCategory, setCurrentCategory] = useState(
    CATEGORIES.NOW_PLAYING.value
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchRatedMovies(user.accountId, user.sessionId).then((data) => {
      setRatedList(data.results);
    });
  }, [loggedin]);

  const likedMoviesMap = useMemo(() => {
    if (likedList?.length) {
      return likedList.reduce((acc, likedMovie) => {
        acc[likedMovie.id] = likedMovie;
        return acc;
      }, {});
    }
  }, [likedList]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

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

  useEffect(() => {
    fetchMoviesByCategory(currentCategory, currentPage).then((data) => {
      setMovieList(data.results);
      setTotalPages(data.total_pages);
    });
  }, [currentCategory, currentPage]);

  useEffect(() => {
    fetchFavouriteMovieList(user.accountId, user.sessionId).then((data) => {
      setLikedList(data.results);
    });
  }, [loggedin]);

  const handleClickPrev = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handleClickNext = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleMovieTitleClick = (movieId) => {
    setActiveMovieId(movieId);
    navigate("/detail");
  };

  const isHomeTab = activeTab === TABS.HOME;

  const currentMovieList = isHomeTab ? movieList : likedList;

  return (
    <AppContainer>
      {isHomeTab && (
        <CategorySelector
          category={currentCategory}
          onChange={handleCategoryChange}
        />
      )}

      {isHomeTab && (
        <Pagination
          onClickPrev={handleClickPrev}
          onClickNext={handleClickNext}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
      <MovieCardList
        movieList={currentMovieList}
        // likedMovieList={likedList}
        likedMoviesMap={likedMoviesMap}
        onToggleLike={handleToggleLike}
        onTitleClick={handleMovieTitleClick}
      />
    </AppContainer>
  );
}
