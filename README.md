# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/components/index.ts - файл со всеми компонентами и базовыми классами
- src/index.ts — точка входа приложения
- src/common.blocks — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Архитектура

За основу приложения взята архитектура MVP и включает в себя:

Model - модель данных, отвечает за хранение и обработку информации.

View - отвечает за отображение данных в ui элементах страницы.

Presentor - отсутствует, т.к приложение одностраничное

# Базовый код

## `Api`

Класс `Api` предназначен для взаимодействия с API через HTTP запросы. Он предоставляет методы для выполнения GET и POST запросов, а также для обработки ответов от сервера.

### Поля

- `baseUrl`: Строка, представляющая базовый URL для всех запросов.
- `options`: Объект `RequestInit`, представляющий параметры запроса по умолчанию. Включает заголовки, такие как `Content-Type`.

### Методы

- **`constructor(baseUrl: string, options: RequestInit = {})`**

  - Конструктор, который инициализирует базовый URL и параметры запроса.
  - **Аргументы:**
    - `baseUrl`: Строка, представляющая базовый URL для всех запросов.
    - `options`: Опциональный объект `RequestInit`, представляющий параметры запроса по умолчанию.

- **`handleResponse(response: Response): Promise<object>`**

  - Метод для обработки ответов от сервера.
  - **Аргументы:**
    - `response`: Объект `Response`, представляющий ответ от сервера.
  - **Возвращает:**
    - Объект `Promise`, который разрешается в объект данных, если запрос успешен, или отклоняется с ошибкой, если запрос не удался.

- **`get(uri: string)`**

  - Метод для выполнения GET запроса.
  - **Аргументы:**
    - `uri`: Строка, представляющая URI конечной точки.
  - **Возвращает:**
    - Объект `Promise`, который разрешается в ответ от сервера.

- **`post(uri: string, data: object, method: ApiPostMethods = 'POST')`**
  - Метод для выполнения POST, PUT или DELETE запроса.
  - **Аргументы:**
    - `uri`: Строка, представляющая URI конечной точки.
    - `data`: Объект, представляющий данные, отправляемые на сервер.
    - `method`: Опциональная строка, представляющая метод HTTP запроса. По умолчанию 'POST'.
  - **Возвращает:**
    - Объект `Promise`, который разрешается в ответ от сервера.

## `EventEmitter`

Класс `EventEmitter` предназначен для управления событиями в приложении. Он позволяет устанавливать обработчики на события, инициировать события с данными и управлять подписками.

### Типы

- `EventName`: Тип, представляющий имя события. Может быть строкой или регулярным выражением.
- `Subscriber`: Тип, представляющий функцию-обработчик события.
- `EmitterEvent`: Тип, представляющий объект события с именем и данными.

### Интерфейсы

- `IEvents`: Интерфейс, определяющий методы для работы с событиями:
  - `on<T extends object>(event: EventName, callback: (data: T) => void): void`
  - `emit<T extends object>(event: string, data?: T): void`
  - `trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void`

### Поля

- `_events`: Карта, хранящая события и их подписчиков. Ключом является имя события, значением — множество функций-подписчиков.

### Методы

- **`constructor()`**

  - Конструктор, который инициализирует `_events` как пустую карту.

- **`on<T extends object>(eventName: EventName, callback: (event: T) => void)`**

  - Устанавливает обработчик на событие.
  - **Аргументы:**
    - `eventName`: Имя события, на которое устанавливается обработчик.
    - `callback`: Функция, которая будет вызвана при возникновении события.

- **`off(eventName: EventName, callback: Subscriber)`**

  - Удаляет обработчик с события.
  - **Аргументы:**
    - `eventName`: Имя события, с которого удаляется обработчик.
    - `callback`: Функция, которая должна быть удалена.

- **`emit<T extends object>(eventName: string, data?: T)`**

  - Инициирует событие с данными.
  - **Аргументы:**
    - `eventName`: Имя события, которое инициируется.
    - `data`: Опциональные данные, которые будут переданы подписчикам.

