import classNames from 'classnames/bind';
import style from './Header.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';

import Search from '~/layouts/component/Search';
import { Image } from '~/component/Image/';
import { UploadIcon, MessageIcon, InboxIcon } from '~/component/Icons';
import config from '~/config/';
import { Children, memo, useEffect, useState } from 'react';
// import HeadlessTippy from '@tippyjs/react/headless';
// import AccountItem from '~/component/AccountItem';
// import { Wrapper as PopperWrapper } from '~/component/Popper';
// import MenuItem from '~';
import {
    // faCircleXmark,
    // faSpinner,
    // faMagnifyingGlass,
    // faFileCircleQuestion,
    // faCloudUpload,
    // faMessage,
    faSignIn,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import MenuItem from '~';

const cx = classNames.bind(style);

function Header({ displayLogin, userValue, handleDisPlayLogOut }) {
    const currentUser = userValue != null ? true : false;

    // console.log('handleDisPlayLogOut', handleDisPlayLogOut);
    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faEarthAsia} />,
            title: 'English',
            Children: {
                title: 'Language',
                data: [
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vi',
                        title: 'Tiếng Việt',
                        // Children: {
                        //     title: 'Language',
                        //     data: [
                        //         {
                        //             code: 'en',
                        //             title: 'English 1',
                        //         },
                        //         {
                        //             code: 'vi',
                        //             title: 'Tiếng Việt 1',
                        //         },
                        //     ],
                        // },
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feeback And Help',
            to: '/feeback',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard Shortcut',
        },
    ];

    const handleMenuChange = (MenuItem) => {
        console.log(MenuItem);
    };

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: userValue ? `${userValue.nickname}` : null,
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coin',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out ',
            handleClick: handleDisPlayLogOut,
            separate: true,
        },
    ];

    // console.log('userMenu', userMenu);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <Image src={images.logo} alt="Logo"></Image>
                </Link>
                <Search />

                {/* action */}
                <div className={cx('action')}>
                    {currentUser == true ? (
                        <>
                            <Tippy interactive content="Upload Video" placement="bottom" delay={[0, 100]}>
                                <Link to={config.routes.upload} className={cx('action-btn')}>
                                    {/* <FontAwesomeIcon icon={faCloudUpload}></FontAwesomeIcon> */}
                                    <UploadIcon className={cx('icon-header')}></UploadIcon>
                                </Link>
                            </Tippy>
                            <Tippy interactive content="Messages" placement="bottom" delay={[0, 100]}>
                                <button className={cx('action-btn')}>
                                    {/* <FontAwesomeIcon icon={faCloudUpload}></FontAwesomeIcon> */}
                                    <MessageIcon className={cx('icon-header')}></MessageIcon>
                                </button>
                            </Tippy>
                            <Tippy interactive content="Inbox" placement="bottom" delay={[0, 100]}>
                                <button className={cx('action-btn')}>
                                    {/* <FontAwesomeIcon icon={faCloudUpload}></FontAwesomeIcon> */}
                                    <InboxIcon className={cx('icon-header')}></InboxIcon>
                                </button>
                            </Tippy>

                            {/* <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
                            </button> */}
                        </>
                    ) : (
                        <>
                            <Button to={config.routes.upload} text>
                                Upload{' '}
                            </Button>
                            <Button
                                // id={'123'}
                                // to={'/following'}
                                rightIcon={<FontAwesomeIcon icon={faSignIn} />}
                                className={cx('custom-login')}
                                primary
                                // small
                                // onChange={() => alert('change')}
                                // rounded
                                // location={true}
                                onClick={displayLogin}
                            >
                                Login{' '}
                            </Button>
                        </>
                    )}

                    {/* menu */}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            currentUser == null ? (
                                <img
                                    className={cx('user-avatar')}
                                    src="hhttps://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/e2a0d34d71940773067459da2d4ef05d~c5_300x300.webp?lk3s=a5d48078&nonce=67418&refresh_token=b050ff2457c9baa1916584f9bb9d2439&x-expires=1723644000&x-signature=ugdf4Cf6W%2BsTRHLfXb7LlavS10g%3D&shp=a5d48078&shcp=c1333099"
                                    alt="CaoCuongVu"
                                    fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                                ></img>
                            ) : (
                                <img
                                    className={cx('user-avatar')}
                                    src={`http://127.0.0.1:8000/storage/${userValue.image}`}
                                    alt="CaoCuongVu"
                                    fallback="https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png"
                                ></img>
                            )
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default memo(Header);
