import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Image } from '~/component/Image';
import Button from '~/component/Button';
import styles from './AccountPreview.module.scss';
import { UserCheckIcon } from '~/component/Icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function AccountPreview({ user, userValue, handleReloadSidebar }) {
    const [checkFollowing, setCheckFollowing] = useState('');
    const [userData, setUserData] = useState(user);

    const handleCheckFollowing = () => {
        axios
            .get('http://127.0.0.1:8000/api/checkFollowing', {
                params: {
                    nicknameFollower: userValue.nickname,
                    nicknameFollowed: user.nickname,
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

    const handleFollowing = () => {
        axios
            .post('http://127.0.0.1:8000/api/FollowUSer', {
                nicknameFollower: userValue.nickname,
                nicknameFollowed: user.nickname,
            })
            .then((response) => {
                if (response.data.message === 'follow success') {
                    handleReloadSidebar();
                } else {
                    handleReloadSidebar();
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };
    const fetchUserData = () => {
        axios
            .post('http://127.0.0.1:8000/api/getUserInfo', {
                nickname: user.nickname,
            })
            .then((response) => {
                setUserData(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);
    useEffect(() => {
        handleCheckFollowing();
        fetchUserData();
    }, [checkFollowing]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    loading="lazy"
                    alt=""
                    src={`http://127.0.0.1:8000/storage/${user.image}`}
                />
                {checkFollowing === 'Not Followed' ? (
                    <div className={cx('wrap-btnInfo')}>
                        <Button onClick={handleFollowing} primary className={cx('btn-follow')}>
                            Follow
                        </Button>
                    </div>
                ) : checkFollowing === 'Followed' ? (
                    <div className={cx('wrap-btnInfo')}>
                        <Button onClick={handleFollowing} leftIcon={<UserCheckIcon />} className={cx('btn-info')}>
                            Following
                        </Button>
                    </div>
                ) : null}
            </div>
            <div className="body">
                <p className={cx('nickName')}>
                    <span> {user.nickname}</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>{userData.full_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}> {userData.follwers_count} </strong>
                    <span className={cx('space')}>.</span>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}> {userData.likes_count} </strong>
                    <span className={cx('space')}>.</span>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
