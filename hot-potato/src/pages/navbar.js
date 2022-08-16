    import React, { useState } from 'react';
import {

  Navbar,
  NavbarToggler,
  NavbarBrand,

  NavbarText,
} from 'reactstrap';
import '../style/navbar.css'

function NavbarFunc(props){
   

console.log(`This is props: ${props}`)

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar className='navbar-container'>
        <NavbarBrand href="/">HOT POTATO</NavbarBrand>
        <NavbarToggler onClick={toggle} />
      
          <NavbarText>Welcome player</NavbarText>
    
      </Navbar>
    </div>
  );
}



export default NavbarFunc;