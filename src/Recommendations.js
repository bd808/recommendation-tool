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
        if (nextProps.items !== this.props.items) {
            this.updateInfo(nextProps.items);
        }
    }

    updateInfo(incomingItems) {
        this.setState({items: {}});
        for (let i=0; i<incomingItems.length; i++) {
            this.setItemValue(i, 'raw_item', incomingItems[i]);
            this.setItemValue(i, 'title', incomingItems[i].title);
            this.getData(i, incomingItems[i].title);
        }
    }

    setItemValue(index, key, value) {
        this.setState((prevState, props) => {
            let items = prevState.items;

            if (!items.hasOwnProperty(index)) {
                items[index] = {};
            }
            items[index][key] = value;

            return {items: items};
        });
    }

    getData(index, title) {
        const query = 'https://{source}.wikipedia.org/api/rest_v1/page/mobile-sections-lead/';
        const url = query.replace('{source}', this.props.source) + encodeURIComponent(title);
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then((data) => this.setData.bind(this)(data, index));
    }

    setData(data, index) {
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

        this.setItemValue(index, 'thumbnail', thumbnail);
        this.setItemValue(index, 'description', description);
    }

    render() {
        let items = [];
        for (const index of Object.keys(this.state.items).sort((a, b) => a - b)) {
            const item = this.state.items[index];
            items.push(
                <div key={index} className="Recommendations-item" onClick={() => this.props.showPreview(+index)}>
                    <div className="Recommendations-image" style={{backgroundImage: item.thumbnail}}>
                    </div>
                    <div className="Recommendations-body">
                        <div className="Recommendations-title-container">
                            <div className="Recommendations-title">
                                {item.title.replace(/_/g, ' ')}
                            </div>
                            <div className="Recommendations-title-expand">
                                {item.title.replace(/_/g, ' ')}
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
Recommendations.propTypes = {
    showPreview: React.PropTypes.func.isRequired,
    source: React.PropTypes.string.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string.isRequired
    })).isRequired,
    type: React.PropTypes.object.isRequired
};

export default Recommendations;
