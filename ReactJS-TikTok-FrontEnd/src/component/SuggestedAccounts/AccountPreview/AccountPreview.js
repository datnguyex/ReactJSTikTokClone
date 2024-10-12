import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Image } from '~/component/Image';
import Button from '~/component/Button';
import styles from './AccountPreview.module.scss';

const cx = classNames.bind(styles);

function AccountPreview({ user }) {
    // console.log('user', user);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    loading="lazy"
                    alt=""
                    src={`http://127.0.0.1:8000/storage/${user.image}`}
                />
                <Button primary className={cx('follow-btn')}>
                    Following
                </Button>
            </div>
            <div className="body">
                <p className={cx('nickName')}>
                    <span> {user.nickname}</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>{user.full_name}</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}> {user.followings_count} </strong>
                    <span className={cx('space')}>.</span>
                    <span className={cx('label')}>Followers</span>
                    <strong className={cx('value')}> {user.likes_count} </strong>
                    <span className={cx('space')}>.</span>
                    <span className={cx('label')}>Likes</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;
