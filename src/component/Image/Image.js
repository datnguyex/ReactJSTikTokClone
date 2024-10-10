import React, { forwardRef, useEffect, useState } from 'react';
import images from '~/assets/images';
import styles from './Images.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export const Image = forwardRef(
    ({ width, height, fallback: customFallback = images.noImage, className, alt, src, userValue, ...props }, ref) => {
        const [fallback, setFallback] = useState('');
        const handleError = () => {
            setFallback(customFallback);
        };

        return (
            <img
                width={width}
                height={height}
                className={classNames(styles.wrapper, className)}
                alt={alt}
                src={fallback || src}
                ref={ref}
                {...props}
                onError={handleError}
            />
        );
    },
);

images.propTypes = {
    fallback: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string,
};
