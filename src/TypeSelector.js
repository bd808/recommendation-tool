import React from "react";
import {Link} from "react-router-dom";
import Dropdown from "./Dropdown";
import I18nText from "./I18n";
import SelectorImage from "./images/SelectorImage";
import "./TypeSelector.css";
import {encodeParams} from "./util";

class TypeSelector extends React.Component {
    itemFactory(key, item) {
        return (
            <Link key={key} className="TypeSelector-link" to={{
                pathname: '/' + item.value,
                search: encodeParams(this.props.params)
            }}>
                <div className="CustomMenu-item-container">
                    <I18nText className="CustomMenu-item" name={item.label}/>
                </div>
            </Link>
        );
    }

    render() {
        let dropdownItems = [];
        for (const key of Object.keys(this.props.types)) {
            dropdownItems.push({
                label: this.props.types[key].i18nKey,
                value: key
            });
        }
        return (
            <Dropdown items={dropdownItems} itemFactory={this.itemFactory.bind(this)}>
                <div className="rt-button">
                    <I18nText className="rt-selector-text" name={this.props.types[this.props.type].i18nKey}/>
                    <SelectorImage />
                </div>
            </Dropdown>
        );
    }
}

export default TypeSelector;
