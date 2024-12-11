function formatDate(date) {
    return `${date.getFullYear()}-${paddedDate(date.getMonth() + 1)}-${paddedDate(date.getDate())}`;
}

function paddedDate(value, length = 2, padding = '0') {
    return `${value}`.padStart(length, padding);
}

export default formatDate;
