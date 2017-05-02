Example:
```
  <div>
    <Button
      onClick={() => { alert('button 1 clicked'); }}
    >
      ДОБАВИТЬ ГРУППУ
    </Button>

    {' '}

    <Button>
      Отмена
    </Button>

    {' '}

    <Button
      mix='is-good'
    >
      Сохранить и продолжить
    </Button>

    {' '}

    <Button
      disabled
      mix='test-mix'
      onClick={() => { alert('button 2 clicked'); }}
    >
      disabled
    </Button>
  </div>
```
