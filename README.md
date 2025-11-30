# 📬 Notification & Reminder Service

**Namen:** Upravljanje opomnikov, notifikacij in opozoril (“to-pay alerts”).  
Storitev je del mikrostoritvene arhitekture in uporablja Supabase PostgreSQL za hranjenje podatkov.

## 🔔 Funkcionalnosti

- ustvarjanje opomnikov (datum + sporočilo)
- procesiranje zapadlih opomnikov
- ustvarjanje notifikacij ob dogodkih (npr. subscription service signal)
- pošiljanje notifikacij (trenutno EMAIL)
- prikaz, posodabljanje in brisanje uporabnikovih notifikacij

## 🔄 Reminder vs Notification

- **Reminder** → opomnik, ki se sproži v prihodnosti (`remindAt`).
- **Notification** → dejansko obvestilo, poslano uporabniku (npr. email, UI).
- Reminder ob zapadlosti pogosto _ustvari_ Notification.

## 🚀 Namestitev in zagon

### 1. Namesti odvisnosti

```bash
npm install
```

### 2. Dodaj .env datoteko

```bash
APP_PORT=3000

DATABASE_HOST=<supabase-host>
DATABASE_PORT=5432
DATABASE_USER=<supabase-user>
DATABASE_PASSWORD=<supabase-password>
DATABASE_NAME=postgres
```

### 3. Zaženi aplikacijo

```bash
nest start
```

## 📘 Swagger dokumentacija

Ko aplikacija teče, odpri v brskalniku:

👉 **http://localhost:3000/api**

Swagger prikaže:

- vse _Reminder_ endpoint-e
- vse _Notification_ endpoint-e
- DTO-je z opisi
- request in response primere
- strukturo celotnega API-ja

## 🐳 Zagon v Dockerju

### 1. Zgradi Docker image

```bash
docker build -t notification-service .
```

2. Zaženi container (z isto .env datoteko)

```bash
docker run --env-file .env -p 3000:3000 notification-service
```

Aplikacija bo nato dostopna na:

👉 http://localhost:3000/api
