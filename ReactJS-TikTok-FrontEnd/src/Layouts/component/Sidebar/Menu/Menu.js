import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Menu.module.scss';
const cx = classNames.bind(styles);

function Menu({ children, className }) {
    return <nav className={cx(className)}>{children}</nav>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Menu;
