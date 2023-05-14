# NRSTATE DEMO

- nrstate  
  https://www.npmjs.com/package/nrstate

- nrstate-client  
  https://www.npmjs.com/package/nrstate-client

## Running Locally

[Next.js App Router Playground](https://github.com/vercel/app-playground)

### 1. Install dependencies:

```sh
pnpm install
```

### 2. DB Setup:

- Vercel Postgres  
  https://vercel.com/docs/storage/vercel-postgres
  - Edit `.env.local`
  ```sh
  cp .env.example .env.local
  ```
  - seed
    - postgres/seed.md

#### Setup without DB (optional)

- .env.local

```sh
NEXT_PUBLIC_POSTGRES="false"
```

### 3. Start the dev server:

```sh
pnpm dev
```

Then, http://localhost:3000

- Demo app on Vercel  
  https://nrstate-demo.vercel.app/demo
