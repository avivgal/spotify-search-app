\*\*Angular Spotify Album Browser

A lightweight Angular application that allows users to search for albums using the Spotify Web API, view album details, and enjoy a smooth infinite-scroll browsing experience.

This project was completed as a home assignment and demonstrates strong Angular skills including:

    -Angular Standalone Components

    -Signals

    -Infinite Scroll

    -Reactive Forms

    -Route Guards

    -Async API integration

    -Clean architecture patterns

\*\* Features
-Album Search

Search any album using the Spotify API with real-time debounce.

    Infinite Scroll

Scroll down and albums keep loading — just like Facebook / Instagram feeds.

    Album Details

Clicking an album opens a detailed page with:

    -Cover image

    -Artists

    -Release date

    -Full track list

\*\*Simple Authentication Flow

Includes a register/login mock with validation + client-side guard.

\*\*Fully Responsive

Works on mobile, tablet, and desktop.

\*\*Tech Stack

    -Angular 17+ Standalone Components

    -Signals

    -RxJS

    -Spotify Web API

    -Angular Router

    -CSS grid + responsive layout

******\*\*\*\******* Environment Setup ******\*\*\*\*******

Before running the project, create:

src/app/environments/environment.ts

Copy the content of environment.example.ts and fill in your Spotify API credentials:

export const environment = {
spotifyClientId: '',
spotifyClientSecret: '',
};

Do NOT commit your real environment file.
The .gitignore already prevents this.
