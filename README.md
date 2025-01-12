# Gestion des Associations - Application Web

Ce projet propose une solution de numérisation pour la gestion des associations par les services publics. Il comprend un **backend** réalisé avec **NestJS** et un **frontend** développé avec **Angular**.

## Fonctionnalités

### Backend
Le backend permet de gérer plusieurs entités essentielles liées aux associations et aux utilisateurs :
- **Utilisateurs** :
  - Création
  - Récupération (par ID)
  - Liste des utilisateurs
  - Mise à jour
  - Suppression
- **Associations** :
  - Création
  - Récupération (par ID)
  - Liste des associations
  - Mise à jour
  - Suppression
- **Rôles** :
  - Gestion des rôles des utilisateurs dans les associations (ex. administrateur, membre)
- **Procès-verbaux (Minutes)** :
  - Gestion des procès-verbaux associés aux associations

### Frontend
Le frontend permet à un utilisateur authentifié de réaliser les actions suivantes :
- **Authentification des utilisateurs**.
- **Accéder à son profil** et mettre à jour ses informations (changement de nom et de mot de passe).
- **Lister les utilisateurs**.
- **Lister les associations**.
- **Accéder à la fiche d'un utilisateur**, incluant ses informations personnelles et la liste des associations dont il est au moins membre.
- **Accéder à la fiche d'une association**, avec les informations sur l'association, ses membres et ses procès-verbaux.
- **Rechercher un utilisateur ou une association** par leur ID.
- **Supprimer une association dont il est président ou de  supprimer son compte.**
- **Ajouter un utilisateur**.
- **Ajouter une association**.
- **Modifier une association** (par exemple, modifier les rôles des utilisateurs dans l'association) s'il est président.

---

## Prérequis

### Général
- Node.js : version 18 ou supérieure
- npm ou yarn : pour gérer les dépendances

### Backend
- NestJS CLI : pour la gestion du projet backend

### Frontend
- Angular CLI : pour gérer et exécuter l'application frontend

---

## Installation

### Clonez le dépôt
```bash
git clone https://github.com/wajrock/projet-web.git
cd projet-web
```

### Backend

1. Accédez au répertoire du backend :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Démarrez le serveur :
   ```bash
   npm run start:dev
   ```

### Frontend

1. Accédez au répertoire du frontend :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur de développement :
   ```bash
   ng serve
   ```

---

## Structure du projet

```plaintext
|-- fr-administration/        # Code source du backend (NestJS)
|   |-- src/                  # Dossier principal de l'application NestJS
|
|-- fr-administration-front/  # Code source du frontend (Angular)
|   |-- src/                  # Dossier principal de l'application Angular
|   |-- angular.json          # Configuration Angular
|
|-- README.md                 # Documentation principale
```

---

## Communication Frontend-Backend

### Endpoints disponibles

Les principaux endpoints définis dans le backend incluent :
# Endpoints de l'API Backend

Voici les principaux endpoints définis dans le backend de l'application :

## **Users**

- `POST /users` : Créer un utilisateur
- `GET /users` : Lister tous les utilisateurs
- `GET /users/:idUser` : Récupérer un utilisateur par ID
- `PUT /users/:idUser` : Mettre à jour un utilisateur
- `DELETE /users/:idUser` : Supprimer un utilisateur

## **Associations**

- `POST /associations` : Créer une association
- `GET /associations` : Lister toutes les associations
- `GET /associations/:idAssociation` : Récupérer une association par ID
- `GET /associations/user/:idUser` : Récupérer les associations d'un utilisateur
- `GET /associations/:idAssociation/members` : Récupérer les membres d'une association
- `GET /associations/:idAssociation/minutes` : Récupérer les procès verbaux d'une association
- `PUT /associations/:idAssociation/:idUser` : Ajouter un utilisateur à une association
- `PUT /associations/:idAssociation` : Mettre à jour une association
- `DELETE /associations/:idAssociation/:idUser` : Supprimer un utilisateur d'une association
- `DELETE /associations/:idAssociation` : Supprimer une association

## **Roles**

- `POST /roles` : Créer un rôle
- `GET /roles` : Lister tous les rôles
- `GET /roles/users/:name` : Récupérer les utilisateurs associés à un rôle par nom
- `GET /roles/:idUser/:idAssociation` : Récupérer un rôle par ID utilisateur et ID association
- `PUT /roles/:idUser/:idAssociation` : Modifier un rôle
- `DELETE /roles/:idUser/:idAssociation` : Supprimer un rôle

## **Minutes (Procès-verbaux)**

- `POST /minutes` : Créer un procès-verbal
- `GET /minutes` : Lister tous les procès-verbaux
- `GET /minutes/:idMinute` : Récupérer un procès-verbal par ID
- `GET /minutes/:idMinute/voters` : Récupérer les votants associés à un procès-verbal
- `PUT /minutes/:idMinute` : Modifier un procès-verbal
- `DELETE /minutes/:idMinute` : Supprimer un procès-verbal

## **Authentification**

- `POST /auth/login` : Authentification de l'utilisateur, retourne un jeton JWT pour les requêtes futures..

---

## Dépendances

### Backend
Les principales dépendances utilisées dans le backend incluent :
- `@nestjs/common` : Framework NestJS
- `@nestjs/typeorm` : ORM pour la gestion des données
- `class-validator` : Validation des entrées utilisateur

### Frontend
Les principales dépendances utilisées dans le frontend incluent :
- `@angular/core` : Framework Angular
- `@angular/router` : Gestion des routes
- `rxjs` : Gestion des flux asynchrones

---

## Tests

### Backend
Pour exécuter les tests unitaires du backend :
```bash
cd backend
npm run test
```

Les tests backend valident les fonctionnalités critiques de l'application, notamment la gestion des utilisateurs, des associations, des rôles et des procès-verbaux (minutes). Ils simulent des interactions avec la base de données et les services pour garantir leur bon fonctionnement.

#### Tests du **UsersService**
- **Méthode `create`**  
  - **Objectif** : Vérifier la création d’un utilisateur avec un mot de passe correctement hashé.  
  - **Scénario** : Lors de l’appel à `create()`, le mot de passe est hashé avec bcrypt, puis l’utilisateur est enregistré dans la base de données.  
  - **Résultat attendu** : L'utilisateur est créé avec un mot de passe sécurisé.  

- **Méthode `remove`**  
  - **Objectif** : Tester la suppression d’un utilisateur existant.  
  - **Scénario** : Lorsqu’un utilisateur est supprimé, la méthode renvoie `true` si la suppression est réussie, ou `false` si l'utilisateur est introuvable.  
  - **Résultat attendu** : Suppression réussie ou réponse appropriée.  

- **Méthode `removeUserFromAll`**  
  - **Objectif** : S'assurer qu’un utilisateur est supprimé après avoir été dissocié de toutes les entités (associations, rôles, minutes).  
  - **Scénario** : Les entités associées à l’utilisateur sont mises à jour avant sa suppression.  
  - **Résultat attendu** : Les entités sont dissociées et l'utilisateur est supprimé avec succès.  

#### Tests du **UsersController**
- **Méthode `getRoles`**  
  - **Objectif** : Vérifier que les rôles d’un utilisateur sont correctement récupérés.  
  - **Scénarios** :
    - Si l’utilisateur existe, ses rôles sont renvoyés.
    - Si l’utilisateur n’existe pas, une exception `NOT_FOUND` est levée.
    - En cas d’erreur du service, une exception `BAD_REQUEST` est levée.
  - **Résultat attendu** : Les rôles sont récupérés ou une exception appropriée est levée.  

- **Méthode `getById`**  
  - **Objectif** : Tester la récupération d’un utilisateur par son ID.  
  - **Scénarios** :
    - Si l’utilisateur existe, ses informations sont renvoyées.
    - Si l’utilisateur n’existe pas, une exception `NOT_FOUND` est levée.
  - **Résultat attendu** : Les données de l’utilisateur sont retournées ou une exception est levée.  

---

### Frontend
Pour exécuter les tests unitaires du frontend :
```bash
cd frontend
ng test
```

Les tests frontend valident l’interaction de l’utilisateur avec l’interface utilisateur. Chaque composant est testé pour s’assurer qu’il fonctionne correctement et répond comme attendu aux cas d’utilisation définis.

#### Tests des composants
- **Tests communs à tous les composants**  
  Tous les composants incluent un test de base pour vérifier leur création correcte :
  ```typescript
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  ```

- **Composant `UserCardComponent`**  
  Ce composant affiche les informations d’un utilisateur, notamment son nom complet, son âge, et ses associations. Les tests couvrent différents scénarios pour s’assurer que les données sont affichées correctement et que les comportements sont cohérents.  

  **Tests spécifiques :**
  - **Création du composant**  
    Vérifie que le composant est créé avec succès.
    
  - **Utilisation des données utilisateur fournies**  
    Teste si le composant utilise correctement les données de l'utilisateur.

  - **Affichage des informations utilisateur dans le template**  
    Vérifie que les données utilisateur sont affichées correctement dans le DOM.

  - **Affichage des associations dans le template**  
    Vérifie que les associations de l’utilisateur sont affichées correctement dans le DOM.

  - **Affichage d’un message lorsque l’utilisateur n’a aucune association**  
    Teste que le message "No associations" s’affiche lorsque la liste des associations est vide.

---

## Auteurs

Développé par **NGOMA Sir William** et **WAJROCK Thibaud**.
