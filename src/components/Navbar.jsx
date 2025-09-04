import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

function CustomNavbar({children}) {
  return (
    <Navbar fixed="top" bg="white" style={{height: "70px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"}}>
      <Container>
        <Navbar.Brand><Link to='/home/all'><img className="logo" src={Logo} alt="" /> <b>QuickContact</b></Link></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {children}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;