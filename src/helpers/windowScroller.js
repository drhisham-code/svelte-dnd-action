import {makeScroller} from "./scroller";

const INTERVAL_MS = 300;
let mousePosition;

/**
 * Do not use this! it is visible for testing only until we get over the issue Cypress not triggering the mousemove listeners
 * // TODO - make private (remove export)
 * @param {{clientX: number, clientY: number}} e
 */
export function updateMousePosition(e) {
    mousePosition = {x: e.clientX, y: e.clientY};
}
const {scrollIfNeeded, resetScrolling} = makeScroller();
let next;

function loop() {
    if (mousePosition) {
        scrollIfNeeded(mousePosition, document.documentElement);
    }
    next = window.setTimeout(loop, INTERVAL_MS);
}

/**
 * will start watching the mouse pointer and scroll the window if it goes next to the edges
 */
export function armWindowScroller() {
    console.debug('arming window scroller');
    window.addEventListener('mousemove', updateMousePosition);
    loop();
}

/**
 * will stop watching the mouse pointer and won't scroll the window anymore
 */
export function disarmWindowScroller() {
    console.debug('disarming window scroller');
    window.removeEventListener('mousemove', updateMousePosition);
    mousePosition = undefined;
    window.clearTimeout(next);
    resetScrolling();
}