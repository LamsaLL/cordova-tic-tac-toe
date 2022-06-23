////////////////////////////////////////////////////////////////////////////////
// Module Controleur contient :
// - un objet session contenant les données modélisant l'état de l'application
// - une fonction "init" pour initialiser l'application
// - une classe "controller" abstraite pour chaque page
////////////////////////////////////////////////////////////////////////////////

import * as model from './model.js'; // le contrôleur utilise le modèle

const session = {
  currentPlayers: [], // Les joueurs courant
  currentGame: null, // La partie en train d'être jouée
  players: [], // Les joueurs
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

    const name1 = $('#playerName1').val();
    const name2 = $('#playerName2').val();

    if (players.length > 0) {
      const player1 = model.PlayersUtils.findPlayerByNameInArray(
        players,
        $('#playerName1').val()
      );
      const player2 = model.PlayersUtils.findPlayerByNameInArray(
        players,
        $('#playerName2').val()
      );

      if (player1) {
        $('#playerImg1').attr('src', player1.picture);
        session.currentPlayers[0] = player1;
      } else {
        $('#playerImg1').attr('src', '');
        session.currentPlayers[0] = new model.Player(1, name1, '');
      }
      if (player2) {
        $('#playerImg2').attr('src', player2.picture);
        session.currentPlayers[1] = player2;
      } else {
        $('#playerImg2').attr('src', '');
        session.currentPlayers[1] = new model.Player(2, name2, '');
      }
    } else {
      const picture1 =
        session.currentPlayers[0] !== undefined
          ? session.currentPlayers[0].picture
          : '';
      const picture2 =
        session.currentPlayers[1] !== undefined
          ? session.currentPlayers[1].picture
          : '';

      const newPlayers = [
        new model.Player(1, name1, picture1),
        new model.Player(2, name2, picture2),
      ];

      session.currentPlayers = [...newPlayers];

      $('#playerImg1').attr('src', picture1);
      $('#playerImg2').attr('src', picture2);
    }
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
        { id: 1, ...session.currentPlayers[0] },
        { id: 2, ...session.currentPlayers[1] }
      );

      // Et on passe à une autre vue
      $.mobile.changePage('#gameView');
    }
  }

  static takePicture(isPlayer1) {
    model.CordovaAPI.takePicture()
      .then((imageData) => {
        if (isPlayer1) {
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
        session.currentPlayers[0].picture = '';
        session.currentPlayers[1].picture = '';
        $('#playerImg1').attr('src', '');
        $('#playerImg2').attr('src', '');
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
    // on active les boutons du jeu
    for (let i = 0; i < 9; i++) {
      $(`#btn${i}`).prop('disabled', false);
      $(`#btn${i} > img[data-role="playerImg"]`).attr('src', '');
    }
    // On affiche le nom du joueur qui commence
    $('h2[data-role="playerName"]').text(
      `A ${session.currentGame.currentPlayer.name} de jouer`
    );
  }

  static play(playerMove) {
    // le joueur a choisi son coup
    session.currentGame.play(playerMove);
    // get current player
    const currentPlayer = session.currentGame.currentPlayer;

    // On disable le bouton et on met l'image image du joueur
    switch (playerMove) {
      case 0:
        $('#btn0').prop('disabled', true);
        // set image of player who played
        $('#btn0 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 1:
        $('#btn1').prop('disabled', true);
        $('#btn1 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 2:
        $('#btn2').prop('disabled', true);
        $('#btn2 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 3:
        $('#btn3').prop('disabled', true);
        $('#btn3 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 4:
        $('#btn4').prop('disabled', true);
        $('#btn4 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 5:
        $('#btn5').prop('disabled', true);
        $('#btn5 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 6:
        $('#btn6').prop('disabled', true);
        $('#btn6 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 7:
        $('#btn7').prop('disabled', true);
        $('#btn7 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 8:
        $('#btn8').prop('disabled', true);
        $('#btn8 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      default:
        break;
    }

    if (session.currentGame.isWin()) {
      const winner = {
        ...session.currentGame.currentPlayer,
        nbWin: session.currentGame.currentPlayer.nbWin + 1,
      };
      const nextPlayer =
        session.currentGame.player1 === currentPlayer
          ? session.currentGame.player2
          : session.currentGame.player1;
      const loser = {
        ...nextPlayer,
        nbLoss: nextPlayer.nbLoss + 1,
      };
      model.PlayersUtils.addOrUpdatePlayerInArray(session.players, winner);
      model.PlayersUtils.addOrUpdatePlayerInArray(session.players, loser);
      model.PlayersDao.savePlayers(session.players);

      this.endGame();
    } else if (session.currentGame.isDraw()) {
      const player1 = {
        ...session.currentGame.player1,
        nbDraw: session.currentGame.player1.nbDraw + 1,
      };
      const player2 = {
        ...session.currentGame.player2,
        nbDraw: session.currentGame.player1.nbDraw + 1,
      };
      model.PlayersUtils.addOrUpdatePlayerInArray(session.players, player1);
      model.PlayersUtils.addOrUpdatePlayerInArray(session.players, player2);
      model.PlayersDao.savePlayers(session.players);
      this.endGame();
    }
    // On change le joueur courant
    session.currentGame.switchCurrentPlayer();

    // On met a jour l'affichage du nom du joueur
    $('h2[data-role="playerName"]').text(
      `A ${session.currentGame.currentPlayer.name} de jouer`
    );
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
    $('#btnBackHome').on(
      'click',
      function () {
        this.backHome();
      }.bind(this)
    );
  }

  static init() {
    // initialisation de la page
    // on montre le nom du joueur gagnant
    if (session.currentGame.isWin()) {
      $('h3[data-role="playerScore"]').html(
        `${session.currentGame.currentPlayer.name} a gagné !`
      );
    } else if (session.currentGame.isDraw()) {
      $('h3[data-role="playerScore"]').html(`Match nul !`);
    }
    // on montre le tableau des scores de tous les joueurs
    const players = model.PlayersDao.getAllPlayers();
    const table = $('#tableScores');
    // clear data of table exept header
    table.find('tbody').html('');

    players.forEach((player) => {
      table.append(
        `<tr><td>${player.name}</td><td>${player.nbWin}</td><td>${player.nbLoss}</td><td>${player.nbDraw}</td></tr>`
      );
    });
  }

  static replay() {
    $.mobile.changePage('#homeView');
  }

  static backHome() {
    $.mobile.changePage('#homeView');
  }
}
