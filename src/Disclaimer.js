import React from "react";
import "./Disclaimer.css";
import CloseImage from "./images/CloseImage";

class Disclaimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasDismissedDisclaimer: this.getCookie('dismissedDisclaimer') === '1'};
        this.setDismissedDisclaimer = this.setDismissedDisclaimer.bind(this);
    }

    render() {
        if (!this.state.hasDismissedDisclaimer) {
            const labs = <a href="https://wikitech.wikimedia.org/wiki/Help:FAQ">Wikimedia Labs</a>;
            const informationCollected = <a href="https://phabricator.wikimedia.org/T124503">Information collected</a>;
            const thisPrivacyStatement =
                <a href="https://wikimediafoundation.org/wiki/Recommendations_Tool_Privacy_Statement">this privacy
                    statement</a>;
            const mainPrivacyPolicy =
                <a href="https://wikimediafoundation.org/wiki/Privacy_policy">main Wikimedia Privacy Policy</a>;
            const not = <strong>not</strong>;
            return (
                <div className="Disclaimer-container">
                    <span>This experimental tool is hosted on {labs}. {informationCollected} when you visit this site,
                        and through your use of the tool, is governed by {thisPrivacyStatement} (
                        {not} the {mainPrivacyPolicy}).</span>
                    <div className="Disclaimer-close" title="Dismiss" onClick={this.setDismissedDisclaimer}>
                        <CloseImage/>
                    </div>
                </div>
            );
        }
        return null;
    }

    setDismissedDisclaimer() {
        document.cookie = 'dismissedDisclaimer=1';
        this.setState(prevState => ({
            hasDismissedDisclaimer: true
        }));
    }

    getCookie(name) {
        return document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || null;
    }
}

export default Disclaimer;