import { all, takeEvery } from 'redux-saga/effects';
import { AuthClientSaga } from 'app/saga/AuthClientSaga';
import {
    SessionActions,
    EmployeeActions,
    ShiftActions,
    LocationActions,
    RosterActions,
    LookupActions
} from 'app/actions';
import { EmployeeSaga } from 'app/saga/EmployeeSaga';
import { ShiftSaga } from 'app/saga/ShiftSaga';
import { LocationSaga } from 'app/saga/LocationSaga';
import { RosterSaga } from 'app/saga/RosterSaga';
import { LookupSaga } from 'app/saga/LookupSaga';

export default function* rootSaga(): any {
    yield all([
        takeEvery([...Object.values(SessionActions.Type)], AuthClientSaga),
        takeEvery([...Object.values(EmployeeActions.Type)], EmployeeSaga),
        takeEvery([...Object.values(ShiftActions.Type)], ShiftSaga),
        takeEvery([...Object.values(LocationActions.Type)], LocationSaga),
        takeEvery([...Object.values(RosterActions.Type)], RosterSaga),
        takeEvery([...Object.values(LookupActions.Type)], LookupSaga)
    ]);
}
