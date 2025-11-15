# Google Drive Integration - Spécifications Techniques

## 🎯 Vue d'Ensemble

Intégration Google Drive pour StratAI Whiteboard permettant la sauvegarde, le chargement et le partage de dessins directement depuis/vers Google Drive.

**Date :** 2025-11-13
**Statut :** Spécification approuvée, prêt pour implémentation
**Effort estimé :** 4-5 jours
**Coût :** 0€ (API gratuite)

---

## ✅ Fonctionnalités Décidées

### 1. Auto-Save
- ✅ **Activé par défaut**
- ✅ **Icône de toggle visible** dans l'interface
- ✅ Intervalle : 5 minutes (configurable)
- ✅ Indication visuelle de l'état (ON/OFF)
- ✅ Sauvegarde seulement si modifications détectées

**Icône dans la barre supérieure :**
```
[☁️ Auto-save ON]  → Cliquable pour toggle
[☁️ Auto-save OFF] → État désactivé
```

---

### 2. Nommage Automatique
- ✅ **Format :** `StratAI-Drawing-YYYY-MM-DD-HHhMM.excalidraw`
- ✅ **Exemple :** `StratAI-Drawing-2025-11-13-16h45.excalidraw`
- ✅ Timestamp pour éviter les collisions
- ✅ Pas de prompt utilisateur (automatique)
- ✅ Option "Rename" disponible après sauvegarde

**Génération du nom :**
```javascript
const timestamp = new Date().toISOString().split('.')[0].replace('T', '-').replace(/:/g, 'h');
const filename = `StratAI-Drawing-${timestamp}.excalidraw`;
// Résultat: StratAI-Drawing-2025-11-13-16h45.excalidraw
```

---

### 3. Structure de Dossier
- ✅ **Un seul dossier :** "StratAI Whiteboard"
- ✅ Créé automatiquement au premier save
- ✅ Tous les dessins au même niveau (pas de sous-dossiers)
- ✅ Facile à retrouver dans Drive

**Structure dans Drive :**
```
Google Drive (Root)
└─ StratAI Whiteboard/
    ├─ StratAI-Drawing-2025-11-13-16h45.excalidraw
    ├─ StratAI-Drawing-2025-11-13-14h30.excalidraw
    ├─ StratAI-Drawing-2025-11-12-10h15.excalidraw
    └─ ...
```

---

### 4. Partage depuis Drive
- ✅ **Bouton "Share from Drive"**
- ✅ Génère un lien de partage Google Drive
- ✅ Options de partage :
  - Anyone with the link (lecture seule)
  - Anyone with the link (édition)
  - Specific people
- ✅ Copie automatique du lien dans le presse-papiers
- ✅ Message : "✅ Share link copied to clipboard"

**Flow de partage :**
```
1. Fichier ouvert dans StratAI
2. File > Share from Drive
3. Modal avec options :
   ┌─────────────────────────────────────┐
   │  Share Drawing                      │
   ├─────────────────────────────────────┤
   │  🔗 Share link:                     │
   │  https://drive.google.com/...       │
   │  [Copy Link]                        │
   │                                     │
   │  Access:                            │
   │  ○ View only                        │
   │  ● Can edit                         │
   │                                     │
   │  [Create Share Link] [Cancel]      │
   └─────────────────────────────────────┘
4. Clic "Create Share Link"
5. Lien copié → Notification
6. Partage via Slack/Email/etc.
```

---

### 5. Thumbnails
- ✅ **Générer des miniatures PNG**
- ✅ Taille : 400x300px
- ✅ Inclus dans les metadata du fichier Drive
- ✅ Affichage dans la liste "Open from Drive"
- ✅ Rend la liste plus visuelle et professionnelle

**Impact :**
- +50 KB par fichier environ
- Meilleure UX dans la liste
- Aperçu visuel rapide

---

## 🎨 Interface Utilisateur

### Barre Supérieure

**État déconnecté :**
```
[📁 Connect Google Drive]
```

**État connecté :**
```
[☁️ Auto-save ON] [✅ Drive: pierre@stratai.com ▾]
     ↑                           ↑
  Toggle icon            Menu déroulant
```

