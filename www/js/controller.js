////////////////////////////////////////////////////////////////////////////////
// Module Controleur contient :
// - un objet session contenant les données modélisant l'état de l'application
// - une fonction "init" pour initialiser l'application
// - une classe "controller" abstraite pour chaque page
////////////////////////////////////////////////////////////////////////////////

import * as model from './model.js'; // le contrôleur utilise le modèle

////////////////////////////////////////////////////////////////////////////////
// Session : const iables qui représentent l'état de l'application
////////////////////////////////////////////////////////////////////////////////

const session = {
  currentPlayers: null, // Les joueurs courant
  currentGame: null, // La partie en train d'être jouée
};

////////////////////////////////////////////////////////////////////////////////
// init : exécutée au démarrage de l'application (voir fichier index.js)
////////////////////////////////////////////////////////////////////////////////

export function init() {
  // On duplique Header et Footer sur chaque page (sauf la première !)
  const $header = $('#ticTacToeHeader');
  const $footer = $('#ticTacToeFooter');
  $('div[data-role="page"]').each(function (i) {
    if (i) {
      const $content = $(this).children(':first');
      $header.clone().insertBefore($content);
      $content.after($footer.clone());
    }
  });
  // On initialise les pages (attacher les "handlers" d'événements propres à chaque page)
  HomeViewController.setEvents();
  GameViewController.setEvents();
  EndViewController.setEvents();
  // On navigue vers la page d'accueil
  $.mobile.changePage('#homeView');
}

////////////////////////////////////////////////////////////////////////////////
// Controleurs de pages : 1 contrôleur par page, qui porte le nom de la page
//  et contient les "handlers" des événements associés à cette page
////////////////////////////////////////////////////////////////////////////////

class HomeViewController {
  static setEvents() {
    // définition des "handlers" d'événements sur la page
    $(document).on(
      'pagebeforeshow',
      '#homeView',
      function () {
        this.init();
      }.bind(this)
    );
    $('#btnNewGame').on(
      'click',
      function () {
        this.newGame();
      }.bind(this)
    );
    $('#btnPhoto1').on(
      'click',
      function () {
        this.takePicture(true);
      }.bind(this)
    );
    $('#btnPhoto2').on(
      'click',
      function () {
        this.takePicture(false);
      }.bind(this)
    );
    $('#playerName1').on(
      'input',
      function () {
        this.loadPlayer();
      }.bind(this)
    );
    $('#playerName2').on(
      'input',
      function () {
        this.loadPlayer();
      }.bind(this)
    );
  }

  static init() {
    // initialisation de la page
    $('#playerName1').val('');
    $('#playerName2').val('');

    $('#playerImg1').attr('src', '');
    $('#playerImg2').attr('src', '');
  }

  static loadPlayer() {
    const players = model.PlayersDao.getAllPlayers();
    console.log({ players });
    const name1 = $('#playerName1').val();
    const name2 = $('#playerName2').val();

    if (players.length == 2) {
      const player1 = model.PlayersUtils.findPlayerByNameInArray(
        players,
        $('#playerName1').val()
      );
      const player2 = model.PlayersUtils.findPlayerByNameInArray(
        players,
        $('#playerName2').val()
      );
      session.currentPlayers = players;
      $('#playerImg1').attr('src', player1.picture);
      $('#playerImg2').attr('src', player2.picture);
    } else {
      session.currentPlayers = [
        new model.Player(1, name1, '', ''),
        new model.Player(2, name2, '', ''),
      ];

      console.log({ session });
      $('#playerImg1').attr('src', '');
      $('#playerImg2').attr('src', '');
    }
    console.log(`players : ${JSON.stringify(session.currentPlayers)}`);
  }

  static newGame() {
    // on récupère de l'information de la vue en cours
    const playerName1 = $('#playerName1').val();
    const playerName2 = $('#playerName2').val();

    if (playerName1 === '' || playerName2 === '') {
      plugins.toast.showShortCenter('Saisir un nom de joueur');
    } else {
      // On utilise le modèle pour créer une nouvelle partie
      session.currentGame = new model.TicTacToe(
        session.currentPlayers[0],
        session.currentPlayers[1]
      ); // charge la partie depuis le localstorage
      // On "propage" le nom du joueur sur toutes les vues
      $('h2[data-role="playerName"]').each(function () {
        $(this).html(`A ${session.currentPlayers.nom} de jouer`);
      });
      // On "propage" la photo du joueur sur toutes les vues
      // $('img[data-role="photoJoueur"]').each(function () {
      //   $(this).attr('src', session.joueurEnCours.photo);
      // });
      // Et on passe à une autre vue
      $.mobile.changePage('#gameView');
    }
  }

