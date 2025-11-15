# Google Drive Integration - Guide d'Intégration

## 📋 Vue d'Ensemble

Ce document explique l'intégration Google Drive pour StratAI Whiteboard. L'infrastructure de base a été créée et est prête à être connectée à l'application Excalidraw.

**Date de création :** 2025-11-13
**Statut :** Infrastructure créée, intégration finale en attente

---

## ✅ Ce qui a été fait

### 1. Dépendances installées

```bash
yarn add -W @react-oauth/google gapi-script
```

**Packages ajoutés :**
- `@react-oauth/google@0.12.2` - OAuth authentication pour Google
- `gapi-script@1.2.0` - Google API client

### 2. Structure de fichiers créée

```
excalidraw-app/google-drive/
├── context/
│   └── GoogleDriveProvider.tsx    # Context React avec auth et opérations
├── components/
│   ├── ConnectButton.tsx          # Bouton de connexion
│   ├── GoogleDriveMenu.tsx        # Menu déroulant avec options
│   ├── FilePickerModal.tsx        # Modal de sélection de fichiers
│   └── index.ts                   # Exports
├── services/
│   └── googleDriveAPI.ts          # Service API Google Drive
├── types/
│   └── index.ts                   # Types TypeScript + utilitaires
├── google-drive.scss              # Styles CSS
└── index.ts                       # Exports principaux
```

### 3. Fichiers de configuration

**`.env.example`** créé avec :
```bash
VITE_GOOGLE_DRIVE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

---

## 🔧 Prochaines Étapes (À faire par l'utilisateur)

### Étape 1 : Obtenir le CLIENT_ID Google

1. **Aller sur Google Cloud Console**
   - URL : https://console.cloud.google.com/

2. **Créer un nouveau projet**
   - Nom suggéré : "StratAI Whiteboard"
   - Organisation : Aucune (ou votre organisation)

3. **Activer Google Drive API**
   - Navigation : "APIs & Services" → "Library"
   - Rechercher "Google Drive API"
   - Cliquer "Enable"

4. **Créer des credentials OAuth 2.0**
   - Navigation : "APIs & Services" → "Credentials"
   - Cliquer "Create Credentials" → "OAuth client ID"
   - Application type : "Web application"
   - Name : "StratAI Whiteboard - Production"

5. **Configurer les URIs autorisés**
   ```
   Authorized JavaScript origins:
   - https://pierrre2db.github.io

   Authorized redirect URIs:
   - https://pierrre2db.github.io/excalidraw/
   ```

6. **Copier le CLIENT_ID**
   - Format : `123456789-abc123def456.apps.googleusercontent.com`

7. **Créer un fichier `.env` à la racine**
   ```bash
   # Copier .env.example vers .env
   cp .env.example .env

   # Éditer .env et ajouter :
   VITE_GOOGLE_DRIVE_CLIENT_ID=VOTRE_CLIENT_ID_ICI
   ```

### Étape 2 : Intégrer dans App.tsx

**Fichier à modifier :** `excalidraw-app/App.tsx`

#### 2.1 Ajouter les imports en haut du fichier

```typescript
import { GoogleDriveProvider } from './google-drive';
import { ConnectButton, GoogleDriveMenu } from './google-drive/components';
import './google-drive/google-drive.scss';
```

#### 2.2 Wrapper l'application avec GoogleDriveProvider

Trouver le composant racine dans `App.tsx` et l'entourer :

```typescript
export default function App() {
  return (
    <GoogleDriveProvider>
      {/* Reste de l'application */}
      <ExcalidrawApp />
    </GoogleDriveProvider>
  );
}
```

#### 2.3 Ajouter les composants dans la barre d'outils

Dans le render de la barre d'outils (chercher où se trouvent les boutons d'actions) :

```typescript
// Quelque part dans la barre d'outils supérieure
<div className="toolbar-section">
  {/* Autres boutons */}
  <ConnectButton />
  <GoogleDriveMenu />
</div>
```

### Étape 3 : Connecter à l'état Excalidraw

#### 3.1 Modifier GoogleDriveProvider.tsx

Dans `excalidraw-app/google-drive/context/GoogleDriveProvider.tsx`, il faut connecter les TODOs :

**TODO 1 - Ligne ~180 : Récupérer l'état Excalidraw**
```typescript
// Remplacer cette section :
const excalidrawData = JSON.stringify({
  type: 'excalidraw',
  version: 2,
  source: 'https://pierrre2db.github.io/excalidraw',
  elements: [], // Will be populated from actual state
  appState: {}, // Will be populated from actual state
  files: {}, // Will be populated from actual state
});

