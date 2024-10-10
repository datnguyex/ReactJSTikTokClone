import classNames from 'classnames/bind';
import style from './InfoSetting.module.scss';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tippy.js/dist/tippy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Menu from '~/component/Popper/Menu';
import { faFileVideo, faScissors, faVideo, faAngleDown, faHouse } from '@fortawesome/free-solid-svg-icons';
import { TickIcon } from '~/component/Icons';
import images from '~/assets/images';
const cx = classNames.bind(style);
function InfoSetting({ manage_items, handleValueWatch, infoVideo }) {
    return (
        <>
            <div className={cx('get__info-video')}>
                <p className={cx('name__info-video')}>
                    <Tippy
                        content={infoVideo.name}
                        placement="top"
                        interactive
                        delay={[0, 100]} // Thay đổi độ trễ nếu cần
                    >
                        <span>{infoVideo.name}</span>
                    </Tippy>
                    <Menu getValue={handleValueWatch} items={manage_items} className={'wrap_manageItem'}>
                        <button className={cx('btnManage__info-video')}>
                            Manage
                            <FontAwesomeIcon className={cx('icon_manage')} icon={faAngleDown} />
                        </button>
                    </Menu>
                </p>
                <span className={cx('wrap__size_dura-video')}>
                    <span className={cx('wrap__size-video')}>
                        <span className={cx('text__size-video')}>Size</span>
                        <span className={cx('numb__size-video')}>{infoVideo.size} MB</span>
                    </span>
                    <span className={cx('wrap__size-video')}>
                        <span className={cx('text__size-video')}>Duration</span>
                        <span className={cx('numb__size-video')}> {infoVideo.duration}</span>
                    </span>
                </span>
                <div className={cx('wrap__percent-load')}>
                    <div className={cx('wrap__left-upload')}>
                        <div className={cx('circle-iconCheck')}>
                            <TickIcon width={'2rem'} height={'2rem'} fill={'#fff'} />
                        </div>
                        <p className={cx('title-upload')}>Uploaded</p>
                    </div>
                    <p className={cx('wrap__right-upload')}>100%</p>
                </div>
            </div>
            <div className={cx('line-upload')}></div>
        </>
    );
}

export default InfoSetting;
