import classNames from 'classnames/bind';
import style from './PersonalVideos.module.scss';
import video from '~/assets/video';
import { PlayIcon, UserIcon } from '~/component/Icons';
import { useRef, memo } from 'react';

const cx = classNames.bind(style);

function PersonalVideos({ videosLike, children, videosPublic }) {
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

    console.log('videosPublic', videosPublic);

    return (
        <>
            {children === 'Favorites' ? (
                <div className={cx('personal-videos')}>
                    {videosLike.map((videoItem, index) => (
                        <div key={videoItem.id} className={cx('video-container')}>
                            {console.log('videoItem', videoItem)}
                            <video
                                muted
                                ref={setRef(index)}
                                onMouseEnter={() => handleSetPlay(index)}
                                onMouseLeave={() => handleSetOff(index)}
                                type="video/mp4"
                                controls
                                className={cx('Pervideo')}
                                src={`http://127.0.0.1:8000/storage/${videoItem.path}`}
                                aria-label={`Video ${index + 1}`}
                            />
                            <div className={cx('wrap-view')}>
                                <span className={cx('icon-video')}>
                                    <PlayIcon />
                                </span>
                                <strong className={cx('view-video')}>1.3M</strong>
                            </div>
                        </div>
                    ))}
                </div>
            ) : children === 'Videos' ? (
                <div className={cx('personal-videos')}>
                    {videosPublic.map((videoItem, index) => (
                        <div key={index} className={cx('video-container')}>
                            <video
                                type="video/mp4"
                                controls
                                className={cx('Pervideo')}
                                src={`http://127.0.0.1:8000/storage/${videoItem.path}`}
                            />
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
