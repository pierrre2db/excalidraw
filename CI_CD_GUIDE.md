# Guide CI/CD - Excalidraw Self-Hosted

## 🎯 Vue d'Ensemble

Le CI/CD (Continuous Integration / Continuous Deployment) est maintenant configuré pour votre projet Excalidraw.

**Ce que ça fait :** À chaque fois que vous faites `git push`, GitHub Actions va automatiquement :
1. ✅ Vérifier le code (TypeScript + ESLint)
2. 🏗️ Builder l'application
3. 🚀 Déployer sur GitHub Pages

## 🚀 Utilisation Simple

### Workflow Quotidien

```bash
# 1. Faire vos modifications dans le code
# (par exemple, modifier un fichier dans /excalidraw-app/)

# 2. Commit vos changements
git add .
git commit -m "Ajout d'une nouvelle fonctionnalité"

# 3. Push vers GitHub
git push origin main

# 4. ✨ C'est tout ! GitHub Actions fait le reste automatiquement
```

**Résultat :**
- GitHub Actions démarre automatiquement (2-5 minutes)
- Vous recevez une notification si ça échoue
- Si succès → Votre site est mis à jour sur https://pierrre2db.github.io/excalidraw/

---

## 📊 Suivre l'État du Déploiement

### Sur GitHub

1. **Allez sur votre repository :** https://github.com/pierrre2db/excalidraw
2. **Cliquez sur l'onglet "Actions"**
3. **Vous verrez tous les workflows :**
   - 🟢 Vert = Succès ✅
   - 🔴 Rouge = Échec ❌
   - 🟡 Jaune = En cours ⏳

### Exemple Visuel

```
Actions
├── Build and Deploy to GitHub Pages
│   ├── ✅ feat: add dark mode toggle (2 min ago)
│   ├── ✅ fix: typo in title (1 hour ago)
│   └── ❌ refactor: update colors (2 hours ago) [Échec TypeScript]
│
└── Test Pull Requests
    └── ✅ PR #1: Add new feature (5 min ago)
```

### Cliquer sur un Workflow

Vous pouvez cliquer sur n'importe quel workflow pour voir :
- Les logs détaillés de chaque étape
- Le temps d'exécution
- Les erreurs éventuelles

---

## 🔧 Workflows Configurés

### 1. Build and Deploy to GitHub Pages

**Fichier :** `.github/workflows/deploy.yml`

**Déclenché :**
- ✅ Automatiquement à chaque `git push` sur la branche `main`
- ✅ Manuellement depuis l'interface GitHub (bouton "Run workflow")

