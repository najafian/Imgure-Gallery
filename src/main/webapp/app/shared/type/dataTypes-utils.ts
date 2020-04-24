import {AxiosPromise} from 'axios';
import pick from 'lodash/pick';

export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}
export type IGetResultValues<T> = (data?: any, tabID?: string, page?: number, size?: number, sort?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);

