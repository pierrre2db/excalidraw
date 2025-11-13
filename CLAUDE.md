# CLAUDE.md

---
name: excalidraw-selfhost
description: >
  Projet de déploiement d'Excalidraw sur GitHub Pages avec sauvegarde locale et Google Drive.
  Documentation complète pour Claude Code incluant configuration, développement et déploiement.
repository: https://github.com/pierrre2db/excalidraw
deployment: https://pierrre2db.github.io/excalidraw/
---

## Vue d'Ensemble du Projet

Ce projet est un fork d'Excalidraw configuré pour être auto-hébergé sur GitHub Pages. Il conserve toutes les fonctionnalités natives d'Excalidraw (sauvegarde localStorage, export/import JSON) et peut être étendu avec Google Drive.

**Production URL:** https://pierrre2db.github.io/excalidraw/
**Repository:** https://github.com/pierrre2db/excalidraw

## Fichiers de Suivi du Projet

- **`DEV_LOG.md`** - Journal chronologique de toutes les modifications (MAJ à chaque session)
- **`TODO.md`** - Liste des tâches à faire, organisée par priorité
- **`CLAUDE.md`** - Ce fichier - Instructions et configuration pour Claude Code

## Project Structure

Excalidraw est un **monorepo** avec une séparation claire entre la bibliothèque et l'application:

- **`packages/excalidraw/`** - Composant React principal publié sur npm comme `@excalidraw/excalidraw`
- **`excalidraw-app/`** - Application web complète (notre déploiement)
  - `build/` - Build de production (déployé sur GitHub Pages)
  - `vite.config.mts` - Configuration Vite avec `base: "/excalidraw/"`
- **`packages/`** - Packages du monorepo: `@excalidraw/common`, `@excalidraw/element`, `@excalidraw/math`, `@excalidraw/utils`
- **`examples/`** - Exemples d'intégration (NextJS, browser script)
- **`public/` ** - Assets statiques (favicons, images)

## Configuration GitHub Pages

### Fichiers Modifiés pour le Déploiement

1. **`/package.json` (ligne 49)**
   ```json
   "homepage": "https://pierrre2db.github.io/excalidraw"
   ```

2. **`/excalidraw-app/package.json` (ligne 5)**
   ```json
   "homepage": "https://pierrre2db.github.io/excalidraw"
   ```

3. **`/excalidraw-app/vite.config.mts` (ligne 16)**
   ```typescript
   base: "/excalidraw/",
   ```

4. **`/package.json` (devDependencies)**
   ```json
   "gh-pages": "6.3.0"
   ```

### Remote Git Configuration

```bash
origin  https://github.com/pierrre2db/excalidraw.git (fetch)
origin  https://github.com/pierrre2db/excalidraw.git (push)
```

Branche de déploiement: `gh-pages` (créée automatiquement)

## Development Workflow

### Workflow Standard

1. **Package Development**: Travailler dans `packages/*` pour les fonctionnalités de l'éditeur
2. **App Development**: Travailler dans `excalidraw-app/` pour les fonctionnalités spécifiques à l'app
3. **Testing**: Toujours exécuter `yarn test:update` avant de commit
4. **Type Safety**: Utiliser `yarn test:typecheck` pour vérifier TypeScript
5. **Build & Deploy**: `yarn build` puis `npx gh-pages -d excalidraw-app/build`

### Workflow de Développement et Déploiement

```bash
# 1. Développement local
yarn start                    # Démarre le serveur de dev sur http://localhost:3000/

# 2. Tests avant commit
yarn test:typecheck          # Vérification TypeScript
yarn test:app                # Tests unitaires
yarn test:code               # Linting ESLint
yarn fix                     # Auto-fix formatage et linting

# 3. Build de production
yarn build                   # Compile dans excalidraw-app/build/

# 4. Déploiement sur GitHub Pages
npx gh-pages -d excalidraw-app/build

# Alternative: Commande combinée (à créer)
# yarn deploy                # build + deploy (à ajouter dans package.json)
```

## Development Commands

```bash
# Développement
yarn start                    # Serveur de dev (port 3000)
yarn build                    # Build de production
yarn build:preview           # Build + preview

# Tests
yarn test:typecheck          # TypeScript type checking
yarn test:app                # Tests unitaires avec Vitest
yarn test:code               # ESLint
yarn test:all                # Tous les tests
yarn test:update             # Run all tests avec snapshot updates

# Qualité du code
yarn fix                     # Auto-fix formatage et linting
yarn fix:code                # Fix ESLint
yarn fix:other               # Fix Prettier

# Maintenance
yarn clean-install           # Nettoyage complet et réinstallation
yarn rm:build                # Supprime les dossiers build
yarn outdated                # Vérifie les dépendances obsolètes
```