**Étapes :**
1. 📥 Récupère le code
2. 🔧 Installe Node.js 18
3. 📦 Installe les dépendances (avec cache)
4. 🔍 Vérifie TypeScript
5. ✨ Vérifie ESLint (warnings n'arrêtent pas le build)
6. 🏗️ Build l'application
7. 🚀 Déploie sur GitHub Pages (branche `gh-pages`)
8. ✅ Affiche message de succès

**Durée moyenne :** 3-5 minutes

### 2. Test Pull Requests

**Fichier :** `.github/workflows/test-pr.yml`

**Déclenché :**
- ✅ Automatiquement sur chaque Pull Request vers `main`

**Étapes :**
1. 📥 Récupère le code
2. 🔧 Installe Node.js 18
3. 📦 Installe les dépendances
4. 🔍 Vérifie TypeScript
5. ✨ Vérifie ESLint
6. 🏗️ Teste le build (sans déployer)
7. ✅ Affiche les résultats

**Durée moyenne :** 2-4 minutes

**Usage :** Vous assure que votre PR est bonne avant de merger

---

## 🎮 Déclencher Manuellement un Déploiement

### Depuis GitHub

1. Allez sur https://github.com/pierrre2db/excalidraw/actions
2. Cliquez sur "Build and Deploy to GitHub Pages"
3. Cliquez sur "Run workflow" (bouton en haut à droite)
4. Sélectionnez la branche `main`
5. Cliquez sur "Run workflow" (bouton vert)

### Depuis le Terminal (Ancien Mode)

Vous pouvez toujours déployer manuellement si besoin :

```bash
yarn build
npx gh-pages -d excalidraw-app/build
```

Mais avec CI/CD, c'est rarement nécessaire !

---

## ❌ En Cas d'Échec

### Le Workflow Échoue - Que Faire ?

#### 1. Identifier le Problème

Allez sur l'onglet **Actions** et cliquez sur le workflow qui a échoué (marqué en rouge 🔴).

#### 2. Lire les Logs

Cliquez sur l'étape qui a échoué pour voir les détails.

#### 3. Problèmes Courants

**Erreur TypeScript :**
```
❌ TypeScript Check
Error: Type 'string' is not assignable to type 'number'
```

**Solution :**
- Corrigez l'erreur TypeScript dans votre code
- Testez localement : `yarn test:typecheck`
- Commit et push à nouveau

**Erreur de Build :**
```
❌ Build Application
Error: Cannot find module 'xyz'
```

**Solution :**
- Vérifiez que le module est installé
- Testez localement : `yarn build`
- Si le module est manquant : `yarn add xyz`

**Erreur de Déploiement :**
```
❌ Deploy to GitHub Pages
Error: Permission denied
```

**Solution :**
- Vérifiez les permissions GitHub Actions dans les settings du repo
- Allez dans Settings > Actions > General
- "Workflow permissions" doit être sur "Read and write permissions"

---

## 🔔 Notifications

### Recevoir des Notifications par Email

Par défaut, GitHub vous envoie un email si un workflow échoue.

**Configuration :**
1. Allez dans vos paramètres GitHub : https://github.com/settings/notifications
2. Section "Actions"
3. Cochez "Send notifications for failed workflows"

### Badge de Statut dans README

Vous pouvez ajouter un badge qui montre l'état du dernier build :

```markdown
![Deploy Status](https://github.com/pierrre2db/excalidraw/actions/workflows/deploy.yml/badge.svg)
```

Résultat : ![Deploy Status](badge) (vert si succès, rouge si échec)

---

## 📈 Optimisations

### Cache des Dépendances

✅ **Déjà configuré !** Le workflow utilise `cache: 'yarn'` pour accélérer les builds.

**Avantages :**
- Premier build : ~3-5 minutes
- Builds suivants : ~2-3 minutes (grâce au cache)

### Variables d'Environnement (Optionnel)

Si vous avez besoin d'ajouter des variables d'environnement :

**Dans le workflow :**
```yaml
- name: Build Application
  run: yarn build
  env:
    NODE_ENV: production
    VITE_APP_CUSTOM_VAR: ${{ secrets.CUSTOM_VAR }}
```

**Ajouter un secret :**
1. Allez dans Settings > Secrets and variables > Actions
2. Cliquez sur "New repository secret"
3. Nom : `CUSTOM_VAR`
4. Valeur : votre valeur secrète
5. Sauvegardez

---

## 🛠️ Personnalisation Avancée

### Ajouter des Tests Unitaires

Si vous voulez lancer les tests unitaires avant le déploiement :

```yaml
# Ajoutez cette étape dans deploy.yml (avant le build)
- name: 🧪 Run Unit Tests
  run: yarn test:app --run
```

### Déployer sur une Branche Différente

Pour déployer sur une branche de développement :

```yaml
on:
  push:
    branches:
      - main
      - develop  # Ajoutez cette ligne
```

### Notifications Slack (Optionnel)

Pour recevoir des notifications sur Slack :

```yaml
- name: 💬 Notify Slack
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 🔒 Sécurité

### Permissions GitHub Actions

Les permissions sont configurées dans le workflow :

```yaml
permissions:
  contents: write  # Permet d'écrire sur gh-pages
```

**Important :**
- GitHub Actions n'a accès qu'au repository
- Pas d'accès à vos secrets personnels
- Token `GITHUB_TOKEN` est automatique et sécurisé

### Secrets

Ne jamais commiter de secrets dans le code !

**Mauvais :**
```javascript
const API_KEY = "abc123secret"  // ❌ Ne faites pas ça !
```

**Bon :**
```javascript
const API_KEY = process.env.VITE_APP_API_KEY  // ✅
// Puis ajoutez VITE_APP_API_KEY dans GitHub Secrets
```

---

## 📝 Checklist de Vérification

Après avoir configuré le CI/CD :

- [ ] Le workflow `deploy.yml` existe dans `.github/workflows/`
- [ ] Un push sur `main` déclenche le workflow
- [ ] Le workflow apparaît dans l'onglet Actions
- [ ] Le build réussit (badge vert ✅)
- [ ] Le site est mis à jour sur https://pierrre2db.github.io/excalidraw/
- [ ] Les erreurs TypeScript bloquent le déploiement
- [ ] Vous recevez des notifications en cas d'échec

---

## 🆘 Support

### Problèmes Courants

**"Workflow ne se déclenche pas"**
- Vérifiez que le fichier est dans `.github/workflows/`
- Vérifiez la syntaxe YAML (indentation importante !)
- Push vers la branche `main` (pas `master`)

**"Permission denied lors du déploiement"**
- Settings > Actions > General
- "Workflow permissions" → "Read and write permissions"
- Sauvegardez et relancez le workflow

**"Build prend trop de temps"**
- Normal pour le premier build (~5 min)
- Builds suivants plus rapides grâce au cache

### Logs Détaillés

Pour voir les logs détaillés :
1. Actions > Cliquez sur le workflow
2. Cliquez sur l'étape concernée
3. Développez la section

---

## 🎉 Avantages du CI/CD

### Avant CI/CD
```
Vous → Modifications
Vous → yarn build (2-3 min)
Vous → npx gh-pages (1 min)
Vous → Vérifier le site
Total : 4-5 minutes de votre temps
```

### Avec CI/CD
```
Vous → Modifications
Vous → git push
GitHub → Fait tout automatiquement pendant que vous faites autre chose
Vous → Recevez notification ✅
Total : 10 secondes de votre temps
```

**Gain de temps :** ~4-5 minutes par déploiement !

---

## 📚 Ressources

- **Documentation GitHub Actions :** https://docs.github.com/en/actions
- **Marketplace Actions :** https://github.com/marketplace?type=actions
- **Votre workflow :** https://github.com/pierrre2db/excalidraw/actions

---

**Dernière mise à jour :** 2025-11-13
**Statut :** ✅ CI/CD Configuré et Opérationnel
