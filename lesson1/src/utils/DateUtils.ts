export function toDateString(date: Date | undefined): string {
    return (date?.getFullYear().toString() + '-'
        + ("0" + ((date?.getMonth() ?? 0) + 1)).slice(-2) + '-'
        + ("0" + (date?.getDate())).slice(-2))
        + 'T' + date?.toTimeString().slice(0, 5);
}