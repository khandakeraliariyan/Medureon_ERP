# Medureon ERP — Frontend

React + Vite frontend for the Medureon Pharmacy ERP system. It talks to the API documented in [server/README.md](../server/README.md).

## Tech stack

- React 19
- React Router 7
- Vite 8
- Oxlint

## Getting started

```bash
cd frontend
npm install
npm run dev
```

By default the app calls the API at `http://localhost:5000/api/v1`. To point it elsewhere, create a `.env` file:

```text
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Scripts

| Command           | Description                       |
| ------------------ | ---------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR |
| `npm run build`     | Build for production               |
| `npm run preview`   | Preview the production build       |
| `npm run lint`      | Run Oxlint                         |

## Project structure

```text
src/
├── api/            # API client functions (auth, etc.)
├── assets/         # Static assets
├── components/      # Shared/reusable components
│   ├── app-shell/    # App shell layout (sidebar/header for logged-in views)
│   └── ui/           # UI primitives (Badge, Pagination, StatCard, ...)
├── pages/          # Route-level pages, grouped by feature
│   ├── analytics/
│   ├── dashboard/
│   ├── inventory/
│   ├── invoice/
│   ├── lending/
│   ├── notifications/
│   ├── patients/
│   ├── pos/
│   ├── settings/
│   ├── suppliers/
│   └── users/
├── App.jsx         # Route definitions
└── main.jsx        # App entry point
```

## Routes

| Path                          | Page                  |
| ------------------------------ | --------------------- |
| `/`                             | Landing page           |
| `/register`                     | Register               |
| `/login`                        | Login                  |
| `/forgot-password`              | Forgot password        |
| `/app/dashboard`                | Dashboard              |
| `/app/inventory`                | Inventory              |
| `/app/inventory/stock-in`       | Stock-in               |
| `/app/suppliers`                | Suppliers              |
| `/app/pos`                      | Point of sale          |
| `/app/analytics`                | Sales history / analytics |
| `/app/patients`                 | Customers              |
| `/app/lending`                  | Lending                |
| `/app/notifications`            | Notifications           |
| `/app/users`                    | User management         |
| `/app/settings`                 | Settings                |
| `/app/invoice/:id`              | Invoice detail          |

## Linting

This project uses [Oxlint](https://oxc.rs) for linting:

```bash
npm run lint
```
