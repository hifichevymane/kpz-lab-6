# Лабораторна робота 8

## Тема: Неперервна доставка

## Мета: ознайомитися з принципами і практиками неперервної доставки, сформувати навички роботи з хмарними сервісами Azure

## Завдання:
1. Створити Azure App Service у власній підписці Azure:
  a. Створити ресурсну групу (resource group)
  б.Створити всередині ресурсної групи App Servicе. При створенні вибрати деплой контейнеру замість коду

<img width="870" alt="Screenshot 2025-05-02 at 21 04 09" src="https://github.com/user-attachments/assets/d2c69fc2-02c5-4d89-b6a9-88fd8a6ad76d" />
<img width="1440" alt="Screenshot 2025-05-02 at 21 47 13" src="https://github.com/user-attachments/assets/520be090-b2c3-4ac5-b0c6-61bcb8a504c8" />

2. Було створено Azure Service principal, який буде використовуватись для доступу GitHub до вашої підписки Azure
3. Поверніться до вашого github-репозиторію. Перейдіть в settings -> secrets and variables -> actions, та натисніть New Repository Secret. В полі Name введіть AZURE_CREDENTIALS а в поле Secret скопіюйте повністю вивід
команди з пункту 2е. Слідкуйте за тим щоб в кінці секрету на було пробілу
або переходу рядка, натисніть Add Secret
<img width="1164" alt="Screenshot 2025-05-02 at 21 49 54" src="https://github.com/user-attachments/assets/b128f36c-feed-4e2c-9209-1486572b23b2" />

4. Додати нову job в ваш github workflow, створений на попередньому занятті. В неї додати наступні степи:
```yml
name: Publish Frontend App

on:
  workflow_dispatch:

  push:
    branches:
      - main
      - "feature/**"

permissions:
  contents: read
  packages: write
  attestations: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup and build project
        run: |
          npm install -g pnpm
          pnpm install
          pnpm run build

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}:latest

      - name: Login to Microsoft Azure
        uses: azure/login@v2
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: lab-9-fe-001
          images: ghcr.io/${{ github.repository_owner }}/${{ github.event.repository.name }}:latest
```
5. Запустіть воркфлоу та пересвідчиться що він завершився успішно.
<img width="1102" alt="Screenshot 2025-05-02 at 21 54 04" src="https://github.com/user-attachments/assets/878528bb-28c8-440e-b658-f7d94e20424e" />
6. В логах степу Deploy to Azure Web App знайдіть рядок який починається з App Service Application Url та клікніть по посиланню. Ви маєте побачити веб сторінку з
Вашим фронт-ендом. Якщо сторінку не видно – почекайте кілька хвилин та поверніться
<img width="1047" alt="Screenshot 2025-05-02 at 21 39 48" src="https://github.com/user-attachments/assets/b949328a-9766-427c-8ae9-2da32dae94e7" />
<img width="1440" alt="Screenshot 2025-05-02 at 21 40 11" src="https://github.com/user-attachments/assets/f428113a-0949-4448-acc9-aac2ec3212c4" />
