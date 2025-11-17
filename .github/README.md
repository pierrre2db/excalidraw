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

## 🔑 Configuration Google Drive OAuth

### Prérequis

Pour utiliser l'intégration Google Drive dans l'application Excalidraw déployée, vous devez configurer un Client OAuth 2.0 dans Google Cloud Console.

### Étapes de configuration

#### 1. Créer un projet Google Cloud (si nécessaire)

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google Drive pour votre projet

#### 2. Configurer le Client OAuth 2.0

1. Allez dans **API & Services** > **Identifiants**
2. Cliquez sur **Créer des identifiants** > **ID client OAuth 2.0**
3. Sélectionnez le type d'application : **Application Web**
4. Donnez un nom à votre client (ex: "Excalidraw GitHub Pages")
5. Ajoutez l'origine JavaScript autorisée :
   ```
   https://pierrre2db.github.io
   ```
6. Cliquez sur **Créer**
7. Notez le **Client ID** généré (format: `XXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com`)

#### 3. Configurer le secret GitHub

1. Allez dans les **Settings** de votre repository GitHub
2. Sélectionnez **Secrets and variables** > **Actions**
3. Créez ou mettez à jour le secret `VITE_GOOGLE_DRIVE_CLIENT_ID` avec votre Client ID

#### 4. Déclencher un nouveau déploiement

- Poussez un nouveau commit sur `main`, ou
- Déclenchez manuellement le workflow "Build and Deploy to GitHub Pages"

### Vérification

1. Accédez à votre application déployée : `https://pierrre2db.github.io/excalidraw/`
2. Cliquez sur le bouton **Connect Google Drive** en haut à droite
3. Une popup d'authentification Google devrait s'ouvrir
4. Autorisez l'accès à Google Drive
5. Vous pouvez maintenant sauvegarder et charger vos dessins depuis Google Drive

### ⚠️ Important

- Le Client ID doit être configuré avec l'origine **exacte** : `https://pierrre2db.github.io` (sans sous-chemin)
- L'application demande uniquement l'accès aux fichiers créés par elle-même (scope `drive.file`)
- Pour les tests en local, vous devrez ajouter `http://localhost:3000` aux origines autorisées

**Dernière mise à jour :** 2025-11-13
