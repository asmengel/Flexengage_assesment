
export const capitalize = string => {
    if (typeof string !== 'string' || string.length < 2) {
        return '';
    }
    return string[0].toUpperCase() + string.slice(1);
}