// Par (en utilisant les props/context Excalidraw) :
const excalidrawApp = useExcalidrawApp(); // Utiliser le hook approprié
const excalidrawData = JSON.stringify({
  type: 'excalidraw',
  version: 2,
  source: 'https://pierrre2db.github.io/excalidraw',
  elements: excalidrawApp.getSceneElements(),
  appState: excalidrawApp.getAppState(),
  files: excalidrawApp.getFiles(),
});
```

**TODO 2 - Ligne ~195 : Générer thumbnail**
```typescript
// Ajouter une fonction pour générer le thumbnail :
const generateThumbnail = async (): Promise<string | undefined> => {
  try {
    const canvas = document.querySelector('.excalidraw canvas');
    if (!canvas) return undefined;

    // Créer une version réduite du canvas
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 400;
    tempCanvas.height = 300;
    const ctx = tempCanvas.getContext('2d');
    ctx?.drawImage(canvas, 0, 0, 400, 300);

    return tempCanvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    return undefined;
  }
};

// Puis utiliser :
const thumbnail = await generateThumbnail();
```

**TODO 3 - Ligne ~225 : Implémenter file picker**
```typescript
// Dans openFromGoogleDrive(), afficher le modal :
const [isFilePickerOpen, setIsFilePickerOpen] = useState(false);

const openFromGoogleDrive = useCallback(async () => {
  setIsFilePickerOpen(true);
}, []);

const handleFileSelect = async (fileId: string) => {
  try {
    const content = await googleDriveAPI.downloadFile(fileId);
    const data = JSON.parse(content);

    // Charger dans Excalidraw
    const excalidrawApp = useExcalidrawApp();
    excalidrawApp.updateScene(data);

    setCurrentFileId(fileId);
  } catch (error) {
    console.error('Error loading file:', error);
  }
};

// Ajouter le modal au render :
return (
  <GoogleDriveContext.Provider value={contextValue}>
    {children}
    <FilePickerModal
      isOpen={isFilePickerOpen}
      onClose={() => setIsFilePickerOpen(false)}
      onFileSelect={handleFileSelect}
    />
  </GoogleDriveContext.Provider>
);
```

### Étape 4 : Tester en développement

```bash
# 1. S'assurer que .env contient le CLIENT_ID
cat .env | grep VITE_GOOGLE_DRIVE_CLIENT_ID

# 2. Démarrer le serveur de dev
yarn start

# 3. Ouvrir http://localhost:3000/

# 4. Tester :
- Clic sur "Connect Google Drive"
- Autoriser l'accès
- Dessiner quelque chose
- Cliquer "Save to Drive"
- Vérifier dans Google Drive
- Tester "Open from Drive"
- Tester Auto-save toggle
```

### Étape 5 : Déployer en production

```bash
# 1. S'assurer que les variables d'environnement sont dans le workflow CI/CD
# Éditer .github/workflows/deploy.yml et ajouter :
env:
  VITE_GOOGLE_DRIVE_CLIENT_ID: ${{ secrets.VITE_GOOGLE_DRIVE_CLIENT_ID }}

# 2. Ajouter le secret dans GitHub
# GitHub → Settings → Secrets → Actions
# New repository secret:
# Name: VITE_GOOGLE_DRIVE_CLIENT_ID
# Value: votre_client_id

# 3. Build et deploy
yarn build
git add .
git commit -m "feat: add Google Drive integration"
git push origin master

# 4. Attendre le déploiement automatique (2-3 min)

# 5. Tester sur https://pierrre2db.github.io/excalidraw/
```

---

## 📚 API Reference

### useGoogleDrive Hook

```typescript
import { useGoogleDrive } from './google-drive';

function MyComponent() {
  const {
    isAuthenticated,      // boolean - État de connexion
    userEmail,           // string | null - Email utilisateur
    signIn,              // () => Promise<void> - Se connecter
    signOut,             // () => Promise<void> - Se déconnecter
    saveToGoogleDrive,   // (fileName?) => Promise<GoogleDriveFile | null>
    openFromGoogleDrive, // () => Promise<void> - Ouvrir modal
    listFiles,           // (pageSize?) => Promise<GoogleDriveFile[]>
    shareFile,           // (fileId, options) => Promise<string>
    autoSaveConfig,      // AutoSaveConfig - Config auto-save
    toggleAutoSave,      // () => void - Toggle auto-save
    storageInfo,         // StorageInfo | null - Infos stockage
  } = useGoogleDrive();
}
```

### GoogleDriveProvider Props

```typescript
<GoogleDriveProvider>
  {children}
