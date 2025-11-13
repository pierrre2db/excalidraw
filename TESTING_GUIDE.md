# Guide de Test - Excalidraw Self-Hosted

## ✅ Vérification du Déploiement (Fait)

- **URL:** https://pierrre2db.github.io/excalidraw/
- **Statut:** ✅ Site accessible
- **Date de vérification:** 2025-11-13

## 🧪 Tests Manuels à Effectuer

### Test 1: Chargement de l'Application

1. Ouvrez https://pierrre2db.github.io/excalidraw/ dans votre navigateur
2. **Vérifications:**
   - [ ] La page se charge sans erreur 404
   - [ ] L'interface Excalidraw s'affiche correctement
   - [ ] Les outils de dessin sont visibles dans la barre latérale
   - [ ] Pas d'erreurs dans la console du navigateur (F12)

**Problèmes potentiels:**
- Si vous voyez "You need to enable JavaScript", activez JavaScript dans votre navigateur
- Si erreur 404: attendre 2-3 minutes après le déploiement
- Si page blanche: vérifier la console (F12) pour les erreurs

---

### Test 2: Fonctionnalités de Dessin

1. **Créer un rectangle**
   - [ ] Cliquez sur l'outil Rectangle
   - [ ] Dessinez un rectangle sur le canvas
   - [ ] Le rectangle apparaît correctement

2. **Créer du texte**
   - [ ] Cliquez sur l'outil Texte
   - [ ] Cliquez sur le canvas et tapez "Test"
   - [ ] Le texte apparaît correctement

3. **Créer une flèche**
   - [ ] Cliquez sur l'outil Flèche
   - [ ] Dessinez une flèche entre deux éléments
   - [ ] La flèche se connecte correctement

4. **Modifier les couleurs**
   - [ ] Sélectionnez un élément
   - [ ] Changez la couleur de fond
   - [ ] Changez la couleur du contour
   - [ ] Les couleurs s'appliquent correctement

---

### Test 3: Sauvegarde LocalStorage

Le localStorage sauvegarde automatiquement votre travail dans le navigateur.

1. **Test de sauvegarde automatique**
   - [ ] Créez plusieurs éléments sur le canvas
   - [ ] Fermez l'onglet du navigateur
   - [ ] Rouvrez https://pierrre2db.github.io/excalidraw/
   - [ ] Vos éléments sont toujours là ✅

2. **Vérifier le localStorage (optionnel)**
   - [ ] Ouvrez la console (F12)
   - [ ] Allez dans l'onglet "Application" > "Local Storage"
   - [ ] Cherchez les clés commençant par "excalidraw"
   - [ ] Vous devriez voir vos données sauvegardées

**Limites du localStorage:**
- Stockage limité à ~5-10 MB selon le navigateur
- Données effacées si vous videz le cache du navigateur
- Données non synchronisées entre différents appareils/navigateurs

---

### Test 4: Export JSON (Sauvegarde Manuelle)

1. **Exporter en JSON**
   - [ ] Créez un dessin avec plusieurs éléments
   - [ ] Cliquez sur le menu hamburger (☰) en haut à gauche
   - [ ] Cliquez sur "Save to..."
   - [ ] Sélectionnez ".excalidraw" (JSON)
   - [ ] Un fichier `.excalidraw` se télécharge

2. **Vérifier le fichier**
   - [ ] Ouvrez le fichier .excalidraw dans un éditeur de texte
   - [ ] Vous devriez voir du JSON avec vos éléments
   - [ ] Structure: `{ "type": "excalidraw", "version": ..., "elements": [...] }`

---

### Test 5: Import JSON

1. **Effacer le canvas**
   - [ ] Menu (☰) > "Clear canvas"
   - [ ] Confirmez
   - [ ] Le canvas est vide

2. **Importer le fichier précédent**
   - [ ] Menu (☰) > "Open"
   - [ ] Sélectionnez le fichier .excalidraw téléchargé précédemment
   - [ ] Vos éléments réapparaissent ✅

3. **Alternative : Glisser-déposer**
   - [ ] Glissez un fichier .excalidraw sur le canvas
   - [ ] Le fichier s'ouvre automatiquement

---

### Test 6: Export PNG/SVG

1. **Export PNG**
   - [ ] Créez un dessin
   - [ ] Menu (☰) > "Export image"
   - [ ] Sélectionnez "PNG"
   - [ ] Choisissez les options (arrière-plan, échelle)
   - [ ] Cliquez sur "Export"
   - [ ] Une image PNG se télécharge
   - [ ] Ouvrez l'image: le rendu est correct ✅