**Menu déroulant "Drive" :**
```
✅ pierre@stratai.com
├─ Save to Drive (Ctrl+Shift+S)
├─ Open from Drive (Ctrl+Shift+O)
├─ Share from Drive
├─ ──────────────────
├─ [☁️ Auto-save: ON]  ← Toggle
├─ Save interval: 5 min
├─ ──────────────────
├─ Storage: 12.5 MB / 15 GB
├─ View in Drive
├─ ──────────────────
└─ Disconnect
```

---

### Menu File

```
File
├─ New Drawing
├─ ───────────────────────
├─ Open (Local)
├─ 📁 Open from Google Drive    🆕
├─ ───────────────────────
├─ Save (Local)
├─ ☁️ Save to Google Drive      🆕
├─ Save as...
├─ ───────────────────────
├─ 🔗 Share from Drive          🆕
├─ ───────────────────────
├─ Export
│   ├─ PNG
│   ├─ SVG
│   └─ Excalidraw
└─ ───────────────────────
```

---

### Modal "Open from Drive"

```
┌──────────────────────────────────────────────────────┐
│  Open from Google Drive                    [x]       │
├──────────────────────────────────────────────────────┤
│                                                       │
│  🔍 [Search files...]                                │
│                                                       │
│  ┌─────────────────────────────────────────────────┐│
│  │ 🖼️ [thumbnail]  StratAI-Drawing-2025-11-13...  ││
│  │               Nov 13, 2025 • 234 KB            ││
│  │               Last modified: 2 hours ago        ││
│  └─────────────────────────────────────────────────┘│
│                                                       │
│  ┌─────────────────────────────────────────────────┐│
│  │ 🖼️ [thumbnail]  StratAI-Drawing-2025-11-12...  ││
│  │               Nov 12, 2025 • 156 KB            ││
│  │               Last modified: 1 day ago          ││
│  └─────────────────────────────────────────────────┘│
│                                                       │
│  ┌─────────────────────────────────────────────────┐│
│  │ 🖼️ [thumbnail]  StratAI-Drawing-2025-11-10...  ││
│  │               Nov 10, 2025 • 89 KB             ││
│  │               Last modified: 3 days ago         ││
│  └─────────────────────────────────────────────────┘│
│                                                       │
│  [Load More...] (10 more files)                      │
│                                                       │
│  [Cancel]                              [Open]        │
└──────────────────────────────────────────────────────┘
```

---

### Indicateurs d'État

**Pendant la sauvegarde :**
```
[☁️ Saving...] (animation)
```

**Après sauvegarde réussie :**
```
[☁️ Saved] → disparaît après 3 secondes
```

**Erreur de sauvegarde :**
```
[⚠️ Save failed] → affiche un message d'erreur
```

**Auto-save en cours :**
```
[☁️ Auto-saving...] (discret, en bas à droite)
```

---

## 🔧 Implémentation Technique

### Architecture des Composants

```
src/
└─ components/
   └─ GoogleDrive/
      ├─ GoogleDriveProvider.tsx    # Context + OAuth
      ├─ ConnectButton.tsx          # Bouton de connexion
      ├─ DriveMenu.tsx              # Menu déroulant
      ├─ SaveToDrive.tsx            # Logique de sauvegarde
      ├─ OpenFromDrive.tsx          # Modal + liste
      ├─ ShareFromDrive.tsx         # Modal de partage
      ├─ AutoSaveToggle.tsx         # Icône toggle
      └─ utils/
          ├─ driveApi.ts            # Wrapper Google Drive API
          ├─ thumbnails.ts          # Génération miniatures
          └─ nameGenerator.ts       # Génération noms fichiers
```

---

### Configuration Google Cloud

**Projet :** StratAI Whiteboard
**API activée :** Google Drive API v3

**OAuth 2.0 Client ID :**
```
Application type: Web application
Name: StratAI Whiteboard

Authorized JavaScript origins:
- https://pierrre2db.github.io
- http://localhost:3000

Authorized redirect URIs:
- https://pierrre2db.github.io/excalidraw/
- http://localhost:3000

Scopes:
- https://www.googleapis.com/auth/drive.file
  (Accès aux fichiers créés par l'app uniquement)
```

---

### Variables d'Environnement

```bash
# .env.local (développement)
VITE_GOOGLE_CLIENT_ID=votre-client-id.apps.googleusercontent.com
VITE_DRIVE_FOLDER_NAME="StratAI Whiteboard"
VITE_AUTO_SAVE_INTERVAL=300000  # 5 minutes en ms
```

**Production :** Variables dans les settings GitHub (Secrets)

