import { memo, useEffect, useState } from 'react';
import { EyeHiddenIcon, EyeOpenIcon } from '~/component/Icons';
import axios from 'axios';
import styles from './ResetPassword.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ResetPassword({
    handleValueEmail,
    handleValueCode,
    handleSendCodeResetPassword,
    handleSetValue,
    handleCheckPassHave,
    hidePass,
    handleSetHidePass,
    handleSubmitResetPassword,
}) {
    return (
        <>
            <div className={cx('ChooseLogin')}>
                <p>Enter email address</p>
                <p className={cx('text-ChooseLogin')}>Let’s get started!</p>
            </div>
            <input
                onChange={(e) => {
                    handleValueEmail(e.target.value);
                }}
                placeholder={'Email or Username'}
                className={cx('input-ChooseLogin')}
            />
            <div className={cx('wrap-digit')}>
                <input
                    onChange={(e) => {
                        handleValueCode(e.target.value);
                    }}
                    className={cx('enter-digit')}
                    placeholder="Enter 6-digit code"
                />
                <button onClick={handleSendCodeResetPassword} className={cx('btn-digit')}>
                    Send code
                </button>
            </div>
            <div className={cx('Wrap__input-ChooseLogin')}>
                <input
                    onChange={(e) => handleSetValue(e)}
                    onClick={handleCheckPassHave}
                    type={hidePass == false ? 'password' : 'text'}
                    placeholder={'Password'}
                    className={cx('input-ChooseLogin')}
                />

                {hidePass == false ? (
                    <span onClick={handleSetHidePass} className={cx('iconPass')}>
                        <EyeHiddenIcon />
                    </span>
                ) : (
                    <span onClick={handleSetHidePass} className={cx('iconPass')}>
                        <EyeOpenIcon />
                    </span>
                )}
                <button onClick={handleSubmitResetPassword} className={cx('btn-log')}>
                    Login
                </button>
            </div>
        </>
    );
}

export default ResetPassword;