- **`onAll(callback: (event: EmitterEvent) => void)`**

  - Устанавливает обработчик на все события.
  - **Аргументы:**
    - `callback`: Функция, которая будет вызвана при возникновении любого события.

- **`offAll()`**
  - Сбрасывает все обработчики.
- **`trigger<T extends object>(eventName: string, context?: Partial<T>)`**
  - Создает функцию-триггер для генерации события при вызове.
  - **Аргументы:**
    - `eventName`: Имя события, которое будет инициироваться.
    - `context`: Опциональные данные контекста, которые будут объединены с данными события.
  - **Возвращает:**
    - Функцию, которая при вызове инициирует событие.

## `Model`

Класс `Model` является абстрактным базовым классом для всех моделей в приложении. Он предоставляет базовую функциональность для работы с событиями и инициализацией данных.

### Поля

- `events`: Объект, реализующий интерфейс `IEvents`, используемый для управления событиями.

### Методы

- **`constructor(data: Partial<T>, events: IEvents)`**

  - Конструктор, который инициализирует модель данными и объектом событий.
  - **Аргументы:**
    - `data`: Объект, содержащий начальные данные для модели.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`emit(event: string, data?: object)`**
  - Инициирует событие с данными.
  - **Аргументы:**
    - `event`: Имя события, которое инициируется.
    - `data`: Опциональные данные, которые будут переданы подписчикам.

## `View`

Класс `View` является абстрактным базовым классом для всех представлений в приложении. Он предоставляет базовые методы для работы с элементами DOM и управления их состоянием.

### Поля

- `container`: Объект `HTMLElement`, представляющий контейнер представления.

### Методы

- **`constructor(container: HTMLElement)`**

  - Конструктор, который инициализирует представление контейнером.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер представления.

- **`toggleClass(element: HTMLElement, className: string, force?: boolean): void`**

  - Переключает CSS класс на элементе.
  - **Аргументы:**
    - `element`: Объект `HTMLElement`, на котором нужно переключить класс.
    - `className`: Имя класса, который нужно переключить.
    - `force`: Опционально. Если указано, добавляет или удаляет класс в зависимости от значения.

- **`setText(element: HTMLElement, value: unknown): void`**

  - Устанавливает текстовое содержимое элемента.
  - **Аргументы:**
    - `element`: Объект `HTMLElement`, текстовое содержимое которого нужно установить.
    - `value`: Значение, которое нужно установить как текстовое содержимое.

- **`changeDisableState(element: HTMLElement, state: boolean): void`**

  - Изменяет состояние отключения элемента.
  - **Аргументы:**
    - `element`: Объект `HTMLElement`, состояние которого нужно изменить.
    - `state`: Если `true`, элемент будет отключен. Если `false`, отключение будет снято.

- **`hideElement(element: HTMLElement): void`**

  - Скрывает элемент.
  - **Аргументы:**
    - `element`: Объект `HTMLElement`, который нужно скрыть.

- **`showElement(element: HTMLElement): void`**

  - Показывает элемент.
  - **Аргументы:**
    - `element`: Объект `HTMLElement`, который нужно показать.

- **`setImage(element: HTMLImageElement, src: string, alt?: string): void`**

  - Устанавливает источник и альтернативный текст для изображения.
  - **Аргументы:**
    - `element`: Объект `HTMLImageElement`, источник и альтернативный текст которого нужно установить.
    - `src`: Строка, представляющая источник изображения.
    - `alt`: Опционально. Строка, представляющая альтернативный текст изображения.

- **`render(data?: Partial<T>): HTMLElement`**
  - Рендерит представление с заданными данными.
  - **Аргументы:**
    - `data`: Опционально. Объект, содержащий данные для рендеринга представления.
  - **Возвращает:**
    - Объект `HTMLElement`, представляющий контейнер представления.

# Компоненты

## `Modal`

Класс `Modal` предназначен для управления модальными окнами в приложении. Он наследуется от класса `View` и предоставляет методы для открытия, закрытия и обновления содержимого модального окна.

### Поля

