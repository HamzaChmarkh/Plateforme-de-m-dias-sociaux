import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaUserFriends,
    FaThList
}from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Personnes",
            icon:<FaUserAlt/>
        },
        {
            path:"/Message",
            name:"Messages",
            icon:<FaCommentAlt/>
        },
        {
            path:"/Amis",
            name:"Amis",
            icon:<FaUserFriends/>
        },
        {
            path:"/Article",
            name:"Articles",
            icon:<RiArticleFill/>
        },
        
        
        
        
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Mychat</h1>
                   <div style={{marginLeft: isOpen ? "40px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main style={{ marginLeft: isOpen ? '200px' : '50px', transition: 'margin-left 0.5s' }}>
                {children}
            </main>
        </div>
    );
};

export default Sidebar;