---

### Bibliothèques

```json
{
  "dependencies": {
    "@react-oauth/google": "^0.12.1",
    "gapi-script": "^1.2.0"
  }
}
```

**Taille bundle :** +~50 KB (minifié + gzippé)

---

### API Google Drive - Endpoints Utilisés

**1. OAuth 2.0**
```
GET https://accounts.google.com/o/oauth2/v2/auth
POST https://oauth2.googleapis.com/token
```

**2. Files**
```
POST https://www.googleapis.com/drive/v3/files
GET https://www.googleapis.com/drive/v3/files
GET https://www.googleapis.com/drive/v3/files/{fileId}
PATCH https://www.googleapis.com/drive/v3/files/{fileId}
```

**3. Permissions (Share)**
```
POST https://www.googleapis.com/drive/v3/files/{fileId}/permissions
GET https://www.googleapis.com/drive/v3/files/{fileId}/permissions
```

---

## 📊 Flux de Données

### 1. Connexion OAuth

```
User clicks "Connect Google Drive"
      ↓
Open Google OAuth popup
      ↓
User logs in + accepts permissions
      ↓
Receive OAuth token
      ↓
Store token in localStorage (encrypted)
      ↓
Update UI: "Connected"
```

---

### 2. Save to Drive

```
User clicks "Save to Drive" (or auto-save triggers)
      ↓
Generate filename with timestamp
      ↓
Serialize Excalidraw scene to JSON
      ↓
Generate thumbnail PNG (400x300)
      ↓
Check if "StratAI Whiteboard" folder exists
  ├─ No → Create folder
  └─ Yes → Continue
      ↓
Upload file to Drive
  - Content: JSON
  - Metadata: name, mimeType, parents, thumbnail
      ↓
Receive file ID from Drive
      ↓
Store file ID in scene metadata (for future updates)
      ↓
Show success notification
```

---

### 3. Open from Drive

```
User clicks "Open from Drive"
      ↓
Show loading modal
      ↓
List files in "StratAI Whiteboard" folder
  - Query: name contains 'StratAI-Drawing'
  - Order by: modifiedTime desc
  - Fields: id, name, modifiedTime, size, thumbnailLink
      ↓
Display list with thumbnails
      ↓
User selects a file
      ↓
Download file content from Drive
      ↓
Parse JSON
      ↓
Load scene into Excalidraw
      ↓
Close modal
```

---

### 4. Share from Drive

```
User clicks "Share from Drive"
      ↓
Check if current file is saved on Drive
  ├─ No → Show "Please save to Drive first"
  └─ Yes → Continue
      ↓
Show share modal with options
      ↓
User selects permission level
      ↓
Create permission on Drive
  - Type: anyone
  - Role: reader OR writer
      ↓
Get shareable link
      ↓
Copy link to clipboard
      ↓
Show success: "Link copied!"
```

---

### 5. Auto-Save

```
Timer (every 5 minutes)
      ↓
Check if auto-save is enabled
  ├─ No → Do nothing
  └─ Yes → Continue
      ↓
Check if changes since last save
  ├─ No → Do nothing
  └─ Yes → Continue
      ↓
Check if connected to Drive
  ├─ No → Skip
  └─ Yes → Continue
      ↓
Show "Auto-saving..." indicator
      ↓
Execute save (same as manual save)
      ↓
Update last save timestamp
      ↓
Show "Saved" indicator (3 sec)
```

---

## 🔐 Sécurité et Confidentialité

### Données Stockées

**localStorage (navigateur) :**
```javascript
{
  "google_drive_token": "encrypted_token_here",
  "google_drive_refresh_token": "refresh_token_here",
  "auto_save_enabled": true,
  "auto_save_interval": 300000,
  "last_opened_file_id": "1abc...xyz"
}
```

**Google Drive (utilisateur) :**
```
StratAI Whiteboard/
└─ *.excalidraw files (JSON)
```

**GitHub Pages (StratAI) :**
- Rien. Zéro donnée. Juste le code statique.

---

### Permissions OAuth

**Scope demandé :**
```
https://www.googleapis.com/auth/drive.file
```

**Ce que ça permet :**
- Créer des fichiers dans Drive
- Lire/modifier/supprimer UNIQUEMENT les fichiers créés par l'app
- Pas d'accès aux autres fichiers Drive

