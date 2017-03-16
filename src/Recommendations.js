import React from "react";
import './Recommendations.css';

class Recommendations extends React.Component {
    render() {
        let items = [];
        for (const item of this.props.items) {
            items.push(
                <div key={items.length} className="Recommendations-item">
                    {JSON.stringify(item.title)}
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
