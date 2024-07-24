# Présentation Argent Bank

## Plan

- Le Projet
- Fonctionnalités Principales
- Dépendences Utilisées
- Structure de l'Application
- Gestion d'État avec Redux
- Routing et Sécurité
- Points Clés
- Perspectives

## Le Projet

Objectif : Développer une application avec React et Redux permettant à l'utilisateur de s'authentifier et de mettre à jour  le nom et le prénom.

## Fonctionnalités Principales

1. Authentification (connexion/déconnexion)
2. mise à jour du nom et du prénom

## Dépendences utilisées

- React : CRA (Create React App) template
- Redux : gestion de l'état global de l'application
- React-Redux : connecter React et Redux (integration de Redux avec React)
- @reduxjs/toolkit : simplifier la configuration du store (Redux)
- React Router dom : gérer les routes de l'application
- Axios : bibliothèque pour effectuer des requêtes HTTP

## Test des fonctionnalités

- page Home
  
[je clique sur le lien `Sign In` ou je saisie l'url `http://localhost:3000/signin`,je suis redirigé vers la page signin, le prenom est affiché à côté du lien `Sign Out`](http://localhost:3000/)

- page signin
  
- [je suis connecté, je peux me déconnecter](http://localhost:3000/)

- [je suis connecté, je clic sur le logo et je suis redirigé vers la home page, je suis toujours connecté](http://localhost:3000/)

- [je ne suis pas connecté , je saisie l'url `http://localhost:3000/profile`  de la page de profile, je suis redirigé vers la l'url `http://localhost:3000/signin` de la page signin](http://localhost:3000/)

- [je saisie une adresse mail et un mot de passe non valide, un message d'erreur s'affiche](http://localhost:3000/)
  
- [je saisie une adresse mail et un mot de passe  valide, je suis redirigé vers la page profile](http://localhost:3000/)

-page profile

- [je suis connecté, je saisie manuellement cette url : `http://localhost:3000/signin`, je reste sur la page profil](http://localhost:3000/profile)

- [je suis connecté,je fais une erreur, je saisie manuellement cette url : `http://localhost:3000/2#omnkm`, je suis redirigé vers la page d'erreur 404](http://localhost:3000/)

-[je suis connecté,je clique sur le btn `Edit Name`, le formulaire est affiché; je mets à jour le nom et le prenom](http://localhost:3000/)

- [je saisie un nom et un prenom valide, je  clique sur le bouton `save`, le nom et le prenom sont mis à jour, le formulaire ferme](http://localhost:3000/)
  
- [je ne saisie pas un nom et un prenom non valide, je clique sur le bouton `save`, le()s erreur(s) restent affiché ,le formulaire reste ouvert](http://localhost:3000/)

- [je saisie un nom et un prenom valide, je clique sur `cancel` , le formulaire revient à l'etat initial et ferme](http://localhost:3000/)

- [je saisie un nom et un prenom  non valide, je clique sur `cancel` , le formulaire revient à l'etat initial et ferme](http://localhost:3000/)
  
## Structure de l'Application

- Composants :
- [Layout](../frontend/src/components/Layout/Layout.jsx) : contient le header, outlet et le footer
  - [Header](../frontend/src/components/Header/Header.jsx)
  - [Outlet](../frontend/src/components/Layout/Layout.jsx) : afficher les composants enfants définis dans la configuration des routes dans App.js
  - [Footer](../frontend/src/components/Footer/Footer.jsx)
- Pages :
  - [Home](../frontend/src/pages/Home/Home.jsx)
  - [Signin](../frontend/src/pages/SignIn/SignIn.jsx)
  - [Profil](../frontend/src/pages/Profile/Profile.jsx)

## Gestion d'État avec Redux

- [Configuration du store](../frontend/src/store/store.js)
- [authSlice](../frontend/src/store/authSlice.js) pour l'authentification et la gestion du profil
- Utilisation des hooks `useSelector` depuis le store et `useDispatch` dans les composants pour afficher les actions du store dans redux devtools
- Intégration avec l'API via Axios

## Routing et Sécurité

- [routes](../frontend/src/App.js)
- Protection des routes avec le hook isAuthenticated (useSelector), les composants `<Navigate>` et `<Outlet>`

## Points Clés

- Interface utilisateur intégrée à partir des designs fournis
- Gestion sécurisée de l'authentification
- Mise à jour en temps réel du profil utilisateur

## Perspectives

- Amélioration de la sécurité de l'authentification (double authentification, protection des données sensibles)
- Développement d'une version mobile
- Intégration de services financiers supplémentaires (comptes bancaires, cartes de crédit, etc.)
