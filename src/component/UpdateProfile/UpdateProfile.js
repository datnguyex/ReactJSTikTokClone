import { XWordIcon } from '~/component/Icons';
import { useRef, useState } from 'react';
import Button from '~/component/Button';
import classNames from 'classnames/bind';
import style from './UpdateProfile.module.scss';
import { Image } from '~/component/Image';
const cx = classNames.bind(style);
function UpdateProfile({ onClick, showUpdate }) {
    const [username, setUsername] = useState('zzzz');
    const [nameClass, setNameClass] = useState(true);
    const handleTimeout = () => {
        setNameClass((pre) => !pre);
        setTimeout(() => {
            onClick();
        }, 200);
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
                                <Image
                                    className={cx('img')}
                                    alt=""
                                    src="https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?rs=1&pid=ImgDetMain"
                                ></Image>
                                <input className={cx('choose-img')} type="file" />
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <h2 className={cx('text-username')}>Username</h2>
                            <div className={cx('wrap-username')}>
                                <input
                                    placeholder="Username"
                                    className={cx('input-username')}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <p className={cx('address-username')}>www.tiktok.com/@nguynt6493</p>
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
                                    placeholder="Name"
                                    className={cx('input-username')}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
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
                                    placeholder="Bio"
                                    className={cx('textarea-username')}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <p className={cx('address-username')}>0/80</p>
                            </div>
                        </div>
                        <div className={cx('wrap-btn')}>
                            <Button onClick={handleTimeout} className={cx('btn-cancle')}>
                                Cancel
                            </Button>
                            <Button onClick={handleTimeout} className={cx('btn-save')} primary>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;
