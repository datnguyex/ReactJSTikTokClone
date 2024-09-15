import classNames from 'classnames/bind';
import style from './InfoProfile.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import 'tippy.js/dist/tippy.css';
import { InfoProfileItems } from '~/component/Array';
import { memo, useState } from 'react';
import { Image } from '~/component/Image';

import {
    ShareSolidIcon,
    WriteIcon,
    PostIcon,
    EmbedIcon,
    SendIcon,
    FacebookIcon,
    LinkIcon,
    WhatsAppIcon,
    TwitterIcon,
    LinkedlnIcon,
    TelegramIcon,
    EmailIcon,
    RedditIcon,
    LineIcon,
    PinteresIcon,
} from '~/component/Icons';
const cx = classNames.bind(style);

function InfoProfile({ handleSetUpdate, showUpdate }) {
    return (
        <>
            <div className={cx('info')}>
                <Image
                    className={cx('img')}
                    alt=""
                    src="https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?rs=1&pid=ImgDetMain"
                ></Image>
                <div className={cx('text-info')}>
                    <h1 className={cx('wrap-nickname')}>
                        <p className={cx('nickname')}>nguynt6493</p>

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
                    <h2 className={cx('name')}>Nguyễn Đạt</h2>

                    {/* <button className={cx('btn-info')}>
                            <WriteIcon />

                            <span>Edit profile</span>
                        </button> */}
                    <div className={cx('wrap-btnInfo')}>
                        <Button onClick={handleSetUpdate} className={cx('btn-info')} leftIcon={<WriteIcon />}>
                            Edit profile
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('statistics')}>
                <div className={cx('stats')}>
                    <strong className={cx('title-numb')}>64</strong>
                    <span className={cx('title-stats')}>Following</span>
                </div>
                <div className={cx('stats')}>
                    <strong className={cx('title-numb')}>1.5M</strong>
                    <span className={cx('title-stats')}>Follower</span>
                </div>
                <h3 className={cx('stats')}>
                    <strong className={cx('title-numb')}>56.4M</strong>
                    <span className={cx('title-stats')}>Liked</span>
                </h3>
            </div>

            <h2 className={cx('introduce')}>FB: Nguyen Anh Tu (Bin Yet).</h2>
        </>
    );
}

export default memo(InfoProfile);
