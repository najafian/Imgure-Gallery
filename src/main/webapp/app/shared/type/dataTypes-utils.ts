import {AxiosPromise} from "axios";

export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}


export type IPayloadRepository<T> = (entity?: any) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export type IPayloadContributor<T> = (url?: string, repositoryID?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
