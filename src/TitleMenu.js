import React from "react";
import Dropdown from "./Dropdown";
import MenuImage from "./images/MenuImage";

const menuItems = {
    'menu-source-code': 'https://github.com/wikimedia/research-recommendation-api',
    'menu-privacy-statement': 'https://wikimediafoundation.org/wiki/Recommendations_Tool_Privacy_Statement'
};

class TitleMenu extends React.Component {
    onSelect(item) {
        location.href = menuItems[item];
    }

    render() {
        let dropdownMap = {};
        for (const key of Object.keys(menuItems)) {
            dropdownMap[key] = key;
        }
        return (
            <div className="Title-float-right">
                <Dropdown items={dropdownMap} align="right" onSelect={this.onSelect.bind(this)}>
                    <MenuImage className="Title-menu-icon"/>
                </Dropdown>
            </div>
        );
    }
}

export default TitleMenu;
