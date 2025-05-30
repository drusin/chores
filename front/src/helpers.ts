export function normalizeDate(date: Date) {
    const returnVal = new Date(date);
    returnVal.setHours(0, 0, 0, 0);
    return returnVal;
}
