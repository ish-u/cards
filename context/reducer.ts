export interface AppState {
  active: boolean;
  id: string;
  device_id: string;
  player: Spotify.Player | undefined;
  startColor: string;
  endColor: string;
}

export enum ActionType {
  Toggle,
  Change,
  Device,
  Player,
  ChangeColor,
}

export interface Toggle {
  type: ActionType.Toggle;
  payload: { active: boolean };
}

export interface Change {
  type: ActionType.Change;
  payload: { id: string };
}

export interface Device {
  type: ActionType.Device;
  payload: { device_id: string };
}

export interface Player {
  type: ActionType.Player;
  payload: { player: Spotify.Player };
}

export interface ChangeColor {
  type: ActionType.ChangeColor;
  payload: { startColor: string; endColor: string };
}

export type AppActions = Toggle | Change | Device | Player | ChangeColor;

export const Reducer = (state: AppState, action: AppActions): AppState => {
  // console.log(state, action);
  switch (action.type) {
    case ActionType.Toggle:
      return { ...state, active: action.payload.active };
    case ActionType.Change:
      return { ...state, id: action.payload.id };
    case ActionType.Device:
      return { ...state, device_id: action.payload.device_id };
    case ActionType.Player:
      return { ...state, player: action.payload.player };
    case ActionType.ChangeColor:
      return {
        ...state,
        startColor: action.payload.startColor,
        endColor: action.payload.endColor,
      };
    default:
      return state;
  }
};
