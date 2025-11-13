# TODO - Excalidraw Self-Hosted

## 🚨 Actions Immédiates

### Configuration GitHub Pages
- [x] **Activer GitHub Pages sur le repository** ✅ (2025-11-13)
  - ✅ Branche `gh-pages` créée automatiquement par gh-pages
  - ✅ Site déployé et accessible
  - ✅ URL vérifiée : https://pierrre2db.github.io/excalidraw/
  - ✅ Application React se charge correctement

### Premier Test
- [x] **Vérification de l'accessibilité** ✅ (2025-11-13)
  - ✅ Site accessible à l'URL https://pierrre2db.github.io/excalidraw/
  - ✅ Pas d'erreur 404
  - ✅ Application prête à être utilisée
  - ✅ Guide de test créé : voir `TESTING_GUIDE.md`

- [ ] **Tests fonctionnels complets** (Manuel - À faire par l'utilisateur)
  - Suivre les 10 scénarios dans `TESTING_GUIDE.md`
  - Tester le dessin, export, import, localStorage
  - Vérifier les fonctionnalités avancées
  - Compléter le rapport de test dans TESTING_GUIDE.md

---

## 📦 Fonctionnalités de Sauvegarde

### LocalStorage (Natif)
- [ ] **Documenter le fonctionnement du localStorage**
  - Comment Excalidraw sauvegarde automatiquement
  - Où sont stockées les données (clés localStorage)
  - Limitations (5-10 MB selon navigateur)

### Export/Import Manuel
- [x] Déjà fonctionnel nativement dans Excalidraw
  - Export en .excalidraw (JSON)
  - Export en PNG, SVG
  - Import de fichiers .excalidraw

### Google Drive (Extension)
- [ ] **Rechercher et installer Excalidraw+**
  - Tester l'extension Chrome "Excalidraw+"
  - Vérifier la compatibilité avec la version self-hosted
  - Documenter la procédure d'installation

- [ ] **Alternative : Intégration Google Drive API**
  - Rechercher comment intégrer Google Drive API
  - Créer un projet Google Cloud
  - Obtenir les credentials OAuth
  - Implémenter la connexion Google Drive
  - Tester sauvegarde/chargement automatique

---

## 🎨 Personnalisation

### Interface
- [ ] **Changer le titre et favicon**
  - Modifier le titre dans `/excalidraw-app/index.html`
  - Remplacer les icônes dans `/public/`
  - Rebuild et redéployer

### Thème
- [ ] **Explorer les options de thème**
  - Vérifier les variables CSS dans le code
  - Possibilité de thème custom
  - Documenter les modifications possibles

### Fonctionnalités
- [ ] **Lister les fonctionnalités activables/désactivables**
  - Collaboration en temps réel
  - Tracking analytics
  - Sentry error reporting
  - PWA service worker

---

## 🔄 CI/CD Automation

### GitHub Actions
- [x] **Créer un workflow de déploiement automatique** ✅ (2025-11-13)
  - ✅ Fichier `.github/workflows/deploy.yml` créé
  - ✅ Trigger sur push vers `main` configuré
  - ✅ Étapes : install → build → deploy gh-pages
  - ✅ Workflow de test PR créé : `.github/workflows/test-pr.yml`
  - ✅ Guide complet créé : `CI_CD_GUIDE.md`
  - [ ] Tester le workflow (prochain commit)

### Script de déploiement
- [ ] **Créer un script npm pour déploiement simple** (Optionnel)
  - Ajouter dans package.json : `"deploy": "yarn build && gh-pages -d excalidraw-app/build"`
  - Tester avec `yarn deploy`
  - Note : CI/CD rend cette commande moins nécessaire

### Prochaines Étapes CI/CD
- [x] **Tester le premier déploiement automatique** ✅ (2025-11-13)
  - ✅ Commit test effectué (05778d22)
  - ✅ Vérifié dans l'onglet Actions sur GitHub
  - ✅ Site mis à jour avec succès en 2m 46s
  - ✅ Workflow 100% opérationnel

- [ ] **Ajouter badge de statut dans README** (Optionnel)
  - Badge GitHub Actions pour montrer le statut du build
  - Voir CI_CD_GUIDE.md pour instructions

### ✅ CI/CD Complet et Validé !
Le système CI/CD est maintenant entièrement fonctionnel. Chaque `git push origin master` déclenchera automatiquement le build et le déploiement.

---

## 📝 Documentation

### README Utilisateur
- [ ] **Créer un README.md personnalisé**
  - Présentation du projet
  - Instructions d'utilisation
  - Guide de sauvegarde
  - FAQ

### Documentation Technique
- [ ] **Enrichir CLAUDE.md**
  - Ajouter exemples de personnalisation
  - Documenter les variables d'environnement
  - Ajouter troubleshooting

### Guide de Contribution
- [ ] **Si projet collaboratif**
  - Créer CONTRIBUTING.md
  - Définir code style
  - Process de PR

---

## 🧪 Tests et Qualité

### Tests
- [ ] **Exécuter la suite de tests**
  - `yarn test:typecheck`
  - `yarn test:app`
  - `yarn test:code`
  - Corriger les erreurs éventuelles

### Performance
- [ ] **Analyser les performances**
  - Lighthouse audit
  - Bundle size analysis
  - Optimisations possibles

---

## 🔐 Sécurité et Maintenance

### Dépendances
- [ ] **Vérifier les dépendances obsolètes**
  - `yarn outdated`
  - Mettre à jour browserslist : `npx update-browserslist-db@latest`
  - Audit de sécurité : `yarn audit`

### Backups
- [ ] **Stratégie de backup**
  - Backup régulier du repository
  - Export automatique des données
  - Plan de restauration

---

## 🚀 Fonctionnalités Avancées (Long Terme)

### Collaboration
- [ ] **Configurer le serveur de collaboration**
  - Étudier excalidraw-room (backend)
  - Déployer sur service cloud (Heroku, Railway, etc.)
  - Connecter l'app au serveur

### Intégrations
- [ ] **Intégrations tierces**
  - Obsidian plugin
  - Notion integration
  - Figma sync

### Custom Backend
- [ ] **API personnalisée**
  - Créer endpoint de sauvegarde
  - Base de données pour stockage
  - Authentication utilisateurs

---

## 📊 Monitoring

### Analytics
- [ ] **Configurer analytics (optionnel)**
  - Google Analytics
  - Plausible (privacy-friendly alternative)
  - Suivi des usages

### Error Tracking
- [ ] **Configurer Sentry**
  - Créer compte Sentry
  - Obtenir DSN
  - Configurer dans variables d'environnement
  - Tester error reporting

---

## Notes

- **Priorité Haute** : Configuration GitHub Pages, Tests de base
- **Priorité Moyenne** : Sauvegarde Google Drive, Documentation
- **Priorité Basse** : CI/CD, Fonctionnalités avancées

**Dernière mise à jour :** 2025-11-13
