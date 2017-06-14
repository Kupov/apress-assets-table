import deepFreeze from 'deep-freeze';
import {call, put, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import currentState from './currentState.json';
import previousState from './previousState.json';
import differenceState from './differenceState.json';
import differenceStateTransform from './differenceStateTransform.json';
import waitingState from './waitingState.json';
import mergeDifference from './mergeDifference.json';
import currentStateMergeInvalidDifference from './currentStateMergeInvalidDifference.json';
import * as sagas from '../../src/SaveControl/sagas.js';
import * as actions from '../../src/SaveControl/actions.js';
import reducer from '../../src/SaveControl/reducer.js';
import _isEqual from 'lodash/isEqual';

window.app = {
  config: {
    urlSaveTiger: '/table/save',
  }
};

describe('sagas save control', function() {
  describe('difference', function() {
    const sagaSaveCreateDiff = sagas.saveCreateDiff({
      payload: {
        curState: currentState,
        prevState: previousState
      }
    });
    const getSave = () => ({waitingState});
    const deleteRows = [
      {
        check: {
          common: {
            id: -7
          }
        },
        destroy: true
      }
    ]
    let next = {};

    it('get difference check cell', function() {
      expect(sagas.getCheckDifference(currentState[0])).toEqual({
        check: {
          common: {
            id: 1
          }
        }
      });
    });

    it('get difference text cell', function() {
      expect(sagas.getTextCellDifference(currentState[0], previousState[0], 'name')).toEqual({
        name: {
          common: {
            text: 'test name 1'
          }
        }
      });
    });

    it('get difference text cell', function() {
      expect(sagas.getTextCellDifference(currentState[1], previousState[1], 'name')).toEqual({
        name: {
          common: {
            text: 'name 2'
          }
        }
      });
    });

    it('get difference product group cell', function() {
      expect(sagas.getProductGroupDifference(currentState[1], previousState[1])).toEqual({
        product_group: {
          common: {
            parent_id: null
          }
        }
      });
    });

    it('get difference product group cell', function() {
      expect(sagas.getProductGroupDifference(currentState[2], previousState[2])).toEqual({
        product_group: {
          common: {
            parent_id: 2
          }
        }
      });
    });

    it('get difference photo cell', function() {
      expect(sagas.getPhotoDifference(currentState[2], previousState[2])).toEqual({
        photo: {
          common: {
            images: [
              {
                id: 3
              }
            ]
          }
        }
      });
    });

    it('get difference photo cell', function() {
      expect(sagas.getPhotoDifference(currentState[1], previousState[1])).toEqual({
        photo: {
          common: {
            images: []
          }
        }
      });
    });

    for (var i = 0; i < 3; i++) {
      (function(i) {
        it('get difference row', function() {
          expect(sagas.getRowDifference(currentState[i], previousState[i])).toEqual(differenceState[i]);
        });
      })(i)
    }

    it('get difference rows', function() {
      expect(sagas.getRowsDifference(currentState, previousState)).toEqual(differenceState);
    });

    it('get delete difference rows', function() {
      expect(sagas.getDeletedItems(currentState, previousState)).toEqual(deleteRows);
    });

    it('get difference transform for server', function() {
      expect(
        sagas.transformForServer([...differenceState, ...deleteRows]
          .filter(differenceRow => !differenceRow.invalid))
      ).toEqual(differenceStateTransform);
    });

    it('get difference state', function() {
      expect(sagas.getDifferenceState(currentState, previousState)).toEqual({
        validDifferenceState: differenceStateTransform,
        invalidDifferenceState: differenceState.filter(differenceRow => differenceRow.invalid)
      });
    });

    it('get merge difference', function() {
      expect(sagas.mergeDifference(differenceStateTransform, waitingState)).toEqual(mergeDifference);
    });

    it('set invalid difference for current state', function() {
      expect(
        sagas.setInvalidDifferenceForCurrentState(
          currentState,
          previousState,
          differenceState.filter(differenceRow => differenceRow.invalid)
        )
      ).toEqual(currentStateMergeInvalidDifference);
    });
  });

  describe('sagas', function() {
    const sagaSaveCreateDiff = sagas.saveCreateDiff({
      payload: {
        curState: currentState,
        prevState: previousState
      }
    });
    const sagasSave = sagas.save();
    let next = {};

    const getSave = () => ({
      waitingState,
      saveState: currentStateMergeInvalidDifference
    });

    it('sagas saveCreateDiff step 1', function() {
      next = sagaSaveCreateDiff.next();
      expect(next.value).toEqual({
        validDifferenceState: differenceStateTransform,
        invalidDifferenceState: differenceState.filter(differenceRow => differenceRow.invalid)
      });
    });

    it('sagas saveCreateDiff step 2', function() {
      next = sagaSaveCreateDiff.next(next.value);
      expect(next.value).toEqual(select(sagas.getSave));
    });

    it('sagas saveCreateDiff step 3', function() {
      next = sagaSaveCreateDiff.next({waitingState});
      expect(next.value).toEqual(mergeDifference);
    });

    it('sagas saveCreateDiff step 4', function() {
      next = sagaSaveCreateDiff.next(next.value);
      expect(next.value).toEqual(currentStateMergeInvalidDifference);
    });

    it('sagas saveCreateDiff step 5', function() {
      next = sagaSaveCreateDiff.next(next.value);
      expect(next.value).toEqual(put({
        type: 'SAVE_DIFF',
        payload: {
          waitingState: mergeDifference,
          prevState: currentStateMergeInvalidDifference
        }
      }));
    });

    it('sagas save step 1', function() {
      next = sagasSave.next();
      expect(next.value).toEqual(put({type: 'ERROR_REMOVE', payload: {target: 'save'}}));
    });

    it('sagas save step 2', function() {
      next = sagasSave.next(next.value);
      expect(next.value).toEqual(select(sagas.getSave));
    });

    it('sagas save step 3', function() {
      next = sagasSave.next({saveState: mergeDifference});
      expect(next.value).toEqual(call(sagas.putSave, mergeDifference));
    });

    it('sagas save step 4', function() {
      next = sagasSave.next({job_id: '123'});
      expect(next.value).toEqual(call(delay, 1000));
    });

    it('sagas save step 5', function() {
      next = sagasSave.next(next.value);
      expect(next.value).toEqual(call(sagas.pollingJob, '123'));
    });

    it('sagas save step 6', function() {
      next = sagasSave.next({succeeded: true, payload: {}});
      expect(next.value).toEqual(put({
        type: 'TABLE_EDITOR_ROW_ADD_DEFAULT_ID',
        payload: [{
            id: -7,
            record_id: -100000
          }]
      }));
    });

    it('sagas save step 7', function() {
      next = sagasSave.next(next.value);
      expect(next.value).toEqual(put({type: 'TABLE_EDITOR_ROW_ADD_ID', payload: {}}));
    });

    it('sagas save step 8', function() {
      next = sagasSave.next(next.value);
      expect(next.value).toEqual(put({type: 'TREE_LOAD_START', payload: null}));
    });
  });

  describe('actions', function() {
    const payload = {
      curState: currentState,
      prevState: previousState
    };

    it('action saveStart', function() {
      expect(actions.saveStart()).toEqual({type: 'SAVE_START', payload: undefined});
    });

    it('action saveCreateDiff', function() {
      expect(actions.saveCreateDiff(payload)).toEqual({
        type: 'SAVE_CREATE_DIFF',
        payload
      });
    });
  });

  describe('reducer', function() {
    const state = {
      isSave: false,
      isError: false,
      prevState: [],
      isProgress: false,
      fetchDiff: false,
      waitingState: [],
      saveState: []
    };

    it('action none', function() {
      expect(reducer(deepFreeze(state), {type: null, payload: {}}))
        .toEqual({...state});
    });

    it('action TABLE_EDITOR_LOAD_SUCCESS', function() {
      expect(reducer(
        deepFreeze(state),
        {
          type: 'TABLE_EDITOR_LOAD_SUCCESS',
          payload: {
            rows: previousState
          }
        }
      )).toEqual({...state, prevState: previousState});
    });

    it('action SAVE_REPEAT', function() {
      expect(reducer(deepFreeze(state), {type: 'SAVE_REPEAT', payload: {}}))
        .toEqual({...state, isSave: true});
    });

    it('action TABLE_EDITOR_CELL_END_DRAG', function() {
      expect(reducer(deepFreeze(state), {type: 'TABLE_EDITOR_CELL_END_DRAG', payload: {}}))
        .toEqual({...state, isSave: true});
    });

    it('action TABLE_EDITOR_CELL_END_DRAG_IMAGES', function() {
      expect(reducer(deepFreeze(state), {type: 'TABLE_EDITOR_CELL_END_DRAG_IMAGES', payload: {}}))
        .toEqual({...state, isSave: true});
    });

    it('action TABLE_EDITOR_SET_TEXT', function() {
      expect(reducer(deepFreeze(state), {type: 'TABLE_EDITOR_SET_TEXT', payload: {}}))
        .toEqual({...state, isSave: true});
    });

    it('action TABLE_EDITOR_SET_IMAGES', function() {
      expect(reducer(deepFreeze(state), {type: 'TABLE_EDITOR_SET_IMAGES', payload: {}}))
        .toEqual({...state, isSave: true});
    });

    it('action TABLE_EDITOR_ROW_ADD', function() {
      expect(reducer(deepFreeze(state), {type: 'TABLE_EDITOR_ROW_ADD', payload: {}}))
        .toEqual({...state, isSave: true});
    });

    it('action HISTORY_PREV', function() {
      expect(reducer(deepFreeze(state), {type: 'HISTORY_PREV', payload: {}}))
        .toEqual({...state, isSave: true});
    });

    it('action HISTORY_NEXT', function() {
      expect(reducer(deepFreeze(state), {type: 'HISTORY_NEXT', payload: {}}))
        .toEqual({...state, isSave: true});
    });

    it('action SAVE_CREATE_DIFF', function() {
      expect(reducer(deepFreeze(state), {type: 'SAVE_CREATE_DIFF', payload: {}}))
        .toEqual({...state, fetchDiff: true, isSave: false});
    });

    it('action SAVE_DIFF', function() {
      expect(reducer(
        deepFreeze(state),
        {
          type: 'SAVE_DIFF',
          payload: {
            waitingState: mergeDifference,
            prevState: previousState
          }
        }
      )).toEqual({
        ...state,
        waitingState: mergeDifference,
        prevState: previousState,
        fetchDiff: false,
      });
    });

    it('action SAVE_START', function() {
      expect(reducer(
        deepFreeze({...state, waitingState: mergeDifference}),
        {type: 'SAVE_START', payload: {}}
      ))
      .toEqual({
        ...state,
        saveState: mergeDifference,
        waitingState: [],
        isProgress: true,
        isError: false,
      });
    });

    it('action TABLE_EDITOR_ROW_ADD_DEFAULT_ID', function() {
      expect(reducer(
        deepFreeze({
          ...state,
          prevState: previousState,
          waitingState: mergeDifference
        }),
        {
          type: 'TABLE_EDITOR_ROW_ADD_DEFAULT_ID',
          payload: [{id: 1, record_id: -1}]
        }
      )).toEqual({
        ...state,
        waitingState: mergeDifference.map(row => row.id === 1 ? {...row, id: row.id * -1} : row),
        prevState: previousState
          .map(row => row.check.common.id === 1 ?
            {
              ...row,
              check: {
                ...row.check,
                common: {
                  ...row.check.common,
                  id: row.check.common.id * -1
                }
              }
            } : row),
      });
    });

    it('action TABLE_EDITOR_ROW_ADD_ID', function() {
      expect(reducer(
        deepFreeze({
          ...state,
          prevState: previousState,
          waitingState: mergeDifference
        }),
        {
          type: 'TABLE_EDITOR_ROW_ADD_ID',
          payload: [{id: -7, record_id: 7}]
        }
      )).toEqual({
        ...state,
        waitingState: mergeDifference.map(row => row.id === -7 ? {...row, id: row.id * -1} : row),
        prevState: previousState
          .map(row => row.check.common.id === -7 ?
            {
              ...row,
              check: {
                ...row.check,
                common: {
                  ...row.check.common,
                  id: row.check.common.id * -1
                }
              }
            } : row),
      });
    });

    it('action SAVE_SUCCESS no error', function() {
      expect(reducer(deepFreeze(state), {type: 'SAVE_SUCCESS', payload: {}}))
        .toEqual({...state, saveState: [], isProgress: false});
    });

    it('action SAVE_SUCCESS error', function() {
      expect(reducer(
        deepFreeze({...state, saveState: mergeDifference,}),
        {type: 'SAVE_SUCCESS', payload: {error: true}}
      )).toEqual({
        ...state,
        saveState: [],
        waitingState: mergeDifference,
        isProgress: false,
        isSave: true,
        isError: true
      });
    });
  });
});
