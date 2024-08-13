export function toDateString(dateValue: Date | null) {
    return dateValue ? (dateValue?.toISOString() ?? "") : "";
}

export function toDateValue(dateString: string | null) {
    return dateString ? new Date(dateString) : null;
}


const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Chicago', // Central Time Zone
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
};

const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Chicago',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
};

export function utcToCentral(utcDate: Date | null) {
    if (!utcDate) {
        return "";
    }
    const centralDate = new Intl.DateTimeFormat('en-US', dateOptions).format(utcDate);
    const centralTime = new Intl.DateTimeFormat('en-US', timeOptions).format(utcDate);
    return `${centralDate} ${centralTime}`;
}


export function formatTimeRange(beginDatetime: Date | null, endDatetime: Date | null) {
    if (!beginDatetime) {
        return utcToCentral(endDatetime);
    } else if (!endDatetime) {
        return utcToCentral(beginDatetime);
    } else if (!beginDatetime && !endDatetime) {
        return 'TBD';
    } else {
        const beginDate = new Intl.DateTimeFormat('en-US', dateOptions).format(beginDatetime);
        const endDate = new Intl.DateTimeFormat('en-US', dateOptions).format(endDatetime);
        const beginTime = new Intl.DateTimeFormat('en-US', timeOptions).format(beginDatetime);
        const endTime = new Intl.DateTimeFormat('en-US', timeOptions).format(endDatetime);

        if (beginDate === endDate) {
            return `${beginDate} ${beginTime} - ${endTime}`;
        } else {
            return `${beginDate} ${beginTime} - ${endDate} ${endTime}`
        }
    }
}