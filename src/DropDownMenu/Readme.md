Example: ломается, подумать как починить
```
  const menuItems = {
    title: 'Некий заголовок',
    items: [
      {
        id: 1,
        title: 'Все (24)',
        active: false,
      },
      {
        id: 2,
        title: 'Заполнен (18)',
        active: false,
      },
      {
        id: 'test-1',
        title: 'не заполнен (6)',
        active: true,
      },
      {
        id: 'test-4',
        title: <b>проверка проверка</b>,
        active: false,
      }
    ]
};

  <DropDownMenu
    items={menuItems.items}
    title={menuItems.title}
    onSelect={(id, e) => { console.log('selected', id, e); }}
  >
    <div>Кастомный елемент</div>
  </DropDownMenu>
```
