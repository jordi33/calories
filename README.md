# Calories (Vercel + Supabase)

Appli de suivi de calories pour Jordi et Lila : profils, graphiques hebdo, poids, estimation par photo.

## Mise en place
1. **Supabase** (gratuit) : crée un projet, ouvre *SQL Editor*, colle et lance `schema.sql`.
   Dans *Project Settings > API*, copie l’URL et la clé `anon public`, puis colle-les en haut du script de `index.html` (`SUPABASE_URL`, `SUPABASE_KEY`).
2. **GitHub** : pousse ce dossier dans un nouveau repo.
3. **Vercel** (gratuit) : *Add New > Project*, importe le repo, aucun réglage de build.
   Ajoute la variable d’environnement `ANTHROPIC_API_KEY` (clé créée sur console.anthropic.com, l’API est facturée à part, quelques centimes pour des photos de repas), puis déploie.
4. Envoie l’URL à Lila.

## Notes
- Sans authentification : toute personne ayant l’URL peut lire et écrire. Suffisant pour un usage perso, mais on peut ajouter un mot de passe commun ou Supabase Auth.
- `api/estimate.js` garde la clé Anthropic côté serveur ; ne la mets jamais dans `index.html`.
- Pour tester en local : `npx vercel dev`.
