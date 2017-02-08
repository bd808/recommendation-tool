import React from 'react';
import I18nText from './I18n';
import './Dropdown.css';

class Dropdown extends React.Component {
    constructor(props){
        super(props);
        this.state = {active: false};
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    selectItem(item) {
        this.props.onSelect(item);
    }

    toggleDropdown() {
        this.setState(prevState => ({active: !prevState.active}));
    }

    handleClickOutside(evt) {
        this.setState({active: false});
    }

    render() {
        let activeClass = "Dropdown-active";
        if (!this.state.active) {
            activeClass += " Dropdown-invisible";
        }
        if (this.props.align === 'right') {
            activeClass += " Dropdown-right";
        }
        if (this.props.direction === 'up') {
            activeClass += " Dropdown-up";
        }
        return (
            <div className="Dropdown-container" onClick={this.toggleDropdown}>
                {this.props.children}
                <div className={activeClass}>
                    {this.props.items.map(
                        (item) =>
                        <I18nText name={item} className="Dropdown-item gf-clickable"
                                  key={item} onClick={() => this.selectItem(item)} />
                    )}
                </div>
            </div>
        );
    }
}
Dropdown.defaultProps = {
    align: 'left',
    direction: 'down'
};

let onClickOutside = require('react-onclickoutside');
Dropdown = onClickOutside(Dropdown);

export default Dropdown;
