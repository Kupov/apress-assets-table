Example:
```
  const React = require('react');
  const ReactDOM = require('react-dom');
  const ReactRedux = require('react-redux');
  const store = require('../store');

  const Provider = ReactRedux.Provider

  class Wrapper extends Component {
    render() {
      return (
        <Provider store={store}>
          {this.props.children}
        </Provider>
      );
    }
  }


```
