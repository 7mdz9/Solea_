# Solea

Next.js App Router + TypeScript app for the Solea pop-up menu and admin QR generator.

## Build And Start

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

Open the public menu at:

```text
http://localhost:3000/menu
```

The root route redirects to `/menu`.

## Environment Variables

| Name             | Required | Example                       | Notes                                                                                                             |
| ---------------- | -------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `MENU_URL`       | Yes      | `https://soleauae.com/menu`   | The single fixed menu URL encoded by the admin QR generator in production.                                        |
| `ADMIN_PASSWORD` | Yes      | `replace-with-admin-password` | Protects `/admin/*` with Basic Auth in production. Use a real secret in the host dashboard, not this placeholder. |
| `NODE_ENV`       | Yes      | `production`                  | Set by the deployment platform for production builds.                                                             |

Never commit real secret values. Put production values in the hosting provider environment settings.

## Vercel Deploy

1. Push the repo to GitHub.
2. In Vercel, create a new project from the GitHub repo.
3. Keep the default Next.js framework settings.
4. Add production environment variables:
   - `MENU_URL=https://soleauae.com/menu`
   - `ADMIN_PASSWORD=<the private admin password>`
   - `NODE_ENV=production`
5. Deploy.
6. Open the Vercel deployment URL and confirm `/menu` loads.
7. Open `/admin/qr` and confirm it is gated before entering the admin password.

## Connect soleauae.com

The domain owner should complete this in the DNS provider and hosting dashboard.

1. Add `soleauae.com` to the Vercel project domains.
2. Add `www.soleauae.com` to the same Vercel project domains.
3. Set the apex domain as primary: `soleauae.com`.
4. Set `www.soleauae.com` to redirect to the apex domain.
5. In DNS, create the apex A record that points to the host apex IP.
6. In DNS, create the `www` CNAME record that points to the host CNAME target.
7. Follow the exact records the host displays. If Vercel shows different values, use the values Vercel shows.
8. Wait for DNS propagation.
9. Confirm HTTPS is active. Vercel provisions HTTPS automatically after the domain is connected.

Typical Vercel records are:

| Host  | Type    | Value                                 |
| ----- | ------- | ------------------------------------- |
| `@`   | `A`     | Use the apex IP shown by Vercel.      |
| `www` | `CNAME` | Use the CNAME target shown by Vercel. |

## If soleauae.com Already Hosts A Site

Do not replace an existing live site until the domain owner decides the menu app should become the primary site.

Options:

1. Keep the existing site on `soleauae.com` and deploy this app on a subdomain such as `menu.soleauae.com`.
2. Set `MENU_URL=https://menu.soleauae.com/menu`.
3. Connect only the chosen subdomain to Vercel.
4. Generate and print the QR codes after the final `MENU_URL` is set.
5. If the existing site should later point visitors to the menu, add a link or redirect from the existing site owner's platform.

## Menu Edits

Menu edits need a developer. The approved menu copy and prices are stored in source code and are guarded by tests to prevent accidental wording or price drift.

## QR → Menu Verification Checklist

1. Deploy the app.
2. Connect `soleauae.com`.
3. Open `https://soleauae.com/menu` over HTTPS.
4. Confirm `https://soleauae.com/` redirects to `/menu`.
5. Open `https://soleauae.com/admin/qr`.
6. Confirm `/admin/qr` is gated.
7. Enter the admin password.
8. Confirm the menu address is read-only and shows `https://soleauae.com/menu`.
9. Generate a code.
10. Print a code.
11. Scan the printed code with a real phone.
12. Confirm the live menu loads.