2. **Export SVG**
   - [ ] Menu (☰) > "Export image"
   - [ ] Sélectionnez "SVG"
   - [ ] Cliquez sur "Export"
   - [ ] Un fichier SVG se télécharge
   - [ ] Ouvrez le SVG dans un navigateur: rendu vectoriel correct ✅

---

### Test 7: Mode Sombre/Clair

1. **Basculer le thème**
   - [ ] Cliquez sur l'icône lune/soleil en haut à droite
   - [ ] Le thème change (sombre ↔ clair)
   - [ ] L'interface s'adapte correctement
   - [ ] Le dessin reste visible

2. **Persistance du thème**
   - [ ] Changez le thème
   - [ ] Rafraîchissez la page (F5)
   - [ ] Le thème choisi est conservé ✅

---

### Test 8: Fonctionnalités Avancées

1. **Bibliothèque de formes**
   - [ ] Cliquez sur l'icône bibliothèque (📚)
   - [ ] Parcourez les bibliothèques disponibles
   - [ ] Ajoutez une forme depuis une bibliothèque
   - [ ] La forme s'ajoute au canvas

2. **Sélection multiple**
   - [ ] Créez plusieurs éléments
   - [ ] Maintenez Shift et cliquez sur plusieurs éléments
   - [ ] Tous les éléments sont sélectionnés
   - [ ] Déplacez-les ensemble

3. **Undo/Redo**
   - [ ] Créez un élément
   - [ ] Ctrl+Z (Cmd+Z sur Mac) pour annuler
   - [ ] L'élément disparaît
   - [ ] Ctrl+Shift+Z pour refaire
   - [ ] L'élément réapparaît

4. **Zoom**
   - [ ] Utilisez la molette de la souris pour zoomer
   - [ ] Ou utilisez les boutons +/- en bas à droite
   - [ ] Le zoom fonctionne correctement

---

### Test 9: Responsive / Mobile (Optionnel)

1. **Test mobile**
   - [ ] Ouvrez l'URL sur un smartphone ou tablette
   - [ ] L'interface s'adapte à l'écran
   - [ ] Vous pouvez dessiner avec le doigt
   - [ ] Les gestes tactiles fonctionnent (pincer pour zoomer)

2. **Test responsive (mode développeur)**
   - [ ] F12 > Toggle device toolbar
   - [ ] Testez différentes tailles d'écran
   - [ ] L'interface reste utilisable

---

### Test 10: Performance

1. **Dessin complexe**
   - [ ] Créez un dessin avec 50+ éléments
   - [ ] L'application reste fluide
   - [ ] Pas de ralentissement notable
   - [ ] Les interactions sont réactives

2. **Taille du fichier**
   - [ ] Créez un dessin complexe
   - [ ] Exportez en .excalidraw
   - [ ] Vérifiez la taille du fichier (doit rester raisonnable, < 1 MB pour un dessin normal)

---

## 🐛 Problèmes Connus et Solutions

### Problème: Page blanche
**Solutions:**
1. Vider le cache du navigateur (Ctrl+Shift+Del)
2. Vérifier la console (F12) pour les erreurs
3. Tester dans un autre navigateur
4. Vérifier que `base: "/excalidraw/"` est bien dans vite.config.mts

### Problème: Erreur 404
**Solutions:**
1. Attendre 2-3 minutes après le déploiement
2. Vérifier que GitHub Pages est activé sur le repo
3. Vérifier que la branche `gh-pages` existe
4. URL correcte: https://pierrre2db.github.io/excalidraw/ (avec le slash final)

### Problème: Les données ne se sauvent pas
**Solutions:**
1. Vérifier que le localStorage n'est pas désactivé dans le navigateur
2. Vérifier que vous n'êtes pas en navigation privée
3. Utiliser l'export JSON manuel en attendant

### Problème: Fonts ne chargent pas
**Solutions:**
1. Vérifier la connexion Internet
2. Vérifier la console pour les erreurs CORS
3. Les fonts peuvent charger via CDN, patience

---

## ✅ Checklist Finale de Test

Après avoir effectué tous les tests ci-dessus:

- [ ] L'application se charge correctement
- [ ] Je peux créer des dessins
- [ ] La sauvegarde localStorage fonctionne
- [ ] L'export JSON fonctionne
- [ ] L'import JSON fonctionne
- [ ] L'export PNG/SVG fonctionne
- [ ] Le mode sombre/clair fonctionne
- [ ] Pas d'erreurs critiques dans la console
- [ ] Performance acceptable

**Si tous les tests sont OK:** ✅ L'application est prête à être utilisée !

---

## 📝 Rapport de Test

Date: _______________

Testeur: _______________

**Résultats:**
- Tests réussis: __ / 10
- Tests échoués: __ / 10
- Blockers:

**Notes:**

---

**Dernière mise à jour:** 2025-11-13
