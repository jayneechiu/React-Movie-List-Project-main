import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { fetchMovieDetails, fetchRatedMovies } from "./api";
import { getImgFullUrl } from "./helpers";
import { MyContext } from "./App";
import { postRating } from "./api";

const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 16px;
`;

const ImgContainer = styled.div`
  width: 33.33%;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailsContainer = styled.div`
  flex-grow: 1;
  margin-left: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0.5rem 0;
`;

const Overview = styled.div`
  max-height: 100px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #90cea1;
  margin-left: 1rem;
  color: white;
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const ProductionItem = styled.div`
  width: 30px;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function MovieDetails(props) {
  const {
    ratedListInfo,
    activeMovieIdInfo,
    userInfo,
    loggedinInfo
  } = useContext(MyContext);
  const [ratedList, setRatedList] = ratedListInfo;
  const [activeMovieId, setActiveMovieId] = activeMovieIdInfo;
  const [loggedin, setLoggedin] = loggedinInfo;
  const [user, setUser] = userInfo;

  const [movieDetails, setMovieDetails] = useState(null);
  const [ratedStatus, setRatedStatus] = useState(null);
  const [yourRating, setYourRating] = useState("");

  useEffect(() => {
    fetchMovieDetails(activeMovieId).then((data) => {
      setMovieDetails(data);
    });
    if (ratedList) {
      ratedList.map((result) => {
        if (result.id === activeMovieId) {
          setYourRating(result.rating);
        }
      });
    }
  }, []);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const handleSelectorClick = (e) => {
    setRatedStatus(e.target.value);
  };

  const handleSubmitRate = () => {
    if (loggedin) {
      postRating(activeMovieId, ratedStatus);
      setYourRating(ratedStatus);
    }
  };

  return (
    <MovieDetailsContainer>
      <ImgContainer>
        <img src={getImgFullUrl(movieDetails.poster_path)} alt="loading" />
      </ImgContainer>
      <DetailsContainer>
        <h2>{movieDetails.title}</h2>
        <br />
        <SectionTitle>Overview</SectionTitle>
        <Overview>{movieDetails.overview}</Overview>
        <SectionTitle>Genres</SectionTitle>
        <Container>
          {movieDetails?.genres
            ? movieDetails.genres.map((genre) => {
                return <GenreItem key={genre.id}>{genre.name}</GenreItem>;
              })
            : null}
        </Container>
        <SectionTitle>Average Rating</SectionTitle>
        <p>{movieDetails.vote_average}</p>
        <SectionTitle>Your Rating</SectionTitle>
        <p>{yourRating}</p>
        <div className="select" onChange={handleSelectorClick}>
          <select>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <button onClick={handleSubmitRate}>RATE IT!</button>
        </div>
        <SectionTitle>Production companies</SectionTitle>
        <Container>
          {movieDetails?.production_companies
            ? movieDetails.production_companies.map((company) => {
                return (
                  <ProductionItem key={company.id}>
                    <img src={getImgFullUrl(company.logo_path)} />
                  </ProductionItem>
                );
              })
            : null}
        </Container>
      </DetailsContainer>
    </MovieDetailsContainer>
  );
}
