import { createAction, props } from "@ngrx/store"
import { NewsFilter } from "../../..//model/NewsFilter";
import { INewsData } from "../../../model/INewsData";

export const loadNews = createAction(
    '[News list] Load News',
    props<{ filter: NewsFilter }>()
);

export const loadNewsSuccess = createAction(
    '[News list] Load News Success',
    props<{ newsData: INewsData[], filter: NewsFilter }>()
);

export const loadNewsError = createAction(
    '[News list] Load News Error',    
    props<{ error: string }>()
);

export const editNews = createAction(
    '[News list] Edit News',    
    props<{ editNews: INewsData }>()
);

export const editNewsSuccess = createAction(
    '[News list] Edit News Success',
    props<{ editNews: INewsData }>()
);

export const editNewsError = createAction(
    '[News list] Edit News Error',
    props<{ error: string }>()
);

export const addNewsSuccess = createAction(
    '[News list] Add News Success',
    props<{ editNews: INewsData }>()
);