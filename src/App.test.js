import React from 'react';
import ReactDOM from 'react-dom';
import Disclaimer from './Disclaimer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Disclaimer />, div);
});
