export const ObjectUtil = () => {
  const checkObject = (obj: Object): boolean => {
    let isEmpty = obj && Object.keys(obj).length === 0;
    return isEmpty;
  };

  return {
    checkObject,
  };
};
