import classNames from 'classnames/bind';
import style from './PersonalVideos.module.scss';
import video from '~/assets/video';
import { PlayIcon, UserIcon } from '~/component/Icons';
import { useRef, useState, memo } from 'react';
const cx = classNames.bind(style);
function PersonalVideos({ children }) {
    const videoRef = useRef([]);
    const handleSetPlay = (index) => {
        videoRef.current[index].play();
    };
    const handleSetOff = (index) => {
        videoRef.current[index].pause();
    };
    const setRef = (index) => (el) => {
        videoRef.current[index] = el;
    };

    return (
        <>
            {children == 'Favorites' ? (
                <div className={cx('personal-videos')}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className={cx('video-container')}>
                            <video
                                muted
                                ref={setRef(index)}
                                onMouseEnter={() => handleSetPlay(index)}
                                onMouseLeave={() => handleSetOff(index)}
                                type="video/mp4"
                                controls
                                className={cx('Pervideo')}
                                src={video.video2}
                            ></video>
                            <div className={cx('wrap-view')}>
                                <span className={cx('icon-video')}>
                                    <PlayIcon />
                                </span>
                                <strong className={cx('view-video')}>1.3M</strong>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('reminder-video')}>
                    <p className={cx('reminder-icon')}>
                        <UserIcon />
                    </p>
                    <p className={cx('reminder-text1')}>Upload your first video</p>
                    <p className={cx('reminder-text2')}>Your videos will appear here</p>
                </div>
            )}
        </>
    );
}

export default memo(PersonalVideos);
