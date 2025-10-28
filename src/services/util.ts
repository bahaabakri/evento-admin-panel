function toTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')            // split camelCase
    .replace(/^./, (char) => char.toUpperCase()); // capitalize first letter
}

function filterDataToSend(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => 
      value !== "" && value !== null && value !== undefined
    )
  );
}

export {toTitleCase, filterDataToSend}