import { isEmpty, cloneDeep, isArray} from 'lodash';

export const isItEmpty = (param: any) => isEmpty(param)
export const deepCopy = (param: any) => cloneDeep(param)
export const isArrayLength = (collections: any)=> (isArray(collections) && !isItEmpty(collections));

const exportedObject = {
  isItEmpty,
  deepCopy,
  isArrayLength,
};

export default exportedObject;
