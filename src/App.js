import React, { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "./styles.css";
import styled from "styled-components";
import { TABS } from "./contants";
import Home from "./Home";
import Favourite from "./Favourite";
import Rated from "./Rated";
import Login from "./Login";
import Detail from "./Detail";

const AppContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;

export const MyContext = createContext();

export default function App() {
  const [loggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [likedList, setLikedList] = useState([]);
  const [ratedList, setRatedList] = useState([]);
  const [activeTab, setActiveTab] = useState(TABS.HOME);
  const [activeMovieId, setActiveMovieId] = useState(null);

  const contextValue = {
    userInfo: [user, setUser],
    loggedinInfo: [loggedin, setLoggedin],
    activeTabInfo: [activeTab, setActiveTab],
    likedListInfo: [likedList, setLikedList],
    ratedListInfo: [ratedList, setRatedList],
    activeMovieIdInfo: [activeMovieId, setActiveMovieId]
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AppContainer>
      <MyContext.Provider value={contextValue}>
        <BrowserRouter>
          <Header activeTab={activeTab} onTabClick={handleTabClick} />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/rated" element={<Rated />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </MyContext.Provider>
    </AppContainer>
  );
}