- `_events`: Объект, реализующий интерфейс `IEvents`, используемый для управления событиями.
- `_closeButton`: Объект `HTMLButtonElement`, представляющий кнопку закрытия модального окна.
- `_content`: Объект `HTMLElement`, представляющий контейнер для содержимого модального окна.

### Методы

- **`constructor(container: HTMLElement, _events: IEvents)`**

  - Конструктор, который инициализирует модальное окно контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер модального окна.
    - `_events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`open()`**

  - Открывает модальное окно и инициирует событие `modal:open`.

- **`close()`**

  - Закрывает модальное окно и инициирует событие `modal:close`.

- **`set content(value: HTMLElement)`**
  - Устанавливает содержимое модального окна.
  - **Аргументы:**
    - `value`: Объект `HTMLElement`, представляющий новое содержимое модального окна.

## `Basket`

Класс `Basket` предназначен для управления корзиной товаров в приложении. Он наследуется от класса `Model` и предоставляет методы для добавления, удаления и управления товарами в корзине.

### Поля

- `_items`: Карта, хранящая товары в корзине. Ключом является строковый идентификатор товара, значением — объект `IProduct`.

### Методы

- **`constructor(data: Partial<IBasket>, events: IEvents)`**

  - Конструктор, который инициализирует корзину данными и объектом событий.
  - **Аргументы:**
    - `data`: Объект, содержащий начальные данные для корзины.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`add(item: IProduct): void`**

  - Добавляет товар в корзину, если его еще нет.
  - **Аргументы:**
    - `item`: Объект `IProduct`, представляющий товар для добавления.

- **`remove(id: string): void`**

  - Удаляет товар из корзины по его идентификатору.
  - **Аргументы:**
    - `id`: Строка, представляющая идентификатор товара для удаления.

- **`contains(id: string): boolean`**

  - Проверяет, содержится ли товар в корзине по его идентификатору.
  - **Аргументы:**
    - `id`: Строка, представляющая идентификатор товара для проверки.
  - **Возвращает:**
    - Булево значение `true`, если товар содержится в корзине, иначе `false`.

- **`clear(): void`**

  - Очищает корзину от всех товаров.

- **`get items(): IProduct[]`**

  - Геттер, возвращающий массив товаров в корзине.
  - **Возвращает:**
    - Массив объектов `IProduct`, представляющих товары в корзине.

- **`get total(): number`**

  - Геттер, возвращающий общую стоимость товаров в корзине.
  - **Возвращает:**
    - Число, представляющее общую стоимость товаров.

- **`get length(): number`**

  - Геттер, возвращающий количество товаров в корзине.
  - **Возвращает:**
    - Число, представляющее количество товаров.

- **`getIdList(): string[]`**
  - Возвращает список идентификаторов товаров в корзине.
  - **Возвращает:**
    - Массив строк, представляющих идентификаторы товаров.

## `BasketView`

Класс `BasketView` предназначен для отображения корзины товаров в приложении. Он наследуется от класса `View` и предоставляет методы для управления отображением товаров, их стоимости и состояния кнопки заказа.

### Поля

- `_items`: Объект `HTMLElement`, представляющий контейнер списка товаров в корзине.
- `_price`: Объект `HTMLSpanElement`, представляющий элемент отображения общей стоимости товаров.
- `button`: Объект `HTMLButtonElement`, представляющий кнопку для оформления заказа.
- `events`: Объект, реализующий интерфейс `IEvents`, используемый для управления событиями.

### Методы

- **`constructor(container: HTMLElement, events: IEvents)`**

  - Конструктор, который инициализирует представление корзины контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер представления корзины.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`set items(items: HTMLElement[])`**

  - Устанавливает список товаров в корзине.
  - **Аргументы:**
    - `items`: Массив объектов `HTMLElement`, представляющих товары для отображения в корзине.

- **`set valid(state: boolean)`**

  - Устанавливает состояние кнопки заказа.
  - **Аргументы:**
    - `state`: Булево значение. Если `true`, кнопка будет отключена, если `false`, кнопка будет активна.

- **`set price(value: number)`**
  - Устанавливает отображаемую общую стоимость товаров.
  - **Аргументы:**
    - `value`: Число, представляющее общую стоимость товаров.

## `Catalog`

Класс `Catalog` предназначен для управления каталогом товаров в приложении. Он наследуется от класса `Model` и предоставляет методы для управления списком товаров и поиска товаров по идентификатору.

### Поля

- `_items`: Массив объектов `IProduct`, представляющий список товаров в каталоге.

### Методы

- **`constructor(data: Partial<ICatalogData>, events: IEvents)`**

  - Конструктор, который инициализирует каталог данными и объектом событий.
  - **Аргументы:**
    - `data`: Объект, содержащий начальные данные для каталога.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`get items(): IProduct[]`**

  - Геттер, возвращающий список товаров в каталоге.
  - **Возвращает:**
    - Массив объектов `IProduct`, представляющих товары в каталоге.

- **`set items(list: IProduct[])`**

  - Сеттер, устанавливающий список товаров в каталоге и инициирующий событие `catalog:items-changed`.
  - **Аргументы:**
    - `list`: Массив объектов `IProduct`, представляющих новые товары для каталога.

- **`find(id: string): IProduct | undefined`**
  - Находит товар в каталоге по его идентификатору.
  - **Аргументы:**
    - `id`: Строка, представляющая идентификатор товара для поиска.
  - **Возвращает:**
    - Объект `IProduct`, представляющий найденный товар, или `undefined`, если товар не найден.

## `Form`

Класс `Form` предназначен для управления и отображения форм в приложении. Он наследуется от класса `View` и предоставляет методы для управления состоянием формы, ее валидации и обработки событий.

### Поля

- `container`: Объект `HTMLFormElement`, представляющий контейнер формы.
- `events`: Объект, реализующий интерфейс `IEvents`, используемый для управления событиями.
- `inputList`: Массив объектов `HTMLInputElement`, представляющих все входные элементы формы.
- `_submit`: Объект `HTMLButtonElement`, представляющий кнопку отправки формы.
- `_error`: Объект `HTMLSpanElement`, представляющий элемент отображения ошибок.

### Методы

- **`constructor(container: HTMLFormElement, events: IEvents)`**

  - Конструктор, который инициализирует форму контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLFormElement`, представляющий контейнер формы.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`emitInput()`**

  - Инициирует событие `input` для формы.

