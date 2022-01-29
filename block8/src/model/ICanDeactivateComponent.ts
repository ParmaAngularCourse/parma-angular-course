import { Observable } from "rxjs";

export interface ICanDeactivateComponent{
    canDeactivate: () => boolean | Observable<boolean>;
}