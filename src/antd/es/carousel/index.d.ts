import type { Settings } from '@ant-design/react-slick';
import * as React from 'react';
export type CarouselEffect = 'scrollx' | 'fade';
export type DotPosition = 'top' | 'bottom' | 'left' | 'right';
export interface CarouselProps extends Omit<Settings, 'dots' | 'dotsClass'> {
    effect?: CarouselEffect;
    style?: React.CSSProperties;
    prefixCls?: string;
    rootClassName?: string;
    slickGoTo?: number;
    dotPosition?: DotPosition;
    children?: React.ReactNode;
    dots?: boolean | {
        className?: string;
    };
    waitForAnimate?: boolean;
}
export interface CarouselRef {
    goTo: (slide: number, dontAnimate?: boolean) => void;
    next: () => void;
    prev: () => void;
    autoPlay: (palyType?: 'update' | 'leave' | 'blur') => void;
    innerSlider: any;
}
declare const Carousel: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<CarouselRef>>;
export default Carousel;
