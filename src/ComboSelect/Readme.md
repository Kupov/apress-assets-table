Example:
```
  const initialState = {
    current: {
      id: 8,
      value: '8'
    },
    items: [
      {
        id: 1,
        value: 'jack'
      },
      {
        id: 2,
        value: 'lucy'
      },
      {
        id: 3,
        value: 'yiminghe'
      },
      {
        id: 4,
        value: 4
      },
      {
        id: 5,
        value: 5
      },
      {
        id: 6,
        value: 6
      },
      {
        id: 7,
        value: 7
      },
      {
        id: 8,
        value: 8
      },
    ]
  };

  onChange = current => setState({current: state.items.find(item => item.id === Number(current))});

  <ComboSelect
    value={state.current.value}
    dropdownMenuStyle={{maxHeight: 200, overflow: 'auto'}}
    style={{width: 150}}
    onChange={onChange}
    showSearch={false}
  >
    {state.items.map(item => <Option key={item.id} text={item.id}>{item.value}</Option>)}
  </ComboSelect>
```
