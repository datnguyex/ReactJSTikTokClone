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

function Sidebar({ userValue, handleReloadSidebar, reaload }) {
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
                    {/* Suggested Acount */}
                    <SuggestedAccounts
                        handleReloadSidebar={handleReloadSidebar}
                        typeSidebar={'suggest'}
                        userValue={userValue}
                        label="Suggested Accounts"
                        reaload={reaload}
                    ></SuggestedAccounts>

                    {/* following acount */}
                    <SuggestedAccounts
                        handleReloadSidebar={handleReloadSidebar}
                        typeSidebar={'follow'}
                        userValue={userValue}
                        label="Follow Accounts"
                        reaload={reaload}
                    ></SuggestedAccounts>
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
