# 🎵 Angular Spotify Album Browser

A lightweight Angular application that allows users to search and browse albums using the Spotify Web API.  
This project demonstrates strong frontend skills including Angular Standalone Components, Signals, Guards, Infinite Scroll, and clean architecture patterns.

---

## 🚀 Features

### 🔍 Album Search

- Search albums in real time with **debounced API calls**
- Displays results instantly using **Angular Signals**

### ♾️ Infinite Scroll

Keep scrolling — more albums load automatically (offset-based pagination to simulate real-world API behavior).

### 💿 Album Details Page

Each album page includes:

- Cover image
- Artists
- Release date
- Full track list

### 🔐 Simple Authentication Flow

Mock login/register form with:

- Reactive Forms
- Validation
- Client-side route guard

### 📱 Fully Responsive

Works smoothly on **mobile, tablet, and desktop** using CSS grid + responsive layout.

---

## 🛠 Tech Stack

- **Angular 17+** (Standalone Components)
- **Signals**
- **RxJS**
- **Angular Router**
- **Spotify Web API**
- **SCSS / Responsive CSS**

---

## 📂 Project Structure (Highlights)

```
src/app
 ├─ features/
 │   ├─ home/
 │   ├─ disc-details/
 │   └─ register/
 ├─ services/
 │   ├─ spotify.ts
 │   ├─ auth.ts
 │   └─ storage.ts
 ├─ guards/auth.guard.ts
 ├─ models/album.ts
 └─ shared/components/
     ├─ disc-item/
     └─ header/
```

---

## 🔧 Environment Setup

Before running the project, create:

```
src/app/environments/environment.ts
```

Inside it, add the following:

```ts
export const environment = {
  spotifyClientId: '',
  spotifyClientSecret: '',
};
```

👉 **Important:** Never commit your real keys.  
A template file `environment.example.ts` is provided.

---

## ▶️ Running the App

Install dependencies:

```
npm install
```

Run the dev server:

```
ng serve
```

The app will be available at:

```
http://localhost:4200
```

---

## 📸 Screenshots (Optional)

_Add UI screenshots here for extra polish._

---

## 📄 License

Open-source — feel free to use as a reference.

---

# ⭐️ Feedback

If you’d like code review or suggestions for improving the assignment, feel free to ask!
