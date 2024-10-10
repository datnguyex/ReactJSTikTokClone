import classNames from 'classnames/bind';
import style from './DescribeUpload.module.scss';
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
import { Image } from '~/component/Image/';
import {
    UploadIcon,
    IconACong,
    IconThang,
    WarningIcon,
    ImageIcon,
    SaveIcon,
    CheckIcon,
    ShareIcon,
    HeartIcon,
    CommentIcon,
} from '~/component/Icons';
const cx = classNames.bind(style);
function DescribeUpload({
    video,
    handleValueWatch,
    watch_items,
    valueWatch,
    handleShowCopyCheck,
    toggelStyle,
    showCopyCheck,
    handleShowMore,
    showMore,
    checkboxStyle,
    handleUpLoadVideo,
    handleDescription,
    description,
    userValue,
}) {
    console.log('description', description);
    console.log('handleUpLoadVideo', handleUpLoadVideo);
    return (
        <div className={cx('wrapGet__info-video')}>
            <div className={cx('get__info-video', 'info-video__divide')}>
                <div className={cx('info-left')}>
                    <p className={cx('description-video')}>Description</p>
                    <div className={cx('wrap__textarea-username')}>
                        <textarea
                            onChange={(e) => handleDescription(e)}
                            placeholder="Share more about your video here"
                            className={cx('textarea-username')}
                        ></textarea>
                        <div className={cx('wrap__item-textarea')}>
                            <div className={cx('left__item-textarea')}>
                                <p>
                                    <IconThang />
                                </p>
                                <p>Hashtags</p>
                                <p className={cx('icon-Mention')}>
                                    <IconACong />
                                </p>
                                <p>Mention</p>
                            </div>
                            <div className={cx('right-textarea')}>
                                <span>0/4000</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrap-notice')}>
                        <p className={cx('text-notice')}>Cover</p>
                        <span className={cx('icon-notice')}>
                            <WarningIcon />
                        </span>
                    </div>
                    <div className={cx('background-video')}>
                        <video className={cx('video-upload')} alt="" src={video}></video>
                        <div className={cx('background-cover')}>
                            <span className={cx('icon__background-cover')}>
                                <ImageIcon />
                            </span>
                            <p className={cx('text__background-cover')}>Edit cover</p>
                        </div>
                    </div>
                    <p className={cx('text__question-video')}>Who can watch this video</p>
                    <Menu
                        getValue={handleValueWatch}
                        className={'wrap_watch-video'}
                        placement={'bottom-start'}
                        items={watch_items}
                    >
                        <button className={cx('btn__watch-video')}>
                            {valueWatch}
                            <span className={cx('icon__watch-video')}>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </button>
                    </Menu>
                    <div className={cx('wrap-copyright')}>
                        <p className={cx('text-copyright')}>Run a copyright check</p>
                        <span className={cx('icon-copyright')}>
                            <WarningIcon />
                        </span>
                        <div className="form-check form-switch">
                            <input
                                onClick={handleShowCopyCheck}
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                style={toggelStyle}
                            />
                        </div>
                    </div>
                    {showCopyCheck == true ? (
                        <>
                            <div className={cx('form__wrap-copyright')}>
                                <div className={cx('wrap-title__copyright')}>
                                    <div className={cx('circle-iconCheck')}>
                                        <TickIcon width={'2rem'} height={'2rem'} fill={'#fff'} />
                                    </div>
                                    <p className={cx('title-copyright')}>No issues detected.</p>
                                </div>
                                <p className={cx('text-copyright')}>
                                    Note: Results of copyright checks aren’t final. For instance, future changes of the
                                    copyright holder’s authorization to the sound may impact your video may impact your
                                    video.{' '}
                                </p>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    <div onClick={handleShowMore} className={cx('wrap-type__see')}>
                        <p className={cx('type-see')}>See {showMore == true ? 'less' : 'more'}</p>
                        <FontAwesomeIcon className={cx(showMore ? 'showMore' : '')} icon={faAngleDown} />
                    </div>
                    {/* --- */}
                    {showMore == true ? (
                        <>
                            <p className={cx('type-allow')}>Allow users to:</p>
                            <div className={cx('wrap__user-accept')}>
                                <div className={cx('accep-item')}>
                                    <div class="form-check">
                                        <input
                                            style={checkboxStyle}
                                            class="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                    </div>
                                    <p className={cx('check__item-text')}>Comment</p>
                                </div>
                                <div className={cx('accep-item')}>
                                    <div class="form-check">
                                        <input
                                            style={checkboxStyle}
                                            class="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                    </div>
                                    <p className={cx('check__item-text')}>Comment</p>
                                </div>
                                <div className={cx('accep-item')}>
                                    <div class="form-check">
                                        <input
                                            style={checkboxStyle}
                                            class="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="flexCheckDefault"
                                        />
                                    </div>
                                    <p className={cx('check__item-text')}>Comment</p>
                                </div>
                            </div>
                            <div className={cx('wrap-disclose')}>
                                <span className={cx('title-disclose')}>Disclose post content</span>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckChecked"
                                        style={toggelStyle}
                                    />
                                </div>
                            </div>
                            <span className={cx('text-disclose')}>
                                Let others know this post promotes a brand, product or service.
                            </span>
                            <div className={cx('wrap-disclose')}>
                                <span className={cx('title-disclose')}>AI-generated content</span>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckChecked"
                                        style={toggelStyle}
                                    />
                                </div>
                            </div>
                            <span className={cx('text-disclose')}>Add this label for aigc.</span>
                        </>
                    ) : (
                        <></>
                    )}
                    {/* //zzzzzzzzzz */}
                </div>
                <div className={cx('info-right')}>
                    <div className={cx('wrap__template-phone')}>
                        <Image className={cx('template-phone')} src={images.templatePhone} alt="" />
                        <video controls className={cx('video-template')} src={video}></video>
                        <div className={cx('wrap__tool-template')}>
                            <div className={cx('item', 'item__wrap-img')}>
                                <span className={cx('check-icon')}>{<CheckIcon fill={'#fff'} />}</span>
                            </div>
                            <div className={cx('item')}>
                                <HeartIcon width={'2rem'} height={'2rem'} />
                                <h5 className={cx('text-item')}>1000</h5>
                            </div>
                            <div className={cx('item')}>
                                <CommentIcon width={'2rem'} height={'2rem'} />
                                <h5 className={cx('text-item')}>1000</h5>
                            </div>
                            <div className={cx('item')}>
                                <SaveIcon width={'2rem'} height={'2rem'} />
                                <h5 className={cx('text-item')}>1000</h5>
                            </div>
                            <div className={cx('item')}>
                                <ShareIcon width={'2rem'} height={'2rem'} />
                                <h5 className={cx('text-item')}>1000</h5>
                            </div>
                        </div>
                        <div className={cx('infor-video')}>
                            <h3 className={cx('nickname')}>{userValue.full_name}</h3>
                            <div className={cx('des')}>
                                <p className={cx('name')}>
                                    {description == null ? 'lets describe your video' : description}
                                </p>
                            </div>
                            <div className={cx('sound')}>
                                {/* <span className={cx('sound-icon')}>{<SoundIcon />}</span> */}
                                {/* <span className={cx('space')}>.</span> */}
                                <span className={cx('sound-info')}>Nhạc nền - {userValue.full_name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('line-bottom')}></div>
            <div className={cx('wrap-btn__bottom')}>
                <button onClick={handleUpLoadVideo} className={cx('wrap-post__bottom')}>
                    Post
                </button>
                <button className={cx('wrap-discard__bottom')}>Discard</button>
            </div>
        </div>
    );
}

export default DescribeUpload;
