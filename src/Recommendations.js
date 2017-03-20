import React from "react";
import 'whatwg-fetch';
import {checkStatus, parseJSON} from './util';
import './Recommendations.css';

class Recommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: {}}
    }

    componentDidMount() {
        this.updateInfo(this.props.items);
    }

    componentWillReceiveProps(nextProps) {
        this.updateInfo(nextProps.items);
    }

    updateInfo(incomingItems) {
        this.setState({items: {}});
        for (const item of incomingItems) {
            this.setItemValue(item.title, 'raw_item', item);
            this.getData(item.title);
        }
    }

    setItemValue(title, key, value) {
        this.setState((prevState, props) => {
            let items = prevState.items;

            if (!items.hasOwnProperty(title)) {
                items[title] = {};
            }
            items[title][key] = value;

            return {items: items};
        });
    }

    getData(title) {
        const query = 'https://{source}.wikipedia.org/api/rest_v1/page/mobile-sections-lead/';
        const url = query.replace('{source}', this.props.source) + encodeURIComponent(title);
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => this.setData.bind(this)(data, title));
    }

    setData(data, title) {
        const description = data.description;
        const lines = require('./images/lines.svg');
        let thumbnail = `url(${lines})`;
        if (data.hasOwnProperty('image')) {
            if (data.image.hasOwnProperty('urls')) {
                // Get smallest thumbnail
                const imageUrlIndex = Object.keys(data.image.urls).map(Number).sort((a, b) => a - b)[0];
                const imageUrl = data.image.urls[imageUrlIndex];
                thumbnail = `url(${imageUrl})`;
            }
        }

        this.setItemValue(title, 'thumbnail', thumbnail);
        this.setItemValue(title, 'description', description);
    }

    render() {
        let items = [];
        for (const title of Object.keys(this.state.items)) {
            const item = this.state.items[title];
            const index = items.length;
            items.push(
                <div key={index} className="Recommendations-item" onClick={() => this.props.showPreview(index)}>
                    <div className="Recommendations-image" style={{backgroundImage: item.thumbnail}}>
                    </div>
                    <div className="Recommendations-body">
                        <div className="Recommendations-title-container">
                            <div className="Recommendations-title">
                                {title.replace(/_/g, ' ')}
                            </div>
                            <div className="Recommendations-title-expand">
                                {title.replace(/_/g, ' ')}
                            </div>
                        </div>
                        <div className="Recommendations-description">
                            {item.description ? item.description : ''}
                        </div>
                    </div>
                    <div className="Recommendations-footer">
                        <div className="Recommendations-motivation">
                            {this.props.type.motivation(item.raw_item)}
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="Recommendations-container">
                {items}
            </div>
        );
    }
}

export default Recommendations;
