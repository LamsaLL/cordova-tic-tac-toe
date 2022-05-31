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
  currentPlayers: null, // Les joueurs courant
  currentGame: null, // La partie en train d'être jouée
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

    console.log({ players });
    const name1 = $('#playerName1').val();
    const name2 = $('#playerName2').val();
    console.log('lol');
    if (players.length == 2) {
      console.log('2 joueurs');
      const player1 = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(
        players,
        $('#playerName1').val()
      );
      const player2 = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(
        players,
        $('#playerName2').val()
      );
      console.log({ players });

      session.currentPlayers = players;

      $('#playerImg1').attr('src', player1.picture);
      $('#playerImg2').attr('src', player2.picture);
    } else {
      const picture1 =
        session.currentPlayers !== null ? session.currentPlayers.picture : '';
      const picture2 =
        session.currentPlayers !== null ? session.currentPlayers.picture : '';

      const newPlayers = [
        new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](1, name1, '', ''),
        new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](2, name2, '', ''),
      ];

      session.currentPlayers = [...newPlayers];

      $('#playerImg1').attr('src', session.currentPlayers.picture || '');
      $('#playerImg2').attr('src', session.currentPlayers.picture || '');
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
      console.log(`PLayer 2 :: ${session.currentPlayers[1]}`);
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
    console.log(`Current game :: ${session.currentGame}`);
    session.currentGame.play(playerMove);
    // Le score a changé => on sauvegarde la partie en cours
    _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].savePlayers([
      session.currentGame.player1,
      session.currentGame.player2,
    ]);
    // get current player
    const currentPlayer = session.currentGame.currentPlayer;
    console.log({ playerMove });
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
      this.endGame();
    }
    // On change le joueur courant
    session.currentGame.switchCurrentPlayer();

    $('h2[data-role="playerName"]').each(function () {
      $(this).html(`A ${session.currentGame.currentPlayer.name} de jouer`);
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
    $('#nbVictoires').html(session.currentGame.player1.nbWin);
    $('#nbNuls').html(session.currentGame.player1.nbDrawn);
    $('#nbDefaites').html(session.currentGame.player1.nbLoss);
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
/*! exports provided: Picture, Player, TicTacToe, PlayersDao, ScoreDao, PlayersUtils, CordovaAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Picture", function() { return Picture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicTacToe", function() { return TicTacToe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersDao", function() { return PlayersDao; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScoreDao", function() { return ScoreDao; });
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
  constructor(id, name, picture, nbWin = 0, nbLoss = 0, nbDrawn = 0) {
    this.id = id;
    this.name = name;
    this.picture = picture;
    this.nbWin = nbWin;
    this.nbLoss = nbLoss;
    this.nbDrawn = nbDrawn;
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
  isDrawn() {
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

class ScoreDao {
  static getScorePlayer(player) {}

  static saveScorePlayer(player) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3dy9qcy9tb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0M7O0FBRXBDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJmaWxlIjoianMvdGljVGFjVG9lLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vd3d3L2pzL2luZGV4LmpzXCIpO1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIE1vZHVsZSBDb250cm9sZXVyIGNvbnRpZW50IDpcbi8vIC0gdW4gb2JqZXQgc2Vzc2lvbiBjb250ZW5hbnQgbGVzIGRvbm7DqWVzIG1vZMOpbGlzYW50IGwnw6l0YXQgZGUgbCdhcHBsaWNhdGlvblxuLy8gLSB1bmUgZm9uY3Rpb24gXCJpbml0XCIgcG91ciBpbml0aWFsaXNlciBsJ2FwcGxpY2F0aW9uXG4vLyAtIHVuZSBjbGFzc2UgXCJjb250cm9sbGVyXCIgYWJzdHJhaXRlIHBvdXIgY2hhcXVlIHBhZ2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmltcG9ydCAqIGFzIG1vZGVsIGZyb20gJy4vbW9kZWwuanMnOyAvLyBsZSBjb250csO0bGV1ciB1dGlsaXNlIGxlIG1vZMOobGVcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNlc3Npb24gOiBjb25zdCBpYWJsZXMgcXVpIHJlcHLDqXNlbnRlbnQgbCfDqXRhdCBkZSBsJ2FwcGxpY2F0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jb25zdCBzZXNzaW9uID0ge1xuICBjdXJyZW50UGxheWVyczogbnVsbCwgLy8gTGVzIGpvdWV1cnMgY291cmFudFxuICBjdXJyZW50R2FtZTogbnVsbCwgLy8gTGEgcGFydGllIGVuIHRyYWluIGQnw6p0cmUgam91w6llXG59O1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gaW5pdCA6IGV4w6ljdXTDqWUgYXUgZMOpbWFycmFnZSBkZSBsJ2FwcGxpY2F0aW9uICh2b2lyIGZpY2hpZXIgaW5kZXguanMpXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy8gT24gZHVwbGlxdWUgSGVhZGVyIGV0IEZvb3RlciBzdXIgY2hhcXVlIHBhZ2UgKHNhdWYgbGEgcHJlbWnDqHJlICEpXG4gIGNvbnN0ICRoZWFkZXIgPSAkKCcjdGljVGFjVG9lSGVhZGVyJyk7XG4gIGNvbnN0ICRmb290ZXIgPSAkKCcjdGljVGFjVG9lRm9vdGVyJyk7XG4gICQoJ2RpdltkYXRhLXJvbGU9XCJwYWdlXCJdJykuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgIGlmIChpKSB7XG4gICAgICBjb25zdCAkY29udGVudCA9ICQodGhpcykuY2hpbGRyZW4oJzpmaXJzdCcpO1xuICAgICAgJGhlYWRlci5jbG9uZSgpLmluc2VydEJlZm9yZSgkY29udGVudCk7XG4gICAgICAkY29udGVudC5hZnRlcigkZm9vdGVyLmNsb25lKCkpO1xuICAgIH1cbiAgfSk7XG4gIC8vIE9uIGluaXRpYWxpc2UgbGVzIHBhZ2VzIChhdHRhY2hlciBsZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHByb3ByZXMgw6AgY2hhcXVlIHBhZ2UpXG4gIEhvbWVWaWV3Q29udHJvbGxlci5zZXRFdmVudHMoKTtcbiAgR2FtZVZpZXdDb250cm9sbGVyLnNldEV2ZW50cygpO1xuICBFbmRWaWV3Q29udHJvbGxlci5zZXRFdmVudHMoKTtcbiAgLy8gT24gbmF2aWd1ZSB2ZXJzIGxhIHBhZ2UgZCdhY2N1ZWlsXG4gICQubW9iaWxlLmNoYW5nZVBhZ2UoJyNob21lVmlldycpO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ29udHJvbGV1cnMgZGUgcGFnZXMgOiAxIGNvbnRyw7RsZXVyIHBhciBwYWdlLCBxdWkgcG9ydGUgbGUgbm9tIGRlIGxhIHBhZ2Vcbi8vICBldCBjb250aWVudCBsZXMgXCJoYW5kbGVyc1wiIGRlcyDDqXbDqW5lbWVudHMgYXNzb2Npw6lzIMOgIGNldHRlIHBhZ2Vcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIEhvbWVWaWV3Q29udHJvbGxlciB7XG4gIHN0YXRpYyBzZXRFdmVudHMoKSB7XG4gICAgLy8gZMOpZmluaXRpb24gZGVzIFwiaGFuZGxlcnNcIiBkJ8OpdsOpbmVtZW50cyBzdXIgbGEgcGFnZVxuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgJ3BhZ2ViZWZvcmVzaG93JyxcbiAgICAgICcjaG9tZVZpZXcnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgJCgnI2J0bk5ld0dhbWUnKS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubmV3R2FtZSgpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICAkKCcjYnRuUGhvdG8xJykub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRha2VQaWN0dXJlKHRydWUpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICAkKCcjYnRuUGhvdG8yJykub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnRha2VQaWN0dXJlKGZhbHNlKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgJCgnI3BsYXllck5hbWUxJykub24oXG4gICAgICAnaW5wdXQnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxvYWRQbGF5ZXIoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgJCgnI3BsYXllck5hbWUyJykub24oXG4gICAgICAnaW5wdXQnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxvYWRQbGF5ZXIoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgaW5pdCgpIHtcbiAgICAvLyBpbml0aWFsaXNhdGlvbiBkZSBsYSBwYWdlXG4gICAgJCgnI3BsYXllck5hbWUxJykudmFsKCcnKTtcbiAgICAkKCcjcGxheWVyTmFtZTInKS52YWwoJycpO1xuXG4gICAgJCgnI3BsYXllckltZzEnKS5hdHRyKCdzcmMnLCAnJyk7XG4gICAgJCgnI3BsYXllckltZzInKS5hdHRyKCdzcmMnLCAnJyk7XG4gIH1cblxuICBzdGF0aWMgbG9hZFBsYXllcigpIHtcbiAgICBjb25zdCBwbGF5ZXJzID0gbW9kZWwuUGxheWVyc0Rhby5nZXRBbGxQbGF5ZXJzKCk7XG5cbiAgICBjb25zb2xlLmxvZyh7IHBsYXllcnMgfSk7XG4gICAgY29uc3QgbmFtZTEgPSAkKCcjcGxheWVyTmFtZTEnKS52YWwoKTtcbiAgICBjb25zdCBuYW1lMiA9ICQoJyNwbGF5ZXJOYW1lMicpLnZhbCgpO1xuICAgIGNvbnNvbGUubG9nKCdsb2wnKTtcbiAgICBpZiAocGxheWVycy5sZW5ndGggPT0gMikge1xuICAgICAgY29uc29sZS5sb2coJzIgam91ZXVycycpO1xuICAgICAgY29uc3QgcGxheWVyMSA9IG1vZGVsLlBsYXllcnNVdGlscy5maW5kUGxheWVyQnlOYW1lSW5BcnJheShcbiAgICAgICAgcGxheWVycyxcbiAgICAgICAgJCgnI3BsYXllck5hbWUxJykudmFsKClcbiAgICAgICk7XG4gICAgICBjb25zdCBwbGF5ZXIyID0gbW9kZWwuUGxheWVyc1V0aWxzLmZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KFxuICAgICAgICBwbGF5ZXJzLFxuICAgICAgICAkKCcjcGxheWVyTmFtZTInKS52YWwoKVxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKHsgcGxheWVycyB9KTtcblxuICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVycyA9IHBsYXllcnM7XG5cbiAgICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgcGxheWVyMS5waWN0dXJlKTtcbiAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgcGxheWVyMi5waWN0dXJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGljdHVyZTEgPVxuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzICE9PSBudWxsID8gc2Vzc2lvbi5jdXJyZW50UGxheWVycy5waWN0dXJlIDogJyc7XG4gICAgICBjb25zdCBwaWN0dXJlMiA9XG4gICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnMgIT09IG51bGwgPyBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzLnBpY3R1cmUgOiAnJztcblxuICAgICAgY29uc3QgbmV3UGxheWVycyA9IFtcbiAgICAgICAgbmV3IG1vZGVsLlBsYXllcigxLCBuYW1lMSwgJycsICcnKSxcbiAgICAgICAgbmV3IG1vZGVsLlBsYXllcigyLCBuYW1lMiwgJycsICcnKSxcbiAgICAgIF07XG5cbiAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnMgPSBbLi4ubmV3UGxheWVyc107XG5cbiAgICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgc2Vzc2lvbi5jdXJyZW50UGxheWVycy5waWN0dXJlIHx8ICcnKTtcbiAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgc2Vzc2lvbi5jdXJyZW50UGxheWVycy5waWN0dXJlIHx8ICcnKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbmV3R2FtZSgpIHtcbiAgICAvLyBvbiByw6ljdXDDqHJlIGRlIGwnaW5mb3JtYXRpb24gZGUgbGEgdnVlIGVuIGNvdXJzXG4gICAgY29uc3QgcGxheWVyTmFtZTEgPSAkKCcjcGxheWVyTmFtZTEnKS52YWwoKTtcbiAgICBjb25zdCBwbGF5ZXJOYW1lMiA9ICQoJyNwbGF5ZXJOYW1lMicpLnZhbCgpO1xuXG4gICAgaWYgKHBsYXllck5hbWUxID09PSAnJyB8fCBwbGF5ZXJOYW1lMiA9PT0gJycpIHtcbiAgICAgIHBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Q2VudGVyKCdTYWlzaXIgdW4gbm9tIGRlIGpvdWV1cicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPbiB1dGlsaXNlIGxlIG1vZMOobGUgcG91ciBjcsOpZXIgdW5lIG5vdXZlbGxlIHBhcnRpZVxuICAgICAgY29uc29sZS5sb2coYFBMYXllciAyIDo6ICR7c2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXX1gKTtcbiAgICAgIHNlc3Npb24uY3VycmVudEdhbWUgPSBuZXcgbW9kZWwuVGljVGFjVG9lKFxuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdLFxuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzFdXG4gICAgICApOyAvLyBjaGFyZ2UgbGEgcGFydGllIGRlcHVpcyBsZSBsb2NhbHN0b3JhZ2VcbiAgICAgICQoJ2gyW2RhdGEtcm9sZT1cInBsYXllck5hbWVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5odG1sKGBBICR7c2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXS5uYW1lfSBkZSBqb3VlcmApO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEV0IG9uIHBhc3NlIMOgIHVuZSBhdXRyZSB2dWVcbiAgICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoJyNnYW1lVmlldycpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB0YWtlUGljdHVyZShpc1BsYXllcjEpIHtcbiAgICBtb2RlbC5Db3Jkb3ZhQVBJLnRha2VQaWN0dXJlKClcbiAgICAgIC50aGVuKChpbWFnZURhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coeyBpbWFnZURhdGEgfSk7XG4gICAgICAgIGlmIChpc1BsYXllcjEpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdKTtcbiAgICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdLnBpY3R1cmUgPVxuICAgICAgICAgICAgJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIGltYWdlRGF0YTtcbiAgICAgICAgICAkKCcjcGxheWVySW1nMScpLmF0dHIoJ3NyYycsIHNlc3Npb24uY3VycmVudFBsYXllcnNbMF0ucGljdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXS5waWN0dXJlID1cbiAgICAgICAgICAgICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBpbWFnZURhdGE7XG4gICAgICAgICAgJCgnI3BsYXllckltZzInKS5hdHRyKCdzcmMnLCBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzFdLnBpY3R1cmUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXS5waG90byA9ICcnO1xuICAgICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzFdLnBob3RvID0gJyc7XG4gICAgICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgJycpO1xuICAgICAgICAkKCcjcGxheWVySW1nMicpLmF0dHIoJ3NyYycsICcnKTtcbiAgICAgICAgY29uc29sZS5sb2coeyBlcnIgfSk7XG4gICAgICAgIHBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Q2VudGVyKCdFY2hlYyBQaG90byA6ICcgKyBlcnIubWVzc2FnZSk7XG4gICAgICB9KTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgR2FtZVZpZXdDb250cm9sbGVyIHtcbiAgc3RhdGljIHNldEV2ZW50cygpIHtcbiAgICAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAncGFnZWJlZm9yZXNob3cnLFxuICAgICAgJyNnYW1lVmlldycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAkKGAjYnRuJHtpfWApLm9uKFxuICAgICAgICAnY2xpY2snLFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5wbGF5KGkpO1xuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgLy8gaW5pdGlhbGlzYXRpb24gZGUgbGEgcGFnZVxuICAgIC8vIG9uIGFjdGl2ZSBldCBvbiBtb250cmUgdG91cyBsZXMgYm91dG9ucyBkdSBqb3VldXJcbiAgICAkKCdidXR0b25baWRePWJ0bkpvdWVyXScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnNob3coKTtcbiAgICAvLyBvbiBjYWNoZSB0b3V0ZXMgbGVzIHLDqXBvbnNlcyBkZSBsYSBtYWNoaW5lXG4gICAgJCgnaW1nW2lkXj1tYWNoaW5lXScpLmhpZGUoKTtcbiAgICAvLyBvbiBjYWNoZSBsYSBkaXYgcmVzdWx0YXRcbiAgICAkKCcjcmVzdWx0YXQnKS5oaWRlKCk7XG4gIH1cblxuICBzdGF0aWMgcGxheShwbGF5ZXJNb3ZlKSB7XG4gICAgLy8gbGUgam91ZXVyIGEgY2hvaXNpIHNvbiBjb3VwXG4gICAgLy8gT24gaW50ZXJyb2dlIGxlIG1vZMOobGUgcG91ciB2b2lyIGxlIHLDqXN1bHRhdCBkdSBub3V2ZWF1IGNvdXBcbiAgICBjb25zb2xlLmxvZyhgQ3VycmVudCBnYW1lIDo6ICR7c2Vzc2lvbi5jdXJyZW50R2FtZX1gKTtcbiAgICBzZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXkocGxheWVyTW92ZSk7XG4gICAgLy8gTGUgc2NvcmUgYSBjaGFuZ8OpID0+IG9uIHNhdXZlZ2FyZGUgbGEgcGFydGllIGVuIGNvdXJzXG4gICAgbW9kZWwuUGxheWVyc0Rhby5zYXZlUGxheWVycyhbXG4gICAgICBzZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXllcjEsXG4gICAgICBzZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXllcjIsXG4gICAgXSk7XG4gICAgLy8gZ2V0IGN1cnJlbnQgcGxheWVyXG4gICAgY29uc3QgY3VycmVudFBsYXllciA9IHNlc3Npb24uY3VycmVudEdhbWUuY3VycmVudFBsYXllcjtcbiAgICBjb25zb2xlLmxvZyh7IHBsYXllck1vdmUgfSk7XG4gICAgLy8gRXQgb24gbWV0IMOgIGpvdXIgbGEgdnVlIDpcbiAgICAvLyBPbiBkaXNhYmxlIGxlIGJvdXRvbiBqb3XDqSBwYXIgbGUgam91ZXVyIGV0IG9uIG1ldCBzb24gaW1hZ2VcbiAgICBzd2l0Y2ggKHBsYXllck1vdmUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgJCgnI2J0bjAnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjAgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2coJCgnI2J0MCA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICAkKCcjYnRuMScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnRuMSA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgJCgnI2J0bjInKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjIgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgICQoJyNidG4zJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgLy8gc2V0IGltYWdlIG9mIHBsYXllciB3aG8gcGxheWVkXG4gICAgICAgICQoJyNidG4zID4gaW1nW2RhdGEtcm9sZT1cInBsYXllckltZ1wiXScpLmF0dHIoXG4gICAgICAgICAgJ3NyYycsXG4gICAgICAgICAgY3VycmVudFBsYXllci5waWN0dXJlXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICAkKCcjYnRuNCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnRuNCA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgJCgnI2J0bjUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjUgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgJCgnI2J0bjYnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0bjYgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDc6XG4gICAgICAgICQoJyNidG43JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgLy8gc2V0IGltYWdlIG9mIHBsYXllciB3aG8gcGxheWVkXG4gICAgICAgICQoJyNidG43ID4gaW1nW2RhdGEtcm9sZT1cInBsYXllckltZ1wiXScpLmF0dHIoXG4gICAgICAgICAgJ3NyYycsXG4gICAgICAgICAgY3VycmVudFBsYXllci5waWN0dXJlXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OlxuICAgICAgICAkKCcjYnRuOCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnRuOCA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzZXNzaW9uLmN1cnJlbnRHYW1lLmlzV2luKCkpIHtcbiAgICAgIHRoaXMuZW5kR2FtZSgpO1xuICAgIH1cbiAgICAvLyBPbiBjaGFuZ2UgbGUgam91ZXVyIGNvdXJhbnRcbiAgICBzZXNzaW9uLmN1cnJlbnRHYW1lLnN3aXRjaEN1cnJlbnRQbGF5ZXIoKTtcblxuICAgICQoJ2gyW2RhdGEtcm9sZT1cInBsYXllck5hbWVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykuaHRtbChgQSAke3Nlc3Npb24uY3VycmVudEdhbWUuY3VycmVudFBsYXllci5uYW1lfSBkZSBqb3VlcmApO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGVuZEdhbWUoKSB7XG4gICAgJC5tb2JpbGUuY2hhbmdlUGFnZSgnI2VuZFZpZXcnKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgRW5kVmlld0NvbnRyb2xsZXIge1xuICBzdGF0aWMgc2V0RXZlbnRzKCkge1xuICAgIC8vIGTDqWZpbml0aW9uIGRlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgc3VyIGxhIHBhZ2VcbiAgICAkKGRvY3VtZW50KS5vbihcbiAgICAgICdwYWdlYmVmb3Jlc2hvdycsXG4gICAgICAnI2VuZFZpZXcnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgJCgnI2J0blJlcGxheScpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZXBsYXkoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG4gICAgLy8gJCgnI2J0blN1cHByaW1lcicpLm9uKFxuICAgIC8vICAgJ2NsaWNrJyxcbiAgICAvLyAgIGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgdGhpcy5zdXBwcmltZXJKb3VldXIoKTtcbiAgICAvLyAgIH0uYmluZCh0aGlzKVxuICAgIC8vICk7XG4gICAgJCgnI2J0bkJhY2tIb21lJykub24oXG4gICAgICAnY2xpY2snLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmJhY2tIb21lKCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGluaXQoKSB7XG4gICAgLy8gaW5pdGlhbGlzYXRpb24gZGUgbGEgcGFnZVxuICAgICQoJyNuYlZpY3RvaXJlcycpLmh0bWwoc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5ZXIxLm5iV2luKTtcbiAgICAkKCcjbmJOdWxzJykuaHRtbChzZXNzaW9uLmN1cnJlbnRHYW1lLnBsYXllcjEubmJEcmF3bik7XG4gICAgJCgnI25iRGVmYWl0ZXMnKS5odG1sKHNlc3Npb24uY3VycmVudEdhbWUucGxheWVyMS5uYkxvc3MpO1xuICB9XG5cbiAgc3RhdGljIHJlcGxheSgpIHtcbiAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKCcjZ2FtZVZpZXcnKTtcbiAgfVxuXG4gIC8vIHN0YXRpYyBzdXBwcmltZXJKb3VldXIoKSB7XG4gIC8vICAgbW9kZWwuSm91ZXVyREFPLnJlbW92ZUpvdWV1cihzZXNzaW9uLnBhcnRpZUVuQ291cnMuam91ZXVyLm5vbSk7XG4gIC8vICAgdGhpcy5yZXRvdXJBY2N1ZWlsKCk7XG4gIC8vIH1cblxuICBzdGF0aWMgYmFja0hvbWUoKSB7XG4gICAgJC5tb2JpbGUuY2hhbmdlUGFnZSgnI2hvbWVWaWV3Jyk7XG4gIH1cbn1cbiIsIi8vIG9uIGltcG9ydGUgdW5pcXVlbWVudCBsZSBtb2R1bGUgY29udHLDtGxldXJcbmltcG9ydCAqIGFzIGNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyLmpzJztcblxudmFyIGFwcCA9IHtcbiAgLy8gQXBwbGljYXRpb24gQ29uc3RydWN0b3JcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnZGV2aWNlcmVhZHknLFxuICAgICAgdGhpcy5vbkRldmljZVJlYWR5LmJpbmQodGhpcyksXG4gICAgICBmYWxzZVxuICAgICk7XG4gIH0sXG5cbiAgLy8gZGV2aWNlcmVhZHkgRXZlbnQgSGFuZGxlclxuICAvL1xuICAvLyBCaW5kIGFueSBjb3Jkb3ZhIGV2ZW50cyBoZXJlLiBDb21tb24gZXZlbnRzIGFyZTpcbiAgLy8gJ3BhdXNlJywgJ3Jlc3VtZScsIGV0Yy5cbiAgb25EZXZpY2VSZWFkeTogZnVuY3Rpb24gKCkge1xuICAgIGNvbnRyb2xsZXIuaW5pdCgpO1xuICAgIGNvbnNvbGUubG9nKCdsb2wnKTtcbiAgfSxcbn07XG5cbmFwcC5pbml0aWFsaXplKCk7XG4iLCIvLyBDbGFzc2UgcG91ciByZXByw6lzZW50ZXIgdW5lIGltYWdlXG5leHBvcnQgY2xhc3MgUGljdHVyZSB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICB9XG5cbiAgLy8gUmVudm9pZSBsJ2ltYWdlIGF1IGZvcm1hdCBCYXNlNjQgYXZlYyBlbi10w6p0ZSBNSU1FXG4gIGdldEJhc2U2NCgpIHtcbiAgICByZXR1cm4gJ2RhdGE6aW1hZ2UvanBlZztiYXNlNjQsJyArIHRoaXMuZGF0YTtcbiAgfVxufVxuXG4vLyBDbGFzc2UgcG91ciByZXByw6lzZW50ZXIgdW4gam91ZXVyXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoaWQsIG5hbWUsIHBpY3R1cmUsIG5iV2luID0gMCwgbmJMb3NzID0gMCwgbmJEcmF3biA9IDApIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBpY3R1cmUgPSBwaWN0dXJlO1xuICAgIHRoaXMubmJXaW4gPSBuYldpbjtcbiAgICB0aGlzLm5iTG9zcyA9IG5iTG9zcztcbiAgICB0aGlzLm5iRHJhd24gPSBuYkRyYXduO1xuICB9XG59XG5cbi8vIENsYXNzZSBwb3VyIHJlcHLDqXNlbnRlciB1bmUgcGFydGllIGRlIFRpY1RhY1RvZVxuZXhwb3J0IGNsYXNzIFRpY1RhY1RvZSB7XG4gIGNvbnN0cnVjdG9yKHBsYXllcjEsIHBsYXllcjIpIHtcbiAgICB0aGlzLnBsYXllcjEgPSBwbGF5ZXIxO1xuICAgIHRoaXMucGxheWVyMiA9IHBsYXllcjI7XG4gICAgdGhpcy5ib2FyZCA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gcGxheWVyMSA6IHBsYXllcjI7IC8vIExlIHByZW1pZXIgam91ZXVyIGVzdCBjaG9pc2kgYWzDqWF0b2lyZW1lbnRcbiAgfVxuXG4gIC8vIENoYW5nZXIgZGUgam91ZXVyIGNvdXJhbnRcbiAgc3dpdGNoQ3VycmVudFBsYXllcigpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50UGxheWVyID09PSB0aGlzLnBsYXllcjEpIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyMjtcbiAgICBlbHNlIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMucGxheWVyMTtcbiAgfVxuXG4gIC8vIExlIGpvdWV1ciBjb3VyYW50IGpvdWUgZW4gY2FzZUlkXG4gIHBsYXkoY2FzZUlkKSB7XG4gICAgdGhpcy5ib2FyZFtjYXNlSWRdID0gdGhpcy5jdXJyZW50UGxheWVyLmlkO1xuICB9XG5cbiAgLy8gUmVudm9pZSB2cmFpIHNpIGxlIGpvdWV1ciBjb3VyYW50IGEgZ2FnbsOpIChvbiB2w6lyaWZpZSBcImJydXQgZm9yY2VcIiB0b3V0ZXMgbGVzIHBvc3NpYmlsaXTDqXMpXG4gIGlzV2luKCkge1xuICAgIGNvbnN0IGlkID0gdGhpcy5jdXJyZW50UGxheWVyLmlkO1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzFdID09IGlkICYmIHRoaXMuYm9hcmRbMl0gPT0gaWQpIHx8XG4gICAgICAodGhpcy5ib2FyZFszXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbNV0gPT0gaWQpIHx8XG4gICAgICAodGhpcy5ib2FyZFs2XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzddID09IGlkICYmIHRoaXMuYm9hcmRbOF0gPT0gaWQpIHx8XG4gICAgICAodGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzNdID09IGlkICYmIHRoaXMuYm9hcmRbNl0gPT0gaWQpIHx8XG4gICAgICAodGhpcy5ib2FyZFsxXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbN10gPT0gaWQpIHx8XG4gICAgICAodGhpcy5ib2FyZFsyXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzVdID09IGlkICYmIHRoaXMuYm9hcmRbOF0gPT0gaWQpIHx8XG4gICAgICAodGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbOF0gPT0gaWQpIHx8XG4gICAgICAodGhpcy5ib2FyZFsyXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbNl0gPT0gaWQpXG4gICAgKTtcbiAgfVxuXG4gIC8vIFJlbnZvaWUgdnJhaSBzJ2lsIHkgYSBtYXRjaCBudWwgKGF1Y3VuZSBjYXNlKVxuICBpc0RyYXduKCkge1xuICAgIHJldHVybiB0aGlzLmJvYXJkLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IDApID09PSB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLy8gQ2xhc3NlIHBvdXIgZ8OpcmVyIGxhIHBlcnNpc3RhbmNlIGQndW4gdGFibGVhdSBkZSBqb3VldXJzXG5leHBvcnQgY2xhc3MgUGxheWVyc0RhbyB7XG4gIC8vIFNhdXZlZ2FyZGUgbGUgdGFibGVhdSBkZSBqb3VldXJzIGRhbnMgbGUgbG9jYWwgc3RvcmFnZVxuICBzdGF0aWMgc2F2ZVBsYXllcnMocGxheWVycykge1xuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGxheWVycycsIEpTT04uc3RyaW5naWZ5KHBsYXllcnMpKTtcbiAgfVxuXG4gIC8vIFLDqWN1cMOocmUgbGUgdGFibGVhdSBkZSBqb3VldXJzIGRhbnMgbGUgbG9jYWwgc3RvcmFnZVxuICBzdGF0aWMgZ2V0QWxsUGxheWVycygpIHtcbiAgICBjb25zdCBzdHJpbmdQbGF5ZXJzID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF5ZXJzJyk7XG4gICAgLy8gU2kgdGFibGVhdSBub24gc3RvY2vDqSwgb24gcmVudm9pZSB1biB0YWJsZWF1IHZpZGVcbiAgICBpZiAoc3RyaW5nUGxheWVycyA9PT0gbnVsbCkgcmV0dXJuIG5ldyBBcnJheSgpO1xuICAgIGVsc2UgcmV0dXJuIEpTT04ucGFyc2Uoc3RyaW5nUGxheWVycyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNjb3JlRGFvIHtcbiAgc3RhdGljIGdldFNjb3JlUGxheWVyKHBsYXllcikge31cblxuICBzdGF0aWMgc2F2ZVNjb3JlUGxheWVyKHBsYXllcikge31cbn1cblxuLy8gQ2xhc3NlIHBvdXIgbWFuaXB1bGVyIHVuIHRhYmxlYXUgZGUgam91ZXVyc1xuZXhwb3J0IGNsYXNzIFBsYXllcnNVdGlscyB7XG4gIC8vIFJlY2hlcmNoZSB1biBqb3VldXIgcGFyIHNvbiBub20gZGFucyB1biB0YWJsZWF1IGRlIGpvdWV1cnNcbiAgc3RhdGljIGZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KHBsYXllcnMsIHBsYXllck5hbWUpIHtcbiAgICByZXR1cm4gcGxheWVycy5maW5kKChlbGVtZW50KSA9PiBlbGVtZW50Lm5hbWUgPT0gcGxheWVyTmFtZSk7XG4gIH1cblxuICAvLyBNZXQgw6Agam91ciBvdSBham91dGUgdW4gam91ZXVyIGRhbnMgbGUgdGFibGVhdSBkZSBqb3VldXJzXG4gIHN0YXRpYyBhZGRPclVwZGF0ZVBsYXllckluQXJyYXkocGxheWVycywgcGxheWVyKSB7XG4gICAgY29uc3QgeyBpZCwgLi4ucGFydGlhbFBsYXllciB9ID0gcGxheWVyOyAvLyBwYXJ0aWFsUGxheWVyID0gcGxheWVyIG1vaW5zIGwnaWQgcXUnb24gbmUgdmV1dCBwYXMgZW5yZWdpc3RyZXJcbiAgICBjb25zdCBwbGF5ZXJJbmRleCA9IHBsYXllcnMuZmluZEluZGV4KFxuICAgICAgKGVsZW1lbnQpID0+IGVsZW1lbnQubmFtZSA9PSBwbGF5ZXIubmFtZVxuICAgICk7XG4gICAgaWYgKHBsYXllckluZGV4ICE9IC0xKSB7XG4gICAgICBwbGF5ZXJzW3BsYXllckluZGV4XSA9IHBhcnRpYWxQbGF5ZXI7IC8vIFNpIGxlIGpvdWV1ciBleGlzdGUgZMOpasOgLCBvbiBsZSBtZXQgw6Agam91clxuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXJzLnB1c2gocGFydGlhbFBsYXllcik7IC8vIFNpbm9uIG9uIGwnYWpvdXRlIMOgIGxhIGZpblxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29yZG92YUFQSSB7XG4gIHN0YXRpYyB0YWtlUGljdHVyZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbmF2aWdhdG9yLmNhbWVyYS5nZXRQaWN0dXJlKFxuICAgICAgICAoaW1hZ2VEYXRhKSA9PiByZXNvbHZlKGltYWdlRGF0YSksXG4gICAgICAgIChlcnIpID0+IHJlamVjdChlcnIpLFxuICAgICAgICB7XG4gICAgICAgICAgLy8gcXVhbGl0w6kgZW5jb2RhZ2UgNTAlLCBmb3JtYXQgYmFzZTY0IChldCBKUEVHIHBhciBkw6lmYXV0KVxuICAgICAgICAgIHF1YWxpdHk6IDUwLFxuICAgICAgICAgIGRlc3RpbmF0aW9uVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5EZXN0aW5hdGlvblR5cGUuREFUQV9VUkwsXG4gICAgICAgICAgZW5jb2RpbmdUeXBlOiBuYXZpZ2F0b3IuY2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxuICAgICAgICAgIG1lZGlhVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5NZWRpYVR5cGUuUElDVFVSRSxcbiAgICAgICAgICBjb3JyZWN0T3JpZW50YXRpb246IHRydWUsXG4gICAgICAgICAgc291cmNlVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXG4gICAgICAgICAgY2FtZXJhRGlyZWN0aW9uOiBuYXZpZ2F0b3IuY2FtZXJhLkRpcmVjdGlvbi5GUk9OVCxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==