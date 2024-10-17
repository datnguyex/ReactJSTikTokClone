import { XWordIcon } from '~/component/Icons';
import { useRef, useState } from 'react';
import Button from '~/component/Button';
import classNames from 'classnames/bind';
import style from './UpdateProfile.module.scss';
import { Image } from '~/component/Image';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);
function UpdateProfile({ onClick, showUpdate, userValue, handleUserValue }) {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [bio, setBio] = useState('');
    const [img, setImg] = useState('');
    const [nameClass, setNameClass] = useState(true);
    const imageUrl = `http://127.0.0.1:8000/storage/${userValue.image}`;
    const handleTimeout = () => {
        setNameClass((pre) => !pre);
        setTimeout(() => {
            onClick();
        }, 200);
    };
    const navigate = useNavigate();
    const handleUserName = (e) => {
        setUsername(e.target.value);
    };
    const handleNickname = (e) => {
        setNickname(e.target.value);
    };
    const handleBio = (e) => {
        setBio(e.target.value);
    };
    const handleImg = (e) => {
        setImg(e.target.files[0]);
    };

    const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append('id', userValue.id);
        formData.append('username', username);
        formData.append('nickname', nickname);
        formData.append('bio', bio);
        if (img) {
            formData.append('image', img);
        }
        axios
            .post('http://127.0.0.1:8000/api/updateUser', formData)
            .then((response) => {
                if (response.data.message === 'updated succesfully') {
                    handleUserValue(response.data.data);
                    handleTimeout();
                    window.location.href = `/${response.data.data.nickname}`;
                }
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrap-content')}>
                <div className={cx(nameClass == true ? 'content' : 'hidden')}>
                    <div className={cx('title')}>
                        <h1 className={cx('text-title')}>Edit profile</h1>
                        <span onClick={handleTimeout} className={cx('icon-title')}>
                            <XWordIcon />
                        </span>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('item')}>
                            <h2 className={cx('text-img')}>Edit profile</h2>
                            <div className={cx('wrap-img')}>
                                <Image className={cx('img')} alt="User profile" src={imageUrl} />
                                <input onChange={(e) => handleImg(e)} className={cx('choose-img')} type="file" />
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <h2 className={cx('text-username')}>Username</h2>
                            <div className={cx('wrap-username')}>
                                <input
                                    placeholder={userValue.full_name}
                                    className={cx('input-username')}
                                    value={username}
                                    onChange={(e) => handleUserName(e)}
                                />
                                <p className={cx('address-username')}>www.tiktok.com/@{userValue.full_name}</p>
                                <p className={cx('notice-username')}>
                                    Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                    username will also change your profile link.
                                </p>
                            </div>
                        </div>

                        <div className={cx('item')}>
                            <h2 className={cx('text-username')}>Name</h2>
                            <div className={cx('wrap-username')}>
                                <input
                                    placeholder={userValue.nickname}
                                    className={cx('input-username')}
                                    value={nickname}
                                    onChange={(e) => handleNickname(e)}
                                />

                                <p className={cx('address-username')}>
                                    Your nickname can only be changed once every 7 days.
                                </p>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <h2 className={cx('text-username')}>Bio</h2>
                            <div className={cx('wrap-username')}>
                                <textarea
                                    placeholder={userValue.bio == null ? 'Bio' : userValue.bio}
                                    className={cx('textarea-username')}
                                    value={bio}
                                    onChange={(e) => handleBio(e)}
                                />
                                <p className={cx('address-username')}>0/80</p>
                            </div>
                        </div>
                        <div className={cx('wrap-btn')}>
                            <Button onClick={handleTimeout} className={cx('btn-cancle')}>
                                Cancel
                            </Button>
                            <Link
                                onClick={handleUpdateProfile}
                                className={cx('btn-save', {
                                    'btn-save__text': username !== '' && nickname !== '' && bio !== '' && img !== '',
                                })}
                            >
                                Save
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