- **`get valid(): boolean`**

  - Геттер, проверяющий валидность формы.
  - **Возвращает:**
    - Булево значение `true`, если все входные элементы формы заполнены, иначе `false`.

- **`set valid(value: boolean)`**

  - Сеттер, устанавливающий состояние валидности формы.
  - **Аргументы:**
    - `value`: Булево значение. Если `true`, кнопка отправки будет активна, если `false`, кнопка будет отключена.

- **`set error(value: string)`**

  - Сеттер, устанавливающий текст ошибки.
  - **Аргументы:**
    - `value`: Строка, представляющая текст ошибки.

- **`clear()`**

  - Очищает форму, сбрасывая все входные элементы.

- **`render(data?: Partial<T> & IFormState): HTMLElement`**
  - Рендерит форму с заданными данными.
  - **Аргументы:**
    - `data`: Опционально. Объект, содержащий данные для рендеринга формы.
  - **Возвращает:**
    - Объект `HTMLElement`, представляющий контейнер формы.

## `Success`

Класс `Success` предназначен для отображения успешного завершения заказа в приложении. Он наследуется от класса `View` и предоставляет методы для управления отображением итогов заказа и обработки событий.

### Поля

- `button`: Объект `HTMLButtonElement`, представляющий кнопку для завершения.
- `events`: Объект, реализующий интерфейс `IEvents`, используемый для управления событиями.
- `description`: Объект `HTMLParagraphElement`, представляющий элемент отображения описания итогов заказа.

### Методы

- **`constructor(container: HTMLElement, events: IEvents)`**

  - Конструктор, который инициализирует представление успешного завершения контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер представления успешного завершения.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`set total(value: number)`**
  - Сеттер, устанавливающий отображаемое количество списанных синапсов.
  - **Аргументы:**
    - `value`: Число, представляющее количество списанных синапсов.

