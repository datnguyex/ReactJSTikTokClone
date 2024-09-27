import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import style from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowBottom } from '~/component/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);

const defaultFn = () => {};

function Menu({
    placement = 'bottom-end',
    children,
    items = [],
    hideOnClick = 'false',
    onChange = defaultFn,
    start = 0,
    end = 700,
    className,
    seeMore = false,
    getValue,
}) {
    const [initialValue, setInitialValue] = useState(items.slice(0, 5));
    const [history, setHistory] = useState([{ data: items }]);
    const [closeBtn, setCloseBtn] = useState(false);
    //tao 1 mang chua object chua 1 mang dc dat ten la data

    const current = history[history.length - 1];

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.Children;

            return (
                <MenuItem
                    getValue={getValue}
                    key={index}
                    data={item}
                    className={className}
                    onClick={() => {
                        if (isParent) {
                            console.log();
                            setHistory((pre) => [...pre, item.Children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    useEffect(() => {
        setHistory([{ data: items }]);
    }, [items]);

    const renderMoreItem = () => {
        return initialValue.map((init, index) => <MenuItem key={index} data={init} className={className} />);
    };
    const handleResetToFirst = () => {
        setHistory((pre) => pre.slice(0, 1));
        setInitialValue(items.slice(0, 5));
        setCloseBtn(false);
    };
    const handleReset = () => {
        setHistory((pre) => pre.slice(0, pre.length - 1));
        setInitialValue(items);
        setCloseBtn(true);
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list', className)} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper', className)}>
                {history.length > 1 && (
                    <Header
                        title={current.title}
                        icon={<FontAwesomeIcon icon={faChevronLeft} />}
                        onBack={handleReset}
                    />
                )}

                <div className={cx('menu-scrollable')}> {seeMore === false ? renderItems() : renderMoreItem()}</div>
                {seeMore == true && closeBtn == false && (
                    <Header className={className} title={<ArrowBottom />} onBack={handleReset} />
                )}
            </PopperWrapper>
        </div>
    );

    // console.log('items', items);
    // console.log('PopperWrapper', PopperWrapper);
    return (
        <Tippy
            // appendTo="parent"
            delay={[start, end]}
            interactive
            placement={placement}
            hideOnClick={hideOnClick}
            onHide={handleResetToFirst}
            render={renderResult}
            zIndex={999}
        >
            {children}
        </Tippy>
    );
}
Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
