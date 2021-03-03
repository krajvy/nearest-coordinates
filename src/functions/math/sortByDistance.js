const sortByDistance = (heap) =>
  heap.sort(function (first, second) {
    if (first.distance > second.distance) {
      return 1;
    } else if (first.distance < second.distance) {
      return -1;
    }
    return 0;
  });

export default sortByDistance;
