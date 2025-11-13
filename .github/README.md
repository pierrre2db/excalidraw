# GitHub Workflows - Excalidraw Self-Hosted

## 🎯 Workflows Custom (Ajoutés pour le Self-Hosting)

### ✅ `deploy.yml` - Déploiement Automatique sur GitHub Pages

**Quand :** À chaque push sur `main` ou manuellement

**Ce qu'il fait :**
1. ✅ Vérifie TypeScript
2. ✅ Vérifie ESLint
3. ✅ Build l'application
4. ✅ Déploie sur GitHub Pages (branche gh-pages)

**Usage :**
```bash
git push origin main  # Déclenche automatiquement le workflow
```

---

### ✅ `test-pr.yml` - Tests sur Pull Requests

**Quand :** À chaque Pull Request vers `main`

**Ce qu'il fait :**
1. ✅ Vérifie TypeScript
2. ✅ Vérifie ESLint
3. ✅ Teste le build (sans déployer)

**Usage :**
- Créer une Pull Request
- Le workflow se lance automatiquement
- Vérifie que votre code est bon avant de merger

---

## 📦 Workflows d'Origine (Excalidraw)

Ces workflows proviennent du repository officiel Excalidraw et sont conservés :

- `test.yml` - Tests unitaires
- `lint.yml` - Vérification du code
- `size-limit.yml` - Vérification de la taille du bundle
- `test-coverage-pr.yml` - Couverture de test sur PR
- `locales-coverage.yml` - Vérification des traductions
- `sentry-production.yml` - Monitoring d'erreurs
- `semantic-pr-title.yml` - Vérification des titres de PR
- `cancel.yml` - Annulation de workflows obsolètes
- `build-docker.yml` - Build d'image Docker
- `publish-docker.yml` - Publication Docker
- `autorelease-excalidraw.yml` - Release automatique npm

**Note :** La plupart de ces workflows ne s'appliqueront pas à votre fork car ils sont configurés pour le repo officiel.

---

## 🔧 Configuration

Pour voir la configuration détaillée de nos workflows custom, consultez :

👉 **[CI_CD_GUIDE.md](../CI_CD_GUIDE.md)** - Guide complet du CI/CD

---

## 🚀 Actions Rapides

### Déclencher manuellement un déploiement

1. Allez sur : https://github.com/pierrre2db/excalidraw/actions
2. Cliquez sur "Build and Deploy to GitHub Pages"
3. "Run workflow" > Sélectionnez "main" > "Run workflow"

### Voir l'historique des déploiements

1. Allez sur : https://github.com/pierrre2db/excalidraw/actions
2. Tous les workflows sont listés avec leur statut (✅ ❌ ⏳)

---

**Dernière mise à jour :** 2025-11-13
