function debounce(function_, wait, { leading = false } = {}) {
    let result;
    let timer;
    let lastThis;
    let lastArguments;

    function invokeFunction() {
        if (lastArguments !== undefined) {
            result = function_.call(lastThis, ...lastArguments);
            timer = lastThis = lastArguments = undefined;
        }

        return result;
    }

    function debounced(...arguments_) {
        lastThis = this;
        lastArguments = arguments_;
        if (leading && timer === undefined) {
            result = invokeFunction();
        }

        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }

        timer = setTimeout(() => {
            result = invokeFunction();
        }, wait);
        return result;
    }

    debounced.cancel = () => {
        if (timer !== undefined) {
            clearTimeout(timer);
        }

        timer = lastThis = lastArguments = undefined;
    };

    debounced.flush = () => {
        return timer === undefined ? result : invokeFunction();
    };

    return debounced;
}

export default debounce;
