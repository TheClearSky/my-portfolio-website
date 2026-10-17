import React, { useEffect, useRef, useState } from 'react';
import './OverlayScrollbar.css';

/**
 * A scrollbar that floats OVER the content instead of taking space, so
 * nothing shifts when a page or panel starts or stops scrolling. The native
 * bars are hidden everywhere (index.css); this draws a thin thumb that shows
 * while scrolling or hovered, and can be dragged.
 *
 *   <OverlayScrollbar />                      the page (window)
 *   <OverlayScrollbar target={boxRef} />      a scroll box; place it inside the
 *                                             box's position: relative parent
 */
export default function OverlayScrollbar({ target }) {
    const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false });
    const [active, setActive] = useState(false);
    const hideTimer = useRef(0);
    const drag = useRef(null);

    useEffect(() => {
        const element = target?.current ?? null;
        const source = () => {
            if (element) return { scrollTop: element.scrollTop, client: element.clientHeight, scroll: element.scrollHeight, offset: element.offsetTop };
            const root = document.documentElement;
            return { scrollTop: window.scrollY, client: window.innerHeight, scroll: root.scrollHeight, offset: 0 };
        };
        const measure = () => {
            const { scrollTop, client, scroll, offset } = source();
            if (scroll <= client + 1) {
                setThumb((previous) => (previous.visible ? { top: 0, height: 0, visible: false } : previous));
                return;
            }
            const height = Math.max(28, (client * client) / scroll);
            const top = offset + (scrollTop / (scroll - client)) * (client - height);
            setThumb({ top, height, visible: true });
        };
        const onScroll = () => {
            measure();
            setActive(true);
            clearTimeout(hideTimer.current);
            hideTimer.current = window.setTimeout(() => setActive(false), 900);
        };
        const scroller = element ?? window;
        scroller.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', measure);
        // Content changes size (a page loads in, a message arrives): re-measure.
        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(element ?? document.body);
        const mutationObserver = new MutationObserver(measure);
        mutationObserver.observe(element ?? document.body, { childList: true, subtree: true });
        measure();
        return () => {
            scroller.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', measure);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            clearTimeout(hideTimer.current);
        };
    }, [target]);

    const onPointerDown = (event) => {
        const element = target?.current ?? null;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = { y: event.clientY, start: element ? element.scrollTop : window.scrollY };
    };
    const onPointerMove = (event) => {
        if (!drag.current) return;
        const element = target?.current ?? null;
        const client = element ? element.clientHeight : window.innerHeight;
        const scroll = element ? element.scrollHeight : document.documentElement.scrollHeight;
        const travel = Math.max(1, client - thumb.height);
        const next = drag.current.start + ((event.clientY - drag.current.y) / travel) * (scroll - client);
        if (element) element.scrollTop = next;
        else window.scrollTo(0, next);
    };
    const onPointerUp = () => {
        drag.current = null;
    };

    if (!thumb.visible) return null;
    return (
        <div
            className={'overlayscrollbar' + (target ? ' inbox' : ' onpage') + (active ? ' active' : '')}
            style={{ top: thumb.top, height: thumb.height }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            aria-hidden="true"
        />
    );
}
