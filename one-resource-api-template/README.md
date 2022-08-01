# Routes

- NOTE: ":id" is based on the routes table, unless otherwise specified

### User Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

### Hero Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/heroes`              | `heroes#create`   |
| GET    | `/heroes`              | `heroes#index`    |
| GET    | `/heroes/:id`          | `heroes#show`     |
| PATCH  | `/hereos/:id`          | `heroes#update`   |
| DELETE | `/heroes/:id`          | `heroes#delete`   |

### Weapon Routes Table

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/weapons/:id`             | `weapons#create`  |
| PATCH  | `/weapons/:heroId/:weaponId`         | `weapons#update`  |
| DELETE | `/heroes/:heroId/:weaponId`          | `weapons#delete`  |