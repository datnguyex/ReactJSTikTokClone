import classNames from 'classnames/bind';
import style from './FollowingTool.module.scss';
import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const FollowingTool = forwardRef(({ className, onClick, icon, text, avatar = false }, ref) => {
    return (
        <>
            {avatar === false ? (
                <div onClick={onClick} className={cx('wrap-icon')} ref={ref}>
                    <span className={cx('icon', className)}>{icon}</span>
                    <strong className={cx('text')}>{text}</strong>
                </div>
            ) : (
                <div className={cx('avatar')} ref={ref}>
                    <span className={cx('check-icon')}>{icon}</span>
                </div>
            )}
        </>
    );
});

// Optional: define prop types if needed
FollowingTool.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string,
    avatar: PropTypes.bool,
};

export default memo(FollowingTool);
