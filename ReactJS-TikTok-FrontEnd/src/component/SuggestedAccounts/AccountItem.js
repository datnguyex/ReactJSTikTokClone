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
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function AccountItem({ user }) {
    const rederReview = (props) => (
        <div>
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview user={user} />
                </PopperWrapper>
            </div>
        </div>
    );
    const navigate = useNavigate();

    return (
        <Link to={`/${user.nickname}`}>
            <HeadlessTippy placement="bottom" delay={[0, 80]} offset={[0, 0]} interactive render={rederReview}>
                <div className={cx('account-item')}>
                    <img
                        className={cx('avatar')}
                        loading="lazy"
                        alt=""
                        src={`http://127.0.0.1:8000/storage/${user.image}`}
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickName')}>
                            <span>{user.nickname}</span>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>{user.full_name}</p>
                    </div>
                </div>
            </HeadlessTippy>
        </Link>
    );
}

AccountItem.propTypes = {};
export default memo(AccountItem);
