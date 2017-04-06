import React from "react";
import "whatwg-fetch";
import {encodeParams, checkStatus, parseJSON} from "./util";
import "./TypeAheadSuggestions.css";

class TypeAheadSuggestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {suggestions: []};
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.seed === ''){
            this.setState({suggestions: []});
        }else if(this.props.seed !== nextProps.seed) {
            this.fetchSuggestions(nextProps.seed);
        }
    }

    handleClickOutside() {
        this.setState({suggestions: []});
    }

    fetchSuggestions(seed) {
        const url = 'https://en.wikipedia.org/w/api.php?' + encodeParams({
                action: 'query',
                format: 'json',
                generator: 'prefixsearch',
                prop: 'pageprops|pageimages|pageterms',
                redirects: '',
                ppprop: 'displaytitle',
                piprop: 'thumbnail',
                pithumbsize: 80,
                pilimit: 6,
                wbptterms: 'description',
                gpssearch: seed,
                gpsnamespace: 0,
                gpslimit: 6,
                origin: '*'
            });
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .then(this.setSuggestions.bind(this));
    }

    setSuggestions(data) {
        let suggestions = [];
        const lines = require('./images/lines.svg');
        const defaultThumbnail = `url(${lines})`;
        for(const key of Object.keys(data.query.pages)){
            const rawSuggestion = data.query.pages[key];
            suggestions.push({
                title: rawSuggestion.title,
                thumbnail: rawSuggestion.thumbnail ? `url(${rawSuggestion.thumbnail.source})` : defaultThumbnail,
                description: rawSuggestion.terms ? rawSuggestion.terms.description[0] : undefined
            })
        }
        this.setState({suggestions: suggestions});
    }

    selectSuggestion(title) {
        this.props.onSelect(title);
        this.handleClickOutside();
    }

    render() {
        let suggestionItems = [];
        for(const suggestion of this.state.suggestions) {
            suggestionItems.push(
                <div key={suggestionItems.length} className="TypeAheadSuggestions-item" onClick={() => this.selectSuggestion(suggestion.title)}>
                    <div className="TypeAheadSuggestions-item-thumbnail" style={{backgroundImage: suggestion.thumbnail}}/>
                    <div className="TypeAheadSuggestions-item-text-container">
                        <div className="TypeAheadSuggestions-item-title">{suggestion.title}</div>
                        <div className="TypeAheadSuggestions-item-description">{suggestion.description}</div>
                    </div>
                </div>
            );
        }
        return (
            <div className="TypeAheadSuggestions-container">
                {suggestionItems}
            </div>
        );
    }
}
TypeAheadSuggestions.propTypes = {
    seed: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func.isRequired
};

let onClickOutside = require('react-onclickoutside');
TypeAheadSuggestions = onClickOutside(TypeAheadSuggestions);

export default TypeAheadSuggestions;
