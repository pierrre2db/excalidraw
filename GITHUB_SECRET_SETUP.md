# Configuration du Secret GitHub pour Google Drive

Ce guide explique comment configurer le `VITE_GOOGLE_DRIVE_CLIENT_ID` dans GitHub Secrets pour que l'intégration Google Drive fonctionne en production.

---

## Votre CLIENT_ID

```
476861044300-8u976pf8pri5jdaa7l7sc3gc2do5vhto.apps.googleusercontent.com
```

**⚠️ Copiez cette valeur, vous en aurez besoin à l'étape 4**

---

## Instructions (5 étapes)

### Étape 1: Accéder aux Settings du repository

1. Allez sur https://github.com/pierrre2db/excalidraw
2. Cliquez sur l'onglet **"Settings"** (en haut à droite)

### Étape 2: Accéder aux Secrets

1. Dans le menu latéral gauche, cliquez sur **"Secrets and variables"**
2. Puis cliquez sur **"Actions"**

### Étape 3: Ajouter un nouveau secret

1. Cliquez sur le bouton **"New repository secret"** (en haut à droite)

### Étape 4: Configurer le secret

Remplissez les champs suivants:

**Name:**
```
VITE_GOOGLE_DRIVE_CLIENT_ID
```

**Value:**
```
476861044300-8u976pf8pri5jdaa7l7sc3gc2do5vhto.apps.googleusercontent.com
```

### Étape 5: Sauvegarder

1. Cliquez sur **"Add secret"**
2. Le secret est maintenant configuré ✅

---

## Vérification

Une fois le secret ajouté, vous devriez voir dans la liste des secrets:

```
VITE_GOOGLE_DRIVE_CLIENT_ID    Updated now
```

---

## Utilisation

Le workflow GitHub Actions (`.github/workflows/deploy.yml`) utilise maintenant automatiquement ce secret lors du build:

```yaml
- name: 🏗️ Build Application
  run: yarn build
  env:
    NODE_ENV: production
    VITE_GOOGLE_DRIVE_CLIENT_ID: ${{ secrets.VITE_GOOGLE_DRIVE_CLIENT_ID }}
```

---

## Redéploiement

Après avoir ajouté le secret:

**Option 1: Déclencher manuellement**
1. Allez dans l'onglet **"Actions"**
2. Sélectionnez le workflow **"Build and Deploy to GitHub Pages"**
3. Cliquez sur **"Run workflow"**
4. Attendez 3-5 minutes

**Option 2: Push un nouveau commit**
```bash
git commit --allow-empty -m "chore: trigger rebuild with Google Drive secret"
git push origin master
```

---

## Test en production

Une fois déployé, testez sur:

https://pierrre2db.github.io/excalidraw/

**Vérifications:**
1. Le bouton "Connect to Google Drive" est visible
2. La connexion Google fonctionne
3. Vous pouvez sauvegarder et charger des fichiers

---

## Sécurité

✅ **Le secret est sécurisé:**
- Il n'apparaît jamais dans les logs GitHub Actions
- Il n'est pas visible dans le code source
- Seuls les workflows GitHub Actions peuvent y accéder

⚠️ **Important:**
- Ne commitez JAMAIS le CLIENT_ID en dur dans le code
- Le fichier `.env` est dans `.gitignore` (ne sera pas publié)
- Utilisez toujours `${{ secrets.VITE_GOOGLE_DRIVE_CLIENT_ID }}`

---

## Troubleshooting

### Le secret n'apparaît pas dans la liste

- Vérifiez que vous êtes bien sur le repository **pierrre2db/excalidraw**
- Vérifiez que vous avez les permissions admin sur le repository

### Le build échoue après ajout du secret

- Vérifiez que le nom du secret est exactement `VITE_GOOGLE_DRIVE_CLIENT_ID` (sensible à la casse)
- Vérifiez que vous avez bien copié tout le CLIENT_ID (avec `.apps.googleusercontent.com`)

### Google Drive ne fonctionne pas en production

1. Vérifiez que le secret est bien configuré
2. Ouvrez la console du navigateur (F12) sur https://pierrre2db.github.io/excalidraw/
3. Cherchez des erreurs liées à Google API
4. Vérifiez que l'URL de production est autorisée dans Google Cloud Console

---

**Dernière mise à jour:** 2025-11-15
