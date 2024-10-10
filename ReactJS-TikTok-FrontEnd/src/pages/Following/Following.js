import classNames from 'classnames/bind';
import FollowingItem from '~/pages/Following/FollowingItem';
import style from './Following.module.scss';

const cx = classNames.bind(style);

function Following() {
    return (
        <div id="wrapz" className={cx('wrapper')}>
            <FollowingItem />
            <FollowingItem />
            <FollowingItem />
            <FollowingItem />
        </div>
    );
}

export default Following;
