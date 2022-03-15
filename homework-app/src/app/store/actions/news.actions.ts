import { createAction, props } from "@ngrx/store";
import { News } from "../../news-list/news-types";

export const loadNews = createAction(
    '[News List] Load News'
);

export const loadNewsSuccess = createAction(
    '[News List] Load News Success',
    props<{newsList: News[]}>()
);

export const editNews = createAction(
    '[News List] Edit News',
    props<{ news: News }>()
);

export const editNewsSuccess = createAction(
    '[News List] Edit News Success',
    props<{ news: News }>()
);

export const editNewsCancel = createAction(
    '[News List] Edit News Cancel'
);