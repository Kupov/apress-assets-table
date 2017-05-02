import React, {PropTypes, Component} from 'react';
import {block} from '../utils';
import './e-checkbox.scss';

const b = block('e-checkbox');

export default class Checkbox extends Component {
  static propTypes = {
    /** состояние чекбокса */
    checked: PropTypes.bool.isRequired,
    /** функция смены состояния */
    onChange: PropTypes.func.isRequired,
    /** css class для модификации */
    mix: PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.checked !== this.props.checked;
  }

  handlerClick = () => this.props.onChange(!this.props.checked);

  render() {
    return (
      <div
        onClick={this.handlerClick}
        className={b.is({checked: this.props.checked}).mix(this.props.mix)}
      />
    );
  }
}
