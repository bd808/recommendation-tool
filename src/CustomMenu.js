import React from "react";
import I18nText from "./I18n";
import "./CustomMenu.css";

class CustomMenu extends React.Component {
    selectItem(item) {
        this.props.onSelect(item);
    }

    buildCustomMenuItem(key, containerParams, i18nName, tag) {
        const CustomTag = `${tag}`;
        return (
            <CustomTag key={key} className="CustomMenu-item-container" {...containerParams}>
                <I18nText className="CustomMenu-item" name={i18nName}/>
            </CustomTag>
        );
    }

    buildMenuItem(key, containerParams, i18nName) {
        return this.buildCustomMenuItem(key, containerParams, i18nName, 'div');
    }

    render() {
        let menuItems = [];

        if (this.props.hasOwnProperty('headerName')) {
            menuItems.push(
                <div key={menuItems.length} className="CustomMenu-header-container">
                    <I18nText className="CustomMenu-header" name={this.props.headerName}/>
                </div>
            );
        }

        for (const key of Object.keys(this.props.items)) {
            if (this.props.tagName) {
                if (this.props.tagName === 'a') {
                    menuItems.push(this.buildCustomMenuItem(menuItems.length, {href: this.props.items[key]}, key, this.props.tagName));
                } else {
                    menuItems.push(this.buildCustomMenuItem(menuItems.length, {onClick: () => this.selectItem(key)}, key, this.props.tagName));
                }
            } else {
                menuItems.push(this.buildMenuItem(menuItems.length, {onClick: () => this.selectItem(key)}, this.props.items[key]));
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
