const transformStringToReadable = (value: unknown): string => {
    if (value) return value.toString();
    return '-'
}

export {transformStringToReadable}