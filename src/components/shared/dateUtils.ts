export function toDateString(dateValue: Date | null) {
    return dateValue ? dateValue?.toISOString() ?? '' : '';
}

export function toDateValue(dateString: string | null) {
    return dateString ? new Date(dateString) : null;
}