import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchMovieDetails } from "../api";
import { getImgFullUrl } from "../helpers";

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
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    fetchMovieDetails(props.movieId).then((data) => {
      setMovieDetails(data);
    });
  }, []);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }
  return (
    <MovieDetailsContainer>
      <ImgContainer>
        <img src={getImgFullUrl(movieDetails.poster_path)} />
      </ImgContainer>
      <DetailsContainer>
        <h2>{movieDetails.title}</h2>
        <br />
        <SectionTitle>Overview</SectionTitle>
        <Overview>{movieDetails.overview}</Overview>
        <SectionTitle>Genres</SectionTitle>
        <Container>
          {movieDetails.genres.map((genre) => {
            return <GenreItem key={genre.id}>{genre.name}</GenreItem>;
          })}
        </Container>
        <SectionTitle>Rating</SectionTitle>
        <p>{movieDetails.vote_average}</p>
        <SectionTitle>Production companies</SectionTitle>
        <Container>
          {movieDetails.production_companies.map((company) => {
            return (
              <ProductionItem key={company.id}>
                <img src={getImgFullUrl(company.logo_path)} />
              </ProductionItem>
            );
          })}
        </Container>
      </DetailsContainer>
    </MovieDetailsContainer>
  );
}
