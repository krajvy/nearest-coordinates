import type { DataTableRow } from "@/types";

const sortByDistance = (heap: DataTableRow[]): DataTableRow[] =>
  heap.sort((first: DataTableRow, second: DataTableRow) => {
    if (first.distance > second.distance) {
      return 1;
    } else if (first.distance < second.distance) {
      return -1;
    }
    return 0;
  });

export default sortByDistance;
