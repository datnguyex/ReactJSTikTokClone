import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import styles from './SuggestedAccounts.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import AccountPreview from '~/component/SuggestedAccounts/AccountPreview';
import { Image } from '~/component/Image';
import { memo } from 'react';
const cx = classNames.bind(styles);
function AccountItem() {
    const rederReview = (props) => (
        <div>
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview />
                </PopperWrapper>
            </div>
        </div>
    );

    return (
        <div>
            <HeadlessTippy placement="bottom" delay={[0, 80]} offset={[0, 0]} interactive render={rederReview}>
                <div className={cx('account-item')}>
                    <Image
                        className={cx('avatar')}
                        loading="lazy"
                        alt=""
                        src="https://th.bing.com/th/id/OIP.aQ2-HK9gCw256kym3o0qRgHaHF?rs=1&pid=ImgDetMain"
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickName')}>
                            <span>LongPhh</span>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Long Phạm</p>
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

AccountItem.propTypes = {};
export default memo(AccountItem);
