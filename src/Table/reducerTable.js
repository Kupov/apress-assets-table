import {CONFIG_SET_PER_PAGE, CONFIG_RESET} from '../Filter/actions';
import {
  TABLE_EDITOR_LOAD_START,
  TABLE_EDITOR_LOAD_SUCCESS,
  TABLE_EDITOR_SET_CHECK,
  TABLE_EDITOR_SET_CHECK_ALL
} from './actions';

const initialState = {
  columns: [],
  checked: [],
  isLoad: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TABLE_EDITOR_LOAD_START:
      return {
        ...state,
        isLoad: false
      };

    case TABLE_EDITOR_LOAD_SUCCESS:
      return {
        ...state,
        columns: action.payload.columns,
        new_row: action.payload.new_row,
        total: action.payload.total,
        isLoad: true
      };

    case TABLE_EDITOR_SET_CHECK:
      return {
        ...state,
        checked: action.payload.checked ?
          [...state.checked, action.payload.id] :
          state.checked.filter(id => id !== action.payload.id)
      };

    case CONFIG_SET_PER_PAGE:
    case TABLE_EDITOR_SET_CHECK_ALL:
      return {
        ...state,
        checked: action.payload.checked ? action.payload.id : []
      };

    case CONFIG_RESET:
      return {
        ...state,
        checked: []
      };

    default:
      return state;
  }
}
