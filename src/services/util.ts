function toTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')            // split camelCase
    .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
}

export {toTitleCase}