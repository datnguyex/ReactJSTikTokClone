import classNames from 'classnames/bind';
import style from '~/component/Popper/Popper.module.scss';
import PropTypes from 'prop-types';
const cx = classNames.bind(style);
function Wrapper({ children, className }) {
    // console.log('children', children);
    // const classes = cx('wrapper', {
    //     className,
    //     [className]: className,
    // });
    // console.log('classes :', classes);

    return <div className={cx('wrapper', className)}>{children}</div>;
}
Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Wrapper;
