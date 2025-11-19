# Excalidraw Self-Hosted

Version auto-hébergée d'Excalidraw déployée sur GitHub Pages.

🎨 **Application Live:** https://pierrre2db.github.io/excalidraw/

## 📚 Documentation du Projet

Ce projet maintient une documentation complète pour faciliter le développement :

- **[CLAUDE.md](./CLAUDE.md)** - Guide complet de configuration et développement (pour Claude Code)
- **[DEV_LOG.md](./DEV_LOG.md)** - Journal chronologique de toutes les modifications
- **[TODO.md](./TODO.md)** - Liste des tâches à faire, organisée par priorité

## 🚀 Quick Start

### Développement Local

```bash
# Installer les dépendances
yarn install

# Démarrer le serveur de développement
yarn start
# → L'app sera accessible sur http://localhost:3000/
```

### Build et Déploiement

```bash
# Build de production
yarn build

# Déployer sur GitHub Pages
npx gh-pages -d excalidraw-app/build
```

## ✨ Fonctionnalités

- ✅ Sauvegarde automatique (localStorage)
- ✅ Export/Import de fichiers `.excalidraw`, PNG, SVG
- ✅ Support multilingue
- ✅ Mode sombre/clair
- ✅ PWA (Progressive Web App)
- ✅ **Intégration Google Drive complète**
  - Sauvegarde dans le cloud
  - Gestion des versions
  - Auto-save toutes les 5 minutes
  - File picker avec recherche
- ⚠️ **Collaboration temps réel** : Non disponible (hébergement statique)
  - Workaround gratuit documenté → Voir [COLLABORATION_WORKAROUND.md](./COLLABORATION_WORKAROUND.md)

## 🛠️ Commandes Utiles

```bash
# Développement
yarn start              # Serveur de dev
yarn build              # Build de production
yarn build:preview      # Build + preview

# Tests
yarn test:typecheck     # TypeScript
yarn test:app           # Tests unitaires
yarn test:code          # Linting ESLint

# Qualité du code
yarn fix                # Auto-fix formatage et linting

# Maintenance
yarn outdated           # Vérifier les dépendances obsolètes
yarn clean-install      # Réinstallation propre
```

## 📦 Configuration GitHub Pages

### Fichiers Modifiés

Les fichiers suivants ont été modifiés pour le déploiement sur GitHub Pages :

1. **`/package.json`** - Ajout de `homepage` et `gh-pages`
2. **`/excalidraw-app/package.json`** - Ajout de `homepage`
3. **`/excalidraw-app/vite.config.mts`** - Ajout de `base: "/excalidraw/"`

Voir [CLAUDE.md](./CLAUDE.md) pour plus de détails.

## 📖 Documentation

### Documentation Utilisateur

- **[MANUEL_UTILISATEUR.md](./MANUEL_UTILISATEUR.md)** - Guide complet pour les utilisateurs
  - Connexion Google Drive
  - Sauvegarde et gestion des versions
  - FAQ complète
- **[GUIDE_RAPIDE.md](./GUIDE_RAPIDE.md)** - Guide de démarrage rapide
- **[COLLABORATION_WORKAROUND.md](./COLLABORATION_WORKAROUND.md)** - Comment collaborer en temps réel (workaround gratuit)

### Documentation Développeur

- **[CLAUDE.md](./CLAUDE.md)** - Guide complet de configuration et développement
- **[INSTRUCTIONS_DEVELOPPEUR.md](./INSTRUCTIONS_DEVELOPPEUR.md)** - Instructions pour les développeurs
- **[DEV_LOG.md](./DEV_LOG.md)** - Journal chronologique des modifications
- **[TODO.md](./TODO.md)** - Liste des tâches à faire

## 🔗 Liens

- **Application déployée:** https://pierrre2db.github.io/excalidraw/
- **Ce repository:** https://github.com/pierrre2db/excalidraw
- **Repo officiel Excalidraw:** https://github.com/excalidraw/excalidraw
- **Documentation Excalidraw:** https://docs.excalidraw.com/

## 📝 Notes

Ce projet est basé sur [Excalidraw](https://github.com/excalidraw/excalidraw), un outil de dessin collaboratif open-source. Voir [README.md](./README.md) pour la documentation officielle d'Excalidraw.

---

**Dernière mise à jour:** 2025-11-19
**Nouvelles fonctionnalités:** Documentation collaboration temps réel (workaround gratuit)