## OrderConstructor

Класс `OrderConstructor` предназначен для управления данными заказа в приложении. Он наследуется от класса `Model` и предоставляет методы для установки и получения данных заказа, таких как информация о доставке, контакты и список товаров.

### Поля

- `_payment`: Переменная, представляющая тип оплаты (тип `PaymentType`).
- `_address`: Переменная, представляющая адрес доставки (тип `string`).
- `_email`: Переменная, представляющая электронную почту клиента (тип `string`).
- `_phone`: Переменная, представляющая телефонный номер клиента (тип `string`).
- `_total`: Переменная, представляющая общую стоимость заказа (тип `number`).
- `_items`: Переменная, представляющая список товаров в заказе (тип `string[]`).

### Методы

- **`constructor(data: Partial<OrderConstructor>, events: IEvents)`**

  - Конструктор, который инициализирует объект `OrderConstructor` данными заказа и объектом событий.
  - Аргументы:
    - `data`: Объект, содержащий частичные данные для инициализации `OrderConstructor`.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`set payment(value: PaymentType)`**

  - Устанавливает тип оплаты.
  - Аргументы:
    - `value`: Значение типа оплаты.

- **`set address(value: string)`**

  - Устанавливает адрес доставки.
  - Аргументы:
    - `value`: Адрес доставки.

- **`set email(value: string)`**

  - Устанавливает электронную почту.
  - Аргументы:
    - `value`: Электронная почта.

- **`set phone(value: string)`**

  - Устанавливает телефонный номер.
  - Аргументы:
    - `value`: Телефонный номер.

- **`set total(value: number)`**

  - Устанавливает общую стоимость заказа.
  - Аргументы:
    - `value`: Общая стоимость заказа.

- **`set items(list: string[])`**

  - Устанавливает список товаров в заказе.
  - Аргументы:
    - `list`: Список товаров.

- **`set delivery(delivery: IDelivery)`**

  - Устанавливает данные доставки.
  - Аргументы:
    - `delivery`: Объект, содержащий данные доставки (тип `IDelivery`).

- **`set contacts(contacts: IContacts)`**

  - Устанавливает контактные данные.
  - Аргументы:
    - `contacts`: Объект, содержащий контактные данные.

- **`set orderList(orderList: IOrderList)`**

  - Устанавливает список товаров и общую стоимость заказа.
  - Аргументы:
    - `orderList`: Объект, содержащий список товаров и общую стоимость.

- **`get result(): IOrderData`**

  - Возвращает данные заказа в виде объекта.
  - Возвращаемое значение: Объект, содержащий данные заказа.

## `OrderForm`

Класс `OrderForm` предназначен для управления и отображения формы заказа в приложении. Он наследуется от класса `Form` и предоставляет методы для управления данными доставки и типом оплаты.

### Поля

- `buttonContainer`: Объект `HTMLDivElement`, представляющий контейнер для кнопок выбора типа оплаты.
- `onlineButton`: Объект `HTMLButtonElement`, представляющий кнопку выбора онлайн-оплаты.
- `cashButton`: Объект `HTMLButtonElement`, представляющий кнопку выбора оплаты при получении.
- `addressInput`: Объект `HTMLInputElement`, представляющий поле ввода адреса доставки.

### Методы