  static takePicture(isPlayer1) {
    model.CordovaAPI.takePicture()
      .then((imageData) => {
        console.log({ imageData });
        if (isPlayer1) {
          console.log(session.currentPlayers[0]);
          session.currentPlayers[0].picture =
            'data:image/jpeg;base64,' + imageData;
          $('#playerImg1').attr('src', session.currentPlayers[0].picture);
        } else {
          session.currentPlayers[1].picture =
            'data:image/jpeg;base64,' + imageData;
          $('#playerImg2').attr('src', session.currentPlayers[1].picture);
        }
      })
      .catch((err) => {
        session.currentPlayers[0].photo = '';
        session.currentPlayers[1].photo = '';
        $('#playerImg1').attr('src', '');
        $('#playerImg2').attr('src', '');
        console.log({ err });
        plugins.toast.showShortCenter('Echec Photo : ' + err.message);
      });
  }
}

////////////////////////////////////////////////////////////////////////////////
class GameViewController {
  static setEvents() {
    // définition des "handlers" d'événements sur la page
    $(document).on(
      'pagebeforeshow',
      '#gameView',
      function () {
        this.init();
      }.bind(this)
    );

    for (let i = 0; i < 9; i++) {
      $(`#btn${i}`).on(
        'click',
        function () {
          this.play(i);
        }.bind(this)
      );
    }
  }

  static init() {
    // initialisation de la page
    // on active et on montre tous les boutons du joueur
    $('button[id^=btnJouer]').prop('disabled', false).show();
    // on cache toutes les réponses de la machine
    $('img[id^=machine]').hide();
    // on cache la div resultat
    $('#resultat').hide();
  }

  static play(playerMove) {
    // le joueur a choisi son coup
    // On interroge le modèle pour voir le résultat du nouveau coup
    session.currentGame.play(playerMove);
    // Le score a changé => on sauvegarde la partie en cours
    model.PlayersDao.savePlayers([
      session.currentGame.player1,
      session.currentGame.player2,
    ]);
    // get current player
    const currentPlayer = model.TicTacToe.currentPlayer;

    // Et on met à jour la vue :
    // On disable le bouton joué par le joueur et on met son image
    switch (playerMove) {
      case 0:
        $('#btn0').prop('disabled', true);
        // set image of player who played
        $('#bt0 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 1:
        $('#btn1').prop('disabled', true);
        // set image of player who played
        $('#bt1 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 2:
        $('#btn2').prop('disabled', true);
        // set image of player who played
        $('#bt2 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 3:
        $('#btn3').prop('disabled', true);
        // set image of player who played
        $('#bt3 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 4:
        $('#btn4').prop('disabled', true);
        // set image of player who played
        $('#bt4 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 5:
        $('#btn5').prop('disabled', true);
        // set image of player who played
        $('#bt5 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 6:
        $('#btn6').prop('disabled', true);
        // set image of player who played
        $('#bt6 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 7:
        $('#btn7').prop('disabled', true);
        // set image of player who played
        $('#bt7 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 8:
        $('#btn8').prop('disabled', true);
        // set image of player who played
        $('#bt8 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      default:
        break;
    }

    if (model.TicTacToe.isWin()) {
      this.endGame();
    }
  }

  static endGame() {
    $.mobile.changePage('#endView');
  }
}

////////////////////////////////////////////////////////////////////////////////
class EndViewController {
  static setEvents() {
    // définition des "handlers" d'événements sur la page
    $(document).on(
      'pagebeforeshow',
      '#endView',
      function () {
        this.init();
      }.bind(this)
    );
    $('#btnReplay').on(
      'click',
      function () {
        this.replay();
      }.bind(this)
    );
    // $('#btnSupprimer').on(
    //   'click',
    //   function () {
    //     this.supprimerJoueur();
    //   }.bind(this)
    // );
    $('#btnBackHome').on(
      'click',
      function () {
        this.backHome();
      }.bind(this)
    );
  }

  static init() {
    // initialisation de la page
    $('#nbVictoires').html(session.currentGame.joueur.victoires);
    $('#nbNuls').html(session.currentGame.joueur.nuls);
    $('#nbDefaites').html(session.currentGame.joueur.defaites);
  }

  static replay() {
    $.mobile.changePage('#gameView');
  }

  // static supprimerJoueur() {
  //   model.JoueurDAO.removeJoueur(session.partieEnCours.joueur.nom);
  //   this.retourAccueil();
  // }

  static backHome() {
    $.mobile.changePage('#homeView');
  }
}
