import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '~/component/Popper/Menu';
import video from '~/assets/video';
import classNames from 'classnames/bind';
import style from './FollowingVideo.module.scss';
import 'tippy.js/dist/tippy.css';
import {
    SoundIcon,
    StartIcon,
    PauseIcon,
    MuteIcon,
    UnmuteIcon,
    PhoneScreenIcon,
    ListIcon,
    ArrowTopIcon,
    BrokenHeartIcon,
    FlagIcon,
} from '~/component/Icons';
import { memo, useEffect, useState } from 'react';
import { ListControlVideo } from '~/component/Array';
const cx = classNames.bind(style);

function FollowingVideo({ usersFollowing }) {
    const [show, setShow] = useState(false);
    const [mute, setMute] = useState(false);
    console.log('usersFollowing.user.video', usersFollowing);

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
                src={`http://127.0.0.1:8000/storage/${usersFollowing.path}`}
                width="258"
                muted={mute}
                height="459px"
            ></video>
            <div className={cx('infor-video')}>
                <h3 className={cx('nickname')}>{usersFollowing.user.nickname}</h3>
                <div className={cx('des')}>
                    <p className={cx('name')}>{usersFollowing.description}</p>
                </div>
                <div className={cx('sound')}>
                    <span className={cx('sound-icon')}>{<SoundIcon />}</span>
                    <span className={cx('space')}>.</span>
                    <span className={cx('sound-info')}>Nhạc nền - {usersFollowing.user.nickname}</span>
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

export default memo(FollowingVideo);
