# RENTAL REAL STATE APP (AIRBNB CLONE)

This is a [Airbnb](https://www.airbnb.com.br/) clone webapp buit using react.js, next.js (13 version) and mongodb.

## FEATURES
- [x] Authentication system with sign in with email and password and google and github auth;
- [x] Authenticated (private) routes for users;
- [x] Creation of new listing real estate for rental;
- [x] Reservation system for rent a real estate for a period of time;
- [x] Favorite list of real estates;
- [x] Search filters by categories, number of guests allowed, bathrooms, rooms and location;

## HOW TO MAKE WORK ON LOCALHOST
1. First of all open up a terminal at the root folder and typpe the follow command: ``npm install``;
2. Now create a new file at the root folder and name: ``.env``;
3. Copy and paste the variables at ``.env.example``and paste at ``.env`` file:
```
DATABASE_URL=

GITHUB_ID=
GITHUB_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_SECRET=
NEXT_PUBLIC_CLOUDINARY_PRESET=


GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=
```
4. Create a authapp on google and github and paste the values, also create a accunt in Cloudinary;
5. Create a mongo db database;
7. Now you can type: ``npm start`` or ``npm run dev``.


## [DEMO](https://rental-real-estate-re2hnxgq5-emvalencaf.vercel.app/)