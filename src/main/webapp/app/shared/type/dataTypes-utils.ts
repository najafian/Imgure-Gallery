import {AxiosPromise} from 'axios';
import pick from 'lodash/pick';

export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}
export type IGetResultValues<T> = (data?: any, tabID?: string, page?: number, size?: number, sort?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with relationship fields with empty an empty id and thus
 * resulting in a 500.
 *
 * @param entity Object to clean.
 */
export const cleanEntity = entity => {
  const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));

  return pick(entity, keysToKeep);
};
