/* eslint react/no-unused-prop-types: 0 */
import React, {PropTypes} from 'react';
import RcDropdown from 'rc-dropdown';
import './e-dropdown-menu.scss';
import {block} from '../utils';

const b = block('e-dropdown-menu');

export default class DropDownMenu extends React.Component {

  static propTypes = {
    mix: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    title: '',
    mix: '',
    items: [],
    onSelect: () => {},
  }

  state = {
    visible: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.items !== this.props.items ||
      nextProps.title !== this.props.title ||
      nextState.visible !== this.state.visible;
  }

  close = () => { this.setState({visible: false}); }

  handleVisibleChange = visible => this.setState({visible});

  handleSelect = (e, id) => {
    this.props.onSelect(id, e);
    this.close();
  }

  createMenuTitle = () =>
    this.props.title && <div className={b('title')}>{this.props.title}</div>;

  createMenuList = () => this.props.items.map((item, index) =>
    <div
      key={index}
      onClick={e => this.handleSelect(e, item.id)}
      className={b('menu-item').is({selected: item.active})}
    >
      {item.title}
    </div>);

  createMenu = () => (
    <div className={b.mix(this.props.mix)()}>
      <div>
        {this.createMenuTitle()}
        <div className={b('menu')}>
          {this.createMenuList()}
        </div>
      </div>
    </div>
  );


  render() {
    return (
      <RcDropdown
        visible={this.state.visible}
        trigger={['click']}
        overlay={this.createMenu()}
        onVisibleChange={this.handleVisibleChange}
        closeOnSelect={false}
      >
        {this.props.children}
      </RcDropdown>
    );
  }
}
