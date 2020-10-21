import React from "react";
import SideNav, {Nav, NavItem, NavText, Toggle} from './StyledSideNav';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import styled from 'styled-components';
import {Col, Image, Row} from "react-bootstrap";
import Logo from "../../assets/images/logo_n.png";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import "./SideBar.styles.css"
import {useUser} from 'reactfire'
import { isFuture } from "date-fns";

// const navWidthCollapsed = 64;
const navWidthExpanded = 250;

const NavHeader = styled.div`
    display: ${props => (props.expanded ? 'block' : 'none')};
    white-space: nowrap;    
    color: #fff;
    > * {
        color: inherit;
        background-color: inherit;
    }
`;

// height: 20px + 10px + 10px = 40px
const NavTitle = styled.div`
    font-size: 1.5em;
    line-height: 20px;
    padding: 20px 0;
`;

const NavInfoPane = styled.div`
    float: left;
    width: 100%;
    padding: 5px 20px;
    background-color: rgb(214,93,177,0.5);
`;

const Separator = styled.div`
    clear: both;
    position: relative;
    margin: 0;
    background-color: #ddd;
    height: 1px;
`;

const MyDiv = ({expanded}) => {

    var user = useUser();
    if(user != null){
        return(
            <NavHeader expanded={expanded} style={{backgroundColor: "#fff"}}>
            <NavTitle>
                <i><Image className={"ml-2 mb-1"} src={Logo} style={{height: "60px"}} fluid/></i>
                <p style={{display: "inline", fontSize: "25px", marginLeft: "35px", color: "#5E90F2 "}}
                   className={"mt-2"}>WeStudy </p>
            </NavTitle>
            <NavInfoPane style={{backgroundColor: "#5E90F2", backgroundPosition: "center", minHeight: "50px"}}>
                <Row>
                    <Col xs={3}>
                        <FontAwesomeIcon icon={faUserCircle}
                                         style={{fontSize: "3em", marginTop: "15px", color: "#fff"}}/>
                    </Col>
                    <Col >
                        <p className={"mt-3"} style={{fontWeight: "bold", color: "#fff"}}>  {user.displayName != null ? user.displayName:"" } </p>
                        <p style={{marginTop: "-15px", color: "#fff"}}> {user.email != null ? user.email:"" } </p>
                    </Col>
                </Row>
                <hr/>
            </NavInfoPane>  
        </NavHeader>
            );
    } else {
        return(
            <div></div>
        )
    }
      
 }

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true  
        }
    }

    render() {
        const {expanded} = this.state;
        const navItems = this.props.data.map((row) => {
            return (
                <NavItem eventKey={row.id} key={row.id} style={{height: "60px",backgroundColor: "#5E90F2"}}
                         className={"mt-0"}>
                    <NavText style={{color: "#fff", display: "true",backgroundColor: "#5E90F2", fontSize:"18px"}}>
                        <img src={"/icons/"+row.icon+".png"} style={{width: "20px", color: "#fff", marginRight: "10px", marginLeft:"70px"}} alt=""/>
                        {row.text}
                    </NavText>
                    <Separator className={"mt-2"} />
                </NavItem>

            );
        });
        return (
            <SideNav
                className="sticky"
                style={{minWidth: expanded ? navWidthExpanded : navWidthExpanded, backgroundColor:"#5E90F2"}}
                onSelect={(selected) => {
                    this.props.handler(selected);
                }}
                onToggle={() => {
                    this.setState({expanded: true});
                }}

            >
                <Toggle style={{backgroundColor: expanded ? "#A30021" : "#A30021", height: "57px", display: "none"}}/>
                <MyDiv expanded={true} />
                <Nav defaultSelected="home" style={{backgroundColor: "#5E90F2"}}>
                    {navItems}
                </Nav>
            </SideNav>


        );
    }
}

export default SideBar;