import React from 'react';
import Dropdown from './Dropdown';

const menuItems = {
    'menu-source-code': 'https://github.com/wikimedia/research-recommendation-api',
    'menu-privacy-statement': 'https://wikimediafoundation.org/wiki/Recommendations_Tool_Privacy_Statement'
};

class TitleMenu extends React.Component {
    onSelect(item) {
        console.log(item);
        console.log(menuItems[item]);
    }

    render() {
        let dropdownMap = {};
        for (const key of Object.keys(menuItems)) {
            dropdownMap[key] = key;
        }
        return (
            <div className="gf-flex-float-right">
                <Dropdown items={dropdownMap} align="right" onSelect={this.onSelect}>
                    <div className="gf-icon gf-icon-menu gf-clickable"></div>
                </Dropdown>
            </div>
        );
    }
}

export default TitleMenu;
