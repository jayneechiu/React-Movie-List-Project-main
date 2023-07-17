import styled from "styled-components";

export default styled.li`
  list-style: none;
  margin-left: 3rem;
  font-size: 1.5rem;
  ${(props) =>
    props.active &&
    `
    &::after {
      content: "";
      width: 100%;
      height: 5px;
      display: block;
      background-color: #01b4e4;
    }
  `}
`;
