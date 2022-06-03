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

////////////////////////////////////////////////////////////////////////////////
// Session : const iables qui représentent l'état de l'application
////////////////////////////////////////////////////////////////////////////////

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
      // console log current player
    } else {
      const picture1 =
        session.currentPlayers[0] !== null
          ? session.currentPlayers[0].picture
          : '';
      const picture2 =
        session.currentPlayers[1] !== null
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
        session.currentPlayers[0],
        session.currentPlayers[1]
      ); // charge la partie depuis le localstorage
      $('h2[data-role="playerName"]').each(function () {
        $(this).html(`A ${session.currentPlayers[0].name} de jouer`);
      });

      // Et on passe à une autre vue
      $.mobile.changePage('#gameView');
    }
  }

  static takePicture(isPlayer1) {
    _model_js__WEBPACK_IMPORTED_MODULE_0__["CordovaAPI"].takePicture()
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
        session.currentPlayers[0].picture = '';
        session.currentPlayers[1].picture = '';
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
    // on able les boutons du jeu
    for (let i = 0; i < 9; i++) {
      $(`#btn${i}`).prop('disabled', false);
      $(`#btn${i} > img[data-role="playerImg"]`).attr('src', '');
    }
  }

  static play(playerMove) {
    // le joueur a choisi son coup
    session.currentGame.play(playerMove);
    // get current player
    const currentPlayer = session.currentGame.currentPlayer;
    // Et on met à jour la vue :
    // On disable le bouton joué par le joueur et on met son image
    switch (playerMove) {
      case 0:
        $('#btn0').prop('disabled', true);
        // set image of player who played
        $('#btn0 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        console.log($('#bt0 > img[data-role="playerImg"]'));
        break;
      case 1:
        $('#btn1').prop('disabled', true);
        // set image of player who played
        $('#btn1 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 2:
        $('#btn2').prop('disabled', true);
        // set image of player who played
        $('#btn2 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 3:
        $('#btn3').prop('disabled', true);
        // set image of player who played
        $('#btn3 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 4:
        $('#btn4').prop('disabled', true);
        // set image of player who played
        $('#btn4 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 5:
        $('#btn5').prop('disabled', true);
        // set image of player who played
        $('#btn5 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
      case 6:
        $('#btn6').prop('disabled', true);
        // set image of player who played
        $('#btn6 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 7:
        $('#btn7').prop('disabled', true);
        // set image of player who played
        $('#btn7 > img[data-role="playerImg"]').attr(
          'src',
          currentPlayer.picture
        );
        break;
      case 8:
        $('#btn8').prop('disabled', true);
        // set image of player who played
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
      const notCurrentPlayer =
        session.currentGame.player1 === currentPlayer
          ? session.currentGame.player2
          : session.currentGame.player1;
      const loser = {
        ...notCurrentPlayer,
        nbLose: notCurrentPlayer.nbLose + 1,
      };
      console.log(session.currentPlayers);
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

    $('h2[data-role="playerName"]').each(function () {
      $(this).html(`A ${session.currentGame.currentPlayer.name} de jouer`);
    });
    $('h2[data-role="playerName"]').each(function () {
      $(this).html(`A ${session.currentPlayers[0].name} de jouer`);
    });
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
    // get all players
    const players = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].getAllPlayers();
    console.log({ players });
    // generate html table
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
    console.log('lol');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3dy9qcy9tb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0M7O0FBRXBDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyx1QkFBdUIsVUFBVTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyxLQUFLO0FBQ0wsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJmaWxlIjoianMvdGljVGFjVG9lLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vd3d3L2pzL2luZGV4LmpzXCIpO1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIE1vZHVsZSBDb250cm9sZXVyIGNvbnRpZW50IDpcbi8vIC0gdW4gb2JqZXQgc2Vzc2lvbiBjb250ZW5hbnQgbGVzIGRvbm7DqWVzIG1vZMOpbGlzYW50IGwnw6l0YXQgZGUgbCdhcHBsaWNhdGlvblxuLy8gLSB1bmUgZm9uY3Rpb24gXCJpbml0XCIgcG91ciBpbml0aWFsaXNlciBsJ2FwcGxpY2F0aW9uXG4vLyAtIHVuZSBjbGFzc2UgXCJjb250cm9sbGVyXCIgYWJzdHJhaXRlIHBvdXIgY2hhcXVlIHBhZ2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmltcG9ydCAqIGFzIG1vZGVsIGZyb20gJy4vbW9kZWwuanMnOyAvLyBsZSBjb250csO0bGV1ciB1dGlsaXNlIGxlIG1vZMOobGVcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNlc3Npb24gOiBjb25zdCBpYWJsZXMgcXVpIHJlcHLDqXNlbnRlbnQgbCfDqXRhdCBkZSBsJ2FwcGxpY2F0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBzZXNzaW9uID0ge1xuICBjdXJyZW50UGxheWVyczogW10sIC8vIExlcyBqb3VldXJzIGNvdXJhbnRcbiAgY3VycmVudEdhbWU6IG51bGwsIC8vIExhIHBhcnRpZSBlbiB0cmFpbiBkJ8OqdHJlIGpvdcOpZVxuICBwbGF5ZXJzOiBbXSwgLy8gTGVzIGpvdWV1cnNcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBpbml0IDogZXjDqWN1dMOpZSBhdSBkw6ltYXJyYWdlIGRlIGwnYXBwbGljYXRpb24gKHZvaXIgZmljaGllciBpbmRleC5qcylcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAvLyBPbiBkdXBsaXF1ZSBIZWFkZXIgZXQgRm9vdGVyIHN1ciBjaGFxdWUgcGFnZSAoc2F1ZiBsYSBwcmVtacOocmUgISlcbiAgY29uc3QgJGhlYWRlciA9ICQoJyN0aWNUYWNUb2VIZWFkZXInKTtcbiAgY29uc3QgJGZvb3RlciA9ICQoJyN0aWNUYWNUb2VGb290ZXInKTtcbiAgJCgnZGl2W2RhdGEtcm9sZT1cInBhZ2VcIl0nKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgaWYgKGkpIHtcbiAgICAgIGNvbnN0ICRjb250ZW50ID0gJCh0aGlzKS5jaGlsZHJlbignOmZpcnN0Jyk7XG4gICAgICAkaGVhZGVyLmNsb25lKCkuaW5zZXJ0QmVmb3JlKCRjb250ZW50KTtcbiAgICAgICRjb250ZW50LmFmdGVyKCRmb290ZXIuY2xvbmUoKSk7XG4gICAgfVxuICB9KTtcbiAgLy8gT24gaW5pdGlhbGlzZSBsZXMgcGFnZXMgKGF0dGFjaGVyIGxlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgcHJvcHJlcyDDoCBjaGFxdWUgcGFnZSlcbiAgSG9tZVZpZXdDb250cm9sbGVyLnNldEV2ZW50cygpO1xuICBHYW1lVmlld0NvbnRyb2xsZXIuc2V0RXZlbnRzKCk7XG4gIEVuZFZpZXdDb250cm9sbGVyLnNldEV2ZW50cygpO1xuICAvLyBPbiBuYXZpZ3VlIHZlcnMgbGEgcGFnZSBkJ2FjY3VlaWxcbiAgJC5tb2JpbGUuY2hhbmdlUGFnZSgnI2hvbWVWaWV3Jyk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDb250cm9sZXVycyBkZSBwYWdlcyA6IDEgY29udHLDtGxldXIgcGFyIHBhZ2UsIHF1aSBwb3J0ZSBsZSBub20gZGUgbGEgcGFnZVxuLy8gIGV0IGNvbnRpZW50IGxlcyBcImhhbmRsZXJzXCIgZGVzIMOpdsOpbmVtZW50cyBhc3NvY2nDqXMgw6AgY2V0dGUgcGFnZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSG9tZVZpZXdDb250cm9sbGVyIHtcbiAgc3RhdGljIHNldEV2ZW50cygpIHtcbiAgICAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAncGFnZWJlZm9yZXNob3cnLFxuICAgICAgJyNob21lVmlldycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICAkKCcjYnRuTmV3R2FtZScpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5uZXdHYW1lKCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNidG5QaG90bzEnKS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGFrZVBpY3R1cmUodHJ1ZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNidG5QaG90bzInKS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGFrZVBpY3R1cmUoZmFsc2UpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICAkKCcjcGxheWVyTmFtZTEnKS5vbihcbiAgICAgICdpbnB1dCcsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubG9hZFBsYXllcigpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICAkKCcjcGxheWVyTmFtZTInKS5vbihcbiAgICAgICdpbnB1dCcsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubG9hZFBsYXllcigpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAkKCcjcGxheWVyTmFtZTEnKS52YWwoJycpO1xuICAgICQoJyNwbGF5ZXJOYW1lMicpLnZhbCgnJyk7XG5cbiAgICAkKCcjcGxheWVySW1nMScpLmF0dHIoJ3NyYycsICcnKTtcbiAgICAkKCcjcGxheWVySW1nMicpLmF0dHIoJ3NyYycsICcnKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkUGxheWVyKCkge1xuICAgIGNvbnN0IHBsYXllcnMgPSBtb2RlbC5QbGF5ZXJzRGFvLmdldEFsbFBsYXllcnMoKTtcblxuICAgIGNvbnN0IG5hbWUxID0gJCgnI3BsYXllck5hbWUxJykudmFsKCk7XG4gICAgY29uc3QgbmFtZTIgPSAkKCcjcGxheWVyTmFtZTInKS52YWwoKTtcblxuICAgIGlmIChwbGF5ZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHBsYXllcjEgPSBtb2RlbC5QbGF5ZXJzVXRpbHMuZmluZFBsYXllckJ5TmFtZUluQXJyYXkoXG4gICAgICAgIHBsYXllcnMsXG4gICAgICAgICQoJyNwbGF5ZXJOYW1lMScpLnZhbCgpXG4gICAgICApO1xuICAgICAgY29uc3QgcGxheWVyMiA9IG1vZGVsLlBsYXllcnNVdGlscy5maW5kUGxheWVyQnlOYW1lSW5BcnJheShcbiAgICAgICAgcGxheWVycyxcbiAgICAgICAgJCgnI3BsYXllck5hbWUyJykudmFsKClcbiAgICAgICk7XG5cbiAgICAgIGlmIChwbGF5ZXIxKSB7XG4gICAgICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgcGxheWVyMS5waWN0dXJlKTtcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXSA9IHBsYXllcjE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcjcGxheWVySW1nMScpLmF0dHIoJ3NyYycsICcnKTtcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXSA9IG5ldyBtb2RlbC5QbGF5ZXIoMSwgbmFtZTEsICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChwbGF5ZXIyKSB7XG4gICAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgcGxheWVyMi5waWN0dXJlKTtcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXSA9IHBsYXllcjI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcjcGxheWVySW1nMicpLmF0dHIoJ3NyYycsICcnKTtcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXSA9IG5ldyBtb2RlbC5QbGF5ZXIoMiwgbmFtZTIsICcnKTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUgbG9nIGN1cnJlbnQgcGxheWVyXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBpY3R1cmUxID1cbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXSAhPT0gbnVsbFxuICAgICAgICAgID8gc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXS5waWN0dXJlXG4gICAgICAgICAgOiAnJztcbiAgICAgIGNvbnN0IHBpY3R1cmUyID1cbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXSAhPT0gbnVsbFxuICAgICAgICAgID8gc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXS5waWN0dXJlXG4gICAgICAgICAgOiAnJztcblxuICAgICAgY29uc3QgbmV3UGxheWVycyA9IFtcbiAgICAgICAgbmV3IG1vZGVsLlBsYXllcigxLCBuYW1lMSwgcGljdHVyZTEpLFxuICAgICAgICBuZXcgbW9kZWwuUGxheWVyKDIsIG5hbWUyLCBwaWN0dXJlMiksXG4gICAgICBdO1xuXG4gICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzID0gWy4uLm5ld1BsYXllcnNdO1xuXG4gICAgICAkKCcjcGxheWVySW1nMScpLmF0dHIoJ3NyYycsIHBpY3R1cmUxKTtcbiAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgcGljdHVyZTIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZXdHYW1lKCkge1xuICAgIC8vIG9uIHLDqWN1cMOocmUgZGUgbCdpbmZvcm1hdGlvbiBkZSBsYSB2dWUgZW4gY291cnNcbiAgICBjb25zdCBwbGF5ZXJOYW1lMSA9ICQoJyNwbGF5ZXJOYW1lMScpLnZhbCgpO1xuICAgIGNvbnN0IHBsYXllck5hbWUyID0gJCgnI3BsYXllck5hbWUyJykudmFsKCk7XG5cbiAgICBpZiAocGxheWVyTmFtZTEgPT09ICcnIHx8IHBsYXllck5hbWUyID09PSAnJykge1xuICAgICAgcGx1Z2lucy50b2FzdC5zaG93U2hvcnRDZW50ZXIoJ1NhaXNpciB1biBub20gZGUgam91ZXVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9uIHV0aWxpc2UgbGUgbW9kw6hsZSBwb3VyIGNyw6llciB1bmUgbm91dmVsbGUgcGFydGllXG4gICAgICBzZXNzaW9uLmN1cnJlbnRHYW1lID0gbmV3IG1vZGVsLlRpY1RhY1RvZShcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXSxcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXVxuICAgICAgKTsgLy8gY2hhcmdlIGxhIHBhcnRpZSBkZXB1aXMgbGUgbG9jYWxzdG9yYWdlXG4gICAgICAkKCdoMltkYXRhLXJvbGU9XCJwbGF5ZXJOYW1lXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuaHRtbChgQSAke3Nlc3Npb24uY3VycmVudFBsYXllcnNbMF0ubmFtZX0gZGUgam91ZXJgKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBFdCBvbiBwYXNzZSDDoCB1bmUgYXV0cmUgdnVlXG4gICAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKCcjZ2FtZVZpZXcnKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdGFrZVBpY3R1cmUoaXNQbGF5ZXIxKSB7XG4gICAgbW9kZWwuQ29yZG92YUFQSS50YWtlUGljdHVyZSgpXG4gICAgICAudGhlbigoaW1hZ2VEYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHsgaW1hZ2VEYXRhIH0pO1xuICAgICAgICBpZiAoaXNQbGF5ZXIxKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXSk7XG4gICAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXS5waWN0dXJlID1cbiAgICAgICAgICAgICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBpbWFnZURhdGE7XG4gICAgICAgICAgJCgnI3BsYXllckltZzEnKS5hdHRyKCdzcmMnLCBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdLnBpY3R1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnNbMV0ucGljdHVyZSA9XG4gICAgICAgICAgICAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgaW1hZ2VEYXRhO1xuICAgICAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXS5waWN0dXJlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnNbMF0ucGljdHVyZSA9ICcnO1xuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzFdLnBpY3R1cmUgPSAnJztcbiAgICAgICAgJCgnI3BsYXllckltZzEnKS5hdHRyKCdzcmMnLCAnJyk7XG4gICAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgJycpO1xuICAgICAgICBjb25zb2xlLmxvZyh7IGVyciB9KTtcbiAgICAgICAgcGx1Z2lucy50b2FzdC5zaG93U2hvcnRDZW50ZXIoJ0VjaGVjIFBob3RvIDogJyArIGVyci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5jbGFzcyBHYW1lVmlld0NvbnRyb2xsZXIge1xuICBzdGF0aWMgc2V0RXZlbnRzKCkge1xuICAgIC8vIGTDqWZpbml0aW9uIGRlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgc3VyIGxhIHBhZ2VcbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgICdwYWdlYmVmb3Jlc2hvdycsXG4gICAgICAnI2dhbWVWaWV3JyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA5OyBpKyspIHtcbiAgICAgICQoYCNidG4ke2l9YCkub24oXG4gICAgICAgICdjbGljaycsXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnBsYXkoaSk7XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICAvLyBpbml0aWFsaXNhdGlvbiBkZSBsYSBwYWdlXG4gICAgLy8gb24gYWJsZSBsZXMgYm91dG9ucyBkdSBqZXVcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgJChgI2J0biR7aX1gKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICQoYCNidG4ke2l9ID4gaW1nW2RhdGEtcm9sZT1cInBsYXllckltZ1wiXWApLmF0dHIoJ3NyYycsICcnKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcGxheShwbGF5ZXJNb3ZlKSB7XG4gICAgLy8gbGUgam91ZXVyIGEgY2hvaXNpIHNvbiBjb3VwXG4gICAgc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5KHBsYXllck1vdmUpO1xuICAgIC8vIGdldCBjdXJyZW50IHBsYXllclxuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXIgPSBzZXNzaW9uLmN1cnJlbnRHYW1lLmN1cnJlbnRQbGF5ZXI7XG4gICAgLy8gRXQgb24gbWV0IMOgIGpvdXIgbGEgdnVlIDpcbiAgICAvLyBPbiBkaXNhYmxlIGxlIGJvdXRvbiBqb3XDqSBwYXIgbGUgam91ZXVyIGV0IG9uIG1ldCBzb24gaW1hZ2VcbiAgICBzd2l0Y2ggKHBsYXllck1vdmUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgJCgnI2J0bjAnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjAgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coJCgnI2J0MCA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICAkKCcjYnRuMScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnRuMSA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgJCgnI2J0bjInKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjIgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgICQoJyNidG4zJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgLy8gc2V0IGltYWdlIG9mIHBsYXllciB3aG8gcGxheWVkXG4gICAgICAgICQoJyNidG4zID4gaW1nW2RhdGEtcm9sZT1cInBsYXllckltZ1wiXScpLmF0dHIoXG4gICAgICAgICAgJ3NyYycsXG4gICAgICAgICAgY3VycmVudFBsYXllci5waWN0dXJlXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICAkKCcjYnRuNCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnRuNCA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgJCgnI2J0bjUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjUgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgJCgnI2J0bjYnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjYgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDc6XG4gICAgICAgICQoJyNidG43JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgLy8gc2V0IGltYWdlIG9mIHBsYXllciB3aG8gcGxheWVkXG4gICAgICAgICQoJyNidG43ID4gaW1nW2RhdGEtcm9sZT1cInBsYXllckltZ1wiXScpLmF0dHIoXG4gICAgICAgICAgJ3NyYycsXG4gICAgICAgICAgY3VycmVudFBsYXllci5waWN0dXJlXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OlxuICAgICAgICAkKCcjYnRuOCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnRuOCA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uLmN1cnJlbnRHYW1lLmlzV2luKCkpIHtcbiAgICAgIGNvbnN0IHdpbm5lciA9IHtcbiAgICAgICAgLi4uc2Vzc2lvbi5jdXJyZW50R2FtZS5jdXJyZW50UGxheWVyLFxuICAgICAgICBuYldpbjogc2Vzc2lvbi5jdXJyZW50R2FtZS5jdXJyZW50UGxheWVyLm5iV2luICsgMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBub3RDdXJyZW50UGxheWVyID1cbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5ZXIxID09PSBjdXJyZW50UGxheWVyXG4gICAgICAgICAgPyBzZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXllcjJcbiAgICAgICAgICA6IHNlc3Npb24uY3VycmVudEdhbWUucGxheWVyMTtcbiAgICAgIGNvbnN0IGxvc2VyID0ge1xuICAgICAgICAuLi5ub3RDdXJyZW50UGxheWVyLFxuICAgICAgICBuYkxvc2U6IG5vdEN1cnJlbnRQbGF5ZXIubmJMb3NlICsgMSxcbiAgICAgIH07XG4gICAgICBjb25zb2xlLmxvZyhzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzKTtcbiAgICAgIG1vZGVsLlBsYXllcnNVdGlscy5hZGRPclVwZGF0ZVBsYXllckluQXJyYXkoc2Vzc2lvbi5wbGF5ZXJzLCB3aW5uZXIpO1xuICAgICAgbW9kZWwuUGxheWVyc1V0aWxzLmFkZE9yVXBkYXRlUGxheWVySW5BcnJheShzZXNzaW9uLnBsYXllcnMsIGxvc2VyKTtcbiAgICAgIG1vZGVsLlBsYXllcnNEYW8uc2F2ZVBsYXllcnMoc2Vzc2lvbi5wbGF5ZXJzKTtcblxuICAgICAgdGhpcy5lbmRHYW1lKCk7XG4gICAgfSBlbHNlIGlmIChzZXNzaW9uLmN1cnJlbnRHYW1lLmlzRHJhdygpKSB7XG4gICAgICBjb25zdCBwbGF5ZXIxID0ge1xuICAgICAgICAuLi5zZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXllcjEsXG4gICAgICAgIG5iRHJhdzogc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5ZXIxLm5iRHJhdyArIDEsXG4gICAgICB9O1xuICAgICAgY29uc3QgcGxheWVyMiA9IHtcbiAgICAgICAgLi4uc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5ZXIyLFxuICAgICAgICBuYkRyYXc6IHNlc3Npb24uY3VycmVudEdhbWUucGxheWVyMS5uYkRyYXcgKyAxLFxuICAgICAgfTtcbiAgICAgIG1vZGVsLlBsYXllcnNVdGlscy5hZGRPclVwZGF0ZVBsYXllckluQXJyYXkoc2Vzc2lvbi5wbGF5ZXJzLCBwbGF5ZXIxKTtcbiAgICAgIG1vZGVsLlBsYXllcnNVdGlscy5hZGRPclVwZGF0ZVBsYXllckluQXJyYXkoc2Vzc2lvbi5wbGF5ZXJzLCBwbGF5ZXIyKTtcbiAgICAgIG1vZGVsLlBsYXllcnNEYW8uc2F2ZVBsYXllcnMoc2Vzc2lvbi5wbGF5ZXJzKTtcbiAgICAgIHRoaXMuZW5kR2FtZSgpO1xuICAgIH1cbiAgICAvLyBPbiBjaGFuZ2UgbGUgam91ZXVyIGNvdXJhbnRcbiAgICBzZXNzaW9uLmN1cnJlbnRHYW1lLnN3aXRjaEN1cnJlbnRQbGF5ZXIoKTtcblxuICAgICQoJ2gyW2RhdGEtcm9sZT1cInBsYXllck5hbWVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykuaHRtbChgQSAke3Nlc3Npb24uY3VycmVudEdhbWUuY3VycmVudFBsYXllci5uYW1lfSBkZSBqb3VlcmApO1xuICAgIH0pO1xuICAgICQoJ2gyW2RhdGEtcm9sZT1cInBsYXllck5hbWVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykuaHRtbChgQSAke3Nlc3Npb24uY3VycmVudFBsYXllcnNbMF0ubmFtZX0gZGUgam91ZXJgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBlbmRHYW1lKCkge1xuICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoJyNlbmRWaWV3Jyk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIEVuZFZpZXdDb250cm9sbGVyIHtcbiAgc3RhdGljIHNldEV2ZW50cygpIHtcbiAgICAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAncGFnZWJlZm9yZXNob3cnLFxuICAgICAgJyNlbmRWaWV3JyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNidG5SZXBsYXknKS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVwbGF5KCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNidG5CYWNrSG9tZScpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5iYWNrSG9tZSgpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAvLyBvbiBtb250cmUgbGUgbm9tIGR1IGpvdWV1ciBnYWduYW50XG4gICAgaWYgKHNlc3Npb24uY3VycmVudEdhbWUuaXNXaW4oKSkge1xuICAgICAgJCgnaDNbZGF0YS1yb2xlPVwicGxheWVyU2NvcmVcIl0nKS5odG1sKFxuICAgICAgICBgJHtzZXNzaW9uLmN1cnJlbnRHYW1lLmN1cnJlbnRQbGF5ZXIubmFtZX0gYSBnYWduw6kgIWBcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChzZXNzaW9uLmN1cnJlbnRHYW1lLmlzRHJhdygpKSB7XG4gICAgICAkKCdoM1tkYXRhLXJvbGU9XCJwbGF5ZXJTY29yZVwiXScpLmh0bWwoYE1hdGNoIG51bCAhYCk7XG4gICAgfVxuICAgIC8vIG9uIG1vbnRyZSBsZSB0YWJsZWF1IGRlcyBzY29yZXMgZGUgdG91cyBsZXMgam91ZXVyc1xuICAgIC8vIGdldCBhbGwgcGxheWVyc1xuICAgIGNvbnN0IHBsYXllcnMgPSBtb2RlbC5QbGF5ZXJzRGFvLmdldEFsbFBsYXllcnMoKTtcbiAgICBjb25zb2xlLmxvZyh7IHBsYXllcnMgfSk7XG4gICAgLy8gZ2VuZXJhdGUgaHRtbCB0YWJsZVxuICAgIGNvbnN0IHRhYmxlID0gJCgnI3RhYmxlU2NvcmVzJyk7XG4gICAgLy8gY2xlYXIgZGF0YSBvZiB0YWJsZSBleGVwdCBoZWFkZXJcbiAgICB0YWJsZS5maW5kKCd0Ym9keScpLmh0bWwoJycpO1xuXG4gICAgcGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICAgIHRhYmxlLmFwcGVuZChcbiAgICAgICAgYDx0cj48dGQ+JHtwbGF5ZXIubmFtZX08L3RkPjx0ZD4ke3BsYXllci5uYldpbn08L3RkPjx0ZD4ke3BsYXllci5uYkxvc3N9PC90ZD48dGQ+JHtwbGF5ZXIubmJEcmF3fTwvdGQ+PC90cj5gXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJlcGxheSgpIHtcbiAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKCcjaG9tZVZpZXcnKTtcbiAgfVxuXG4gIHN0YXRpYyBiYWNrSG9tZSgpIHtcbiAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKCcjaG9tZVZpZXcnKTtcbiAgfVxufVxuIiwiLy8gb24gaW1wb3J0ZSB1bmlxdWVtZW50IGxlIG1vZHVsZSBjb250csO0bGV1clxuaW1wb3J0ICogYXMgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXIuanMnO1xuXG52YXIgYXBwID0ge1xuICAvLyBBcHBsaWNhdGlvbiBDb25zdHJ1Y3RvclxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICdkZXZpY2VyZWFkeScsXG4gICAgICB0aGlzLm9uRGV2aWNlUmVhZHkuYmluZCh0aGlzKSxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfSxcblxuICAvLyBkZXZpY2VyZWFkeSBFdmVudCBIYW5kbGVyXG4gIC8vXG4gIC8vIEJpbmQgYW55IGNvcmRvdmEgZXZlbnRzIGhlcmUuIENvbW1vbiBldmVudHMgYXJlOlxuICAvLyAncGF1c2UnLCAncmVzdW1lJywgZXRjLlxuICBvbkRldmljZVJlYWR5OiBmdW5jdGlvbiAoKSB7XG4gICAgY29udHJvbGxlci5pbml0KCk7XG4gICAgY29uc29sZS5sb2coJ2xvbCcpO1xuICB9LFxufTtcblxuYXBwLmluaXRpYWxpemUoKTtcbiIsIi8vIENsYXNzZSBwb3VyIHJlcHLDqXNlbnRlciB1bmUgaW1hZ2VcbmV4cG9ydCBjbGFzcyBQaWN0dXJlIHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICAvLyBSZW52b2llIGwnaW1hZ2UgYXUgZm9ybWF0IEJhc2U2NCBhdmVjIGVuLXTDqnRlIE1JTUVcbiAgZ2V0QmFzZTY0KCkge1xuICAgIHJldHVybiAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgdGhpcy5kYXRhO1xuICB9XG59XG5cbi8vIENsYXNzZSBwb3VyIHJlcHLDqXNlbnRlciB1biBqb3VldXJcbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihpZCwgbmFtZSwgcGljdHVyZSwgbmJXaW4gPSAwLCBuYkxvc3MgPSAwLCBuYkRyYXcgPSAwKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5waWN0dXJlID0gcGljdHVyZTtcbiAgICB0aGlzLm5iV2luID0gbmJXaW47XG4gICAgdGhpcy5uYkxvc3MgPSBuYkxvc3M7XG4gICAgdGhpcy5uYkRyYXcgPSBuYkRyYXc7XG4gIH1cbn1cblxuLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuZSBwYXJ0aWUgZGUgVGljVGFjVG9lXG5leHBvcnQgY2xhc3MgVGljVGFjVG9lIHtcbiAgY29uc3RydWN0b3IocGxheWVyMSwgcGxheWVyMikge1xuICAgIHRoaXMucGxheWVyMSA9IHBsYXllcjE7XG4gICAgdGhpcy5wbGF5ZXIyID0gcGxheWVyMjtcbiAgICB0aGlzLmJvYXJkID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuICAgIHRoaXMuY3VycmVudFBsYXllciA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBwbGF5ZXIxIDogcGxheWVyMjsgLy8gTGUgcHJlbWllciBqb3VldXIgZXN0IGNob2lzaSBhbMOpYXRvaXJlbWVudFxuICB9XG5cbiAgLy8gQ2hhbmdlciBkZSBqb3VldXIgY291cmFudFxuICBzd2l0Y2hDdXJyZW50UGxheWVyKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRQbGF5ZXIgPT09IHRoaXMucGxheWVyMSkgdGhpcy5jdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXIyO1xuICAgIGVsc2UgdGhpcy5jdXJyZW50UGxheWVyID0gdGhpcy5wbGF5ZXIxO1xuICB9XG5cbiAgLy8gTGUgam91ZXVyIGNvdXJhbnQgam91ZSBlbiBjYXNlSWRcbiAgcGxheShjYXNlSWQpIHtcbiAgICB0aGlzLmJvYXJkW2Nhc2VJZF0gPSB0aGlzLmN1cnJlbnRQbGF5ZXIuaWQ7XG4gIH1cblxuICAvLyBSZW52b2llIHZyYWkgc2kgbGUgam91ZXVyIGNvdXJhbnQgYSBnYWduw6kgKG9uIHbDqXJpZmllIFwiYnJ1dCBmb3JjZVwiIHRvdXRlcyBsZXMgcG9zc2liaWxpdMOpcylcbiAgaXNXaW4oKSB7XG4gICAgY29uc3QgaWQgPSB0aGlzLmN1cnJlbnRQbGF5ZXIuaWQ7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmJvYXJkWzBdID09IGlkICYmIHRoaXMuYm9hcmRbMV0gPT0gaWQgJiYgdGhpcy5ib2FyZFsyXSA9PSBpZCkgfHxcbiAgICAgICh0aGlzLmJvYXJkWzNdID09IGlkICYmIHRoaXMuYm9hcmRbNF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs1XSA9PSBpZCkgfHxcbiAgICAgICh0aGlzLmJvYXJkWzZdID09IGlkICYmIHRoaXMuYm9hcmRbN10gPT0gaWQgJiYgdGhpcy5ib2FyZFs4XSA9PSBpZCkgfHxcbiAgICAgICh0aGlzLmJvYXJkWzBdID09IGlkICYmIHRoaXMuYm9hcmRbM10gPT0gaWQgJiYgdGhpcy5ib2FyZFs2XSA9PSBpZCkgfHxcbiAgICAgICh0aGlzLmJvYXJkWzFdID09IGlkICYmIHRoaXMuYm9hcmRbNF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs3XSA9PSBpZCkgfHxcbiAgICAgICh0aGlzLmJvYXJkWzJdID09IGlkICYmIHRoaXMuYm9hcmRbNV0gPT0gaWQgJiYgdGhpcy5ib2FyZFs4XSA9PSBpZCkgfHxcbiAgICAgICh0aGlzLmJvYXJkWzBdID09IGlkICYmIHRoaXMuYm9hcmRbNF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs4XSA9PSBpZCkgfHxcbiAgICAgICh0aGlzLmJvYXJkWzJdID09IGlkICYmIHRoaXMuYm9hcmRbNF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs2XSA9PSBpZClcbiAgICApO1xuICB9XG5cbiAgLy8gUmVudm9pZSB2cmFpIHMnaWwgeSBhIG1hdGNoIG51bCAoYXVjdW5lIGNhc2UpXG4gIGlzRHJhdygpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5maW5kKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAwKSA9PT0gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8vIENsYXNzZSBwb3VyIGfDqXJlciBsYSBwZXJzaXN0YW5jZSBkJ3VuIHRhYmxlYXUgZGUgam91ZXVyc1xuZXhwb3J0IGNsYXNzIFBsYXllcnNEYW8ge1xuICAvLyBTYXV2ZWdhcmRlIGxlIHRhYmxlYXUgZGUgam91ZXVycyBkYW5zIGxlIGxvY2FsIHN0b3JhZ2VcbiAgc3RhdGljIHNhdmVQbGF5ZXJzKHBsYXllcnMpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXllcnMnLCBKU09OLnN0cmluZ2lmeShwbGF5ZXJzKSk7XG4gIH1cblxuICAvLyBSw6ljdXDDqHJlIGxlIHRhYmxlYXUgZGUgam91ZXVycyBkYW5zIGxlIGxvY2FsIHN0b3JhZ2VcbiAgc3RhdGljIGdldEFsbFBsYXllcnMoKSB7XG4gICAgY29uc3Qgc3RyaW5nUGxheWVycyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxheWVycycpO1xuICAgIC8vIFNpIHRhYmxlYXUgbm9uIHN0b2Nrw6ksIG9uIHJlbnZvaWUgdW4gdGFibGVhdSB2aWRlXG4gICAgaWYgKHN0cmluZ1BsYXllcnMgPT09IG51bGwpIHJldHVybiBuZXcgQXJyYXkoKTtcbiAgICBlbHNlIHJldHVybiBKU09OLnBhcnNlKHN0cmluZ1BsYXllcnMpO1xuICB9XG59XG5cbi8vIENsYXNzZSBwb3VyIG1hbmlwdWxlciB1biB0YWJsZWF1IGRlIGpvdWV1cnNcbmV4cG9ydCBjbGFzcyBQbGF5ZXJzVXRpbHMge1xuICAvLyBSZWNoZXJjaGUgdW4gam91ZXVyIHBhciBzb24gbm9tIGRhbnMgdW4gdGFibGVhdSBkZSBqb3VldXJzXG4gIHN0YXRpYyBmaW5kUGxheWVyQnlOYW1lSW5BcnJheShwbGF5ZXJzLCBwbGF5ZXJOYW1lKSB7XG4gICAgcmV0dXJuIHBsYXllcnMuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09IHBsYXllck5hbWUpO1xuICB9XG5cbiAgLy8gTWV0IMOgIGpvdXIgb3UgYWpvdXRlIHVuIGpvdWV1ciBkYW5zIGxlIHRhYmxlYXUgZGUgam91ZXVyc1xuICBzdGF0aWMgYWRkT3JVcGRhdGVQbGF5ZXJJbkFycmF5KHBsYXllcnMsIHBsYXllcikge1xuICAgIGNvbnN0IHsgaWQsIC4uLnBhcnRpYWxQbGF5ZXIgfSA9IHBsYXllcjsgLy8gcGFydGlhbFBsYXllciA9IHBsYXllciBtb2lucyBsJ2lkIHF1J29uIG5lIHZldXQgcGFzIGVucmVnaXN0cmVyXG4gICAgY29uc3QgcGxheWVySW5kZXggPSBwbGF5ZXJzLmZpbmRJbmRleChcbiAgICAgIChlbGVtZW50KSA9PiBlbGVtZW50Lm5hbWUgPT0gcGxheWVyLm5hbWVcbiAgICApO1xuICAgIGlmIChwbGF5ZXJJbmRleCAhPSAtMSkge1xuICAgICAgcGxheWVyc1twbGF5ZXJJbmRleF0gPSBwYXJ0aWFsUGxheWVyOyAvLyBTaSBsZSBqb3VldXIgZXhpc3RlIGTDqWrDoCwgb24gbGUgbWV0IMOgIGpvdXJcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheWVycy5wdXNoKHBhcnRpYWxQbGF5ZXIpOyAvLyBTaW5vbiBvbiBsJ2Fqb3V0ZSDDoCBsYSBmaW5cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvcmRvdmFBUEkge1xuICBzdGF0aWMgdGFrZVBpY3R1cmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZShcbiAgICAgICAgKGltYWdlRGF0YSkgPT4gcmVzb2x2ZShpbWFnZURhdGEpLFxuICAgICAgICAoZXJyKSA9PiByZWplY3QoZXJyKSxcbiAgICAgICAge1xuICAgICAgICAgIC8vIHF1YWxpdMOpIGVuY29kYWdlIDUwJSwgZm9ybWF0IGJhc2U2NCAoZXQgSlBFRyBwYXIgZMOpZmF1dClcbiAgICAgICAgICBxdWFsaXR5OiA1MCxcbiAgICAgICAgICBkZXN0aW5hdGlvblR5cGU6IG5hdmlnYXRvci5jYW1lcmEuRGVzdGluYXRpb25UeXBlLkRBVEFfVVJMLFxuICAgICAgICAgIGVuY29kaW5nVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcbiAgICAgICAgICBtZWRpYVR5cGU6IG5hdmlnYXRvci5jYW1lcmEuTWVkaWFUeXBlLlBJQ1RVUkUsXG4gICAgICAgICAgY29ycmVjdE9yaWVudGF0aW9uOiB0cnVlLFxuICAgICAgICAgIHNvdXJjZVR5cGU6IG5hdmlnYXRvci5jYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgICAgIGNhbWVyYURpcmVjdGlvbjogbmF2aWdhdG9yLmNhbWVyYS5EaXJlY3Rpb24uRlJPTlQsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=