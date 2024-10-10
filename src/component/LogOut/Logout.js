import classNames from 'classnames/bind';
import styles from './Logout.module.scss';
import axios from 'axios';
const cx = classNames.bind(styles);

function LogOut({ handleDisPlayLogOut, handleUserValue }) {
    const handlelogout = () => {
        axios
            .post('http://127.0.0.1:8000/api/logout', {})
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
        localStorage.removeItem('token');
        handleUserValue(null);
        handleDisPlayLogOut();
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-content')}>Are you sure you want to log out</div>
                <div className={cx('wrap__btn-content')}>
                    <button className={cx('btn-cancle')}>Cancel</button>
                    <button onClick={handlelogout} className={cx('btn-logout')}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogOut;
