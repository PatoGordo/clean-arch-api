# <-------------- Clean Architecture -------------->

## Domain (APP Core)

- Entities
  - User
  - Profile
  - Wallet
  - Transaction

## Application

- Repositories (a interface collection of responsabilities)
- UseCases (a single responsability implementation of a repository)
- Adapters (a interface collection of gateways to external services and functionalities)
  - MessagingAdapter (a interface collection of a messaging function) [can be implemented by kafka, rabbitmq...]

## Infrastructure

- Database (a collection of repositories, transactions and other database stuff)
  - Prisma, InMemory, Redis...
    - Repositories (a implementation of an interface repository from application layer)
- Messaging (a collection of adapters, gateways and other messaging stuff)
  - Kafka
    - Adapters
      - KafkaMessagingAdapter (a implmentation of an interface adapter from application layer)
- Routes
  - AuthRoutes
  - AppRoutes

## Example folder structure

```md
- src
  - __tests__
    - e2e
      - auth
        - sign-in.e2e-spec.ts
        - sign-up.e2e-spec.ts
        - sign-out.e2e-spec.ts
      - profile
        - update-profile.e2e-spec.ts
      - wallet
        - create-wallet.e2e-spec.ts
        - find-wallets.e2e-spec.ts
        - update-wallet.e2e-spec.ts
        - delete-wallet.e2e-spec.ts
      - transaction
        - create-transaction.e2e-spec.ts
        - find-transactions.e2e-spec.ts
        - update-transaction.e2e-spec.ts
        - delete-transaction.e2e-spec.ts
    - unit
      - auth
        - sign-in.spec.ts
        - sign-up.spec.ts
        - sign-out.spec.ts
      - profile
        - update-profile.spec.ts
      - wallet
        - create-wallet.spec.ts
        - find-wallets.spec.ts
        - update-wallet.spec.ts
        - delete-wallet.spec.ts
      - transaction
        - create-transaction.spec.ts
        - find-transactions.spec.ts
        - update-transaction.spec.ts
        - delete-transaction.spec.ts
  
  - domain
    - entities _(interfaces)_
      - user.ts
      - profile.ts
      - wallet.ts
      - transaction.ts

  - application
    - repositories _(interfaces)_
      - auth.repository.ts
      - profile.repository.ts
      - wallet.repository.ts
      - transaction.repository.ts
    - usecases _(implementations)_
      - auth
        - sign-in.usecase.ts
        - sign-up.usecase.ts
        - sign-out.usecase.ts
      - profile
        - update-profile.usecase.ts
      - wallet
        - create-wallet.usecase.ts
        - find-wallets.usecase.ts
        - update-wallet.usecase.ts
        - delete-wallet.usecase.ts
      - transaction
        - create-transaction.usecase.ts
        - find-transactions.usecase.ts
        - update-transaction.usecase.ts
        - delete-transaction.usecase.ts
    - adapters _(interfaces)_
      - messaging.adapter.ts

  - infra
    - database _(implementations)_
      - prisma
        - repositories
          - prisma-auth.repository.ts
          - prisma-profile.repository.ts
          - prisma-wallet.repository.ts
          - prisma-transaction.repository.ts
        - client.ts
        - index.ts
      - in-memory
        - repositories
          - in-memory-auth.repository.ts
          - in-memory-profile.repository.ts
          - in-memory-wallet.repository.ts
          - in-memory-transaction.repository.ts
        - db.ts
        - index.ts
    - messaging _(implementations)_
      - kafka
        - adapters
          - kafka-messaging.adapter.ts
        - cleint.ts
        - index.ts
    - routes
      - auth.router.ts
      - profile.router.ts
      - wallet.router.ts
      - transaction.router.ts
      - index.ts

  - server.ts
  - app.ts
```

```
  src
  ├── __tests__
  │   ├── e2e
  │   │   ├── auth
  │   │   │   ├── sign-in.e2e-spec.ts
  │   │   │   ├── sign-up.e2e-spec.ts
  │   │   │   └── sign-out.e2e-spec.ts
  │   │   ├── profile
  │   │   │   └── update-profile.e2e-spec.ts
  │   │   ├── wallet
  │   │   │   ├── create-wallet.e2e-spec.ts
  │   │   │   ├── find-wallets.e2e-spec.ts
  │   │   │   ├── update-wallet.e2e-spec.ts
  │   │   │   └── delete-wallet.e2e-spec.ts
  │   │   └── transaction
  │   │       ├── create-transaction.e2e-spec.ts
  │   │       ├── find-transactions.e2e-spec.ts
  │   │       ├── update-transaction.e2e-spec.ts
  │   │       └── delete-transaction.e2e-spec.ts
  │   └── unit
  │       ├── auth
  │       │   ├── sign-in.spec.ts
  │       │   ├── sign-up.spec.ts
  │       │   └── sign-out.spec.ts
  │       ├── profile
  │       │   └── update-profile.spec.ts
  │       ├── wallet
  │       │   ├── create-wallet.spec.ts
  │       │   ├── find-wallets.spec.ts
  │       │   ├── update-wallet.spec.ts
  │       │   └── delete-wallet.spec.ts
  │       └── transaction
  │           ├── create-transaction.spec.ts
  │           ├── find-transactions.spec.ts
  │           ├── update-transaction.spec.ts
  │           └── delete-transaction.spec.ts
  ├── domain
  │   └── entities
  │       ├── user.ts
  │       ├── profile.ts
  │       ├── wallet.ts
  │       └── transaction.ts
  ├── application
  │   ├── repositories
  │   │   ├── auth.repository.ts
  │   │   ├── profile.repository.ts
  │   │   ├── wallet.repository.ts
  │   │   └── transaction.repository.ts
  │   ├── usecases
  │   │   ├── auth
  │   │   │   ├── sign-in.usecase.ts
  │   │   │   ├── sign-up.usecase.ts
  │   │   │   └── sign-out.usecase.ts
  │   │   ├── profile
  │   │   │   └── update-profile.usecase.ts
  │   │   └── wallet
  │   │       ├── create-wallet.usecase.ts
  │   │       ├── find-wallets.usecase.ts
  │   │       ├── update-wallet.usecase.ts
  │   │       └── delete-wallet.usecase.ts
  │   ├── adapters
  │   │   └── messaging.adapter.ts
  ├── infra
  │   ├── database
  │   │   ├── prisma
  │   │   │   ├── repositories
  │   │   │   │   ├── prisma-auth.repository.ts
  │   │   │   │   ├── prisma-profile.repository.ts
  │   │   │   │   ├── prisma-wallet.repository.ts
  │   │   │   │   └── prisma-transaction.repository.ts
  │   │   │   ├── client.ts
  │   │   │   └── index.ts
  │   │   └── in-memory
  │   │       ├── repositories
  │   │       │   ├── in-memory-auth.repository.ts
  │   │       │   ├── in-memory-profile.repository.ts
  │   │       │   ├── in-memory-wallet.repository.ts
  │   │       │   └── in-memory-transaction.repository.ts
  │   │       ├── db.ts
  │   │       └── index.ts
  │   ├── messaging
  │   │   ├── kafka
  │   │   │   ├── adapters
  │   │   │   │   └── kafka-messaging.adapter.ts
  │   │   │   ├── client.ts
  │   │   │   └── index.ts
  │   │   └── routes
  │   │       ├── auth.router.ts
  │   │       ├── profile.router.ts
  │   │       ├── wallet.router.ts
  │   │       ├── transaction.router.ts
  │   │       └── index.ts
  ├── server.ts
  └── app.ts
```
