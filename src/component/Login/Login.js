import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useState, useCallback } from 'react';
import Listform from '~/component/Login/Listform';
import WriteForm from '~/component/Login/WriteForm';
import { ListLogin, ListRegister } from '~/component/Array';
import { XWordIcon } from '~/component/Icons';
const cx = classNames.bind(styles);
const Login = ({ displayLogin }) => {
    const [nameClass, setNameClass] = useState(true);
    const [type, setType] = useState('login');
    const [ITEMS, setITEMS] = useState(ListLogin);
    const [form, setForm] = useState('');
    const handleTimeout = () => {
        setNameClass((pre) => !pre);
        setTimeout(() => {
            displayLogin();
        }, 200);
    };
    const handleForm = useCallback((item) => {
        setForm(item);
    }, []);

    const handleSetITEMS = useCallback(() => {
        if (type == 'login') {
            setType('register');
            setITEMS(ListRegister);
        } else {
            setType('login');
            setITEMS(ListLogin);
        }
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx(nameClass == true ? 'wrap-content' : 'hidden')}>
                {form == 'login' || form == 'register' ? (
                    <WriteForm handleForm={handleForm} handleTimeout={handleTimeout} type={type} />
                ) : (
                    <>
                        <span onClick={handleTimeout} className={cx('close-btn')}>
                            <XWordIcon />
                        </span>
                        <div className={cx('content')}>
                            <Listform
                                type={type}
                                handleForm={handleForm}
                                title={type === 'login' ? 'Log in to TikTok' : 'Sign up for TikTok'}
                                ITEMS={ITEMS}
                            />
                            <p className={cx('login-terms')}>
                                By continuing with an account located in Vietnam, you agree to our
                                <span className={cx('space')}>.</span>
                                <a href="" className={cx('Policy')}>
                                    Terms of Service
                                </a>
                                and acknowledge that you have read our
                                <span className={cx('space')}>.</span>
                                <a href="" className={cx('Policy')}>
                                    Privacy Policy.
                                </a>
                            </p>
                        </div>
                        {type == 'register' ? (
                            <div className={cx('SignUp')}>
                                <p>Already have an account</p>
                                <a onClick={handleSetITEMS} className={cx('text-SignUp')}>
                                    Log in
                                </a>
                            </div>
                        ) : (
                            <div className={cx('SignUp')}>
                                <p>Don't have an account</p>
                                <a onClick={handleSetITEMS} className={cx('text-SignUp')}>
                                    Signup
                                </a>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
export default Login;
