import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

const Header = ()=>{
    const navigate = useNavigate();
    const navigateToProjectList = () =>{
        navigate('/');
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="cursor-pointer" onClick={navigateToProjectList}>Project Tracker</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;