## Architecture Notes

### Package System

- Utilise Yarn workspaces pour la gestion du monorepo
- Les packages internes utilisent des alias de chemin (voir `vitest.config.mts`)
- Système de build : esbuild pour les packages, Vite pour l'app
- TypeScript partout avec configuration stricte

### Technologies Clés

- **React 19.0.0** - Framework UI
- **Vite 5.0.12** - Build tool et dev server
- **TypeScript 4.9.4** - Langage typé
- **Vitest 3.0.6** - Framework de test
- **PWA Support** - Service Worker avec vite-plugin-pwa
- **i18n** - Support multilingue avec code splitting

### Variables d'Environnement

Variables disponibles (voir `.env.example` si existant):

- `VITE_APP_PORT` - Port du serveur de dev (défaut: 3000)
- `VITE_APP_GIT_SHA` - SHA du commit pour le build
- `VITE_APP_ENABLE_TRACKING` - Active le tracking analytics
- `VITE_APP_DISABLE_SENTRY` - Désactive Sentry
- `VITE_APP_ENABLE_PWA` - Active PWA en développement
- `VITE_APP_ENABLE_ESLINT` - Active ESLint dans Vite

## Fonctionnalités de Sauvegarde

### 1. LocalStorage (Natif)
- Sauvegarde automatique dans le navigateur
- Pas de configuration nécessaire
- Limite: ~5-10 MB selon le navigateur

### 2. Export/Import Manuel (Natif)
- Export: `.excalidraw` (JSON), PNG, SVG
- Import: Glisser-déposer de fichiers `.excalidraw`

### 3. Google Drive (À Configurer)
- Option 1: Extension Chrome "Excalidraw+"
- Option 2: Intégration Google Drive API (custom)
- Voir TODO.md pour les étapes d'implémentation

## Notes Importantes

### Warnings Connus (Non Critiques)

- Plusieurs peer dependencies manquantes (@babel/core, eslint, react/react-dom)
- Ces warnings n'empêchent pas le build et sont normaux dans un contexte monorepo
- Browserslist data obsolète (correction: `npx update-browserslist-db@latest`)

### Bonnes Pratiques

1. **Toujours tester localement** avant de déployer
2. **Vérifier TypeScript** : 0 erreur tolérée
3. **Documenter les modifications** dans DEV_LOG.md
4. **Mettre à jour TODO.md** quand des tâches sont complétées
5. **Commit régulièrement** avec des messages clairs

## Personnalisation Rapide

### Changer le Titre
Fichier: `excalidraw-app/index.html`

### Changer les Icônes
Répertoire: `public/` (favicons, manifest icons)

### Modifier les Couleurs/Thème
Explorer les variables CSS dans `packages/excalidraw/`

## Troubleshooting

### Le build échoue
```bash
yarn rm:build
yarn clean-install
yarn build
```

### Erreurs TypeScript
```bash
yarn test:typecheck
# Corriger les erreurs affichées
```

### Le déploiement ne fonctionne pas
1. Vérifier que GitHub Pages est activé sur le repo
2. Vérifier que la branche `gh-pages` existe
3. Attendre 2-3 minutes après déploiement
4. Vider le cache du navigateur

### L'app ne se charge pas sur GitHub Pages
1. Vérifier `base: "/excalidraw/"` dans vite.config.mts
2. Vérifier `homepage` dans les package.json
3. Rebuild et redeploy

## Prochaines Étapes Recommandées

Voir **TODO.md** pour la liste complète, mais en priorité:

1. ✅ ~~Configuration initiale et déploiement~~ (Fait)
2. ⏳ Activer GitHub Pages sur le repository
3. ⏳ Tester l'application déployée
4. ⏳ Configurer CI/CD avec GitHub Actions
5. ⏳ Documenter la sauvegarde Google Drive

## Liens Utiles

- **Repo officiel Excalidraw:** https://github.com/excalidraw/excalidraw
- **Documentation Excalidraw:** https://docs.excalidraw.com/
- **GitHub Pages Doc:** https://docs.github.com/en/pages
- **Vite Documentation:** https://vitejs.dev/
- **Google Drive API:** https://developers.google.com/drive/api/v3/about-sdk

---

**Dernière mise à jour:** 2025-11-13
**Statut:** ✅ Déploiement initial réussi
