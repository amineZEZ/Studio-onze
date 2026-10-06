# Studio Keyframe

Site du studio créatif : logo, motion design, sites internet et SaaS.

- Next.js (App Router), aucune base de données.
- Les textes, offres et prix se modifient dans `lib/site.ts`.
- Le formulaire de devis envoie un email via Resend (`app/api/devis/route.ts`) ; rien n'est stocké.

## Variables Vercel

Voir `.env.example`. Les clés vont uniquement dans Vercel, jamais sur GitHub.

## Commandes

```
npm install
npm run dev    # http://localhost:3000
npm test
npm run build
```
