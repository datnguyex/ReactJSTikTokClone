import classNames from 'classnames/bind';
import style from './UserComment.module.scss';
import Button from '~/component/Button';
import Menu from '~/component/Popper/Menu';
import Tippy from '@tippyjs/react/';
import 'tippy.js/dist/tippy.css';
import { Image } from '~/component/Image';
import { CommentShare } from '~/component/Array';

import {
    HeartIcon,
    HeartSolidIcon,
    CommentIcon,
    SaveIcon,
    SaveSolidIcon,
    EmbedIcon,
    FacebookIcon,
    WhatsAppIcon,
    TelegramIcon,
    ShareIcon,
    ReportCircleIcon,
} from '~/component/Icons';
const cx = classNames.bind(style);

function UserComment({ handleLine, line, handleHeart, heart, handleSave, save, handleChangeType, changeType }) {
    return (
        <>
            <div className={cx('content-right')}>
                <div className={cx('wrap__info-user')}>
                    <div className={cx('wrap__content-user')}>
                        <div className={cx('wrap-user')}>
                            <Image
                                className={cx('img-user')}
                                alt=""
                                src="https://th.bing.com/th/id/OIP.pegfGc8sWHh2_RuwiuAknwHaHZ?rs=1&pid=ImgDetMain"
                            />
                            <div className={cx('wrap-text__user')}>
                                <p className={cx('nicknname_user')}>Legiabao0501</p>
                                <div className={cx('name-timePost__user')}>
                                    <p className={cx('name_user')}>Lê Gia Bảo</p>
                                    <p className={cx('timePost_space')}>.</p>
                                    <p className={cx('timePost_user')}>1-20</p>
                                </div>
                            </div>
                        </div>
                        <Button primary>Follow</Button>
                    </div>
                    <div onMouseLeave={() => handleLine(null)} className={cx('wrap-des__hashtag')}>
                        <p className={cx('text-des__hashtag')}>
                            Bao nhiêu thương nhớ gom nhặc đầy{' '}
                            <span
                                onMouseEnter={() => handleLine('hashtag4')}
                                className={cx('tex-hashtag', line === 'hashtag4' ? 'line_bottom' : '')}
                            >
                                #legiabao
                            </span>{' '}
                            <span
                                onMouseEnter={() => handleLine('hashtag1')}
                                className={cx('tex-hashtag', line === 'hashtag1' ? 'line_bottom' : '')}
                            >
                                #legiabaocover
                            </span>{' '}
                            <span
                                onMouseEnter={() => handleLine('hashtag2')}
                                className={cx('tex-hashtag', line === 'hashtag2' ? 'line_bottom' : '')}
                            >
                                {' '}
                                #muaxuandautien
                            </span>{' '}
                            <span
                                onMouseEnter={() => handleLine('hashtag3')}
                                className={cx('tex-hashtag', line === 'hashtag3' ? 'line_bottom' : '')}
                            >
                                #bolero
                            </span>
                        </p>
                    </div>
                    <div
                        onMouseLeave={() => handleLine(null)}
                        onMouseEnter={() => handleLine('song')}
                        className={cx('wrap__text-song')}
                    >
                        <div className={cx('text-song', line === 'song' ? 'line_bottom' : '')}>
                            <p className={cx('icon__text-song')}>$</p>
                            <p>nhạc nền</p> <p className={cx('line__spread')}>-</p> <p>Lê Gia Bảo</p>
                        </div>
                    </div>
                </div>
                <div className={cx('wrap__list-icon')}>
                    <div className="left__list-icon">
                        <div className={cx('item-left')}>
                            <div onClick={handleHeart} className={cx('wrap__icon-text')}>
                                <span className={cx('item-icon')}>
                                    {heart == false ? (
                                        <HeartIcon width={'20'} height={'20'} />
                                    ) : (
                                        <HeartSolidIcon width={'20'} height={'20'} />
                                    )}
                                </span>
                                <stong className={cx('item-text')}>6574</stong>
                            </div>
                            <div className={cx('wrap__icon-text')}>
                                <span className={cx('item-icon')}>
                                    <CommentIcon width={'20'} height={'20'} />
                                </span>
                                <stong className={cx('item-text')}>102</stong>
                            </div>
                            <div className={cx('wrap__icon-text')}>
                                <span onClick={handleSave} className={cx('item-icon')}>
                                    {save == false ? (
                                        <SaveIcon width={'20'} height={'20'} />
                                    ) : (
                                        <SaveSolidIcon width={'20'} height={'20'} />
                                    )}
                                </span>
                                <stong className={cx('item-text')}>310</stong>
                            </div>
                        </div>
                    </div>
                    <div className={cx('item-right')}>
                        <Tippy content="Report">
                            <span className={cx('icon-right')}>
                                <ReportCircleIcon />
                            </span>
                        </Tippy>
                        <Tippy content="Embedd">
                            <span className={cx('icon-right')}>
                                <EmbedIcon />
                            </span>
                        </Tippy>
                        <Tippy content="Share to Telegram">
                            <span className={cx('icon-right')}>
                                <TelegramIcon />
                            </span>
                        </Tippy>
                        <Tippy content="Share to Facebook">
                            <span className={cx('icon-right')}>
                                <FacebookIcon />
                            </span>
                        </Tippy>
                        <Tippy content="Share to WhatsApp">
                            <span className={cx('icon-right')}>
                                <WhatsAppIcon />
                            </span>
                        </Tippy>
                        <Menu className={'comment_wrap-share'} items={CommentShare}>
                            <span className={cx('icon-right')}>
                                <ShareIcon width={'18px'} height={'18px'} />
                            </span>
                        </Menu>
                    </div>
                </div>
                <div className={cx('wrap-type')}>
                    <p
                        onClick={() => handleChangeType('Comments')}
                        className={cx('type-item', changeType == 'Comments' ? 'type-item__solid' : '')}
                    >
                        Comments (2044)
                    </p>
                    <p
                        onClick={() => handleChangeType('Creator Videos')}
                        className={cx('type-item', changeType == 'Creator Videos' ? 'type-item__solid' : '')}
                    >
                        Creator Videos
                    </p>
                </div>
            </div>
        </>
    );
}

export default UserComment;
