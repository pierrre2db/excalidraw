# Manuel Utilisateur - Excalidraw avec Google Drive

**Version:** 1.1
**Date:** 19 Novembre 2025
**Nouvelles fonctionnalités:** Intégration Google Drive complète + Workaround collaboration temps réel

---

## Table des matières

1. [Introduction](#introduction)
2. [Nouveautés](#nouveautés)
3. [Connexion à Google Drive](#connexion-à-google-drive)
4. [Sauvegarde de vos dessins](#sauvegarde-de-vos-dessins)
5. [Ouverture de fichiers](#ouverture-de-fichiers)
6. [Gestion des versions](#gestion-des-versions)
7. [Configuration Auto-Save](#configuration-auto-save)
8. [Stockage et quota](#stockage-et-quota)
9. [FAQ](#faq)

---

## Introduction

Cette version d'Excalidraw inclut une **intégration complète avec Google Drive**, vous permettant de sauvegarder et synchroniser vos dessins directement dans le cloud.

### Avantages

- ✅ Sauvegarde automatique dans Google Drive
- ✅ Synchronisation entre appareils
- ✅ Gestion des versions avec timestamps
- ✅ Organisation automatique dans un dossier dédié
- ✅ Stockage illimité selon votre compte Google

---

## Nouveautés

### Fonctionnalités ajoutées

| Fonctionnalité | Description | Accès |
|----------------|-------------|-------|
| **Connect to Drive** | Connexion OAuth sécurisée | Bouton dans le header |
| **Save** | Sauvegarde rapide du fichier actuel | Menu Google Drive |
| **Save As** | Sauvegarder avec un nouveau nom | Menu Google Drive |
| **Open from Drive** | Ouvrir un fichier existant | Menu Google Drive → Modal de sélection |
| **Create Version** | Créer une version timestampée | Menu Google Drive |
| **New File** | Démarrer un nouveau dessin | Menu Google Drive |
| **Auto-save** | Sauvegarde automatique toutes les 5 min | Actif par défaut |
| **View in Drive** | Ouvrir le dossier Excalidraw | Menu Google Drive |
| **Storage Info** | Voir l'utilisation du stockage | Menu Google Drive |

---

## Connexion à Google Drive

### Première connexion

1. Cliquez sur le bouton **"Connect to Google Drive"** dans le header
2. Une fenêtre popup Google s'ouvre
3. Sélectionnez votre compte Google
4. Autorisez Excalidraw à accéder à vos fichiers
5. La fenêtre se ferme automatiquement
6. Le bouton affiche maintenant votre email

### Création automatique du dossier

Lors de la première connexion, Excalidraw crée automatiquement un dossier nommé **"Excalidraw"** dans votre Google Drive.

**Tous vos dessins seront sauvegardés dans ce dossier.**

### Déconnexion

1. Cliquez sur votre email dans le header
2. Le menu Google Drive s'ouvre
3. Cliquez sur **"Disconnect"**
4. Vous serez déconnecté et les données locales seront effacées

---

## Sauvegarde de vos dessins

### Save (Sauvegarde rapide)

**Utilisation:** Mettre à jour le fichier actuel

1. Créez ou modifiez un dessin
2. Ouvrez le menu Google Drive
3. Cliquez sur **"Save"**
4. Le fichier est mis à jour dans Drive

**Comportement:**
- Si aucun fichier n'est actif → crée un nouveau fichier avec nom automatique
- Si un fichier est actif → met à jour ce fichier
- Format du nom automatique: `VotreNom_YYYY_MM_DD.excalidraw`

**Exemple:**
```
Pierre2db_2025_11_15.excalidraw
```

### Save As (Sauvegarder sous)

**Utilisation:** Créer une copie avec un nouveau nom

1. Ouvrez le menu Google Drive
2. Cliquez sur **"Save As"**
3. Entrez un nom de fichier dans la popup
4. Cliquez sur OK
5. Un nouveau fichier est créé

**Conseils:**
- N'ajoutez pas l'extension `.excalidraw`, elle sera ajoutée automatiquement
- Utilisez des noms descriptifs: `Architecture_Projet_X`, `Wireframe_Login`, etc.

### New File (Nouveau fichier)

**Utilisation:** Démarrer un nouveau dessin

1. Ouvrez le menu Google Drive
2. Cliquez sur **"New File"**
3. Le canvas est effacé
4. Le fichier actuel est réinitialisé
5. Votre prochain "Save" créera un nouveau fichier

---

## Ouverture de fichiers

### Open from Drive

**Utilisation:** Charger un dessin depuis Google Drive

1. Ouvrez le menu Google Drive
2. Cliquez sur **"Open from Drive"**
3. Une fenêtre modale s'ouvre avec la liste de vos fichiers

#### Interface du sélecteur de fichiers

**Éléments affichés:**
- 📄 **Nom du fichier**
- 📅 **Date de modification**
- 💾 **Taille du fichier**
- 🖼️ **Thumbnail** (aperçu du dessin, si disponible)

**Fonctionnalités:**
- 🔍 **Barre de recherche** pour filtrer les fichiers
- ⏱️ **Tri par date** (plus récent en premier)
- 📜 **Défilement** pour parcourir la liste complète

#### Charger un fichier

1. Cliquez sur le fichier que vous souhaitez ouvrir
2. Le modal se ferme
3. Le dessin s'affiche sur le canvas
4. Le fichier devient le "fichier actuel"

**Note:** Tous vos éléments graphiques, textes, images et couleurs sont restaurés.

---

## Gestion des versions

### Create Version

**Utilisation:** Créer une sauvegarde avec timestamp sans modifier le fichier actuel

1. Travaillez sur un dessin
2. Ouvrez le menu Google Drive
3. Cliquez sur **"Create Version"**
4. Une copie timestampée est créée

**Format du nom:**
```
NomDuFichier_YYYY_MM_DD_HHhMM.excalidraw
```

**Exemple:**
```
Fichier original:  Architecture_Projet.excalidraw
Version créée:     Architecture_Projet_2025_11_15_14h30.excalidraw
```

**Cas d'usage:**
- ✅ Avant de faire des modifications importantes
- ✅ Pour créer des jalons (milestones)
- ✅ Pour archiver une version stable
- ✅ Pour garder un historique de versions

**Important:** Le fichier actuel reste inchangé, seule la version est créée.

---

## Configuration Auto-Save

### Fonctionnement

Par défaut, Excalidraw sauvegarde **automatiquement** votre dessin toutes les **5 minutes** dans Google Drive.

### Activation/Désactivation

1. Ouvrez le menu Google Drive
2. Cliquez sur **"Toggle Auto-save"**
3. L'état change entre "Enabled" et "Disabled"

**Indicateur visuel:**
```
Auto-save: ✓ Enabled  → Auto-save actif
Auto-save: ✗ Disabled → Auto-save désactivé
```

### Modifier l'intervalle

**Actuellement:** Intervalle fixe de 5 minutes (300 000 ms)

**Pour modifier:** Contactez le développeur ou modifiez la constante dans le code:
```typescript
// Fichier: excalidraw-app/google-drive/types/index.ts
DEFAULT_AUTO_SAVE_INTERVAL: 300000  // 5 minutes en millisecondes
```

**Équivalences:**
- 1 minute = 60 000 ms
- 5 minutes = 300 000 ms
- 10 minutes = 600 000 ms

### Dernière sauvegarde

Le menu affiche le timestamp de la dernière sauvegarde automatique:
```
Last save: 14:30:45
```

---

## Stockage et quota

### Voir l'utilisation du stockage

1. Ouvrez le menu Google Drive
2. Cliquez sur **"View Storage Info"**
3. Une alerte affiche vos informations de stockage

**Informations affichées:**
```
Total: 15 GB
Used: 2.3 GB
Available: 12.7 GB
Usage: 15.3%
```

### Limites Google Drive

**Comptes gratuits:**
- 15 GB partagés entre Gmail, Drive et Photos
- Fichiers Excalidraw légers (quelques KB à quelques MB)

**Estimation:**
- Dessin simple: ~10-50 KB
- Dessin avec images: ~500 KB - 5 MB
- Vous pouvez stocker **des milliers** de dessins Excalidraw

### Optimisation

**Conseils pour économiser de l'espace:**
- Supprimez les anciennes versions inutiles
- Exportez les archives en local (.excalidraw)
- Utilisez la compression d'images
- Nettoyez régulièrement votre dossier Excalidraw

### Accéder au dossier

1. Ouvrez le menu Google Drive
2. Cliquez sur **"View in Drive"**
3. Google Drive s'ouvre dans un nouvel onglet
4. Vous êtes directement dans le dossier Excalidraw

---

## FAQ

### Mes dessins sont-ils privés ?

✅ **Oui.** Vos fichiers sont stockés dans **votre** Google Drive personnel. Seul vous y avez accès (sauf si vous partagez explicitement).

### Que se passe-t-il si je perds la connexion internet ?

⚠️ Excalidraw fonctionne toujours localement grâce au localStorage du navigateur. Cependant:
- Les sauvegardes Google Drive échoueront
- L'auto-save sera en pause
- Vos modifications seront sauvegardées localement
- Reconnectez-vous pour synchroniser avec Drive

### Puis-je utiliser Excalidraw sans Google Drive ?

✅ **Oui.** L'intégration Google Drive est **optionnelle**. Vous pouvez:
- Utiliser le localStorage (automatique)
- Exporter/importer manuellement des fichiers .excalidraw
- Ne jamais vous connecter à Google Drive

### Comment partager un dessin ?

**Méthode 1: Partage Google Drive**
1. Allez dans votre dossier Excalidraw sur Drive
2. Clic droit sur le fichier → Partager
3. Ajoutez des personnes ou créez un lien

**Méthode 2: Export manuel**
1. Menu Excalidraw → Export
2. Exportez en PNG, SVG ou .excalidraw
3. Partagez le fichier par email, Slack, etc.

### Mes dessins sont-ils sauvegardés en temps réel ?

**Non.** Les sauvegardes se font:
- ✅ Manuellement via "Save"
- ✅ Automatiquement toutes les 5 minutes (si auto-save activé)
- ✅ Lors de "Create Version"

Ce n'est **pas** une collaboration en temps réel comme Google Docs.

### Peut-on collaborer en temps réel avec plusieurs personnes ?

⚠️ **La collaboration en temps réel n'est PAS disponible dans cette version.**

**Pourquoi ?**
- Cette version est hébergée sur GitHub Pages (hébergement statique)
- La collaboration temps réel nécessite un serveur backend (coût: 5-7$/mois)
- Pour un usage occasionnel, le coût n'est pas justifié

**✅ Solution gratuite disponible :**

Nous avons documenté un **workaround complet** qui vous permet de collaborer en temps réel :

1. Aller sur https://excalidraw.com (version officielle)
2. Créer une session collaborative
3. Travailler ensemble en temps réel ✅
4. Exporter le fichier (.excalidraw)
5. Importer dans cette version (pierrre2db.github.io/excalidraw)
6. Sauvegarder dans Google Drive

**📚 Guide complet avec schémas :** Voir `COLLABORATION_WORKAROUND.md`

**Temps nécessaire :** 2-3 minutes pour export/import
**Coût :** Gratuit (0$/mois)

### Puis-je restaurer une ancienne version ?

✅ **Oui**, si vous avez créé des versions avec "Create Version":
1. Ouvrez "Open from Drive"
2. Cherchez la version timestampée
3. Ouvrez-la

❌ **Non**, si vous n'avez pas créé de versions explicites. Google Drive ne garde pas d'historique automatique des .excalidraw.

**Conseil:** Utilisez régulièrement "Create Version" avant des modifications importantes.

### Que faire si l'auto-save ne fonctionne pas ?

**Vérifications:**
1. ✅ Êtes-vous connecté à Google Drive ?
2. ✅ L'auto-save est-il activé ? (vérifiez le menu)
3. ✅ Avez-vous un fichier actif ? (Save une première fois)
4. ✅ Avez-vous une connexion internet stable ?

**Si le problème persiste:**
- Rechargez la page
- Déconnectez-vous et reconnectez-vous
- Vérifiez la console du navigateur (F12)

### Les images sont-elles sauvegardées ?

✅ **Oui.** Toutes les images insérées dans votre dessin sont:
- Encodées en base64
- Sauvegardées dans le champ `files` du fichier .excalidraw
- Restaurées lors de l'ouverture du fichier

**Note:** Les images augmentent la taille des fichiers.

### Comment supprimer un fichier ?

**Via Google Drive:**
1. Cliquez sur "View in Drive"
2. Sélectionnez le fichier à supprimer
3. Clic droit → Supprimer (ou touche Suppr)
4. Le fichier va dans la corbeille

**Excalidraw ne permet pas** de supprimer des fichiers directement depuis l'interface.

### Quelle est la différence entre Save et Save As ?

| Fonction | Fichier actuel | Nouveau fichier | Use case |
|----------|----------------|-----------------|----------|
| **Save** | Met à jour | Non créé | Sauvegarde rapide |
| **Save As** | Reste inchangé | Créé | Créer une copie |
| **Create Version** | Reste inchangé | Créé avec timestamp | Archivage |

### Mes fichiers sont-ils compatibles avec excalidraw.com ?

✅ **Oui.** Les fichiers .excalidraw sont au format standard. Vous pouvez:
- Télécharger un fichier depuis votre Drive
- L'ouvrir sur https://excalidraw.com
- Ou inversement

---

## Support et Contact

### Rapporter un bug

Si vous rencontrez un problème:

1. **Console navigateur:** Appuyez sur F12, onglet Console, copiez les erreurs
2. **Reproduction:** Notez les étapes pour reproduire le bug
3. **GitHub Issues:** [Créer une issue](https://github.com/pierrre2db/excalidraw/issues)

### Suggestions

Pour proposer de nouvelles fonctionnalités, créez une issue GitHub avec le label `enhancement`.

---

## Crédits

- **Excalidraw:** [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)
- **Intégration Google Drive:** Custom implementation
- **Développement:** Pierre2db
- **Version:** Excalidraw self-hosted with Google Drive integration

---

**Dernière mise à jour:** 15 novembre 2025
