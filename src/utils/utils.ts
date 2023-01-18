import { isEmpty, cloneDeep} from 'lodash';

export const isItEmpty = (param: any) => isEmpty(param)
export const deepCopy = (param: any) => cloneDeep(param)

const exportedObject = {
  isItEmpty,
  deepCopy
};

export default exportedObject;
