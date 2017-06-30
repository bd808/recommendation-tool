import React from "react";
import I18nText from "./I18n";
import "./CustomMenu.css";

class CustomMenu extends React.Component {
    itemFactory(key, item) {
        let extraAttributes = {};
        if (this.props.onSelect !== undefined && !item.header) {
            extraAttributes.onClick = () => this.props.onSelect(item.value);
        }

        let innerClass = 'CustomMenu-item';
        let outerClass = 'CustomMenu-item-container';
        if (item.header) {
            innerClass = 'CustomMenu-header';
            outerClass = 'CustomMenu-header-container';
        }

        return (
            <div className={outerClass} key={key} {...extraAttributes}>
                <I18nText className={innerClass} name={item.label}/>
            </div>
        );
    }

    render() {
        let items = [];
        for (let item of this.props.items) {
            if (this.props.itemFactory !== undefined) {
                items.push(this.props.itemFactory(items.length, item));
            } else {
                items.push(this.itemFactory(items.length, item));
            }
        }
        return (
            <div className={this.props.className || "CustomMenu-container"}>
                {items}
            </div>
        );
    }
}
CustomMenu.propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
        value: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        header: React.PropTypes.bool
    })).isRequired,
    onSelect: React.PropTypes.func,
    itemFactory: React.PropTypes.func
};

export default CustomMenu;
