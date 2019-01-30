import * as React from 'react';
import BaseForm from 'app/components/Base/BaseForm';
import { IRoster, IShift } from 'app/models';
import { TextField, DefaultButton, DatePicker } from 'flexies';
import { RootState } from 'app/reducers';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { LookupActions } from 'app/actions';

class RosterBaseForm extends BaseForm<IRoster> {}

export interface Lookup<S = {}> {
    records: S;
}

interface LookupProps<S = any> {
    lookup?: S;
}

const withLookup = <P extends LookupProps<any>>(Component: React.ComponentType<P>) => {
    type ResultProps = Omit<P, keyof LookupProps<any>> & ReduxState & ReduxAction;
    interface ReduxState {
        lookup?: any;
    }
    interface ReduxAction {
        fetchLookup?: (lookupString: string) => void
    }
    const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
        fetchLookup: (str: any) => LookupActions.fetch_lookup(str)
    }, dispatch)

    @connect(
        (state: RootState): ReduxState => {
            return {lookup: state.lookups.lookup}
        },
        mapDispatchToProps
    )
    class WithLookup extends React.Component<ResultProps, {}> {
        constructor(props: ResultProps){
            super(props)


        }
        componentDidMount(){
            this.props.fetchLookup(JSON.stringify(Object.keys(this.props.lookup)))
        }
        render(): JSX.Element {

            return (
                <div>
                    <Component {...this.props} lookup={this.props.lookup } />
                </div>
            );
        }
    }
    return WithLookup;
};

interface Lookups {
    shifts: any[];
    locations: any[];
}

interface FormProps extends LookupProps<Lookups> {
    save: (e: IRoster) => void;
    initialValues: any;
}

type Props = FormProps;

const rosterForm: React.SFC<Props> = (props: Props) => {
    const { save, initialValues } = props;

    return (
        <div>
            <RosterBaseForm
                initialValues={initialValues}
                FormComponent={({ fields, onChange }) => (
                    <div>
                        <TextField
                            label="Shift"
                            value={fields.shift_id}
                            onChanged={(e) => onChange('shift_id', e)}
                        />

                        <DatePicker
                            label="Date"
                            value={fields.date}
                            onChanged={(e) => onChange('date', e)}
                        />

                        <DefaultButton onClick={() => save(fields)}>Save</DefaultButton>
                    </div>
                )}
            />
        </div>
    );
};

export const RosterForm = withLookup(rosterForm);
