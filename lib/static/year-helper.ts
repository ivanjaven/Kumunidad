export const YearHelper = (
  startYear: number,
  endYear: number,
): { id: string; type: string }[] =>
  Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = (startYear + index).toString()
    return { id: year, type: year }
  }).reverse()
