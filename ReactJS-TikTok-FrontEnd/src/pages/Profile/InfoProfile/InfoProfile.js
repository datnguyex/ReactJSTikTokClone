import classNames from 'classnames/bind';
import style from './InfoProfile.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import 'tippy.js/dist/tippy.css';
import { InfoProfileItems } from '~/component/Array';
import { memo, useEffect, useState } from 'react';
import { Image } from '~/component/Image';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ShareSolidIcon, WriteIcon, UserCheckIcon } from '~/component/Icons';
import UserInfo from '~';
const cx = classNames.bind(style);

function InfoProfile({ userValue, handleSetUpdate, showUpdate, handVideosPublic, handleReloadSidebar, reaload }) {
    const [checkReload, setCheckReload] = useState();
    const { nickname } = useParams();
    const [nicknameParam, setNicknammeParam] = useState(nickname);
    const [profileOf, setProfileOf] = useState('');
    const [infoUser, setInfoUser] = useState('');
    const [checkFollowing, setCheckFollowing] = useState('');

    const checkProfile = () => {
        const nicknameToFetch = nicknameParam === userValue.nickname ? userValue.nickname : nicknameParam;
        nicknameParam === userValue.nickname ? setProfileOf('user') : setProfileOf('other');
        axios
            .post('http://127.0.0.1:8000/api/getUserInfo', { nickname: nicknameToFetch }) // Wrap in an object
            .then((response) => {
                setInfoUser(response.data.data);
                handVideosPublic(response.data.videos);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message); // More detailed error
            });
    };

    const handleFollowing = () => {
        axios
            .post('http://127.0.0.1:8000/api/FollowUSer', {
                nicknameFollower: userValue.nickname,
                nicknameFollowed: nicknameParam,
            })
            .then((response) => {
                console.log('response', response);
                if (response.data.message === 'follow success') {
                    setCheckFollowing('Followed');
                    handleReloadSidebar();
                } else {
                    setCheckFollowing('Not Followed');
                    handleReloadSidebar();
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };

    const handleCheckFollowing = () => {
        axios
            .get('http://127.0.0.1:8000/api/checkFollowing', {
                params: {
                    nicknameFollower: userValue.nickname,
                    nicknameFollowed: nicknameParam,
                },
            })
            .then((response) => {
                // console.log('response', response);
                if (response.data.message === 'You have not followed this person') {
                    setCheckFollowing('Not Followed');
                } else {
                    setCheckFollowing('Followed');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };
    console.log('reaload', reaload);
    console.log('checkReload', checkReload);

    useEffect(() => {
        if (userValue == null) {
            return;
        }
        setNicknammeParam(nickname);
    }, [nickname]);
    useEffect(() => {
        if (userValue == null) {
            return;
        }
        checkProfile();
        handleCheckFollowing();
    }, [userValue, nicknameParam, checkFollowing]);
    useEffect(() => {
        handleCheckFollowing();
    }, [checkReload]);
    useEffect(() => {
        if (reaload != checkReload) {
            setCheckReload(reaload);
        } else {
        }
    }, [reaload]);
    return (
        <>
            <div className={cx('info')}>
                {infoUser == null ? (
                    <>
                        <img className={cx('img')} alt="" src={`http://127.0.0.1:8000/storage/${userValue.image}`} />
                    </>
                ) : (
                    <img className={cx('img')} alt="" src={`http://127.0.0.1:8000/storage/${infoUser.image}`} />
                )}
                <div className={cx('text-info')}>
                    <h1 className={cx('wrap-nickname')}>
                        <p className={cx('nickname')}>{infoUser == null ? userValue.nickname : infoUser.nickname}</p>

                        <Menu
                            seeMore={true}
                            placement={'top-start'}
                            className={'wrap-menuShare'}
                            items={InfoProfileItems}
                        >
                            <span className={cx('icon-text')}>
                                <ShareSolidIcon />
                            </span>
                        </Menu>
                    </h1>
                    <h2 className={cx('name')}>{infoUser == null ? userValue.full_name : infoUser.full_name}</h2>

                    {/* <button className={cx('btn-info')}>
                                <WriteIcon />

                                <span>Edit profile</span>
                            </button> */}
                    {profileOf == 'user' ? (
                        <>
                            <div className={cx('wrap-btnInfo')}>
                                <Button onClick={handleSetUpdate} className={cx('btn-info')} leftIcon={<WriteIcon />}>
                                    Edit profile
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            {checkFollowing === 'Not Followed' ? (
                                <div className={cx('wrap-btnInfo')}>
                                    <Button onClick={handleFollowing} primary className={cx('btn-follow')}>
                                        Follow
                                    </Button>
                                    <Button className={cx('btn-info')}>Message</Button>
                                </div>
                            ) : checkFollowing === 'Followed' ? (
                                <div className={cx('wrap-btnInfo')}>
                                    <Button
                                        onClick={handleFollowing}
                                        leftIcon={<UserCheckIcon />}
                                        className={cx('btn-info')}
                                    >
                                        Following
                                    </Button>
                                    <Button className={cx('btn-info')}>Message</Button>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
            <div className={cx('statistics')}>
                <div className={cx('stats')}>
                    <strong className={cx('title-numb')}>
                        {infoUser == null ? userValue.followings_count : infoUser.followings_count}
                    </strong>
                    <span className={cx('title-stats')}>Following</span>
                </div>
                <div className={cx('stats')}>
                    <strong className={cx('title-numb')}>
                        {infoUser == null ? userValue.follwers_count : infoUser.follwers_count}
                    </strong>
                    <span className={cx('title-stats')}>Follower</span>
                </div>
                <h3 className={cx('stats')}>
                    <strong className={cx('title-numb')}>
                        {infoUser == null ? userValue.likes_count : infoUser.likes_count}
                    </strong>
                    <span className={cx('title-stats')}>Liked</span>
                </h3>
            </div>

            <h2 className={cx('introduce')}>{infoUser == null ? userValue.bio : infoUser.bio}</h2>
        </>
    );
}

export default InfoProfile;
