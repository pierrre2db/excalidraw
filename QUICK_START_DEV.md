# Quick Start - Développeur

**Mission:** Activer Google Drive en production (10 minutes)

---

## ⚡ Actions Immédiates

### 1. Ajouter le Secret GitHub (2 min)

**URL:** https://github.com/pierrre2db/excalidraw/settings/secrets/actions/new

**Remplir:**
```
Name:   VITE_GOOGLE_DRIVE_CLIENT_ID
Secret: 476861044300-8u976pf8pri5jdaa7l7sc3gc2do5vhto.apps.googleusercontent.com
```

Cliquez "Add secret"

---

### 2. Vérifier le Build (3 min)

**URL:** https://github.com/pierrre2db/excalidraw/actions

Attendez que le statut soit: ✅ **Success**

---

### 3. Tester en Production (5 min)

**URL:** https://pierrre2db.github.io/excalidraw/

**Tests:**
1. ✅ Cliquez "Connect to Google Drive"
2. ✅ Dessinez → Menu → "Save"
3. ✅ Menu → "Open from Drive" → Sélectionnez un fichier

---

## 🐛 Si Problème

**"Connect to Google Drive" ne s'affiche pas:**
- Vérifiez que le secret est bien nommé `VITE_GOOGLE_DRIVE_CLIENT_ID`
- Déclenchez un nouveau build: Actions → Run workflow

**Erreur "Unauthorized":**
- Allez sur https://console.cloud.google.com/
- APIs & Services → Credentials → OAuth 2.0
- Ajoutez `https://pierrre2db.github.io` aux origins autorisées

**Site affiche version ancienne:**
- Effacez cache navigateur (Ctrl+Shift+R)
- Attendez 2-3 minutes

---

## 📚 Documentation Complète

**Instructions détaillées:** `INSTRUCTIONS_DEVELOPPEUR.md`
**Manuel utilisateur:** `MANUEL_UTILISATEUR.md`

---

## 🎯 TL;DR

```bash
1. Secret GitHub: VITE_GOOGLE_DRIVE_CLIENT_ID = 476861044300-...
2. Attendez build: https://github.com/pierrre2db/excalidraw/actions
3. Testez: https://pierrre2db.github.io/excalidraw/
```

**Fait! 🚀**
