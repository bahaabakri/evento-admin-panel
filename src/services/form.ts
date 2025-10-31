import * as yup from "yup";

/**
 * Checks if a given field in a Yup schema is required
 * @param schema - Yup schema object
 * @param fieldName - name of the field to check
 * @returns true if the field is required, false otherwise
 */
export const isFieldRequired = (
  schema: yup.ObjectSchema<any>,
  fieldName: string
): boolean => {
  const schemaDesc = schema.describe();
  const field = schemaDesc.fields[fieldName];    
  if (!field) return false;

  // Only proceed if the field has a tests array
  if ("tests" in field && Array.isArray(field.tests)) {
    return field.tests.some(test => test.name === "required");
  }

  return false;
};
/**
 * check mantine select to be unique value
 * @param arr 
 * @returns 
 */
export const makeSelectUniqueByValue = (arr: { label: string; value: string }[]): { label: string; value: string }[] => {
  const map = new Map<string, { label: string; value: string }>();
  arr.forEach((item) => {
    map.set(item.value, item);
  });
  return Array.from(map.values());
}