import { isEmpty, cloneDeep, isArray } from 'lodash';

export const isItEmpty = (param: any): boolean => isEmpty(param);
export const deepCopy = (param: any): any => cloneDeep(param);
export const isArrayLength = (collections: any[]): boolean => (isArray(collections) && !isItEmpty(collections));

const exportedObject = {
  isItEmpty,
  deepCopy,
  isArrayLength
};

export default exportedObject;
