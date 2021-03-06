import * as $ from 'jquery';

function createAnalytics(): object {
    let counter = 0;
    let isDestroyed: boolean = false;

    const listener = (): number => { return counter++};

    $('document').on('click', listener);

    return {
        destroy() {
            $('document').off('click', listener);
            isDestroyed = true;
        },

        getClicks() {
            if (isDestroyed) {
                return 'Analytics is destroyed';
            }
            return counter;
        }
    }
}

// @ts-ignore
window['analytics'] = createAnalytics();