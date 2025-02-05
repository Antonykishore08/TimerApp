import {
  UPDATEHISTORYLIST,
  UPDATETIMERLIST,
} from './actionTypes';


export const updateTimerList = (payload: any) => ({
  type: UPDATETIMERLIST,
  payload,
});
export const updateHistoryList = (payload: any) => ({
  type: UPDATEHISTORYLIST,
  payload,
});
