import React from "react";
import {I18nText, I18nCustom} from "./I18n";
import "./CustomMenu.css";

class CustomMenu extends React.Component {
    selectItem(item) {
        this.props.onSelect(item);
    }

    render() {
        let menuItems = [];
        for (const key of Object.keys(this.props.items)) {
            let params = {
                name: this.props.items[key],
                className: "CustomMenu-item",
                key: key
            };

            if (this.props.tagName) {
                params.tagName = this.props.tagName;
                if (params.tagName === 'a') {
                    params.href = this.props.items[key];
                    params.name = key;
                } else {
                    params.onClick = () => this.selectItem(key);
                }
                menuItems.push(<I18nCustom {...params}/>);
            } else {
                params.onClick = () => this.selectItem(key);
                menuItems.push(<I18nText {...params}/>);
            }
        }

        let className = "CustomMenu-container ";

        if (this.props.className) {
            className += this.props.className;
        }

        return (
            <div className={className}>
                {menuItems}
            </div>
        );
    }
}

export default CustomMenu;
