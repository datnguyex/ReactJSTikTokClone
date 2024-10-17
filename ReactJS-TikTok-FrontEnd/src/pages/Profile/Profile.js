import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import 'tippy.js/dist/tippy.css';
import { useState } from 'react';
import { ShareSolidIcon, WriteIcon, BlockIcon } from '~/component/Icons';
import InfoProfile from '~/pages/Profile/InfoProfile';
import PersonalVideos from '~/pages/Profile/PersonalVideos';
import video from '~/assets/video';
import { useCallback } from 'react';
const cx = classNames.bind(style);

function Profile({ userValue, handleSetUpdate, showUpdate, handleReloadSidebar, reaload }) {
    const [selected, setSelected] = useState('Videos');
    const [type, setType] = useState('Lates');
    const [videosPublic, setVideoPublic] = useState([]);
    const handleSelected = (value) => {
        setSelected(value);
    };
    const handleType = (value) => {
        setType(value);
    };
    const handVideosPublic = (item) => {
        setVideoPublic(item);
    };
    // console.log('handleReloadSidebar', handleReloadSidebar, reaload);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <InfoProfile
                    reaload={reaload}
                    handleReloadSidebar={handleReloadSidebar}
                    handVideosPublic={handVideosPublic}
                    userValue={userValue}
                    handleSetUpdate={handleSetUpdate}
                    showUpdate={showUpdate}
                />
                <div className={cx('personal-content')}>
                    <div className={cx('control')}>
                        <p
                            className={cx('item-control', { selected: selected == 'Videos' })}
                            onClick={() => handleSelected('Videos')}
                        >
                            Videos
                        </p>
                        <p
                            className={cx('item-control', { selected: selected == 'Favorites' })}
                            onClick={() => handleSelected('Favorites')}
                        >
                            <span className={cx('icon-control')}>
                                <BlockIcon />
                            </span>
                            <span className={cx('text-control')}>Favorites</span>
                        </p>
                        <p
                            className={cx('item-control', { selected: selected == 'Liked' })}
                            onClick={() => handleSelected('Liked')}
                        >
                            <span className={cx('icon-control')}>
                                <BlockIcon />
                            </span>
                            <span className={cx('text-control')}>Liked</span>
                        </p>
                    </div>
                    {selected == 'Videos' ? (
                        <div className={cx('control-videos')}>
                            <button
                                className={cx('btn-control', { type: type == 'Lates' })}
                                onClick={() => handleType('Lates')}
                            >
                                Lates
                            </button>
                            <button
                                className={cx('btn-control', { type: type == 'Popular' })}
                                onClick={() => handleType('Popular')}
                            >
                                Popular
                            </button>
                            <button
                                className={cx('btn-control', { type: type == 'Oldest' })}
                                onClick={() => handleType('Oldest')}
                            >
                                Oldest
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                {/* truyen props la cac video tuong ung voi tung muc -> tai su dung
                    component nay
                */}

                <PersonalVideos videosPublic={videosPublic}>{selected}</PersonalVideos>
            </div>
        </div>
    );
}
export default Profile;
