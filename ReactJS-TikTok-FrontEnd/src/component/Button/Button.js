import classNames from 'classnames/bind';
import style from './Button.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const cx = classNames.bind(style);

function Button({
    primary = false,
    outline = false,
    small = false,
    large = false,
    text = false,
    disabled = false,
    rounded = false,
    className,
    className2,
    button,
    leftIcon,
    rightIcon,
    children,
    //
    to,
    href,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    // console.log(' ...passProps', passProps);

    const props = {
        onClick,
        ...passProps,
    };

    //remove even listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                console.log('key', key);
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        // props.rounded = rounded
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    // console.log('props', props);
    // console.log('onClick', onClick);
    const classes = cx('wrapper', {
        [className]: className,
        [className2]: className2,
        primary: primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
    });
    // console.log('classes', classes);
    // console.log('classes2', classes2);
    // console.log('button', button);
    // console.log('childrent', children);
    // console.log('classes', classes);

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            <span className={cx('btn-scroll')}>{button}</span>
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    rounded: PropTypes.bool,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};
export default Button;
