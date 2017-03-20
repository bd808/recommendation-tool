import React from "react";
import "./StatusMessage.css";

class StatusMessage extends React.Component {
    render() {
        return (
            <div className="StatusMessage-container">
                {this.props.children}
            </div>
        );
    }
}

export default StatusMessage;