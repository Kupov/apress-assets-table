import React, {PropTypes, Component} from 'react';
import {block} from '../utils';
import './e-button.scss';

const b = block('e-button');

export default class Button extends Component {
  static propTypes = {
    /** клик по кнопке */
    onClick: PropTypes.func,
    /** css class для модификации */
    mix: PropTypes.string,
    /** состояние кнопки */
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: false,
    onClick: () => {},
    mix: '',
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.disabled !== this.props.disabled;
  }

  handlerClick = (e) => { e.preventDefault(); this.props.onClick(); };

  render() {
    return (
      <button
        type='button'
        disabled={this.props.disabled}
        onClick={this.handlerClick}
        className={b.mix(this.props.mix)}
      >
        {this.props.children}
      </button>
    );
  }
}
