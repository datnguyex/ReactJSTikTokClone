import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '~/component/Popper/Menu';
import video from '~/assets/video';
import classNames from 'classnames/bind';
import style from './HomeVideo.module.scss';
import 'tippy.js/dist/tippy.css';
import { ListControlVideo } from '~/component/Array';
import { SoundIcon, MuteIcon, UnmuteIcon, PhoneScreenIcon, ListIcon } from '~/component/Icons';
import { useEffect, useState, memo } from 'react';

const cx = classNames.bind(style);

function HomeVideo() {
    const [show, setShow] = useState(false);
    const [mute, setMute] = useState(false);

    const handleSetShow = () => {
        setShow(true);
    };
    const handleSetHidden = () => {
        setShow(false);
    };
    const handleSetMute = () => {
        setMute(!mute);
    };

    useEffect(() => {});

    return (
        <div onMouseLeave={handleSetHidden} onMouseEnter={handleSetShow} className={cx('video-container')}>
            <video
                type="video/mp4"
                // autoPlay
                controls
                className={cx('home-video')}
                src={video.video1}
                width="258"
                muted={mute}
                height="459px"
            ></video>
            <div className={cx('infor-video')}>
                <h3 className={cx('nickname')}>thaybetone</h3>
                <div className={cx('des')}>
                    <p className={cx('name')}>Vẫn là quả beat thế giới của SlimV #tiktokfconline #fconline #ATSH</p>
                </div>
                <div className={cx('sound')}>
                    <span className={cx('sound-icon')}>{<SoundIcon />}</span>
                    <span className={cx('space')}>.</span>
                    <span className={cx('sound-info')}>Nhạc nền - No Music No Life</span>
                </div>
            </div>
            {/* control */}
            <div className={cx('control', { visible: show, hidden: !show })}>
                <div className={cx('left-icon')}>
                    <span className={cx('video-icon')}>
                        <PhoneScreenIcon />
                    </span>
                    <span onClick={handleSetMute} className={cx('video-icon')}>
                        {mute === false ? <UnmuteIcon /> : <MuteIcon />}
                    </span>
                </div>
                <div className={cx('left-icon')}>
                    <Menu placement="right-start" items={ListControlVideo} start={0} end={0}>
                        <span className={cx('video-icon')}>
                            <ListIcon />
                        </span>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default memo(HomeVideo);