- **`constructor(container: HTMLFormElement, events: IEvents)`**

  - Конструктор, который инициализирует форму заказа контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLFormElement`, представляющий контейнер формы заказа.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`toggleCard(state = true)`**

  - Переключает активное состояние кнопки онлайн-оплаты.
  - **Аргументы:**
    - `state`: Булево значение. Если `true`, кнопка будет активна, если `false`, неактивна.

- **`toggleCash(state = true)`**

  - Переключает активное состояние кнопки оплаты при получении.
  - **Аргументы:**
    - `state`: Булево значение. Если `true`, кнопка будет активна, если `false`, неактивна.

- **`resetButtons()`**

  - Сбрасывает состояние кнопок выбора типа оплаты.

- **`getActiveButton(): HTMLButtonElement | null`**

  - Возвращает активную кнопку выбора типа оплаты.
  - **Возвращает:**
    - Объект `HTMLButtonElement`, представляющий активную кнопку, или `null`, если ни одна кнопка не активна.

- **`clear(): void`**

  - Очищает форму и сбрасывает состояние кнопок.

- **`get payment(): string`**

  - Геттер, возвращающий выбранный тип оплаты.
  - **Возвращает:**
    - Строка, представляющая выбранный тип оплаты.

- **`get address(): string`**

  - Геттер, возвращающий адрес доставки.
  - **Возвращает:**
    - Строка, представляющая адрес доставки.

- **`get valid(): boolean`**

  - Геттер, проверяющий валидность формы.
  - **Возвращает:**
    - Булево значение `true`, если форма валидна, иначе `false`.

- **`set valid(value: boolean)`**
  - Сеттер, устанавливающий состояние валидности формы.
  - **Аргументы:**
    - `value`: Булево значение. Если `true`, форма валидна, если `false`, невалидна.

## `ContactsForm`

Класс `ContactsForm` предназначен для управления и отображения контактной формы в приложении. Он наследуется от класса `Form` и предоставляет методы для управления контактными данными клиента.

### Поля

- `emailInput`: Объект `HTMLInputElement`, представляющий поле ввода email.
- `phoneInput`: Объект `HTMLInputElement`, представляющий поле ввода телефона.

### Методы

- **`constructor(container: HTMLFormElement, events: IEvents)`**

  - Конструктор, который инициализирует контактную форму контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLFormElement`, представляющий контейнер контактной формы.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`get email(): string`**

  - Геттер, возвращающий email клиента.
  - **Возвращает:**
    - Строка, представляющая email клиента.

- **`get phone(): string`**
  - Геттер, возвращающий телефон клиента.
  - **Возвращает:**
    - Строка, представляющая телефон клиента.

### `ContactsForm`

Класс `ContactsForm` предназначен для управления и отображения контактной формы в приложении. Он наследуется от класса `Form` и предоставляет методы для управления контактными данными клиента.

### Поля

- `emailInput`: Объект `HTMLInputElement`, представляющий поле ввода email.
- `phoneInput`: Объект `HTMLInputElement`, представляющий поле ввода телефона.

### Методы

