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
    return field.tests.some((test) => test.name === "required");
  }

  return false;
};
/**
 * check mantine select to be unique value
 * @param arr
 * @returns
 */
export const makeSelectUniqueByValue = (
  arr: { label: string; value: string; disabled?: boolean }[]
): { label: string; value: string; disabled?: boolean }[] => {
  const map = new Map<
    string,
    { label: string; value: string; disabled?: boolean }
  >();
  arr.forEach((item) => {
    map.set(item.value, item);
  });
  return Array.from(map.values());
};

/**
 * Combine data with selected data and loading
 * This function used to get data in multiselect
 */
export const combineMultiSelectData = <
  T extends { label: string; value: string }
>(
  data: T[],
  selectedData: T[],
  isLoading: boolean
) => {
  return makeSelectUniqueByValue([
    ...data, // from BE
    ...(selectedData ?? []), // saved after select
    ...(isLoading
      ? [
          {
            label: "Loading...",
            value: "__loading",
            disabled: true,
          },
        ]
      : []),
  ]);
};

/**
 * Map selected data in MultiSelect to be like this { label, value }[]
 */
export const mapSelectedDataToLabelValuePair = <
  T extends { label: string; value: string }
>(
  data: T[],
  selectedData: T[],
  values: string[]
): {label: string; value: string }[] =>
  values.map((value) => {
    const found = [...data, ...selectedData].find((p) => p.value === value);
    return found ?? { label: value, value };
  });
