import { State, Action, StateContext } from '@ngxs/store';
​
export class SetIs24HourClock {
  static readonly type = '[App] setIs24HourClock';
}
​
export interface AppStateModel {
  is24HourClock: boolean;
}
​
@State<AppStateModel>({
  name: 'app',
  defaults: {
    is24HourClock: true
  }
})
export class AppState {
  @Action(SetIs24HourClock)
  toggleIs24HourClock(ctx: StateContext<AppStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      is24HourClock: !state.is24HourClock
    });
  }
}
