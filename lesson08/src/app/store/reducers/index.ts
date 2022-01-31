import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";
import * as fromNews from './news.reducers'
import * as fromMain from './main.reducers'
import * as fromTags from './tags.reducers'
import {
  routerReducer,
  RouterReducerState
} from "@ngrx/router-store";
import {RouterStateSnapshot} from "@angular/router";

export interface State {
  newsItems: fromNews.NewsState,
  mainObjects: fromMain.MainState,
  tagsItems: fromTags.TagsState
  router: RouterReducerState,
}

export const reducers: ActionReducerMap<State> = {
  newsItems: fromNews.reducer,
  mainObjects: fromMain.reducer,
  tagsItems: fromTags.reducer,
  router: routerReducer,
}

export const selectNewsState =  createFeatureSelector<fromNews.NewsState>('newsItems');
export const selectTagsState =  createFeatureSelector<fromTags.TagsState>('tagsItems');
export const selectRouterState =  createFeatureSelector<RouterReducerState<RouterStateSnapshot>>('router');

/*export interface RouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

@Injectable()
export class CustomRouterStateSerializer implements  RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    const {
      url,
      root: { queryParams },
    } = routerState;

    let route: ActivatedRouteSnapshot = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { params } = route;

    return { url, queryParams, params};
  }
}*/
