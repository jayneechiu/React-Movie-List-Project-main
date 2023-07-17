import React, { useContext } from "react";
import styled from "styled-components";
import Tab from "./Tab";
import { TABS } from "../contants";
import { MyContext } from "../App";
import { Link } from "react-router-dom";
// import { UserContext } from "../App";

const TabsContainer = styled.ul`
  display: flex;
`;

export default function Tabs(props) {
  const { activeTabInfo } = useContext(MyContext);
  const [activeTab, setActiveTab] = activeTabInfo;

  const tabs = Object.values(TABS);
  return (
    <TabsContainer>
      {tabs.map((tab) => {
        return (
          <Tab
            key={tab.title}
            active={props.activeTab === tab}
            onClick={() => props.onTabClick(tab)}
          >
            <Link to={tab.url}>{tab.title}</Link>
          </Tab>
        );
      })}
    </TabsContainer>
  );
}
