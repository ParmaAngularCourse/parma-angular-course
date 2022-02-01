import {Action} from '@ngrx/store'
import { NewsFilter } from '../../../model/NewsFilter';
import { News } from '../../../model/News';

export const LOAD_NEWS = '[News list] Load News';
export const LOAD_NEWS_SUCCESS = '[News list] Load News Success';
export const LOAD_NEWS_ERROR = '[News list] Load News Error';

export class LoadNews implements Action{
    readonly type = LOAD_NEWS;
    constructor(public payload: NewsFilter){}
}

export class LoadNewsSuccess implements Action{
    readonly type = LOAD_NEWS_SUCCESS;
    constructor(public payload: News[][]){}
}

export class LoadError implements Action{
    readonly type = LOAD_NEWS_ERROR;
}

export type AllNewsActions = 
LoadNews
| LoadNewsSuccess
| LoadError;