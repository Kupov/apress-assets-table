Example:
```
  const InitialState = {
    val: true,
    val2: false
  }

  'val' in state || setState({val: InitialState.val})
  'val2' in state || setState({val2: InitialState.val2})

  changeVal = val => setState({val});
  changeVal2 = val2 => setState({val2});

  <div>
    <Checkbox
      checked={state.val}
      onChange={changeVal}
    />

    {' '}

    <Checkbox
      checked={state.val2}
      onChange={changeVal2}
    />
  </div>
```
