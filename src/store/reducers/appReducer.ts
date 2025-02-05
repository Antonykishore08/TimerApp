import { UPDATEHISTORYLIST, UPDATETIMERLIST } from '../actions/actionTypes';

const initialState = {
 timerList:[],
 historyList:[]
};

interface actionShape {
  type: string;
  payload: any;
}

const App = (state = initialState, action: actionShape): any => {
  switch (action.type) {
    case UPDATETIMERLIST:
      return {
        ...state,
        timerList: action.payload,
      };
    case UPDATEHISTORYLIST:
      return {
        ...state,
        historyList: action.payload,
      };
    
    default:
      return state;
  }
};

export default App;
