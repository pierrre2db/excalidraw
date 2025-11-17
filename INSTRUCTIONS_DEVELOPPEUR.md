# Instructions pour le Développeur - Déploiement Excalidraw avec Google Drive

**Version:** 1.0
**Date:** 15 Novembre 2025
**Projet:** Excalidraw Self-Hosted avec intégration Google Drive
**Repository:** https://github.com/pierrre2db/excalidraw

---

## 📋 Résumé Exécutif

Ce projet est une version auto-hébergée d'Excalidraw avec une **intégration Google Drive complète** permettant de:
- Sauvegarder des dessins dans Google Drive
- Charger des dessins depuis Google Drive
- Créer des versions avec timestamps
- Auto-save toutes les 5 minutes

**Status actuel:** Le code est prêt et déployé. Il ne manque que la configuration du secret GitHub pour activer Google Drive en production.

---

## 🎯 Votre Mission

1. Configurer le secret GitHub `VITE_GOOGLE_DRIVE_CLIENT_ID`
2. Vérifier le déploiement automatique
3. Tester Google Drive en production
4. (Optionnel) Reconfigurer le projet Google Cloud si nécessaire

**Temps estimé:** 10-15 minutes

---

## 📦 Prérequis

✅ Le projet est déjà:
- Cloné et configuré localement
- Publié sur GitHub: https://github.com/pierrre2db/excalidraw
- Configuré avec GitHub Actions (CI/CD automatique)
- Testé et fonctionnel en local

✅ Vous avez accès à:
- Le repository GitHub (droits admin)
- Le projet Google Cloud Console (si reconfiguration nécessaire)

---

## 🚀 ÉTAPE 1: Configurer le Secret GitHub (CRITIQUE)

### Pourquoi c'est nécessaire

Le CLIENT_ID Google Drive est stocké dans une variable d'environnement `VITE_GOOGLE_DRIVE_CLIENT_ID`. En local, il est dans le fichier `.env` (qui n'est PAS commité pour des raisons de sécurité). En production, GitHub Actions a besoin de cette valeur pour builder l'application.

### Actions à effectuer

#### 1.1. Accéder aux Secrets du Repository

**URL directe:** https://github.com/pierrre2db/excalidraw/settings/secrets/actions

**OU**

1. Allez sur https://github.com/pierrre2db/excalidraw
2. Cliquez sur **"Settings"** (onglet en haut)
3. Menu latéral gauche: **"Secrets and variables"** → **"Actions"**

#### 1.2. Créer le Secret

1. Cliquez sur le bouton vert **"New repository secret"**

2. Remplissez exactement:

   **Name (copier exactement):**
   ```
   VITE_GOOGLE_DRIVE_CLIENT_ID
   ```

   **Secret (copier exactement):**
   ```
   476861044300-8u976pf8pri5jdaa7l7sc3gc2do5vhto.apps.googleusercontent.com
   ```

3. Cliquez sur **"Add secret"**

#### 1.3. Vérifier

Vous devriez voir dans la liste des secrets:
```
VITE_GOOGLE_DRIVE_CLIENT_ID    Updated now
```

✅ **Secret configuré!**

---

## 🔄 ÉTAPE 2: Déclencher le Déploiement

Le dernier commit (`103c54c5`) a été poussé et attend que vous ajoutiez le secret.

### Option A: Déploiement Automatique (Recommandé)

Le workflow GitHub Actions se déclenchera automatiquement au prochain push. Comme un commit vient d'être poussé, le build est peut-être déjà en cours.

**Vérifier:**
1. Allez sur https://github.com/pierrre2db/excalidraw/actions
2. Vous devriez voir:
   ```
   Build and Deploy to GitHub Pages
   chore: trigger rebuild with Google Drive secret configured
   🟡 In progress  OU  ✅ Success
   ```

### Option B: Déploiement Manuel

Si vous voulez forcer un nouveau build immédiatement:

**Via l'interface GitHub:**
1. Allez sur https://github.com/pierrre2db/excalidraw/actions
2. Sélectionnez **"Build and Deploy to GitHub Pages"**
3. Cliquez sur **"Run workflow"**
4. Sélectionnez la branche `master`
5. Cliquez sur **"Run workflow"** (bouton vert)

**Via la ligne de commande (si vous avez accès au code local):**
```bash
cd /path/to/excalidraw
git commit --allow-empty -m "chore: trigger deployment"
git push origin master
```

---

## ⏱️ ÉTAPE 3: Attendre le Déploiement (3-5 minutes)

Le workflow GitHub Actions va:
1. ✅ Installer les dépendances (yarn install)
2. ✅ Vérifier TypeScript (yarn test:typecheck)
3. ✅ Vérifier ESLint (yarn test:code)
4. ✅ Builder l'application avec le CLIENT_ID
5. ✅ Déployer sur la branche `gh-pages`

**Suivre en temps réel:**
https://github.com/pierrre2db/excalidraw/actions

**Attendre que le statut soit:** ✅ **Success** (vert)

---

## 🧪 ÉTAPE 4: Tester en Production

Une fois le build terminé avec succès:

### 4.1. Accéder au Site

**URL de production:**
```
https://pierrre2db.github.io/excalidraw/
```

**Note:** Attendez 1-2 minutes après le déploiement pour que GitHub Pages propage les changements.

### 4.2. Tests Fonctionnels

#### Test 1: Connexion Google Drive

1. Sur https://pierrre2db.github.io/excalidraw/
2. Cliquez sur le bouton **"Connect to Google Drive"** (en haut à droite)
3. Une popup Google s'ouvre
4. Sélectionnez un compte Google
5. Autorisez l'accès à Google Drive
6. La popup se ferme
7. **Vérification:** Votre email apparaît à la place du bouton

✅ **Si ça fonctionne:** Google Drive est correctement configuré

❌ **Si erreur:** Voir section Troubleshooting ci-dessous

#### Test 2: Sauvegarde