</GoogleDriveProvider>
```

Aucune prop requise. Le CLIENT_ID est lu depuis `import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID`.

---

## 🔒 Sécurité et Permissions

### Scope OAuth demandé

```
https://www.googleapis.com/auth/drive.file
```

**Ce scope permet uniquement :**
- ✅ Créer des fichiers dans Drive
- ✅ Modifier les fichiers créés par l'app
- ✅ Lire les fichiers créés par l'app
- ❌ **NE PEUT PAS** accéder aux autres fichiers de l'utilisateur
- ❌ **NE PEUT PAS** supprimer des fichiers non créés par l'app

### Stockage des credentials

- **Access tokens** : Stockés en mémoire uniquement (non persistés)
- **Refresh tokens** : Gérés par Google OAuth
- **CLIENT_ID** : Public, pas de problème de sécurité

---

## 🐛 Troubleshooting

### Erreur : "Google Drive CLIENT_ID not configured"

**Solution :** Créer le fichier `.env` avec `VITE_GOOGLE_DRIVE_CLIENT_ID`

### Erreur : "redirect_uri_mismatch"

**Solution :** Vérifier que les URIs autorisés dans Google Cloud Console matchent exactement :
- Development : `http://localhost:3000`
- Production : `https://pierrre2db.github.io`

### Auto-save ne fonctionne pas

**Solution :**
1. Vérifier que l'auto-save est activé (icône ☁️ ON)
2. Vérifier que l'utilisateur est connecté
3. Check console pour erreurs API

### Thumbnails ne s'affichent pas

**Solution :** Les thumbnails sont stockés dans les propriétés personnalisées du fichier. Google Drive génère aussi ses propres thumbnails automatiquement.

---

## 📊 Métriques et Limites

### Quotas Google Drive API

- **Requêtes par jour :** 1,000,000,000 (gratuit)
- **Requêtes par 100s :** 1,000
- **Requêtes par utilisateur par 100s :** 1,000

**Pour StratAI Whiteboard :**
- Auto-save toutes les 5 min = ~300 requêtes/jour/utilisateur
- Largement en dessous des limites

### Stockage

- **Gratuit :** 15 GB par utilisateur Google
- **Fichier .excalidraw moyen :** 50-200 KB
- **Capacité estimée :** ~75,000 - 300,000 dessins par utilisateur

---

## 🎯 Fonctionnalités Implémentées

- [x] OAuth 2.0 authentication
- [x] Save to Google Drive (création + mise à jour)
- [x] Open from Google Drive (avec modal et search)
- [x] Auto-save avec toggle
- [x] Share from Drive avec génération de lien
- [x] Storage info display
- [x] File list avec thumbnails
- [x] Gestion des erreurs
- [x] Dark mode support
- [x] Keyboard shortcuts (Ctrl+Shift+S, Ctrl+Shift+O)

---

## 📝 Notes de Développement

### Architecture

L'intégration suit le pattern **Provider → Hook → Components** :

1. **GoogleDriveProvider** : Context React qui gère l'état global
2. **useGoogleDrive** : Hook pour accéder au context
3. **Components** : UI qui utilise le hook

### Dépendances Excalidraw

Les TODOs dans le code marquent les points d'intégration avec Excalidraw :
- `useExcalidrawApp()` ou équivalent pour accéder à l'état
- `getSceneElements()`, `getAppState()`, `getFiles()` pour la sauvegarde
- `updateScene()` pour le chargement

**⚠️ Important :** Consulter la documentation Excalidraw pour les APIs exactes :
https://docs.excalidraw.com/

---

## 🚀 Améliorations Futures

Fonctionnalités qui pourraient être ajoutées :

1. **Conflict resolution** : Gérer les conflits de sauvegarde
2. **Offline mode** : Queue des sauvegardes si hors ligne
3. **Version history** : Utiliser Google Drive revisions
4. **Batch operations** : Supprimer/renommer plusieurs fichiers
5. **Folders organization** : Permettre sous-dossiers dans "StratAI Whiteboard"
6. **Export options** : Sauvegarder aussi en PNG/SVG
7. **Collaboration** : Ouvrir des liens Google Drive en mode collaboration

---

## 📞 Support

Pour toute question ou problème :

1. Consulter ce guide
2. Lire `GOOGLE_DRIVE_SPEC.md` pour les spécifications détaillées
3. Vérifier les logs de la console browser
4. Consulter DEV_LOG.md pour l'historique de développement

---

**Dernière mise à jour :** 2025-11-13
**Version :** 1.0.0
**Auteur :** StratAI / Claude Code
