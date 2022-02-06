import { createAction, props } from "@ngrx/store"
import { NewsFilter } from "../../..//model/NewsFilter";
import { News } from "../../../model/News";

export const loadNews = createAction(
    '[News list] Load News',
    props<{ filter: NewsFilter }>()
);

export const loadNewsSuccess = createAction(
    '[News list] Load News Success',
    props<{ newsData: News[], filter: NewsFilter }>()
);

export const loadNewsError = createAction(
    '[News list] Load News Error',    
    props<{ error: string }>()
);

export const editNews = createAction(
    '[News list] Edit News',    
    props<{ editNews: News }>()
);

export const editNewsSuccess = createAction(
    '[News list] Edit News Success',
    props<{ editNews: News }>()
);

export const editNewsError = createAction(
    '[News list] Edit News Error',
    props<{ error: string }>()
);

export const addNewsSuccess = createAction(
    '[News list] Add News Success',
    props<{ editNews: News }>()
);

export const deleteNews = createAction(
    '[News list] Delete News',    
    props<{ deletingNews: News }>()
);

export const deleteNewsSuccess = createAction(
    '[News list] Delete News Success',
    props<{ deletingNewsId: number }>()
);

export const deleteNewsError = createAction(
    '[News list] Delete News Error',
    props<{ error: string }>()
);