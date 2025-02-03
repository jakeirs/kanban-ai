export const cleanAndParseString = (value: unknown) => {
  console.log("cleanAndParseString", JSON.stringify(value, null, 2));

  // If the value isn't a string, return as is
  if (typeof value !== "string") {
    return value;
  }


  // First, let's clean up the string
  let cleanedString = value
    // Replace literal '\n' with actual newlines
    .replace(/\\n/g, "\n")
    // Replace escaped quotes with regular quotes
    .replace(/\\"/g, '"')
    // Remove any extra backslashes
    .replace(/\\\\/g, "\\");

  try {
    // Attempt to parse the cleaned string
    return JSON.parse(cleanedString);
  } catch (firstError) {
    try {
      // If first parse fails, the string might still be valid JSON
      return JSON.parse(value);
    } catch (secondError) {
      // If both attempts fail, return the cleaned string
      return cleanedString;
    }
  }
};
