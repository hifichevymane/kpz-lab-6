# Практично-лабораторне заняття №6

## Розробка UI для реалізації CRUD-операцій

**Мета:** Створити користувацький інтерфейс для взаємодії з реалізованим RESTful API, що надає можливість перегляду, створення, редагування та видалення екземплярів певної сутності.
Розробка ведеться на базі React з використанням TanStack Router для реалізації маршрутизації.

## Завдання:

1. Сторінка колекції екземплярів сутності (/entities)
- Реалізувати рендеринг списку всіх доступних екземплярів сутності.
- Для кожного елемента відображати основну інформацію (ключові поля).
<img width="1440" alt="Screenshot 2025-04-15 at 17 12 42" src="https://github.com/user-attachments/assets/61098215-d96a-44b6-ae74-c909f91165ba" />

- Передбачити можливість переходу на сторінку конкретного екземпляра (/entities/:id).
<img width="554" alt="Screenshot 2025-04-15 at 17 13 35" src="https://github.com/user-attachments/assets/d57b51bd-15d1-4772-b4a9-75e3eec6a0f5" />
<img width="1440" alt="Screenshot 2025-04-15 at 17 13 45" src="https://github.com/user-attachments/assets/52abb85f-5b35-43b0-93b1-4ececb22096e" />

- Додати кнопку "Створити новий екземпляр", яка веде на маршрут /entities/new.
<img width="510" alt="Screenshot 2025-04-15 at 17 14 18" src="https://github.com/user-attachments/assets/1b580775-bfc8-418a-902f-dee4e1076f04" />
<img width="1440" alt="Screenshot 2025-04-15 at 17 14 22" src="https://github.com/user-attachments/assets/75ba940b-2c53-4262-8c17-0bfbffbf0009" />

- Реалізувати можливість видалення елемента з колекції (з підтвердженням дії).
<img width="654" alt="Screenshot 2025-04-15 at 17 15 02" src="https://github.com/user-attachments/assets/62403159-8cfe-4a26-9b99-6da88dee0e42" />
<img width="1439" alt="Screenshot 2025-04-15 at 17 15 09" src="https://github.com/user-attachments/assets/c839c736-6814-4377-9cfd-3f40cddb0867" />
При натисканні кнопки "Скасувати" вікно закривається та сутність не видаляється. Якщо кнопку підтвердження було натиснуто - вікно закривається та сутність видаляється
<img width="1440" alt="Screenshot 2025-04-15 at 17 15 35" src="https://github.com/user-attachments/assets/d9eec5b6-9bc7-433b-9f07-15c059b4b0a5" />

2. Сторінка окремого екземпляра сутності (/entities/:id або /entities/new)
- У режимі перегляду (/entities/:id) реалізувати:
  - відображення повної інформації про екземпляр;
  - можливість редагування (форма з полями);
  - кнопку для збереження змін (Update).
- У режимі створення (/entities/new) реалізувати:
  - форму з порожніми полями для введення нових даних;
  - кнопку для збереження нового екземпляра (Create).

