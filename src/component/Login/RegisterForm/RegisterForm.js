import { EyeHiddenIcon, EyeOpenIcon, TickIcon } from '~/component/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ItemsMonth, ItemsDay, ItemsYear } from '~/component/Array';
import Menu from '~/component/Popper/Menu';
import styles from './RegisterForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function RegisterForm({
    handleRotate,
    valueMonth,
    valueDay,
    valueYear,
    handleValueDay,
    handleValueYear,
    handleValueEmail,
    handleValuePass,
    handleCheckPassHave,
    hidePass,
    handleSetHidePass,
    valueCode,
    rotatedIndex,
    handleRotateLeave,
    handleValueMonth,
    handleValueCode,
    valueEmail,
    valuePassWord,
    checkClause,
    handleSendCode,
    handleCheckClause,
}) {
    return (
        <>
            <p className={cx('title-birthday')}>When’s your birthday?</p>
            <div className={cx('wrap-conten__birthday')}>
                <Menu
                    start={0}
                    end={0}
                    getValue={handleValueMonth}
                    hideOnClick
                    className="wrap-popper_birthday"
                    items={ItemsMonth}
                >
                    <div
                        onMouseLeave={handleRotateLeave}
                        onMouseEnter={() => handleRotate(0)}
                        className={cx('birthday-item')}
                    >
                        <p className={cx(valueMonth ? 'value-Have' : '')}>{valueMonth || 'Month'}</p>
                        <span className={cx('birthday-item__icon')}>
                            <FontAwesomeIcon
                                className={cx('birthday-item__icon', {
                                    'rotate-icon': rotatedIndex === 0,
                                    notRotate: rotatedIndex !== 0,
                                })}
                                icon={faAngleDown}
                            />
                        </span>
                    </div>
                </Menu>
                <Menu
                    getValue={handleValueDay}
                    hideOnClick
                    className="wrap-popper_birthday"
                    items={ItemsDay}
                    start={0}
                    end={0}
                >
                    <div
                        onMouseLeave={handleRotateLeave}
                        onMouseEnter={() => handleRotate(1)}
                        className={cx('birthday-item')}
                    >
                        <p className={cx(valueDay ? 'value-Have' : '')}>{valueDay || 'Day'}</p>
                        <span className={cx('birthday-item__icon')}>
                            <FontAwesomeIcon
                                className={cx('birthday-item__icon', {
                                    'rotate-icon': rotatedIndex === 1,
                                    notRotate: rotatedIndex !== 1,
                                })}
                                icon={faAngleDown}
                            />
                        </span>
                    </div>
                </Menu>
                <Menu
                    start={0}
                    end={0}
                    getValue={handleValueYear}
                    hideOnClick
                    className="wrap-popper_birthday"
                    items={ItemsYear}
                >
                    <div
                        onMouseLeave={handleRotateLeave}
                        onMouseEnter={() => handleRotate(2)}
                        className={cx('birthday-item')}
                    >
                        <p className={cx(valueYear ? 'value-Have' : '')}>{valueYear || 'Year'}</p>
                        <span className={cx('birthday-item__icon')}>
                            <FontAwesomeIcon
                                className={cx('birthday-item__icon', {
                                    'rotate-icon': rotatedIndex === 2,
                                    notRotate: rotatedIndex !== 2,
                                })}
                                icon={faAngleDown}
                            />
                        </span>
                    </div>
                </Menu>
            </div>
            <p className={cx('birthday-suggest')}>Your birthday won't be shown publicly.</p>
            <div className={cx('ChooseLogin')}>
                <p>Email</p>
                <p className={cx('text-ChooseLogin')}>Let’s get started!</p>
            </div>
            <input
                onChange={(e) => {
                    handleValueEmail(e.target.value);
                }}
                placeholder="Email"
                className={cx('input-ChooseLogin')}
            />
            <div className={cx('Wrap__input-ChooseLogin')}>
                <input
                    onChange={(e) => {
                        handleValuePass(e.target.value);
                    }}
                    onClick={handleCheckPassHave}
                    type={hidePass ? 'text' : 'password'}
                    placeholder="Password"
                    className={cx('input-ChooseLogin')}
                />
                <span onClick={handleSetHidePass} className={cx('iconPass')}>
                    {hidePass ? <EyeOpenIcon /> : <EyeHiddenIcon />}
                </span>
            </div>
            <div className={cx('wrap-digit')}>
                <input
                    value={valueCode}
                    onChange={(e) => handleValueCode(e.target.value)}
                    className={cx('enter-digit')}
                    placeholder="Enter 6-digit code"
                />
                <div
                    onClick={
                        valueDay != '' &&
                        valueMonth !== '' &&
                        valueYear != '' &&
                        valueEmail != '' &&
                        valuePassWord != '' &&
                        checkClause != false
                            ? handleSendCode
                            : null
                    }
                    className={cx('btn-digit', {
                        'textchange-btnDigit':
                            valueDay !== '' &&
                            valueMonth !== '' &&
                            valueYear !== '' &&
                            valueEmail !== '' &&
                            checkClause === true &&
                            valuePassWord !== '',
                    })}
                >
                    Send code
                </div>
            </div>
            <div className={cx('wrap__signup-agree')}>
                <input
                    onClick={handleCheckClause}
                    readOnly
                    className={cx('check__signup-agree', checkClause ? 'check-success' : '')}
                />
                <label onClick={handleCheckClause} className={cx('icon_signup_clause')}>
                    {checkClause && <TickIcon fill="#fff" width="2.2rem" height="2.2rem" />}
                </label>
                <label className={cx('text__signup-agree')}>
                    Get trending content, newsletters, promotions, recommendations, and account updates sent to your
                    email
                </label>
            </div>
            <button
                onClick={
                    valueDay != '' &&
                    valueMonth !== '' &&
                    valueYear != '' &&
                    valueEmail != '' &&
                    valuePassWord != '' &&
                    valueCode != '' &&
                    checkClause != false
                        ? handleSendCode
                        : null
                }
                className={cx('btn-log', {
                    'textchange-btnDigit':
                        valueDay !== '' &&
                        valueMonth !== '' &&
                        valueYear !== '' &&
                        valueEmail !== '' &&
                        checkClause === true &&
                        valuePassWord !== '' &&
                        valueCode !== null,
                })}
            >
                Next
            </button>
        </>
    );
}

export default RegisterForm;
