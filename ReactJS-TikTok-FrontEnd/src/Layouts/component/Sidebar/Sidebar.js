import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import SuggestedAccounts from '~/component/SuggestedAccounts';
import SignInReminder from '~/layouts/component/Sidebar/SignInReminder';

import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/component/Icons';
import { memo, useEffect, useState } from 'react';
const cx = classNames.bind(style);

function Sidebar({ userValue }) {
    const currentUser = userValue != null ? true : false;
    const [mouseEnter, setmouseEnter] = useState(false);

    return (
        <aside
            onMouseEnter={() => setmouseEnter(true)}
            onMouseLeave={() => setmouseEnter(false)}
            className={cx('wrapper', { mouseEnter: mouseEnter })}
        >
            <Menu className={'sidebar-item'}>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            {currentUser ? (
                <>
                    <SuggestedAccounts label="Suggested Accounts"></SuggestedAccounts>
                    <SuggestedAccounts label="Follow Accounts"></SuggestedAccounts>
                </>
            ) : (
                <div>
                    <SignInReminder />
                </div>
            )}
        </aside>
    );
}

export default memo(Sidebar);
