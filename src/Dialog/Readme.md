Доделать

Example:
```
  onClick = () => setState({visible: true});
  onClose = () => setState({visible: false});

  <div>
    <button onClick={onClick}>show dialog</button>

    <Dialog
      visible={state.visible}
      onClose={onClose}
      title={<div>Загрузка фотографий</div>}
      footer={
        <div>
          <Button mix='is-good rc-dialog-button'>Сохранить и продолжить</Button>
          <Button onClick={this.onClose} mix='rc-dialog-button'>Отмена</Button>
        </div>
      }
    >
      <input />
      <p>basic modal</p>
      <p>
        Пожалуйста, откадрируйте изображение для корректного отображения на сайте.
        Выбранная область будет показываться в категориях товаров на главной странице
        вашего сайта.
      </p>
      <button onClick={this.changeWidth}>change width</button>
      {[...new Array(10)].map((k, index) =>
        <p key={index}>
          Пожалуйста, откадрируйте изображение для корректного отображения на сайте.
          Выбранная область будет показываться в категориях товаров на главной странице
          вашего сайта.
        </p>
      )}
    </Dialog>
  </div>
```
