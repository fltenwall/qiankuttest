const deepEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let index = 0; index < keys1.length; index++) {
      const val1 = object1[keys1[index]];
      const val2 = object2[keys2[index]];
      const areObjects = isObject(val1) && isObject(val2);
      if ((areObjects && !deepEqual(val1, val2)) || (!areObjects && val1 !== val2)) {
        return false;
      }
    }

    return true;
};

const isObject = (object) => {
    return object != null && typeof object === 'object';
};

export {
    deepEqual,
}