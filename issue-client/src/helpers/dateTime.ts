export function getDate(date: Date | string): string {
    if(date) {
        const d = new Date(date);
        const correctMonth = d.getMonth() + 1;
        const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
        const month = correctMonth < 10 ? '0' + correctMonth : correctMonth;
        return d.getFullYear() + '-' + month + '-' + day;
    }
    return '';
}

export function getTime(date: Date | string): string {
    if(date) {
        const d = new Date(date);
        const hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        const mm = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        const ss = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        return hh+':'+mm+':'+ss;
    }
    return '';
}

export function getDateAndTime(date: Date | string): string {
    const dateString = getDate(date);
    const timeString = getTime(date);
    return dateString +' '+timeString;
}