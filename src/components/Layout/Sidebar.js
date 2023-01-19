import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Sidebar.module.css";
import { showActions } from "../../store/showSlice";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { Badge } from "react-bootstrap";
import { faPencil, faInbox, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const unreadMessageCount = useSelector(state => state.inbox.unreadMessageCount);
  
  const dispatch = useDispatch();

  const composeHandler = () => {
    dispatch(showActions.compose());
  };

  const sentHandler = () => {
    dispatch(showActions.sent());
  };

  const receivedHandler = () => {
    dispatch(showActions.received());
  };

  const visibilityHandler = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <SideNav>
      <SideNav.Toggle onClick={visibilityHandler} />
      <SideNav.Nav defaultSelected="none">
        <NavItem eventKey="compose" onClick={composeHandler}>
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>
            <FontAwesomeIcon icon={faPencil} style={{marginRight: "1rem"}} />
            Compose Mail
          </NavText>
        </NavItem>
        <NavItem eventKey="inbox" onClick={receivedHandler}>
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>
            <FontAwesomeIcon icon={faInbox} style={{marginRight: "1rem"}} />
            Inbox
            <Badge bg="secondary">
              { " " }
              { unreadMessageCount } : unread
            </Badge>
          </NavText>
        </NavItem>
        <NavItem eventKey="Sent" onClick={sentHandler}>
          <NavIcon>
            <i
              className="fa fa-fw fa-line-chart"
              style={{ fontSize: "1.75em" }}
            />
          </NavIcon>
          <NavText>
            <FontAwesomeIcon icon={faPaperPlane} style={{marginRight: "1rem"}} />
            Sent Mails
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default Sidebar;
