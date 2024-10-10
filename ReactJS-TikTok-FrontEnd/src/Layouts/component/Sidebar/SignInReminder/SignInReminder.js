import classNames from 'classnames/bind';
import style from './SignInReminder.module.scss';
import Button from '~/component/Button';
import { memo, useMemo } from 'react';
const cx = classNames.bind(style);
function SignInReminder() {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('des')}>Log in to follow creators, like videos, and view comments.</p>
            <Button className={cx('login-btn')} large outline>
                Log in
            </Button>
        </div>
    );
}

export default memo(SignInReminder);
