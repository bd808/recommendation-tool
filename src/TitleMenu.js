import React from "react";
import Dropdown from "./Dropdown";
import MenuImage from "./images/MenuImage";

const menuItems = {
    'menu-source-code': 'https://github.com/schana/recommendation-tool',
    'menu-privacy-statement': 'https://wikimediafoundation.org/wiki/Recommendations_Tool_Privacy_Statement'
};

class TitleMenu extends React.Component {
    render() {
        return (
            <div className="Title-float-right">
                <Dropdown items={menuItems} align="right" tagName="a">
                    <MenuImage className="Title-menu-icon"/>
                </Dropdown>
            </div>
        );
    }
}

export default TitleMenu;
