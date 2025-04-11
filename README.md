# Démineur

Une implémentation moderne et élégante du célèbre jeu Démineur, offrant quatre niveaux de difficulté pour mettre à l'épreuve votre logique et votre sens de la déduction.

## ✨ Fonctionnalités

- **Niveaux de difficulté multiples**
  - Débutant (9×9 grille, 10 mines)
  - Intermédiaire (16×16 grille, 40 mines)
  - Expert (16×30 grille, 99 mines)
  - Maître (20×30 grille, 130 mines)

- **Interface intuitive**
  - Clic gauche pour révéler une case
  - Clic droit pour placer/retirer un drapeau
  - Double-clic pour révéler les cases adjacentes (lorsque l'indice est satisfait)

- **Chronomètre intégré** - Mesurez votre temps pour comparer vos performances

## 🚀 Installation

Aucune installation complexe n'est requise ! Vous pouvez soit :

### Option 1: Jouer localement

```bash
# Cloner le dépôt
git clone https://github.com/Kevin-Ferraretto-Cours/2023-HTML-CSS-JS-demineur.git
# Accéder au répertoire
cd 2023-HTML-CSS-JS-demineur
```

### Option 2: Jouer en ligne

Accédez directement au jeu via mon site WEB :
[https://demineur.kevin-ferraretto.fr/](https://demineur.kevin-ferraretto.fr/)

## 📝 Comment jouer

1. **Sélectionnez un niveau de difficulté** au début de la partie.
2. **Cliquez sur une case** pour la révéler:
   - Un chiffre indique le nombre de mines dans les cases adjacentes
   - Une case vide révélera automatiquement les cases adjacentes sans mines
   - Une mine signifie game over !
3. **Utilisez le clic droit** pour placer un drapeau où vous suspectez une mine.
4. **Gagnez la partie** en révélant toutes les cases sans mines.

## 💻 Technologies utilisées

- HTML5 pour la structure
- CSS3 pour le style et l'animation
- JavaScript vanilla pour la logique de jeu

## 📈 Roadmap

- [ ] Ajout d'un système de sauvegarde des meilleurs temps
- [ ] Mode sombre
- [ ] Option pour créer des grilles personnalisées
- [ ] Version mobile optimisée avec contrôles tactiles
- [ ] Sons et effets visuels améliorés

## 📜 Licence

Ce projet est distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.
