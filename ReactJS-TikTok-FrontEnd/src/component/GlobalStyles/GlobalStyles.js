import PropTypes from 'prop-types';
import './GlobalStyles.scss';
import React from 'react';
function GlobalStyles({ children }) {
    return children;
}
GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};
export default GlobalStyles;
