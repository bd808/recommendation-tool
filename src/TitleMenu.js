import React from "react";
import Dropdown from "./Dropdown";
import MenuImage from "./images/MenuImage";

const menuItems = [
    {
        label: 'menu-source-code',
        value: 'https://github.com/schana/recommendation-tool',
    },
    {
        label: 'menu-privacy-statement',
        value: 'https://wikimediafoundation.org/wiki/Recommendations_Tool_Privacy_Statement'
    }
];

class TitleMenu extends React.Component {

    static onSelect(value) {
        window.open(value);
    }

    render() {
        return (
            <div className="Title-float-right">
                <Dropdown items={menuItems} align="right" onSelect={TitleMenu.onSelect}>
                    <MenuImage className="Title-menu-icon"/>
                </Dropdown>
            </div>
        );
    }
}

export default TitleMenu;
