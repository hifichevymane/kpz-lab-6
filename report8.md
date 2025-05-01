# Лабораторна робота 8

## Тема: Неперервна інтеграція

## Мета: ознайомитися з принципами і практиками неперервної інтеграції, сформувати навички автоматизації CI/CD процесів в GitHub Actions

## Завдання:

1. Завершити наступні практичні роботи на GitHub Skills, надати посилання на репозиторії з виконаним завданням у звіті:
- Hello GitHub Actions: https://github.com/hifichevymane/skills-hello-github-actions/blob/main/report.md
- Publish Packages: https://github.com/hifichevymane/skills-publish-packages/blob/main/report.md

2. Було створено Github Actions Workflow з двома тригерами та 1 джобом:

https://github.com/hifichevymane/kpz-lab-6/blob/main/.github/workflows/publish.yml:
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
```

<img width="1084" alt="Screenshot 2025-05-01 at 22 25 34" src="https://github.com/user-attachments/assets/7c1111ac-d665-46d1-8024-de66b2e1a9c5" />

Заглянувши до Packages я побачив створений докер образ https://github.com/hifichevymane/kpz-lab-6/pkgs/container/kpz-lab-6:

<img width="337" alt="Screenshot 2025-05-01 at 22 26 30" src="https://github.com/user-attachments/assets/d99e415d-bb92-4f98-a8e3-31c2e2ec633a" />
<img width="776" alt="Screenshot 2025-05-01 at 22 26 36" src="https://github.com/user-attachments/assets/361da56c-1369-43ef-8351-7363399b8b62" />

