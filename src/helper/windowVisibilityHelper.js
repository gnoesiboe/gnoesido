// @flow

import uuid from 'uuid';

export type VisibilityChangeCallback = () => void;

var _listeners : { [string]: VisibilityChangeCallback } = {},
    eventName : ?string = null,
    apiEndpoint : ?string = null,
    hasEmittedRecently : boolean = false;

function _determineEventName() : string {
    if (eventName) {
        return eventName;
    }

    if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support

        eventName = 'visibilitychange';
    } else if (typeof document.msHidden !== "undefined") {
        eventName = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== "undefined") {
        eventName = 'webkitvisibilitychange';
    } else {
        throw new Error('Browser not supported');
    }

    return eventName;
}

function _determineApiEndpoint() : string {
    if (apiEndpoint) {
        return apiEndpoint;
    }

    if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support

        apiEndpoint = 'hidden';
    } else if (typeof document.msHidden !== "undefined") {
        apiEndpoint = 'msHidden';
    } else if (typeof document.webkitHidden !== "undefined") {
        apiEndpoint = 'webkitHidden';
    } else {
        throw new Error('Browser not supported');
    }

    return apiEndpoint;
}

export function registerListener(callback: VisibilityChangeCallback) : string {
    var id : string = uuid();

    _listeners[id] = callback;

    return id;
}

export function unregisterListener(key: string) : void {
    if (typeof _listeners[key] !== 'undefined') {
        delete _listeners[key];
    }
}

function _emit() {
    if (hasEmittedRecently) {
        return;
    }

    Object.keys(_listeners).forEach((key: string) => _listeners[key]());

    hasEmittedRecently = true;

    setTimeout(
        () => { hasEmittedRecently = false; },
        5000
    );
}

function _onFocus() : void {
    _emit();
}

function _onVisiblityChange() : void {

    // $ExpectError
    var isNowVisible : boolean = document[_determineApiEndpoint()];

    if (isNowVisible) {
        _emit();
    }
}

export function startListening() : void {
    if (typeof document.addEventListener === 'undefined' || typeof document.hidden === 'undefined') {
        console.error('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
    } else {
        document.addEventListener(_determineEventName(), _onVisiblityChange, false);
        window.addEventListener('focus', _onFocus, true);
    }
}

export function stopListening() : void {
    if (typeof document.addEventListener === 'undefined' || typeof document.hidden === 'undefined') {
        return;
    }

    document.removeEventListener(_determineEventName(), _onVisiblityChange, false);
}
