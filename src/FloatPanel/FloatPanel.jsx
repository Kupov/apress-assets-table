import React, {PropTypes, Component} from 'react';
import {block} from '../utils';
import './e-float-panel.scss';

const b = block('e-float-panel');

export default class FloatPanel extends Component {
  static propTypes = {
    mix: PropTypes.string,
  }

  state = {togglerVisible: true};

  handlerClick = () => this.setState({togglerVisible: !this.state.togglerVisible});

  render() {
    return (
      <div className={b.mix(this.props.mix).is({hide: !this.state.togglerVisible})}>
        <div className={b('toggler')} onClick={this.handlerClick} />
        <div className={b('wrapper')}>{this.props.children}</div>
      </div>
    );
  }
}
