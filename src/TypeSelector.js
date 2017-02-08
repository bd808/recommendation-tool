import React from 'react';
import Dropdown from './Dropdown';

class TypeSelector extends React.Component {
    onSelect(type) {
        console.log(this.props.types[type]);
    }

    render() {
        return (
            <div className="gf-selector-container">
                <Dropdown items={Object.keys(this.props.types)} onSelect={this.onSelect.bind(this)}>
                    <div className="gf-selector-button-container gf-clickable">
                        <span className="gf-selector-text">asdlkfjaslkfdj</span>
                        <div className="gf-icon gf-icon-expand"></div>
                    </div>
                </Dropdown>
            </div>
        );
    }
}

export default TypeSelector;
