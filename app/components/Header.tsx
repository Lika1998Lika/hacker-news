'use client';
import React from 'react'
import Link from 'next/link';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand>Hacker News</Navbar.Brand>
      <Nav className="me-end">
        <Nav.Link href="/" as={Link}>Home</Nav.Link>
      </Nav>
    </Container>
  </Navbar>

  )
}
 export default Header;