import { elements } from './base';

export const circleGrow = () => {
    elements.text.innerText = 'Breathe In';
    elements.container.className = 'container grow';
};

export const circleHold = () => {
    elements.text.innerText = 'Hold';
};

export const circleShrink = () => {
    elements.text.innerText = 'Breath Out';
    elements.container.className = 'container shrink';
};