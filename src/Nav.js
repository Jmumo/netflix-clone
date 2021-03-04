  import React from 'react'
  import logo from './net.png'
  import {useEffect,useState} from 'react'
  import YouTube from 'react-youtube'
  import './Nav.css'
  
  function Nav() {

    const[show, handleShow ] = useState(false) 

    useEffect(() => {
        window.addEventListener('scroll',()=>{
        if(window.scrollY > 100){
        handleShow(true) 
        } else{
            handleShow(false)
        }
        });

        return ()=> {window.removeEventListener('scroll')}
       
    }, [])
      return (
          <div className = {`nav ${show && "nav_black"} `}>
              <img className="nav_logo"
              
            //   src ="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png" 
            src={logo}
              alt="NETFLIX"
              />
          </div>
      )
  }
  
  export default Nav
  