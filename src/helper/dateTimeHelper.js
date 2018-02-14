// @flow

import Moment from 'moment';

export const DEFAULT_DATE_FORMAT : string = 'YYYY-MM-DD';
export const MEDIUM_LONG_DATE_FORMAT : string = 'D MMM';

export function createToday() : Moment {
    return new Moment();
}

export function formatTodayDate() : string {
    return createToday().format(DEFAULT_DATE_FORMAT);
}

export function createTomorrow() : Moment {
    var moment = new Moment();

    moment.add(1, 'days');

    return moment;
}

export function formatTomorrowDate() : string {
    return createTomorrow().format(DEFAULT_DATE_FORMAT);
}

export function createNextWeek() : Moment {
    var moment = new Moment()

    moment
        .add(1, 'weeks')
        .startOf('isoWeek');

    return moment;
}

export function formatNextWeekDate() : string {
    return createNextWeek().format(DEFAULT_DATE_FORMAT);
}

export function createNextDay(dayNumber : number) : Moment {
    var now = new Moment(),
        moment = new Moment();

    if (now.isoWeekday() >= dayNumber) {
        // day is going to be next week

        moment.add(1, 'weeks');
    }

    moment.isoWeekday(dayNumber);

    return moment;
}

export function formatNextDayDate(dayNumber : number) : string {
    return createNextDay(dayNumber).format(DEFAULT_DATE_FORMAT);
}

export function formatDateRelativeToToday(value : string | Moment) : string {
    if (!(value instanceof Moment)) {
        var moment = new Moment(value, DEFAULT_DATE_FORMAT);

        if (!moment.isValid()) {
            return value;
        }
    } else {
        moment = value;
    }

    if (moment.isSame(createToday(), 'day')) {
        return 'today';
    }

    if (moment.isSame(createTomorrow(), 'day')) {
        return 'tomorrow';
    }

    return moment.format(MEDIUM_LONG_DATE_FORMAT);
}