**Ce que ça NE permet PAS :**
- Accès aux Google Docs, Sheets, Photos
- Lecture des autres fichiers Drive
- Accès aux emails Gmail
- Historique de navigation

---

### Conformité RGPD

- ✅ Données stockées chez l'utilisateur (son Drive)
- ✅ StratAI n'a accès à rien
- ✅ Utilisateur contrôle tout
- ✅ Peut révoquer l'accès à tout moment
- ✅ Peut supprimer tous les fichiers
- ✅ Transparence totale sur les permissions

**Mention à ajouter :**
> "StratAI Whiteboard utilise Google Drive pour sauvegarder vos dessins directement dans VOTRE Google Drive. Nous n'avons accès à aucune de vos données. Vous gardez le contrôle total."

---

## 🎯 Critères de Succès

### Fonctionnel
- ✅ Connexion OAuth réussie
- ✅ Sauvegarde de fichiers sur Drive
- ✅ Chargement de fichiers depuis Drive
- ✅ Partage de liens fonctionnel
- ✅ Auto-save activable/désactivable
- ✅ Thumbnails générés et affichés

### Performance
- ✅ Sauvegarde < 2 secondes (fichier < 1 MB)
- ✅ Chargement liste < 3 secondes
- ✅ Ouverture fichier < 2 secondes
- ✅ Génération thumbnail < 500 ms

### UX
- ✅ Interface claire et intuitive
- ✅ Feedback visuel à chaque action
- ✅ Gestion d'erreurs explicite
- ✅ Pas de friction dans le workflow

### Technique
- ✅ 0 erreurs console
- ✅ Token refresh automatique
- ✅ Gestion des conflits (si édité ailleurs)
- ✅ Tests unitaires pour les fonctions clés

---

## 📅 Timeline d'Implémentation

### Sprint 1 : Setup & OAuth (Jour 1-2)
**Tâches :**
- [ ] Créer projet Google Cloud
- [ ] Configurer OAuth 2.0
- [ ] Installer dépendances
- [ ] Implémenter GoogleDriveProvider (context)
- [ ] Créer ConnectButton
- [ ] Tester flow OAuth complet
- [ ] Stocker token sécurisé

**Livrables :**
- Connexion/Déconnexion fonctionnelle
- Token stocké et refresh automatique

---

### Sprint 2 : Save to Drive (Jour 3)
**Tâches :**
- [ ] Créer SaveToDrive component
- [ ] Implémenter nameGenerator (timestamp)
- [ ] Implémenter thumbnails generation
- [ ] Créer/trouver dossier "StratAI Whiteboard"
- [ ] Upload fichier vers Drive
- [ ] Gestion erreurs
- [ ] Notifications utilisateur

**Livrables :**
- Bouton "Save to Drive" fonctionnel
- Fichiers sauvegardés avec thumbnail

---

### Sprint 3 : Open from Drive (Jour 4)
**Tâches :**
- [ ] Créer OpenFromDrive modal
- [ ] Lister fichiers du dossier
- [ ] Afficher thumbnails
- [ ] Implémenter recherche (optionnel)
- [ ] Download et parsing fichier
- [ ] Charger scene dans Excalidraw
- [ ] Gestion cache (optionnel)

**Livrables :**
- Modal "Open from Drive" fonctionnelle
- Liste des fichiers avec aperçus

---

### Sprint 4 : Auto-Save (Jour 5)
**Tâches :**
- [ ] Créer AutoSaveToggle component
- [ ] Implémenter timer auto-save
- [ ] Détection de changements
- [ ] Indicateur visuel "Saving..."
- [ ] Settings pour intervalle
- [ ] Save on close (optionnel)

**Livrables :**
- Auto-save fonctionnel
- Toggle ON/OFF
- Indicateurs d'état

---

### Sprint 5 : Share from Drive (Jour 6)
**Tâches :**
- [ ] Créer ShareFromDrive modal
- [ ] Implémenter création de permissions
- [ ] Options de partage (view/edit)
- [ ] Générer lien de partage
- [ ] Copy to clipboard
- [ ] Notifications

**Livrables :**
- Bouton "Share from Drive"
- Génération de liens de partage
- Copy to clipboard fonctionnel

---

### Sprint 6 : Tests & Finitions (Jour 7)
**Tâches :**
- [ ] Tests end-to-end complets
- [ ] Gestion des cas d'erreur
- [ ] Optimisations performance
- [ ] Documentation utilisateur
- [ ] Guide de troubleshooting
- [ ] Deploy en production

