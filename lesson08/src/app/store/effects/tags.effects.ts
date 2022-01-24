import {Injectable} from "@angular/core";
import {TagsListService} from "../../news/services/tags-list.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {filter, map, switchMap, withLatestFrom} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import * as fromActions from '../actions'
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

@Injectable()
export class TagsEffects {
  constructor(private _tagsService: TagsListService,
              private _store: Store<fromReducers.State>,
              private actions$: Actions) {
  }

  loadTagsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadTagsList),
      withLatestFrom(this._store.pipe(select(fromSelectors.selectTagsAllLoaded))),
      filter(([, allLoaded]) => !allLoaded),
      switchMap(() => {
        return this._tagsService.getTagsList().pipe(
          map((tagsList) => {
            return fromActions.loadTagsListSuccess({ tags: tagsList })
          })
        )
      })
    )
  )
}
