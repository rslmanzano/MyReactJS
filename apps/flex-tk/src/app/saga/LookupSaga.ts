import { ActionType, getType } from 'typesafe-actions';
import { LookupActions } from 'app/actions';

type Actions = ActionType<typeof LookupActions>;

export function* LookupSaga(action: Actions): {} {
    if( action.type == getType(LookupActions.fetch_lookup)) {
        try {
            let lookups: [] = JSON.parse(action.payload)
            lookups.map((lookup) => console.log(lookup))
            // console.log(action.payload)
        }catch(error) {}
    }
}