1. Dessinez quelque chose sur le canvas
2. Cliquez sur votre email (menu Google Drive s'ouvre)
3. Cliquez sur **"Save"**
4. **Vérification:** Aucune erreur dans la console (F12)
5. Allez sur https://drive.google.com
6. Cherchez le dossier **"Excalidraw"**
7. **Vérification:** Votre fichier est là (format: `VotreNom_2025_11_15.excalidraw`)

✅ **Si ça fonctionne:** La sauvegarde fonctionne

#### Test 3: Chargement

1. Menu Google Drive → **"Open from Drive"**
2. Un modal s'ouvre avec la liste de vos fichiers
3. Cliquez sur le fichier que vous venez de créer
4. **Vérification:** Le dessin se charge sur le canvas

✅ **Si ça fonctionne:** Le chargement fonctionne

#### Test 4: Auto-save

1. Modifiez le dessin
2. Attendez 5 minutes
3. Vérifiez dans Google Drive que le fichier a été mis à jour

✅ **Si ça fonctionne:** L'auto-save fonctionne

---

## 🐛 ÉTAPE 5: Troubleshooting

### Problème: "Connect to Google Drive" ne s'affiche pas

**Cause:** Le secret n'a pas été utilisé lors du build

**Solution:**
1. Vérifiez que le secret est bien configuré sur GitHub
2. Vérifiez que le nom est exactement `VITE_GOOGLE_DRIVE_CLIENT_ID`
3. Déclenchez un nouveau build (voir Étape 2, Option B)

### Problème: Erreur "CLIENT_ID missing" dans la console

**Cause:** Le build n'a pas utilisé le secret

**Solution:**
1. Ouvrez le log du workflow GitHub Actions
2. Cherchez l'étape "Build Application"
3. Vérifiez que `VITE_GOOGLE_DRIVE_CLIENT_ID` apparaît dans les variables d'environnement
4. Si absent, le workflow n'a pas été mis à jour correctement

**Fix:**
```bash
# Vérifier que le workflow est à jour
cat .github/workflows/deploy.yml | grep VITE_GOOGLE_DRIVE_CLIENT_ID
```

Devrait afficher:
```yaml
VITE_GOOGLE_DRIVE_CLIENT_ID: ${{ secrets.VITE_GOOGLE_DRIVE_CLIENT_ID }}
```

### Problème: "Unauthorized" lors de la connexion Google

**Cause:** L'URL de production n'est pas autorisée dans Google Cloud Console

**Solution:**

1. Allez sur https://console.cloud.google.com/
2. Sélectionnez le projet (probablement nommé "Excalidraw")
3. Menu → **"APIs & Services"** → **"Credentials"**
4. Cliquez sur le CLIENT_ID OAuth 2.0
5. Section **"Authorized JavaScript origins"**, ajoutez:
   ```
   https://pierrre2db.github.io
   ```
6. Section **"Authorized redirect URIs"**, ajoutez:
   ```
   https://pierrre2db.github.io/excalidraw/
   ```
7. Cliquez **"Save"**
8. Attendez 5 minutes (propagation Google)
9. Testez à nouveau

### Problème: Build GitHub Actions échoue

**Vérifications:**

1. Allez sur https://github.com/pierrre2db/excalidraw/actions
2. Cliquez sur le workflow qui a échoué
3. Lisez les logs d'erreur

**Erreurs courantes:**

- **TypeScript errors:** Le code a des erreurs TypeScript
  - Solution: Exécutez `yarn test:typecheck` localement et corrigez

- **Build failed:** Dépendances manquantes ou erreur de compilation
  - Solution: Vérifiez les logs, souvent un package npm manquant

- **Deploy failed:** Permissions GitHub Pages
  - Solution: Vérifiez que GitHub Pages est activé dans Settings → Pages

### Problème: Le site affiche une version ancienne

**Cause:** Cache du navigateur ou propagation GitHub Pages

**Solution:**
1. Effacez le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
2. Attendez 2-3 minutes pour la propagation GitHub Pages
3. Vérifiez l'heure du dernier commit sur gh-pages:
   ```bash
   git fetch origin gh-pages
   git log origin/gh-pages -1 --format="%ai %s"
   ```

---

## 📚 ÉTAPE 6: Documentation

Une fois tout testé et fonctionnel, consultez:

### Documentation Utilisateur
- **`MANUEL_UTILISATEUR.md`** - Guide complet (1000+ lignes)
- **`GUIDE_RAPIDE.md`** - Référence rapide

### Documentation Technique
- **`CLAUDE.md`** - Architecture du projet
- **`TODO.md`** - État des tâches
- **`GOOGLE_DRIVE_SPEC.md`** - Spécifications Google Drive
- **`GOOGLE_DRIVE_INTEGRATION_GUIDE.md`** - Guide d'intégration

### Fichiers de Code Importants
- **`excalidraw-app/google-drive/`** - Tout le code Google Drive (~2000 lignes)
- **`excalidraw-app/ExcalidrawAPIContext.tsx`** - Contexte API Excalidraw
- **`excalidraw-app/App.tsx`** - Point d'entrée (providers configurés)

---

## 🔧 ÉTAPE 7: Configuration Google Cloud (Si Nécessaire)

**Note:** Le CLIENT_ID actuel devrait fonctionner. Cette section est pour reconfigurer si nécessaire.

### 7.1. Créer un Nouveau Projet Google Cloud

1. Allez sur https://console.cloud.google.com/
2. Créez un nouveau projet (ou sélectionnez le projet existant "Excalidraw")
3. Nom suggéré: `Excalidraw Self-Hosted`

### 7.2. Activer l'API Google Drive

1. Menu → **"APIs & Services"** → **"Library"**
2. Cherchez **"Google Drive API"**
3. Cliquez **"Enable"**

### 7.3. Configurer OAuth 2.0

1. Menu → **"APIs & Services"** → **"Credentials"**
2. Cliquez **"Create Credentials"** → **"OAuth client ID"**
3. Si demandé, configurez l'écran de consentement:
   - Type: External
   - Nom: `Excalidraw Self-Hosted`
   - Email: Votre email
   - Scopes: `../auth/drive.file` (uniquement)
4. Type d'application: **"Web application"**
5. Nom: `Excalidraw Production`
6. **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   https://pierrre2db.github.io
   ```
7. **Authorized redirect URIs:**
   ```
   http://localhost:3000/excalidraw/
   https://pierrre2db.github.io/excalidraw/
   ```
8. Cliquez **"Create"**
9. **Copiez le CLIENT_ID** (format: `XXXXXXXXX.apps.googleusercontent.com`)

### 7.4. Mettre à Jour le Secret GitHub

1. Allez sur https://github.com/pierrre2db/excalidraw/settings/secrets/actions
2. Cliquez sur `VITE_GOOGLE_DRIVE_CLIENT_ID`
3. Cliquez **"Update secret"**
4. Collez le nouveau CLIENT_ID
5. Cliquez **"Update secret"**

### 7.5. Mettre à Jour le Fichier Local

```bash
cd /path/to/excalidraw
nano .env  # ou vim, code, etc.
```

Modifiez:
```env
VITE_GOOGLE_DRIVE_CLIENT_ID=votre_nouveau_client_id.apps.googleusercontent.com
```

### 7.6. Redéployer

```bash
git commit --allow-empty -m "chore: update Google CLIENT_ID"
git push origin master
```

---

## 📊 Checklist Finale

Avant de considérer le déploiement comme complet, vérifiez:

- [ ] Secret `VITE_GOOGLE_DRIVE_CLIENT_ID` configuré sur GitHub
- [ ] Build GitHub Actions réussi (statut ✅ vert)
- [ ] Site accessible sur https://pierrre2db.github.io/excalidraw/
- [ ] Bouton "Connect to Google Drive" visible
- [ ] Connexion Google fonctionne
- [ ] Sauvegarde fonctionne (fichier créé dans Google Drive)
- [ ] Chargement fonctionne (fichier restauré sur canvas)
- [ ] Auto-save fonctionne (fichier mis à jour après 5 min)
- [ ] Aucune erreur dans la console navigateur (F12)
- [ ] Documentation utilisateur lue et comprise

---

## 🆘 Support

### En cas de blocage

1. **Console navigateur (F12):** Cherchez les erreurs JavaScript
2. **Logs GitHub Actions:** Vérifiez les erreurs de build
3. **Google Cloud Console:** Vérifiez que l'API est activée

### Logs à collecter si problème

```bash
# Version du site
curl -I https://pierrre2db.github.io/excalidraw/

# Dernier commit déployé
git log origin/gh-pages -1

# Configuration workflow
cat .github/workflows/deploy.yml | grep -A5 "Build Application"

# Variables d'environnement locales
cat .env | grep VITE_GOOGLE_DRIVE_CLIENT_ID
```

### Informations utiles

- **Repository:** https://github.com/pierrre2db/excalidraw
- **Site production:** https://pierrre2db.github.io/excalidraw/
- **GitHub Actions:** https://github.com/pierrre2db/excalidraw/actions
- **Google Cloud Console:** https://console.cloud.google.com/

---

## 🎯 Résumé TL;DR

**Pour activer Google Drive en production:**

1. Allez sur https://github.com/pierrre2db/excalidraw/settings/secrets/actions/new
2. Name: `VITE_GOOGLE_DRIVE_CLIENT_ID`
3. Secret: `476861044300-8u976pf8pri5jdaa7l7sc3gc2do5vhto.apps.googleusercontent.com`
4. Add secret
5. Attendez 5 minutes
6. Testez sur https://pierrre2db.github.io/excalidraw/

**C'est tout!** 🚀

---

**Dernière mise à jour:** 15 Novembre 2025
**Version:** 1.0
**Contact:** Voir repository GitHub pour issues
