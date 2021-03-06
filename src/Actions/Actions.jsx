import React, {PropTypes} from 'react';
import {block} from '../utils';
import './e-actions.scss';

const b = block('e-actions');

const Actions = props =>
  <div className={b.mix(props.mix)()}>
    {props.actions.map(action =>
      <div
        key={action.name}
        onClick={action.onClick}
        title={action.title}
        className={b('action').is({[action.name]: true})}
      />
    )}
  </div>;

Actions.propTypes = {
  mix: PropTypes.string,
  actions: PropTypes.array,
};

Actions.defaultProps = {
  mix: '',
};

export default Actions;
