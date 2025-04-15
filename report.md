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

Для прикладу змінемо цю сутність. Натиснемо на кнопку "Деталі":

<img width="442" alt="Screenshot 2025-04-15 at 17 18 32" src="https://github.com/user-attachments/assets/81269da9-2f72-4cd3-a6d8-4e8eb18b5cd5" />

Нас переправляє на сторінку сутності з полями та кнопками "Зберегти", "Скасувати" та "Назад":

<img width="1440" alt="Screenshot 2025-04-15 at 17 17 43" src="https://github.com/user-attachments/assets/f260c290-fd85-439c-a7da-00b42058d26f" />

Натиснемо на кнопку "Редагувати" щоб відредагувати поля сутності. До зміни доступні лише поля назви та опису:

<img width="1440" alt="Screenshot 2025-04-15 at 17 17 49" src="https://github.com/user-attachments/assets/17dd9511-5dd8-4543-8441-8c5db2f07ad7" />

Поля валідуються на кількість символів:

<img width="1440" alt="Screenshot 2025-04-15 at 17 18 05" src="https://github.com/user-attachments/assets/47230fdd-c2fb-478a-bb57-410a6e764857" />
<img width="1440" alt="Screenshot 2025-04-15 at 17 18 13" src="https://github.com/user-attachments/assets/4b008c52-ebca-4598-a129-7a6785a4acc1" />

Змінимо опис та назву сутності та збережемо результат натиснувши на кнопку "Зберегти":

<img width="1440" alt="Screenshot 2025-04-15 at 17 19 42" src="https://github.com/user-attachments/assets/c03f159a-9eee-4c59-a66c-4a98d16e26cb" />
<img width="1440" alt="Screenshot 2025-04-15 at 17 19 57" src="https://github.com/user-attachments/assets/cf4cc498-5596-42fb-9cf9-cc4c00b664eb" />

Перевіримо результат перейшовши до сторінки переліку сутностей:

<img width="522" alt="Screenshot 2025-04-15 at 17 20 05" src="https://github.com/user-attachments/assets/a7de4576-fbe4-4dd0-ab62-6564f6f476c1" />

- У режимі створення (/entities/new) реалізувати:
  - форму з порожніми полями для введення нових даних;
  - кнопку для збереження нового екземпляра (Create).

При переході на сторінку /entities/new ми маємо форму з двома полями - Назва та Опис:
<img width="1440" alt="Screenshot 2025-04-15 at 17 28 11" src="https://github.com/user-attachments/assets/6b12b780-10a3-42d9-9cb4-f5ea1259d5b7" />

Поля мають валідацію на кількість мінімальних та максимальних букв:
<img width="755" alt="Screenshot 2025-04-15 at 17 28 32" src="https://github.com/user-attachments/assets/269d056e-962c-4138-8059-56f76e98718a" />

Після натискання на кнопку створити нас перенаправляє на сторінку з переліком сутностей. Наша нова сутність є у переліку.
<img width="1440" alt="Screenshot 2025-04-15 at 17 28 23" src="https://github.com/user-attachments/assets/99135852-ded7-4f64-a4e3-d8cec0a3a2e5" />

Коментарі щодо особливостей реалізації або проблем, з якими зіткнулися під час виконання: Були деякі проблеми з визначенням типів у функціях та компонентах. Також були невеличкі складнощі у створені валідації для форм.
