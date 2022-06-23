/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./www/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/controller.js":
/*!******************************!*\
  !*** ./www/js/controller.js ***!
  \******************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model.js */ "./www/js/model.js");
////////////////////////////////////////////////////////////////////////////////
// Module Controleur contient :
// - un objet session contenant les données modélisant l'état de l'application
// - une fonction "init" pour initialiser l'application
// - une classe "controller" abstraite pour chaque page
////////////////////////////////////////////////////////////////////////////////

 // le contrôleur utilise le modèle

const session = {
  currentPlayers: [], // Les joueurs courant
  currentGame: null, // La partie en train d'être jouée
  players: [], // Les joueurs
};

////////////////////////////////////////////////////////////////////////////////
// init : exécutée au démarrage de l'application (voir fichier index.js)
////////////////////////////////////////////////////////////////////////////////

function init() {
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
    const players = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].getAllPlayers();

    const name1 = $('#playerName1').val();
    const name2 = $('#playerName2').val();

    if (players.length > 0) {
      const player1 = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(
        players,
        $('#playerName1').val()
      );
      const player2 = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(
        players,
        $('#playerName2').val()
      );

      if (player1) {
        $('#playerImg1').attr('src', player1.picture);
        session.currentPlayers[0] = player1;
      } else {
        $('#playerImg1').attr('src', '');
        session.currentPlayers[0] = new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](1, name1, '');
      }
      if (player2) {
        $('#playerImg2').attr('src', player2.picture);
        session.currentPlayers[1] = player2;
      } else {
        $('#playerImg2').attr('src', '');
        session.currentPlayers[1] = new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](2, name2, '');
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
        new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](1, name1, picture1),
        new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](2, name2, picture2),
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
      session.currentGame = new _model_js__WEBPACK_IMPORTED_MODULE_0__["TicTacToe"](
        { id: 1, ...session.currentPlayers[0] },
        { id: 2, ...session.currentPlayers[1] }
      );

      // Et on passe à une autre vue
      $.mobile.changePage('#gameView');
    }
  }

  static takePicture(isPlayer1) {
    _model_js__WEBPACK_IMPORTED_MODULE_0__["CordovaAPI"].takePicture()
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
      _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].addOrUpdatePlayerInArray(session.players, winner);
      _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].addOrUpdatePlayerInArray(session.players, loser);
      _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].savePlayers(session.players);

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
      _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].addOrUpdatePlayerInArray(session.players, player1);
      _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].addOrUpdatePlayerInArray(session.players, player2);
      _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].savePlayers(session.players);
      this.endGame();
    }
    // On change le joueur courant
    session.currentGame.switchCurrentPlayer();

    // On met a jour l'affichage du nom du joueur
    $('h2[data-role="playerName"]').text(
      `A ${session.currentGame.currentPlayer.name} de jouerrrr`
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
    const players = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].getAllPlayers();
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


/***/ }),

/***/ "./www/js/index.js":
/*!*************************!*\
  !*** ./www/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.js */ "./www/js/controller.js");
// on importe uniquement le module contrôleur


var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false
    );
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    _controller_js__WEBPACK_IMPORTED_MODULE_0__["init"]();
  },
};

app.initialize();


/***/ }),

/***/ "./www/js/model.js":
/*!*************************!*\
  !*** ./www/js/model.js ***!
  \*************************/
