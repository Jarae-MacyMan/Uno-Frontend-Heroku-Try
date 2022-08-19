    import React, { useState } from 'react';
import {
Modal,
  Navbar,
  NavbarBrand,
Button,
  NavbarText,
  ModalBody,ModalFooter,ModalHeader, Input
} from 'reactstrap';


import '../style/navbar.css'



function NavbarFunc(){
   



  
  const [modal, setModal] = useState(false);

const [code, setCode] = useState('')
const codeObj = {}


  const toggle = () => setModal(!modal);

 
 console.log(codeObj)

  return (
    <div>
      <Navbar className='navbar-container'>
        <NavbarBrand href="/home">HOT POTATO </NavbarBrand>
        <NavbarText onClick={toggle}>Room Chat</NavbarText>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Send Your Room Code</ModalHeader>
        <ModalBody>
          <ul>
            
            <li></li>
          </ul>
      
        </ModalBody>
        <ModalFooter>
          <form onClick={((e)=>{
            e.preventDefault()
            setCode(e.target.value)
            console.log(code)
          })}>
          <Input type='submit'
          style={{width:'200px'}} placeholder='Room Code'
         ></Input>
          <Button color="primary"  

        >
           Send
          </Button>{' '} 
            </form>
          <Button color="secondary" onClick={toggle} >
           Exit
          </Button>
       
        </ModalFooter>
      </Modal>



          <NavbarText>Welcome player</NavbarText>
    
      </Navbar>
    </div>
  );
}



export default NavbarFunc;