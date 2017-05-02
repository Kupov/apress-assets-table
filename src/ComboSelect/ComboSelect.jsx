import React, {PropTypes, Component} from 'react';
import RcSelect from 'rc-select';
import 'rc-select/assets/index.css';
import {block} from '../utils';
import './e-select.scss';

const b = block('e-select');

export default class ComboSelect extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    mix: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'Выберите значение',
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.value !== this.props.value;
  }

  handlerClick = val => this.props.onChange(val);

  render() {
    return (
      <RcSelect
        notFoundContent='Ничего не найдено'
        dropdownMatchSelectWidth={false}
        className={b.mix(this.props.mix)()}
        dropdownClassName={b('drop-down')()}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        {...this.props}
      >
        {this.props.children}
      </RcSelect>
    );
  }
}
