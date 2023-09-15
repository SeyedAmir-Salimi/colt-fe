import { typeAllInArray } from 'const/custom';
import { isEmpty, cloneDeep, isArray } from 'lodash';

export const isItEmpty = (param: any): boolean => isEmpty(param);
export const deepCopy = (param: any): any => cloneDeep(param);
export const isArrayLength = (collections: any[]): boolean => (isArray(collections) && !isItEmpty(collections));
export const getMax = (array: typeAllInArray, selector: (event: any) => any): number => (Math.max.apply(Math, array.map(selector)));

export const getDifferentElements = (arrays: any[]): any => {
  const uniqueElements = new Map();

  arrays.forEach((arr: any[]) => {
    arr.forEach((obj: { id: any }) => {
      const elementID = obj.id;
      uniqueElements.set(elementID, obj);
    });
  });
  return Array.from(uniqueElements.values());
};

const exportedObject = {
  deepCopy,
  getDifferentElements,
  getMax,
  isArrayLength,
  isItEmpty
};

export default exportedObject;
