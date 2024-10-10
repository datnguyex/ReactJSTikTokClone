import classNames from 'classnames/bind';
import style from './HomeTool.module.scss';
import React, { forwardRef, memo } from 'react';
import video from '~/assets/video';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const HomeTool = forwardRef(({ handleCommentVideo, className, onClick, icon, text, avatar = false }, ref) => {
    const handleClick = (event) => {
        if (typeof handleCommentVideo === 'function') {
            handleCommentVideo(video.video2);
        } else if (typeof onClick === 'function') {
            onClick(event);
        }
    };

    return (
        <>
            {avatar === false ? (
                <div onClick={handleClick} className={cx('wrap-icon')} ref={ref}>
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
HomeTool.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string,
    avatar: PropTypes.bool,
};

export default memo(HomeTool);
