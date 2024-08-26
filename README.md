## 💻 About

GeekCatalog is an APP designed to manage media and art content not covered by other widely-used market applications like Letterboxd. It offers users the capability to manage various types of media such as series, anime, games, or any other implemented media types, through CRUD operations following the business requirements. The app was built focusing on SOLID principles, creating abstract components reused throught out the app. 

It has an integration with the API using axios, mapping all the requests using DTO's. It has a focus on performance, with all the contexts and useEffects rendering just the necessary parts of the app, depending on the user interaction, minimizing unnecessary requests, maintaining lightweight performance on both server and front-end.

The APP is build with react native using expo, it has many own components created using gluestack. The app adheres the best practices in communication with the API. It allows the users to fully manage their entities, with different sets of permission,

## Documentation API

- Run the project by executing expo Go or expo build using: 
```
npm start 
```
- To build the IOS and Android app, run:
```
eas build --profile dev --platform android | eas build --profile dev --platform ios
```
- You can also run the project by downloading the apk on /build, you can use it on android studio or you android phone

---

## ⚙️ Functionalities

- [x] Authentication flow with a login system and user permissions, restricting access to specific parts of the application.
- [x] CRUD for games, if the user is an admin, fully managing it
- [x] Routine for all entities in the system, easily traceable by the admins
- [x] Read operations for the games for regular user, with image lists
- [x] Fully manageable list system, with the user being able to invite different users, with different sets of permission
- [x] Different sets of lists, divided by personal (fully manageable), shared (manageable by permission) and public (just read permission for user profiles in a social media schema)
- [x] Comment system for games, with user interaction
- [x] User review system for games for public interation with other users
- [x] Public Profiles for user interaction, just like letterbox
- [x] User custom system with different levels of permissions
- [x] Login system with JWT authentication
- [x] Custom style using gluestack, with components created following SOLID principles
- [x] Custom list with game images, rendering from S3 for better performance
- [x] Game listing, in which all users can see game info, and also add a rating
- [x] Screens with routes props handling the data info (mostly id) for better performance
- [x] React gesture handler for app components for better user experience, with fluid animations
- [x] Custom components with visual validation for those used in react hook forms
- [x] Image handler from User, with custom service for getting a media image or camera photo

---

## 🛠 Technologies

The following technologies were used in the development of the Mobile App project:

- **[Typescript](https://www.typescriptlang.org/)**
- **[React Native](https://reactnative.dev/)**
- **[Expo](https://docs.expo.dev/)**
- **[Gluestack](https://gluestack.io/)**
- **[React Navigation](https://reactnavigation.org/)**
- **[Axios](https://axios-http.com/)**
- **[Date-fns](https://date-fns.org/)**
- **[cpf-cnpj-validator](https://www.npmjs.com/package/cpf-cnpj-validator)**
- **[Lucide](https://lucide.dev/guide/packages/lucide-react-native)**
- **[React Hook Form](https://www.react-hook-form.com/)**
