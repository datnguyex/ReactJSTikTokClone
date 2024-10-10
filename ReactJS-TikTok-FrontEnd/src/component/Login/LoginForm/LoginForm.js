import { useState, useCallback } from 'react';
import { EyeHiddenIcon, EyeOpenIcon } from '~/component/Icons';
import { ListLogin, ListRegister } from '~/component/Array';
import { XWordIcon } from '~/component/Icons';
import classNames from 'classnames/bind';
import styles from './loginForm.module.scss';
const cx = classNames.bind(styles);

function loginForm({
    handleValueEmail,
    handleValuePass,
    hidePass,
    handleSetHidePass,
    handleDisplayReset,
    handleSubmitLogin,
}) {
    return (
        <>
            <div className={cx('ChooseLogin')}>
                <p>Email or username</p>
                <p className={cx('text-ChooseLogin')}>Let’s get started!</p>
            </div>
            <input
                onChange={(e) => {
                    handleValueEmail(e.target.value);
                }}
                placeholder="Email or Username"
                className={cx('input-ChooseLogin')}
            />
            <div className={cx('Wrap__input-ChooseLogin')}>
                <input
                    onChange={(e) => {
                        handleValuePass(e.target.value);
                    }}
                    type={hidePass ? 'text' : 'password'}
                    placeholder="Password"
                    className={cx('input-ChooseLogin')}
                />
                <span onClick={handleSetHidePass} className={cx('iconPass')}>
                    {hidePass ? <EyeOpenIcon /> : <EyeHiddenIcon />}
                </span>
            </div>
            <p onClick={handleDisplayReset} className={cx('text-forgot')}>
                Forgot password?
            </p>
            <button onClick={handleSubmitLogin} className={cx('btn-log')}>
                Login
            </button>
        </>
    );
}

export default loginForm;
