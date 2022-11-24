import React from "react";
import "../../styles/profile.css";
const TabNavItem = ({ id, item, title, activeTab, setActiveTab }) => {
 
 const handleClick = () => {
   setActiveTab(id);
 };
 
return (
   <li onClick={handleClick} data-testid="tabItem" className={activeTab === id ? "active" : ""}>
      <div className="iconBox" data-testid="tabIcon">
        {item} 
      </div> 
      <div data-testid="tabName">
        {title}
      </div>
   </li>
 );
};
export default TabNavItem;