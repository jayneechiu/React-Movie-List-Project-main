import React, { useContext } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Tabs from "./Tabs";
import Button from "./Button";
import { Link } from "react-router-dom";
import { MyContext } from "../App";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  /* margin: 0;
  background-color: burlywood; */
`;

const LogInButtonContainer = styled.header`
  display: flex;
  margin-left: auto;
`;

export default function Header(props) {
  const { loggedinInfo, userInfo } = useContext(MyContext);
  const [loggedin, setLoggedin] = loggedinInfo;
  const [user, setUser] = userInfo;

  return (
    <HeaderContainer>
      <Logo />
      <Tabs activeTab={props.activeTab} onTabClick={props.onTabClick} />
      <LogInButtonContainer>
        <Button>
          {!loggedin ? <Link to="/login">Login</Link> : user.username}
        </Button>
      </LogInButtonContainer>
    </HeaderContainer>
  );
}