**Livrables :**
- Feature complète et testée
- Documentation à jour
- Prêt pour les utilisateurs

---

## 🧪 Plan de Test

### Tests Unitaires
- [ ] OAuth flow (connexion/déconnexion)
- [ ] Génération de noms de fichiers
- [ ] Génération de thumbnails
- [ ] Upload vers Drive
- [ ] Download depuis Drive
- [ ] Parsing JSON
- [ ] Création de permissions

### Tests d'Intégration
- [ ] Flow complet : Connect → Save → Disconnect → Reconnect → Open
- [ ] Auto-save avec modifications
- [ ] Partage de lien et ouverture
- [ ] Gestion token expiré (refresh)

### Tests Utilisateur
- [ ] Nouveau compte Google
- [ ] Quota Drive plein (gestion d'erreur)
- [ ] Connexion internet coupée
- [ ] Plusieurs fenêtres ouvertes
- [ ] Mobile (responsive)

---

## 📝 Documentation Utilisateur

### Guide Rapide (à créer)

```markdown
# Sauvegarder vos dessins sur Google Drive

## Première connexion
1. Cliquez sur "Connect Google Drive" dans la barre supérieure
2. Connectez-vous avec votre compte Google
3. Acceptez les permissions (accès limité aux fichiers de l'app)
4. ✅ Vous êtes connecté !

## Sauvegarder un dessin
- **Automatique :** L'auto-save est activé par défaut (toutes les 5 min)
- **Manuel :** File > Save to Google Drive (Ctrl+Shift+S)
- **Nom :** Généré automatiquement avec la date et l'heure

## Ouvrir un dessin
- File > Open from Google Drive (Ctrl+Shift+O)
- Sélectionnez le dessin dans la liste
- Cliquez "Open"

## Partager un dessin
- File > Share from Drive
- Choisissez "View only" ou "Can edit"
- Le lien est copié automatiquement
- Partagez-le par email, Slack, etc.

## Désactiver l'auto-save
- Cliquez sur l'icône "☁️ Auto-save ON" dans la barre supérieure
- Elle devient "☁️ Auto-save OFF"
- Vous pouvez toujours sauvegarder manuellement

## Vos fichiers dans Drive
- Tous vos dessins sont dans le dossier "StratAI Whiteboard"
- Vous pouvez y accéder directement depuis Google Drive
- Historique de versions automatique (par Google Drive)
```

---

## ⚠️ Points d'Attention

### Limites Google Drive API

**Quotas (gratuit) :**
- 10,000 requêtes/jour/projet
- 1,000 requêtes/100 secondes/user
- 100 requêtes/100 secondes/projet

**Impact :**
- Auto-save toutes les 5 min = 288 sauvegardes/jour
- Largement dans les limites
- Pas de problème prévu

### Gestion des Conflits

**Scénario :** Fichier modifié dans Drive pendant qu'il est ouvert

**Solution :**
- Détecter conflit (compare modifiedTime)
- Demander à l'utilisateur :
  - Écraser la version Drive
  - Créer une nouvelle version
  - Annuler

### Token Expiration

**Problème :** Token OAuth expire après 1h

**Solution :**
- Refresh token automatique avant expiration
- Si échec : demander re-connexion
- Message clair : "Session Drive expirée, reconnectez-vous"

---

## 📊 Métriques de Succès

### Adoption
- **Objectif :** 80% des utilisateurs connectent Google Drive
- **Mesure :** Analytics (optionnel)

### Usage
- **Objectif :** 5+ fichiers sauvegardés par utilisateur actif
- **Mesure :** Via logs (sans collecter les données)

### Satisfaction
- **Objectif :** 0 bugs critiques après 1 mois
- **Mesure :** GitHub Issues

---

## 🚀 Prochaines Étapes

### Immédiat
1. Créer projet Google Cloud
2. Obtenir credentials OAuth
3. Créer branche `feature/google-drive`
4. Commencer Sprint 1

### Après v1
- Collaboration temps réel + auto-sync Drive
- Gestion de conflits avancée
- Historique de versions dans l'UI
- Recherche full-text dans les fichiers
- Tags et organisation

---

**Document créé le :** 2025-11-13
**Dernière mise à jour :** 2025-11-13
**Statut :** ✅ Spécifications approuvées, prêt pour développement
