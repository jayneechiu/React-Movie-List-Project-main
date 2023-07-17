import styled from "styled-components";
import MovieCard from "./MovieCard";

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
`;

export default function MovieCardList(props) {
  return (
    <ListContainer>
      {props.movieList.map((movie) => {
        const isLiked = props.likedMoviesMap
          ? props.likedMoviesMap.hasOwnProperty(movie.id)
          : false;
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            liked={isLiked}
            onToggleLike={props.onToggleLike}
            onTitleClick={props.onTitleClick}
          />
        );
      })}
    </ListContainer>
  );
}
