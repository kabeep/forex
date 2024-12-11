function getLocale () {
    if (typeof window === 'undefined' || !window.navigator)
        return;

    return window.navigator.language?.split('-')?.[1];
}

export default getLocale;