/*! exports provided: Picture, Player, TicTacToe, PlayersDao, PlayersUtils, CordovaAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Picture", function() { return Picture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicTacToe", function() { return TicTacToe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersDao", function() { return PlayersDao; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersUtils", function() { return PlayersUtils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CordovaAPI", function() { return CordovaAPI; });
// Classe pour représenter une image
class Picture {
  constructor(data) {
    this.data = data;
  }

  // Renvoie l'image au format Base64 avec en-tête MIME
  getBase64() {
    return 'data:image/jpeg;base64,' + this.data;
  }
}

// Classe pour représenter un joueur
class Player {
  constructor(id, name, picture, nbWin = 0, nbLoss = 0, nbDraw = 0) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.nbWin = nbWin;
    this.nbLoss = nbLoss;
    this.nbDraw = nbDraw;
  }
}

// Classe pour représenter une partie de TicTacToe
class TicTacToe {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentPlayer = Math.random() < 0.5 ? player1 : player2; // Le premier joueur est choisi aléatoirement
  }

  // Changer de joueur courant
  switchCurrentPlayer() {
    if (this.currentPlayer === this.player1) this.currentPlayer = this.player2;
    else this.currentPlayer = this.player1;
  }

  // Le joueur courant joue en caseId
  play(caseId) {
    this.board[caseId] = this.currentPlayer.id;
  }

  // Renvoie vrai si le joueur courant a gagné (on vérifie "brut force" toutes les possibilités)
  isWin() {
    const id = this.currentPlayer.id;
    return (
      (this.board[0] == id && this.board[1] == id && this.board[2] == id) ||
      (this.board[3] == id && this.board[4] == id && this.board[5] == id) ||
      (this.board[6] == id && this.board[7] == id && this.board[8] == id) ||
      (this.board[0] == id && this.board[3] == id && this.board[6] == id) ||
      (this.board[1] == id && this.board[4] == id && this.board[7] == id) ||
      (this.board[2] == id && this.board[5] == id && this.board[8] == id) ||
      (this.board[0] == id && this.board[4] == id && this.board[8] == id) ||
      (this.board[2] == id && this.board[4] == id && this.board[6] == id)
    );
  }

  // Renvoie vrai s'il y a match nul (aucune case)
  isDraw() {
    return this.board.find((element) => element === 0) === undefined;
  }
}

// Classe pour gérer la persistance d'un tableau de joueurs
class PlayersDao {
  // Sauvegarde le tableau de joueurs dans le local storage
  static savePlayers(players) {
    window.localStorage.setItem('players', JSON.stringify(players));
  }

  // Récupère le tableau de joueurs dans le local storage
  static getAllPlayers() {
    const stringPlayers = window.localStorage.getItem('players');
    // Si tableau non stocké, on renvoie un tableau vide
    if (stringPlayers === null) return new Array();
    else return JSON.parse(stringPlayers);
  }
}

// Classe pour manipuler un tableau de joueurs
class PlayersUtils {
  // Recherche un joueur par son nom dans un tableau de joueurs
  static findPlayerByNameInArray(players, playerName) {
    return players.find((element) => element.name == playerName);
  }

  // Met à jour ou ajoute un joueur dans le tableau de joueurs
  static addOrUpdatePlayerInArray(players, player) {
    const { id, ...partialPlayer } = player; // partialPlayer = player moins l'id qu'on ne veut pas enregistrer
    const playerIndex = players.findIndex(
      (element) => element.name == player.name
    );
    if (playerIndex != -1) {
      players[playerIndex] = partialPlayer; // Si le joueur existe déjà, on le met à jour
    } else {
      players.push(partialPlayer); // Sinon on l'ajoute à la fin
    }
  }
}

class CordovaAPI {
  static takePicture() {
    return new Promise((resolve, reject) => {
      navigator.camera.getPicture(
        (imageData) => resolve(imageData),
        (err) => reject(err),
        {
          // qualité encodage 50%, format base64 (et JPEG par défaut)
          quality: 50,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          encodingType: navigator.camera.EncodingType.JPEG,
          mediaType: navigator.camera.MediaType.PICTURE,
          correctOrientation: true,
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          cameraDirection: navigator.camera.Direction.FRONT,
        }
      );
    });
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3dy9qcy9tb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0M7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsdUJBQXVCLFVBQVU7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0MsS0FBSztBQUNMLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwiZmlsZSI6ImpzL3RpY1RhY1RvZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3d3dy9qcy9pbmRleC5qc1wiKTtcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBNb2R1bGUgQ29udHJvbGV1ciBjb250aWVudCA6XG4vLyAtIHVuIG9iamV0IHNlc3Npb24gY29udGVuYW50IGxlcyBkb25uw6llcyBtb2TDqWxpc2FudCBsJ8OpdGF0IGRlIGwnYXBwbGljYXRpb25cbi8vIC0gdW5lIGZvbmN0aW9uIFwiaW5pdFwiIHBvdXIgaW5pdGlhbGlzZXIgbCdhcHBsaWNhdGlvblxuLy8gLSB1bmUgY2xhc3NlIFwiY29udHJvbGxlclwiIGFic3RyYWl0ZSBwb3VyIGNoYXF1ZSBwYWdlXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5pbXBvcnQgKiBhcyBtb2RlbCBmcm9tICcuL21vZGVsLmpzJzsgLy8gbGUgY29udHLDtGxldXIgdXRpbGlzZSBsZSBtb2TDqGxlXG5cbmNvbnN0IHNlc3Npb24gPSB7XG4gIGN1cnJlbnRQbGF5ZXJzOiBbXSwgLy8gTGVzIGpvdWV1cnMgY291cmFudFxuICBjdXJyZW50R2FtZTogbnVsbCwgLy8gTGEgcGFydGllIGVuIHRyYWluIGQnw6p0cmUgam91w6llXG4gIHBsYXllcnM6IFtdLCAvLyBMZXMgam91ZXVyc1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGluaXQgOiBleMOpY3V0w6llIGF1IGTDqW1hcnJhZ2UgZGUgbCdhcHBsaWNhdGlvbiAodm9pciBmaWNoaWVyIGluZGV4LmpzKVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIE9uIGR1cGxpcXVlIEhlYWRlciBldCBGb290ZXIgc3VyIGNoYXF1ZSBwYWdlIChzYXVmIGxhIHByZW1pw6hyZSAhKVxuICBjb25zdCAkaGVhZGVyID0gJCgnI3RpY1RhY1RvZUhlYWRlcicpO1xuICBjb25zdCAkZm9vdGVyID0gJCgnI3RpY1RhY1RvZUZvb3RlcicpO1xuICAkKCdkaXZbZGF0YS1yb2xlPVwicGFnZVwiXScpLmVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICBpZiAoaSkge1xuICAgICAgY29uc3QgJGNvbnRlbnQgPSAkKHRoaXMpLmNoaWxkcmVuKCc6Zmlyc3QnKTtcbiAgICAgICRoZWFkZXIuY2xvbmUoKS5pbnNlcnRCZWZvcmUoJGNvbnRlbnQpO1xuICAgICAgJGNvbnRlbnQuYWZ0ZXIoJGZvb3Rlci5jbG9uZSgpKTtcbiAgICB9XG4gIH0pO1xuICAvLyBPbiBpbml0aWFsaXNlIGxlcyBwYWdlcyAoYXR0YWNoZXIgbGVzIFwiaGFuZGxlcnNcIiBkJ8OpdsOpbmVtZW50cyBwcm9wcmVzIMOgIGNoYXF1ZSBwYWdlKVxuICBIb21lVmlld0NvbnRyb2xsZXIuc2V0RXZlbnRzKCk7XG4gIEdhbWVWaWV3Q29udHJvbGxlci5zZXRFdmVudHMoKTtcbiAgRW5kVmlld0NvbnRyb2xsZXIuc2V0RXZlbnRzKCk7XG4gIC8vIE9uIG5hdmlndWUgdmVycyBsYSBwYWdlIGQnYWNjdWVpbFxuICAkLm1vYmlsZS5jaGFuZ2VQYWdlKCcjaG9tZVZpZXcnKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENvbnRyb2xldXJzIGRlIHBhZ2VzIDogMSBjb250csO0bGV1ciBwYXIgcGFnZSwgcXVpIHBvcnRlIGxlIG5vbSBkZSBsYSBwYWdlXG4vLyAgZXQgY29udGllbnQgbGVzIFwiaGFuZGxlcnNcIiBkZXMgw6l2w6luZW1lbnRzIGFzc29jacOpcyDDoCBjZXR0ZSBwYWdlXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIb21lVmlld0NvbnRyb2xsZXIge1xuICBzdGF0aWMgc2V0RXZlbnRzKCkge1xuICAgIC8vIGTDqWZpbml0aW9uIGRlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgc3VyIGxhIHBhZ2VcbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgICdwYWdlYmVmb3Jlc2hvdycsXG4gICAgICAnI2hvbWVWaWV3JyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNidG5OZXdHYW1lJykub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm5ld0dhbWUoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgJCgnI2J0blBob3RvMScpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50YWtlUGljdHVyZSh0cnVlKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgJCgnI2J0blBob3RvMicpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50YWtlUGljdHVyZShmYWxzZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNwbGF5ZXJOYW1lMScpLm9uKFxuICAgICAgJ2lucHV0JyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5sb2FkUGxheWVyKCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNwbGF5ZXJOYW1lMicpLm9uKFxuICAgICAgJ2lucHV0JyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5sb2FkUGxheWVyKCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgLy8gaW5pdGlhbGlzYXRpb24gZGUgbGEgcGFnZVxuICAgICQoJyNwbGF5ZXJOYW1lMScpLnZhbCgnJyk7XG4gICAgJCgnI3BsYXllck5hbWUyJykudmFsKCcnKTtcblxuICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgJycpO1xuICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgJycpO1xuICB9XG5cbiAgc3RhdGljIGxvYWRQbGF5ZXIoKSB7XG4gICAgY29uc3QgcGxheWVycyA9IG1vZGVsLlBsYXllcnNEYW8uZ2V0QWxsUGxheWVycygpO1xuXG4gICAgY29uc3QgbmFtZTEgPSAkKCcjcGxheWVyTmFtZTEnKS52YWwoKTtcbiAgICBjb25zdCBuYW1lMiA9ICQoJyNwbGF5ZXJOYW1lMicpLnZhbCgpO1xuXG4gICAgaWYgKHBsYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcGxheWVyMSA9IG1vZGVsLlBsYXllcnNVdGlscy5maW5kUGxheWVyQnlOYW1lSW5BcnJheShcbiAgICAgICAgcGxheWVycyxcbiAgICAgICAgJCgnI3BsYXllck5hbWUxJykudmFsKClcbiAgICAgICk7XG4gICAgICBjb25zdCBwbGF5ZXIyID0gbW9kZWwuUGxheWVyc1V0aWxzLmZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KFxuICAgICAgICBwbGF5ZXJzLFxuICAgICAgICAkKCcjcGxheWVyTmFtZTInKS52YWwoKVxuICAgICAgKTtcblxuICAgICAgaWYgKHBsYXllcjEpIHtcbiAgICAgICAgJCgnI3BsYXllckltZzEnKS5hdHRyKCdzcmMnLCBwbGF5ZXIxLnBpY3R1cmUpO1xuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdID0gcGxheWVyMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgJycpO1xuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdID0gbmV3IG1vZGVsLlBsYXllcigxLCBuYW1lMSwgJycpO1xuICAgICAgfVxuICAgICAgaWYgKHBsYXllcjIpIHtcbiAgICAgICAgJCgnI3BsYXllckltZzInKS5hdHRyKCdzcmMnLCBwbGF5ZXIyLnBpY3R1cmUpO1xuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzFdID0gcGxheWVyMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgJycpO1xuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzFdID0gbmV3IG1vZGVsLlBsYXllcigyLCBuYW1lMiwgJycpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwaWN0dXJlMSA9XG4gICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnNbMF0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXS5waWN0dXJlXG4gICAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBpY3R1cmUyID1cbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzFdLnBpY3R1cmVcbiAgICAgICAgICA6ICcnO1xuXG4gICAgICBjb25zdCBuZXdQbGF5ZXJzID0gW1xuICAgICAgICBuZXcgbW9kZWwuUGxheWVyKDEsIG5hbWUxLCBwaWN0dXJlMSksXG4gICAgICAgIG5ldyBtb2RlbC5QbGF5ZXIoMiwgbmFtZTIsIHBpY3R1cmUyKSxcbiAgICAgIF07XG5cbiAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnMgPSBbLi4ubmV3UGxheWVyc107XG5cbiAgICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgcGljdHVyZTEpO1xuICAgICAgJCgnI3BsYXllckltZzInKS5hdHRyKCdzcmMnLCBwaWN0dXJlMik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG5ld0dhbWUoKSB7XG4gICAgLy8gb24gcsOpY3Vww6hyZSBkZSBsJ2luZm9ybWF0aW9uIGRlIGxhIHZ1ZSBlbiBjb3Vyc1xuICAgIGNvbnN0IHBsYXllck5hbWUxID0gJCgnI3BsYXllck5hbWUxJykudmFsKCk7XG4gICAgY29uc3QgcGxheWVyTmFtZTIgPSAkKCcjcGxheWVyTmFtZTInKS52YWwoKTtcblxuICAgIGlmIChwbGF5ZXJOYW1lMSA9PT0gJycgfHwgcGxheWVyTmFtZTIgPT09ICcnKSB7XG4gICAgICBwbHVnaW5zLnRvYXN0LnNob3dTaG9ydENlbnRlcignU2Fpc2lyIHVuIG5vbSBkZSBqb3VldXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT24gdXRpbGlzZSBsZSBtb2TDqGxlIHBvdXIgY3LDqWVyIHVuZSBub3V2ZWxsZSBwYXJ0aWVcbiAgICAgIHNlc3Npb24uY3VycmVudEdhbWUgPSBuZXcgbW9kZWwuVGljVGFjVG9lKFxuICAgICAgICB7IGlkOiAxLCAuLi5zZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdIH0sXG4gICAgICAgIHsgaWQ6IDIsIC4uLnNlc3Npb24uY3VycmVudFBsYXllcnNbMV0gfVxuICAgICAgKTtcblxuICAgICAgLy8gRXQgb24gcGFzc2Ugw6AgdW5lIGF1dHJlIHZ1ZVxuICAgICAgJC5tb2JpbGUuY2hhbmdlUGFnZSgnI2dhbWVWaWV3Jyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRha2VQaWN0dXJlKGlzUGxheWVyMSkge1xuICAgIG1vZGVsLkNvcmRvdmFBUEkudGFrZVBpY3R1cmUoKVxuICAgICAgLnRoZW4oKGltYWdlRGF0YSkgPT4ge1xuICAgICAgICBpZiAoaXNQbGF5ZXIxKSB7XG4gICAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXS5waWN0dXJlID1cbiAgICAgICAgICAgICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBpbWFnZURhdGE7XG4gICAgICAgICAgJCgnI3BsYXllckltZzEnKS5hdHRyKCdzcmMnLCBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdLnBpY3R1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnNbMV0ucGljdHVyZSA9XG4gICAgICAgICAgICAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgaW1hZ2VEYXRhO1xuICAgICAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXS5waWN0dXJlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnNbMF0ucGljdHVyZSA9ICcnO1xuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzFdLnBpY3R1cmUgPSAnJztcbiAgICAgICAgJCgnI3BsYXllckltZzEnKS5hdHRyKCdzcmMnLCAnJyk7XG4gICAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgJycpO1xuICAgICAgICBwbHVnaW5zLnRvYXN0LnNob3dTaG9ydENlbnRlcignRWNoZWMgUGhvdG8gOiAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIEdhbWVWaWV3Q29udHJvbGxlciB7XG4gIHN0YXRpYyBzZXRFdmVudHMoKSB7XG4gICAgLy8gZMOpZmluaXRpb24gZGVzIFwiaGFuZGxlcnNcIiBkJ8OpdsOpbmVtZW50cyBzdXIgbGEgcGFnZVxuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgJ3BhZ2ViZWZvcmVzaG93JyxcbiAgICAgICcjZ2FtZVZpZXcnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgJChgI2J0biR7aX1gKS5vbihcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucGxheShpKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAvLyBvbiBhY3RpdmUgbGVzIGJvdXRvbnMgZHUgamV1XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICQoYCNidG4ke2l9YCkucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAkKGAjYnRuJHtpfSA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl1gKS5hdHRyKCdzcmMnLCAnJyk7XG4gICAgfVxuICAgIC8vIE9uIGFmZmljaGUgbGUgbm9tIGR1IGpvdWV1ciBxdWkgY29tbWVuY2VcbiAgICAkKCdoMltkYXRhLXJvbGU9XCJwbGF5ZXJOYW1lXCJdJykudGV4dChcbiAgICAgIGBBICR7c2Vzc2lvbi5jdXJyZW50R2FtZS5jdXJyZW50UGxheWVyLm5hbWV9IGRlIGpvdWVyYFxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgcGxheShwbGF5ZXJNb3ZlKSB7XG4gICAgLy8gbGUgam91ZXVyIGEgY2hvaXNpIHNvbiBjb3VwXG4gICAgc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5KHBsYXllck1vdmUpO1xuICAgIC8vIGdldCBjdXJyZW50IHBsYXllclxuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXIgPSBzZXNzaW9uLmN1cnJlbnRHYW1lLmN1cnJlbnRQbGF5ZXI7XG5cbiAgICAvLyBPbiBkaXNhYmxlIGxlIGJvdXRvbiBldCBvbiBtZXQgbCdpbWFnZSBpbWFnZSBkdSBqb3VldXJcbiAgICBzd2l0Y2ggKHBsYXllck1vdmUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgJCgnI2J0bjAnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjAgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgICQoJyNidG4xJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2J0bjEgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgICQoJyNidG4yJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2J0bjIgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgICQoJyNidG4zJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2J0bjMgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgICQoJyNidG40JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2J0bjQgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgICQoJyNidG41JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2J0bjUgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDY6XG4gICAgICAgICQoJyNidG42JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2J0bjYgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDc6XG4gICAgICAgICQoJyNidG43JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2J0bjcgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgICQoJyNidG44JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnI2J0bjggPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc2Vzc2lvbi5jdXJyZW50R2FtZS5pc1dpbigpKSB7XG4gICAgICBjb25zdCB3aW5uZXIgPSB7XG4gICAgICAgIC4uLnNlc3Npb24uY3VycmVudEdhbWUuY3VycmVudFBsYXllcixcbiAgICAgICAgbmJXaW46IHNlc3Npb24uY3VycmVudEdhbWUuY3VycmVudFBsYXllci5uYldpbiArIDEsXG4gICAgICB9O1xuICAgICAgY29uc3QgbmV4dFBsYXllciA9XG4gICAgICAgIHNlc3Npb24uY3VycmVudEdhbWUucGxheWVyMSA9PT0gY3VycmVudFBsYXllclxuICAgICAgICAgID8gc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5ZXIyXG4gICAgICAgICAgOiBzZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXllcjE7XG4gICAgICBjb25zdCBsb3NlciA9IHtcbiAgICAgICAgLi4ubmV4dFBsYXllcixcbiAgICAgICAgbmJMb3NzOiBuZXh0UGxheWVyLm5iTG9zcyArIDEsXG4gICAgICB9O1xuICAgICAgbW9kZWwuUGxheWVyc1V0aWxzLmFkZE9yVXBkYXRlUGxheWVySW5BcnJheShzZXNzaW9uLnBsYXllcnMsIHdpbm5lcik7XG4gICAgICBtb2RlbC5QbGF5ZXJzVXRpbHMuYWRkT3JVcGRhdGVQbGF5ZXJJbkFycmF5KHNlc3Npb24ucGxheWVycywgbG9zZXIpO1xuICAgICAgbW9kZWwuUGxheWVyc0Rhby5zYXZlUGxheWVycyhzZXNzaW9uLnBsYXllcnMpO1xuXG4gICAgICB0aGlzLmVuZEdhbWUoKTtcbiAgICB9IGVsc2UgaWYgKHNlc3Npb24uY3VycmVudEdhbWUuaXNEcmF3KCkpIHtcbiAgICAgIGNvbnN0IHBsYXllcjEgPSB7XG4gICAgICAgIC4uLnNlc3Npb24uY3VycmVudEdhbWUucGxheWVyMSxcbiAgICAgICAgbmJEcmF3OiBzZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXllcjEubmJEcmF3ICsgMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBwbGF5ZXIyID0ge1xuICAgICAgICAuLi5zZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXllcjIsXG4gICAgICAgIG5iRHJhdzogc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5ZXIxLm5iRHJhdyArIDEsXG4gICAgICB9O1xuICAgICAgbW9kZWwuUGxheWVyc1V0aWxzLmFkZE9yVXBkYXRlUGxheWVySW5BcnJheShzZXNzaW9uLnBsYXllcnMsIHBsYXllcjEpO1xuICAgICAgbW9kZWwuUGxheWVyc1V0aWxzLmFkZE9yVXBkYXRlUGxheWVySW5BcnJheShzZXNzaW9uLnBsYXllcnMsIHBsYXllcjIpO1xuICAgICAgbW9kZWwuUGxheWVyc0Rhby5zYXZlUGxheWVycyhzZXNzaW9uLnBsYXllcnMpO1xuICAgICAgdGhpcy5lbmRHYW1lKCk7XG4gICAgfVxuICAgIC8vIE9uIGNoYW5nZSBsZSBqb3VldXIgY291cmFudFxuICAgIHNlc3Npb24uY3VycmVudEdhbWUuc3dpdGNoQ3VycmVudFBsYXllcigpO1xuXG4gICAgLy8gT24gbWV0IGEgam91ciBsJ2FmZmljaGFnZSBkdSBub20gZHUgam91ZXVyXG4gICAgJCgnaDJbZGF0YS1yb2xlPVwicGxheWVyTmFtZVwiXScpLnRleHQoXG4gICAgICBgQSAke3Nlc3Npb24uY3VycmVudEdhbWUuY3VycmVudFBsYXllci5uYW1lfSBkZSBqb3VlcnJycmBcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGVuZEdhbWUoKSB7XG4gICAgJC5tb2JpbGUuY2hhbmdlUGFnZSgnI2VuZFZpZXcnKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgRW5kVmlld0NvbnRyb2xsZXIge1xuICBzdGF0aWMgc2V0RXZlbnRzKCkge1xuICAgIC8vIGTDqWZpbml0aW9uIGRlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgc3VyIGxhIHBhZ2VcbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgICdwYWdlYmVmb3Jlc2hvdycsXG4gICAgICAnI2VuZFZpZXcnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgJCgnI2J0blJlcGxheScpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZXBsYXkoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgJCgnI2J0bkJhY2tIb21lJykub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmJhY2tIb21lKCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgLy8gaW5pdGlhbGlzYXRpb24gZGUgbGEgcGFnZVxuICAgIC8vIG9uIG1vbnRyZSBsZSBub20gZHUgam91ZXVyIGdhZ25hbnRcbiAgICBpZiAoc2Vzc2lvbi5jdXJyZW50R2FtZS5pc1dpbigpKSB7XG4gICAgICAkKCdoM1tkYXRhLXJvbGU9XCJwbGF5ZXJTY29yZVwiXScpLmh0bWwoXG4gICAgICAgIGAke3Nlc3Npb24uY3VycmVudEdhbWUuY3VycmVudFBsYXllci5uYW1lfSBhIGdhZ27DqSAhYFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHNlc3Npb24uY3VycmVudEdhbWUuaXNEcmF3KCkpIHtcbiAgICAgICQoJ2gzW2RhdGEtcm9sZT1cInBsYXllclNjb3JlXCJdJykuaHRtbChgTWF0Y2ggbnVsICFgKTtcbiAgICB9XG4gICAgLy8gb24gbW9udHJlIGxlIHRhYmxlYXUgZGVzIHNjb3JlcyBkZSB0b3VzIGxlcyBqb3VldXJzXG4gICAgY29uc3QgcGxheWVycyA9IG1vZGVsLlBsYXllcnNEYW8uZ2V0QWxsUGxheWVycygpO1xuICAgIGNvbnN0IHRhYmxlID0gJCgnI3RhYmxlU2NvcmVzJyk7XG4gICAgLy8gY2xlYXIgZGF0YSBvZiB0YWJsZSBleGVwdCBoZWFkZXJcbiAgICB0YWJsZS5maW5kKCd0Ym9keScpLmh0bWwoJycpO1xuXG4gICAgcGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICAgIHRhYmxlLmFwcGVuZChcbiAgICAgICAgYDx0cj48dGQ+JHtwbGF5ZXIubmFtZX08L3RkPjx0ZD4ke3BsYXllci5uYldpbn08L3RkPjx0ZD4ke3BsYXllci5uYkxvc3N9PC90ZD48dGQ+JHtwbGF5ZXIubmJEcmF3fTwvdGQ+PC90cj5gXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJlcGxheSgpIHtcbiAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKCcjaG9tZVZpZXcnKTtcbiAgfVxuXG4gIHN0YXRpYyBiYWNrSG9tZSgpIHtcbiAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKCcjaG9tZVZpZXcnKTtcbiAgfVxufVxuIiwiLy8gb24gaW1wb3J0ZSB1bmlxdWVtZW50IGxlIG1vZHVsZSBjb250csO0bGV1clxuaW1wb3J0ICogYXMgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXIuanMnO1xuXG52YXIgYXBwID0ge1xuICAvLyBBcHBsaWNhdGlvbiBDb25zdHJ1Y3RvclxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdkZXZpY2VyZWFkeScsXG4gICAgICB0aGlzLm9uRGV2aWNlUmVhZHkuYmluZCh0aGlzKSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfSxcblxuICAvLyBkZXZpY2VyZWFkeSBFdmVudCBIYW5kbGVyXG4gIC8vXG4gIC8vIEJpbmQgYW55IGNvcmRvdmEgZXZlbnRzIGhlcmUuIENvbW1vbiBldmVudHMgYXJlOlxuICAvLyAncGF1c2UnLCAncmVzdW1lJywgZXRjLlxuICBvbkRldmljZVJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgY29udHJvbGxlci5pbml0KCk7XG4gIH0sXG59O1xuXG5hcHAuaW5pdGlhbGl6ZSgpO1xuIiwiLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuZSBpbWFnZVxuZXhwb3J0IGNsYXNzIFBpY3R1cmUge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIC8vIFJlbnZvaWUgbCdpbWFnZSBhdSBmb3JtYXQgQmFzZTY0IGF2ZWMgZW4tdMOqdGUgTUlNRVxuICBnZXRCYXNlNjQoKSB7XG4gICAgcmV0dXJuICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyB0aGlzLmRhdGE7XG4gIH1cbn1cblxuLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuIGpvdWV1clxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBwaWN0dXJlLCBuYldpbiA9IDAsIG5iTG9zcyA9IDAsIG5iRHJhdyA9IDApIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBpY3R1cmUgPSBwaWN0dXJlO1xuICAgIHRoaXMubmJXaW4gPSBuYldpbjtcbiAgICB0aGlzLm5iTG9zcyA9IG5iTG9zcztcbiAgICB0aGlzLm5iRHJhdyA9IG5iRHJhdztcbiAgfVxufVxuXG4vLyBDbGFzc2UgcG91ciByZXByw6lzZW50ZXIgdW5lIHBhcnRpZSBkZSBUaWNUYWNUb2VcbmV4cG9ydCBjbGFzcyBUaWNUYWNUb2Uge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgdGhpcy5wbGF5ZXIxID0gcGxheWVyMTtcbiAgICB0aGlzLnBsYXllcjIgPSBwbGF5ZXIyO1xuICAgIHRoaXMuYm9hcmQgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gICAgdGhpcy5jdXJyZW50UGxheWVyID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IHBsYXllcjEgOiBwbGF5ZXIyOyAvLyBMZSBwcmVtaWVyIGpvdWV1ciBlc3QgY2hvaXNpIGFsw6lhdG9pcmVtZW50XG4gIH1cblxuICAvLyBDaGFuZ2VyIGRlIGpvdWV1ciBjb3VyYW50XG4gIHN3aXRjaEN1cnJlbnRQbGF5ZXIoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIxKSB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjI7XG4gICAgZWxzZSB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjE7XG4gIH1cblxuICAvLyBMZSBqb3VldXIgY291cmFudCBqb3VlIGVuIGNhc2VJZFxuICBwbGF5KGNhc2VJZCkge1xuICAgIHRoaXMuYm9hcmRbY2FzZUlkXSA9IHRoaXMuY3VycmVudFBsYXllci5pZDtcbiAgfVxuXG4gIC8vIFJlbnZvaWUgdnJhaSBzaSBsZSBqb3VldXIgY291cmFudCBhIGdhZ27DqSAob24gdsOpcmlmaWUgXCJicnV0IGZvcmNlXCIgdG91dGVzIGxlcyBwb3NzaWJpbGl0w6lzKVxuICBpc1dpbigpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuY3VycmVudFBsYXllci5pZDtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMuYm9hcmRbMF0gPT0gaWQgJiYgdGhpcy5ib2FyZFsxXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzJdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbM10gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzVdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbNl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs3XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzhdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMF0gPT0gaWQgJiYgdGhpcy5ib2FyZFszXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzZdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMV0gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzddID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs1XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzhdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzhdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzZdID09IGlkKVxuICAgICk7XG4gIH1cblxuICAvLyBSZW52b2llIHZyYWkgcydpbCB5IGEgbWF0Y2ggbnVsIChhdWN1bmUgY2FzZSlcbiAgaXNEcmF3KCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IDApID09PSB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLy8gQ2xhc3NlIHBvdXIgZ8OpcmVyIGxhIHBlcnNpc3RhbmNlIGQndW4gdGFibGVhdSBkZSBqb3VldXJzXG5leHBvcnQgY2xhc3MgUGxheWVyc0RhbyB7XG4gIC8vIFNhdXZlZ2FyZGUgbGUgdGFibGVhdSBkZSBqb3VldXJzIGRhbnMgbGUgbG9jYWwgc3RvcmFnZVxuICBzdGF0aWMgc2F2ZVBsYXllcnMocGxheWVycykge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxheWVycycsIEpTT04uc3RyaW5naWZ5KHBsYXllcnMpKTtcbiAgfVxuXG4gIC8vIFLDqWN1cMOocmUgbGUgdGFibGVhdSBkZSBqb3VldXJzIGRhbnMgbGUgbG9jYWwgc3RvcmFnZVxuICBzdGF0aWMgZ2V0QWxsUGxheWVycygpIHtcbiAgICBjb25zdCBzdHJpbmdQbGF5ZXJzID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF5ZXJzJyk7XG4gICAgLy8gU2kgdGFibGVhdSBub24gc3RvY2vDqSwgb24gcmVudm9pZSB1biB0YWJsZWF1IHZpZGVcbiAgICBpZiAoc3RyaW5nUGxheWVycyA9PT0gbnVsbCkgcmV0dXJuIG5ldyBBcnJheSgpO1xuICAgIGVsc2UgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nUGxheWVycyk7XG4gIH1cbn1cblxuLy8gQ2xhc3NlIHBvdXIgbWFuaXB1bGVyIHVuIHRhYmxlYXUgZGUgam91ZXVyc1xuZXhwb3J0IGNsYXNzIFBsYXllcnNVdGlscyB7XG4gIC8vIFJlY2hlcmNoZSB1biBqb3VldXIgcGFyIHNvbiBub20gZGFucyB1biB0YWJsZWF1IGRlIGpvdWV1cnNcbiAgc3RhdGljIGZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KHBsYXllcnMsIHBsYXllck5hbWUpIHtcbiAgICByZXR1cm4gcGxheWVycy5maW5kKChlbGVtZW50KSA9PiBlbGVtZW50Lm5hbWUgPT0gcGxheWVyTmFtZSk7XG4gIH1cblxuICAvLyBNZXQgw6Agam91ciBvdSBham91dGUgdW4gam91ZXVyIGRhbnMgbGUgdGFibGVhdSBkZSBqb3VldXJzXG4gIHN0YXRpYyBhZGRPclVwZGF0ZVBsYXllckluQXJyYXkocGxheWVycywgcGxheWVyKSB7XG4gICAgY29uc3QgeyBpZCwgLi4ucGFydGlhbFBsYXllciB9ID0gcGxheWVyOyAvLyBwYXJ0aWFsUGxheWVyID0gcGxheWVyIG1vaW5zIGwnaWQgcXUnb24gbmUgdmV1dCBwYXMgZW5yZWdpc3RyZXJcbiAgICBjb25zdCBwbGF5ZXJJbmRleCA9IHBsYXllcnMuZmluZEluZGV4KFxuICAgICAgKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PSBwbGF5ZXIubmFtZVxuICAgICk7XG4gICAgaWYgKHBsYXllckluZGV4ICE9IC0xKSB7XG4gICAgICBwbGF5ZXJzW3BsYXllckluZGV4XSA9IHBhcnRpYWxQbGF5ZXI7IC8vIFNpIGxlIGpvdWV1ciBleGlzdGUgZMOpasOgLCBvbiBsZSBtZXQgw6Agam91clxuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXJzLnB1c2gocGFydGlhbFBsYXllcik7IC8vIFNpbm9uIG9uIGwnYWpvdXRlIMOgIGxhIGZpblxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29yZG92YUFQSSB7XG4gIHN0YXRpYyB0YWtlUGljdHVyZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKFxuICAgICAgICAoaW1hZ2VEYXRhKSA9PiByZXNvbHZlKGltYWdlRGF0YSksXG4gICAgICAgIChlcnIpID0+IHJlamVjdChlcnIpLFxuICAgICAgICB7XG4gICAgICAgICAgLy8gcXVhbGl0w6kgZW5jb2RhZ2UgNTAlLCBmb3JtYXQgYmFzZTY0IChldCBKUEVHIHBhciBkw6lmYXV0KVxuICAgICAgICAgIHF1YWxpdHk6IDUwLFxuICAgICAgICAgIGRlc3RpbmF0aW9uVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICAgICAgZW5jb2RpbmdUeXBlOiBuYXZpZ2F0b3IuY2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgICAgIG1lZGlhVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5NZWRpYVR5cGUuUElDVFVSRSxcbiAgICAgICAgICBjb3JyZWN0T3JpZW50YXRpb246IHRydWUsXG4gICAgICAgICAgc291cmNlVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICAgICAgY2FtZXJhRGlyZWN0aW9uOiBuYXZpZ2F0b3IuY2FtZXJhLkRpcmVjdGlvbi5GUk9OVCxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==