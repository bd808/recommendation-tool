import React from "react";

class Recommendations extends React.Component {
    render() {
        let items = [];
        for (const item of this.props.items) {
            items.push(<div key={items.length}>{JSON.stringify(item)}</div>)
        }
        return (
            <div>
                {items}
            </div>
        );
    }
}

export default Recommendations;
