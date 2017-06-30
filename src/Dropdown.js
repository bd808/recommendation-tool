import React from "react";
import "./Dropdown.css";
import CustomMenu from "./CustomMenu";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {active: false};
    }

    toggleDropdown() {
        this.setState(prevState => ({active: !prevState.active}));
    }

    handleClickOutside() {
        this.setState({active: false});
    }

    buildActiveClass() {
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
        return activeClass;
    }

    render() {
        const activeClass = this.buildActiveClass();
        return (
            <div className="Dropdown-container" onClick={this.toggleDropdown.bind(this)}>
                {this.props.children}
                <div className={activeClass}>
                    <CustomMenu
                        items={this.props.items}
                        onSelect={this.props.onSelect}
                        itemFactory={this.props.itemFactory}
                        className={this.props.className}
                    />
                </div>
            </div>
        );
    }
}
Dropdown.propTypes = {
    align: React.PropTypes.oneOf(['left', 'right']).isRequired,
    direction: React.PropTypes.oneOf(['up', 'down']).isRequired
};
Dropdown.defaultProps = {
    align: 'left',
    direction: 'down'
};

let onClickOutside = require('react-onclickoutside');
Dropdown = onClickOutside(Dropdown);

export default Dropdown;