- **`constructor(container: HTMLFormElement, events: IEvents)`**

  - Конструктор, который инициализирует контактную форму контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLFormElement`, представляющий контейнер контактной формы.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`get email(): string`**

  - Геттер, возвращающий email клиента.
  - **Возвращает:**
    - Строка, представляющая email клиента.

- **`get phone(): string`**
  - Геттер, возвращающий телефон клиента.
  - **Возвращает:**
    - Строка, представляющая телефон клиента.

## `Page`

Класс `Page` предназначен для управления отображением главной страницы приложения. Он наследуется от класса `View` и предоставляет методы для управления каталогом товаров, счетчиком корзины и состоянием страницы.

### Поля

- `_catalog`: Объект `HTMLElement`, представляющий контейнер для каталога товаров.
- `_basket`: Объект `HTMLElement`, представляющий кнопку корзины.
- `_counter`: Объект `HTMLSpanElement`, представляющий счетчик товаров в корзине.
- `_wrapper`: Объект `HTMLDivElement`, представляющий обертку страницы.
- `events`: Объект, реализующий интерфейс `IEvents`, используемый для управления событиями.

### Методы

- **`constructor(container: HTMLElement, events: IEvents)`**

  - Конструктор, который инициализирует страницу контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер страницы.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`set catalog(items: HTMLElement[])`**

  - Сеттер, устанавливающий список товаров в каталоге.
  - **Аргументы:**
    - `items`: Массив объектов `HTMLElement`, представляющих товары для отображения в каталоге.

- **`set counter(value: string)`**

  - Сеттер, устанавливающий значение счетчика корзины.
  - **Аргументы:**
    - `value`: Строка, представляющая количество товаров в корзине.

- **`locked(value: boolean)`**
  - Переключает заблокированное состояние страницы.
  - **Аргументы:**
    - `value`: Булево значение. Если `true`, страница будет заблокирована, если `false`, разблокирована.

## `Card`

Класс `Card` предназначен для управления и отображения карточек товаров в приложении. Он наследуется от класса `View` и предоставляет методы для управления данными карточки, такими как идентификатор, название и цена.

### Поля

- `_title`: Объект `HTMLHeadingElement`, представляющий заголовок карточки товара.
- `_price`: Объект `HTMLSpanElement`, представляющий цену товара.
- `_id`: Строка, представляющая идентификатор товара.
- `events`: Объект, реализующий интерфейс `IEvents`, используемый для управления событиями.

### Методы

- **`constructor(container: HTMLElement, events: IEvents)`**

  - Конструктор, который инициализирует карточку товара контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер карточки товара.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`get id(): string`**

  - Геттер, возвращающий идентификатор товара.
  - **Возвращает:**
    - Строка, представляющая идентификатор товара.

- **`get title(): string`**

  - Геттер, возвращающий название товара.
  - **Возвращает:**
    - Строка, представляющая название товара.

- **`get price(): string`**

  - Геттер, возвращающий цену товара.
  - **Возвращает:**
    - Строка, представляющая цену товара.

- **`set id(value: string)`**

  - Сеттер, устанавливающий идентификатор товара.
  - **Аргументы:**
    - `value`: Строка, представляющая идентификатор товара.

- **`set title(value: string)`**

  - Сеттер, устанавливающий название товара.
  - **Аргументы:**
    - `value`: Строка, представляющая название товара.

- **`set price(value: string)`**
  - Сеттер, устанавливающий цену товара.
  - **Аргументы:**
    - `value`: Строка, представляющая цену товара.
  - **Описание:**
    - Если `value` не указано, устанавливает цену как "Бесценно".

## `CatalogCard`

Класс `CatalogCard` предназначен для управления и отображения карточек товаров в каталоге приложения. Он наследуется от класса `Card` и предоставляет дополнительные методы для управления категорией и изображением товара.

### Поля

- `_category`: Объект `HTMLSpanElement`, представляющий категорию товара.
- `_image`: Объект `HTMLImageElement`, представляющий изображение товара.
- `categoryClassMap`: Статическая карта, связывающая названия категорий с классами CSS для отображения категории.

### Методы

- **`constructor(container: HTMLElement, events: IEvents)`**

  - Конструктор, который инициализирует карточку товара в каталоге контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер карточки товара.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`protected toggleCategory(value: string)`**

  - Переключает класс CSS для отображения категории товара.
  - **Аргументы:**
    - `value`: Строка, представляющая категорию товара.

- **`get category(): string`**

  - Геттер, возвращающий категорию товара.
  - **Возвращает:**
    - Строка, представляющая категорию товара.

- **`set category(value: string)`**

  - Сеттер, устанавливающий категорию товара.
  - **Аргументы:**
    - `value`: Строка, представляющая категорию товара.

- **`set image(value: string)`**
  - Сеттер, устанавливающий изображение товара.
  - **Аргументы:**
    - `value`: Строка, представляющая URL изображения товара.

## `CardDetails`

Класс `CardDetails` предназначен для управления и отображения подробной информации о карточке товара в приложении. Он наследуется от класса `CatalogCard` и предоставляет дополнительные методы для управления описанием товара, состоянием кнопки и обработкой событий добавления и удаления товара из корзины.

### Поля

- `_description`: Объект `HTMLParagraphElement`, представляющий описание товара.
- `button`: Объект `HTMLButtonElement`, представляющий кнопку для добавления или удаления товара из корзины.

### Методы

- **`constructor(container: HTMLElement, events: IEvents)`**

  - Конструктор, который инициализирует карточку с подробной информацией контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер карточки с подробной информацией.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`set description(value: string)`**

  - Сеттер, устанавливающий описание товара.
  - **Аргументы:**
    - `value`: Строка, представляющая описание товара.

- **`set valid(state: boolean)`**

  - Сеттер, устанавливающий состояние валидности кнопки.
  - **Аргументы:**
    - `state`: Булево значение. Если `true`, кнопка будет активна, если `false`, кнопка будет отключена.

- **`get valid(): boolean`**

  - Геттер, возвращающий состояние валидности кнопки.
  - **Возвращает:**
    - Булево значение `true`, если кнопка активна, иначе `false`.

- **`set state(state: boolean)`**
  - Сеттер, устанавливающий состояние кнопки в зависимости от состояния товара в корзине.
  - **Аргументы:**
    - `state`: Булево значение. Если `true`, кнопка будет отображать текст для добавления товара в корзину, если `false`, текст для удаления товара из корзины.

## `BasketCard`

Класс `BasketCard` предназначен для управления и отображения карточек товаров в корзине приложения. Он наследуется от класса `Card` и предоставляет дополнительные методы для управления индексом товара в корзине и обработкой события удаления товара из корзины.

### Поля

- `_index`: Объект `HTMLSpanElement`, представляющий индекс товара в корзине.
- `button`: Объект `HTMLButtonElement`, представляющий кнопку для удаления товара из корзины.

### Методы

- **`constructor(container: HTMLElement, events: IEvents)`**

  - Конструктор, который инициализирует карточку товара в корзине контейнером и объектом событий.
  - **Аргументы:**
    - `container`: Объект `HTMLElement`, представляющий контейнер карточки товара в корзине.
    - `events`: Объект, реализующий интерфейс `IEvents` для управления событиями.

- **`set index(value: number)`**
  - Сеттер, устанавливающий индекс товара в корзине.
  - **Аргументы:**
    - `value`: Число, представляющее индекс товара в корзине.

# Основные типы

`export interface IBasket {
    items: [],
    total: number
}`

`export type IBasketCard = Omit<IProduct, 'description' | 'category' | 'image'> & {
	index: number;
}`

`export interface IBasketProduct extends Pick <IProduct, 'id' | 'title'> {}`

`export interface IBasketView {
	items: HTMLElement[];
	valid: boolean;
	price: number;
}`

`export type ICardDetails = IProduct & { valid: boolean; state: boolean };`

`export type ICatalogCard = Omit<IProduct, 'description'>`

`export interface ICatalogData {
	items: IProduct[];
}`

`export interface ICatalogModel {
    items: IProduct[];
    setItems(items: IProduct[]) :void;
    getProduct(id:string): IProduct;
}`

`export interface IEventEmitter {
    emit: (event: string, data: unknown) => void
}`

`export interface IForm extends IFormState {
	render(data?: IFormState): HTMLElement;
}`

`export interface IFormState {
	valid: boolean;
	error: string;
}`

`export interface IOrderApi {
    postOrder(order: IOrderData): Promise<IOrderResult> 
}`

`export interface IDelivery {
	payment: PaymentType;
	address: string;
}`

`export interface IContacts {
	email: string;
	phone: string;
}`

`export interface IOrderList {
	total: number;
	items: string[];
}`

`export type IOrderData = IDelivery & IContacts & IOrderList;`

`export interface IOrder extends IOrderData {
    createOrderData(): IOrderData;
}`

`export interface IOrderResult {
	id: string;
	total: number;
}`

`export interface IView<T> {
	toggleClass(element: HTMLElement, className: string, force?: boolean): void;
	setText(element: HTMLElement, value: unknown): void;
	changeDisableState(element: HTMLElement, state: boolean): void;
	hideElement(element: HTMLElement): void;
	showElement(element: HTMLElement): void;
	setImage(element: HTMLElement, src: string, alt?: string): void;
	render(data?: Partial<T>): HTMLElement;
}`

`export interface IIdentifier {
    id: string
}`

`export interface IProduct {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number | null
}`

`export interface IProductApi {
    getProductList(): Promise<IProduct[]>
    getProduct(id: string): Promise<IProduct>
}`

`export enum EProductUris {
    PRODUCT_LIST = "/product"
}`
