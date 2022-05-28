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

    if (players.length == 2) {
      const player1 = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(
        players,
        $('#playerName1').val()
      );
      const player2 = _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(
        players,
        $('#playerName2').val()
      );
      session.currentPlayers = players;
      $('#playerImg1').attr('src', player1.picture);
      $('#playerImg2').attr('src', player2.picture);
    } else {
      session.currentPlayers = [
        new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](1, name1, '', ''),
        new _model_js__WEBPACK_IMPORTED_MODULE_0__["Player"](2, name2, '', ''),
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
      session.currentGame = new _model_js__WEBPACK_IMPORTED_MODULE_0__["TicTacToe"](
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
    session.currentGame.play(playerMove);
    // Le score a changé => on sauvegarde la partie en cours
    _model_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].savePlayers([
      session.currentGame.player1,
      session.currentGame.player2,
    ]);
    // get current player
    const currentPlayer = _model_js__WEBPACK_IMPORTED_MODULE_0__["TicTacToe"].currentPlayer;

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

    if (_model_js__WEBPACK_IMPORTED_MODULE_0__["TicTacToe"].isWin()) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3dy9qcy9tb2RlbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0M7O0FBRXBDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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c291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi93d3cvanMvaW5kZXguanNcIik7XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gTW9kdWxlIENvbnRyb2xldXIgY29udGllbnQgOlxuLy8gLSB1biBvYmpldCBzZXNzaW9uIGNvbnRlbmFudCBsZXMgZG9ubsOpZXMgbW9kw6lsaXNhbnQgbCfDqXRhdCBkZSBsJ2FwcGxpY2F0aW9uXG4vLyAtIHVuZSBmb25jdGlvbiBcImluaXRcIiBwb3VyIGluaXRpYWxpc2VyIGwnYXBwbGljYXRpb25cbi8vIC0gdW5lIGNsYXNzZSBcImNvbnRyb2xsZXJcIiBhYnN0cmFpdGUgcG91ciBjaGFxdWUgcGFnZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuaW1wb3J0ICogYXMgbW9kZWwgZnJvbSAnLi9tb2RlbC5qcyc7IC8vIGxlIGNvbnRyw7RsZXVyIHV0aWxpc2UgbGUgbW9kw6hsZVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU2Vzc2lvbiA6IGNvbnN0IGlhYmxlcyBxdWkgcmVwcsOpc2VudGVudCBsJ8OpdGF0IGRlIGwnYXBwbGljYXRpb25cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNvbnN0IHNlc3Npb24gPSB7XG4gIGN1cnJlbnRQbGF5ZXJzOiBudWxsLCAvLyBMZXMgam91ZXVycyBjb3VyYW50XG4gIGN1cnJlbnRHYW1lOiBudWxsLCAvLyBMYSBwYXJ0aWUgZW4gdHJhaW4gZCfDqnRyZSBqb3XDqWVcbn07XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBpbml0IDogZXjDqWN1dMOpZSBhdSBkw6ltYXJyYWdlIGRlIGwnYXBwbGljYXRpb24gKHZvaXIgZmljaGllciBpbmRleC5qcylcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAvLyBPbiBkdXBsaXF1ZSBIZWFkZXIgZXQgRm9vdGVyIHN1ciBjaGFxdWUgcGFnZSAoc2F1ZiBsYSBwcmVtacOocmUgISlcbiAgY29uc3QgJGhlYWRlciA9ICQoJyN0aWNUYWNUb2VIZWFkZXInKTtcbiAgY29uc3QgJGZvb3RlciA9ICQoJyN0aWNUYWNUb2VGb290ZXInKTtcbiAgJCgnZGl2W2RhdGEtcm9sZT1cInBhZ2VcIl0nKS5lYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgaWYgKGkpIHtcbiAgICAgIGNvbnN0ICRjb250ZW50ID0gJCh0aGlzKS5jaGlsZHJlbignOmZpcnN0Jyk7XG4gICAgICAkaGVhZGVyLmNsb25lKCkuaW5zZXJ0QmVmb3JlKCRjb250ZW50KTtcbiAgICAgICRjb250ZW50LmFmdGVyKCRmb290ZXIuY2xvbmUoKSk7XG4gICAgfVxuICB9KTtcbiAgLy8gT24gaW5pdGlhbGlzZSBsZXMgcGFnZXMgKGF0dGFjaGVyIGxlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgcHJvcHJlcyDDoCBjaGFxdWUgcGFnZSlcbiAgSG9tZVZpZXdDb250cm9sbGVyLnNldEV2ZW50cygpO1xuICBHYW1lVmlld0NvbnRyb2xsZXIuc2V0RXZlbnRzKCk7XG4gIEVuZFZpZXdDb250cm9sbGVyLnNldEV2ZW50cygpO1xuICAvLyBPbiBuYXZpZ3VlIHZlcnMgbGEgcGFnZSBkJ2FjY3VlaWxcbiAgJC5tb2JpbGUuY2hhbmdlUGFnZSgnI2hvbWVWaWV3Jyk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDb250cm9sZXVycyBkZSBwYWdlcyA6IDEgY29udHLDtGxldXIgcGFyIHBhZ2UsIHF1aSBwb3J0ZSBsZSBub20gZGUgbGEgcGFnZVxuLy8gIGV0IGNvbnRpZW50IGxlcyBcImhhbmRsZXJzXCIgZGVzIMOpdsOpbmVtZW50cyBhc3NvY2nDqXMgw6AgY2V0dGUgcGFnZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSG9tZVZpZXdDb250cm9sbGVyIHtcbiAgc3RhdGljIHNldEV2ZW50cygpIHtcbiAgICAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAncGFnZWJlZm9yZXNob3cnLFxuICAgICAgJyNob21lVmlldycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICAkKCcjYnRuTmV3R2FtZScpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5uZXdHYW1lKCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNidG5QaG90bzEnKS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGFrZVBpY3R1cmUodHJ1ZSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNidG5QaG90bzInKS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMudGFrZVBpY3R1cmUoZmFsc2UpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICAkKCcjcGxheWVyTmFtZTEnKS5vbihcbiAgICAgICdpbnB1dCcsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubG9hZFBsYXllcigpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICAkKCcjcGxheWVyTmFtZTInKS5vbihcbiAgICAgICdpbnB1dCcsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubG9hZFBsYXllcigpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAkKCcjcGxheWVyTmFtZTEnKS52YWwoJycpO1xuICAgICQoJyNwbGF5ZXJOYW1lMicpLnZhbCgnJyk7XG5cbiAgICAkKCcjcGxheWVySW1nMScpLmF0dHIoJ3NyYycsICcnKTtcbiAgICAkKCcjcGxheWVySW1nMicpLmF0dHIoJ3NyYycsICcnKTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkUGxheWVyKCkge1xuICAgIGNvbnN0IHBsYXllcnMgPSBtb2RlbC5QbGF5ZXJzRGFvLmdldEFsbFBsYXllcnMoKTtcbiAgICBjb25zb2xlLmxvZyh7IHBsYXllcnMgfSk7XG4gICAgY29uc3QgbmFtZTEgPSAkKCcjcGxheWVyTmFtZTEnKS52YWwoKTtcbiAgICBjb25zdCBuYW1lMiA9ICQoJyNwbGF5ZXJOYW1lMicpLnZhbCgpO1xuXG4gICAgaWYgKHBsYXllcnMubGVuZ3RoID09IDIpIHtcbiAgICAgIGNvbnN0IHBsYXllcjEgPSBtb2RlbC5QbGF5ZXJzVXRpbHMuZmluZFBsYXllckJ5TmFtZUluQXJyYXkoXG4gICAgICAgIHBsYXllcnMsXG4gICAgICAgICQoJyNwbGF5ZXJOYW1lMScpLnZhbCgpXG4gICAgICApO1xuICAgICAgY29uc3QgcGxheWVyMiA9IG1vZGVsLlBsYXllcnNVdGlscy5maW5kUGxheWVyQnlOYW1lSW5BcnJheShcbiAgICAgICAgcGxheWVycyxcbiAgICAgICAgJCgnI3BsYXllck5hbWUyJykudmFsKClcbiAgICAgICk7XG4gICAgICBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzID0gcGxheWVycztcbiAgICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgcGxheWVyMS5waWN0dXJlKTtcbiAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgcGxheWVyMi5waWN0dXJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVycyA9IFtcbiAgICAgICAgbmV3IG1vZGVsLlBsYXllcigxLCBuYW1lMSwgJycsICcnKSxcbiAgICAgICAgbmV3IG1vZGVsLlBsYXllcigyLCBuYW1lMiwgJycsICcnKSxcbiAgICAgIF07XG5cbiAgICAgIGNvbnNvbGUubG9nKHsgc2Vzc2lvbiB9KTtcbiAgICAgICQoJyNwbGF5ZXJJbWcxJykuYXR0cignc3JjJywgJycpO1xuICAgICAgJCgnI3BsYXllckltZzInKS5hdHRyKCdzcmMnLCAnJyk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBwbGF5ZXJzIDogJHtKU09OLnN0cmluZ2lmeShzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzKX1gKTtcbiAgfVxuXG4gIHN0YXRpYyBuZXdHYW1lKCkge1xuICAgIC8vIG9uIHLDqWN1cMOocmUgZGUgbCdpbmZvcm1hdGlvbiBkZSBsYSB2dWUgZW4gY291cnNcbiAgICBjb25zdCBwbGF5ZXJOYW1lMSA9ICQoJyNwbGF5ZXJOYW1lMScpLnZhbCgpO1xuICAgIGNvbnN0IHBsYXllck5hbWUyID0gJCgnI3BsYXllck5hbWUyJykudmFsKCk7XG5cbiAgICBpZiAocGxheWVyTmFtZTEgPT09ICcnIHx8IHBsYXllck5hbWUyID09PSAnJykge1xuICAgICAgcGx1Z2lucy50b2FzdC5zaG93U2hvcnRDZW50ZXIoJ1NhaXNpciB1biBub20gZGUgam91ZXVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE9uIHV0aWxpc2UgbGUgbW9kw6hsZSBwb3VyIGNyw6llciB1bmUgbm91dmVsbGUgcGFydGllXG4gICAgICBzZXNzaW9uLmN1cnJlbnRHYW1lID0gbmV3IG1vZGVsLlRpY1RhY1RvZShcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXSxcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXVxuICAgICAgKTsgLy8gY2hhcmdlIGxhIHBhcnRpZSBkZXB1aXMgbGUgbG9jYWxzdG9yYWdlXG4gICAgICAvLyBPbiBcInByb3BhZ2VcIiBsZSBub20gZHUgam91ZXVyIHN1ciB0b3V0ZXMgbGVzIHZ1ZXNcbiAgICAgICQoJ2gyW2RhdGEtcm9sZT1cInBsYXllck5hbWVcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5odG1sKGBBICR7c2Vzc2lvbi5jdXJyZW50UGxheWVycy5ub219IGRlIGpvdWVyYCk7XG4gICAgICB9KTtcbiAgICAgIC8vIE9uIFwicHJvcGFnZVwiIGxhIHBob3RvIGR1IGpvdWV1ciBzdXIgdG91dGVzIGxlcyB2dWVzXG4gICAgICAvLyAkKCdpbWdbZGF0YS1yb2xlPVwicGhvdG9Kb3VldXJcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICAgJCh0aGlzKS5hdHRyKCdzcmMnLCBzZXNzaW9uLmpvdWV1ckVuQ291cnMucGhvdG8pO1xuICAgICAgLy8gfSk7XG4gICAgICAvLyBFdCBvbiBwYXNzZSDDoCB1bmUgYXV0cmUgdnVlXG4gICAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKCcjZ2FtZVZpZXcnKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdGFrZVBpY3R1cmUoaXNQbGF5ZXIxKSB7XG4gICAgbW9kZWwuQ29yZG92YUFQSS50YWtlUGljdHVyZSgpXG4gICAgICAudGhlbigoaW1hZ2VEYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHsgaW1hZ2VEYXRhIH0pO1xuICAgICAgICBpZiAoaXNQbGF5ZXIxKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXSk7XG4gICAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1swXS5waWN0dXJlID1cbiAgICAgICAgICAgICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyBpbWFnZURhdGE7XG4gICAgICAgICAgJCgnI3BsYXllckltZzEnKS5hdHRyKCdzcmMnLCBzZXNzaW9uLmN1cnJlbnRQbGF5ZXJzWzBdLnBpY3R1cmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnNbMV0ucGljdHVyZSA9XG4gICAgICAgICAgICAnZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCwnICsgaW1hZ2VEYXRhO1xuICAgICAgICAgICQoJyNwbGF5ZXJJbWcyJykuYXR0cignc3JjJywgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXS5waWN0dXJlKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHNlc3Npb24uY3VycmVudFBsYXllcnNbMF0ucGhvdG8gPSAnJztcbiAgICAgICAgc2Vzc2lvbi5jdXJyZW50UGxheWVyc1sxXS5waG90byA9ICcnO1xuICAgICAgICAkKCcjcGxheWVySW1nMScpLmF0dHIoJ3NyYycsICcnKTtcbiAgICAgICAgJCgnI3BsYXllckltZzInKS5hdHRyKCdzcmMnLCAnJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHsgZXJyIH0pO1xuICAgICAgICBwbHVnaW5zLnRvYXN0LnNob3dTaG9ydENlbnRlcignRWNoZWMgUGhvdG8gOiAnICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIEdhbWVWaWV3Q29udHJvbGxlciB7XG4gIHN0YXRpYyBzZXRFdmVudHMoKSB7XG4gICAgLy8gZMOpZmluaXRpb24gZGVzIFwiaGFuZGxlcnNcIiBkJ8OpdsOpbmVtZW50cyBzdXIgbGEgcGFnZVxuICAgICQoZG9jdW1lbnQpLm9uKFxuICAgICAgJ3BhZ2ViZWZvcmVzaG93JyxcbiAgICAgICcjZ2FtZVZpZXcnLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgICk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgJChgI2J0biR7aX1gKS5vbihcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucGxheShpKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAvLyBvbiBhY3RpdmUgZXQgb24gbW9udHJlIHRvdXMgbGVzIGJvdXRvbnMgZHUgam91ZXVyXG4gICAgJCgnYnV0dG9uW2lkXj1idG5Kb3Vlcl0nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5zaG93KCk7XG4gICAgLy8gb24gY2FjaGUgdG91dGVzIGxlcyByw6lwb25zZXMgZGUgbGEgbWFjaGluZVxuICAgICQoJ2ltZ1tpZF49bWFjaGluZV0nKS5oaWRlKCk7XG4gICAgLy8gb24gY2FjaGUgbGEgZGl2IHJlc3VsdGF0XG4gICAgJCgnI3Jlc3VsdGF0JykuaGlkZSgpO1xuICB9XG5cbiAgc3RhdGljIHBsYXkocGxheWVyTW92ZSkge1xuICAgIC8vIGxlIGpvdWV1ciBhIGNob2lzaSBzb24gY291cFxuICAgIC8vIE9uIGludGVycm9nZSBsZSBtb2TDqGxlIHBvdXIgdm9pciBsZSByw6lzdWx0YXQgZHUgbm91dmVhdSBjb3VwXG4gICAgc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5KHBsYXllck1vdmUpO1xuICAgIC8vIExlIHNjb3JlIGEgY2hhbmfDqSA9PiBvbiBzYXV2ZWdhcmRlIGxhIHBhcnRpZSBlbiBjb3Vyc1xuICAgIG1vZGVsLlBsYXllcnNEYW8uc2F2ZVBsYXllcnMoW1xuICAgICAgc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5ZXIxLFxuICAgICAgc2Vzc2lvbi5jdXJyZW50R2FtZS5wbGF5ZXIyLFxuICAgIF0pO1xuICAgIC8vIGdldCBjdXJyZW50IHBsYXllclxuICAgIGNvbnN0IGN1cnJlbnRQbGF5ZXIgPSBtb2RlbC5UaWNUYWNUb2UuY3VycmVudFBsYXllcjtcblxuICAgIC8vIEV0IG9uIG1ldCDDoCBqb3VyIGxhIHZ1ZSA6XG4gICAgLy8gT24gZGlzYWJsZSBsZSBib3V0b24gam91w6kgcGFyIGxlIGpvdWV1ciBldCBvbiBtZXQgc29uIGltYWdlXG4gICAgc3dpdGNoIChwbGF5ZXJNb3ZlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgICQoJyNidG4wJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgLy8gc2V0IGltYWdlIG9mIHBsYXllciB3aG8gcGxheWVkXG4gICAgICAgICQoJyNidDAgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgJCgnI2J0bjEnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0MSA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgY2FzZSAyOlxuICAgICAgICAkKCcjYnRuMicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnQyID4gaW1nW2RhdGEtcm9sZT1cInBsYXllckltZ1wiXScpLmF0dHIoXG4gICAgICAgICAgJ3NyYycsXG4gICAgICAgICAgY3VycmVudFBsYXllci5waWN0dXJlXG4gICAgICAgICk7XG4gICAgICBjYXNlIDM6XG4gICAgICAgICQoJyNidG4zJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgLy8gc2V0IGltYWdlIG9mIHBsYXllciB3aG8gcGxheWVkXG4gICAgICAgICQoJyNidDMgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgJCgnI2J0bjQnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0NCA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgY2FzZSA1OlxuICAgICAgICAkKCcjYnRuNScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnQ1ID4gaW1nW2RhdGEtcm9sZT1cInBsYXllckltZ1wiXScpLmF0dHIoXG4gICAgICAgICAgJ3NyYycsXG4gICAgICAgICAgY3VycmVudFBsYXllci5waWN0dXJlXG4gICAgICAgICk7XG4gICAgICBjYXNlIDY6XG4gICAgICAgICQoJyNidG42JykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgLy8gc2V0IGltYWdlIG9mIHBsYXllciB3aG8gcGxheWVkXG4gICAgICAgICQoJyNidDYgPiBpbWdbZGF0YS1yb2xlPVwicGxheWVySW1nXCJdJykuYXR0cihcbiAgICAgICAgICAnc3JjJyxcbiAgICAgICAgICBjdXJyZW50UGxheWVyLnBpY3R1cmVcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgJCgnI2J0bjcnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAvLyBzZXQgaW1hZ2Ugb2YgcGxheWVyIHdobyBwbGF5ZWRcbiAgICAgICAgJCgnI2J0NyA+IGltZ1tkYXRhLXJvbGU9XCJwbGF5ZXJJbWdcIl0nKS5hdHRyKFxuICAgICAgICAgICdzcmMnLFxuICAgICAgICAgIGN1cnJlbnRQbGF5ZXIucGljdHVyZVxuICAgICAgICApO1xuICAgICAgY2FzZSA4OlxuICAgICAgICAkKCcjYnRuOCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIC8vIHNldCBpbWFnZSBvZiBwbGF5ZXIgd2hvIHBsYXllZFxuICAgICAgICAkKCcjYnQ4ID4gaW1nW2RhdGEtcm9sZT1cInBsYXllckltZ1wiXScpLmF0dHIoXG4gICAgICAgICAgJ3NyYycsXG4gICAgICAgICAgY3VycmVudFBsYXllci5waWN0dXJlXG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAobW9kZWwuVGljVGFjVG9lLmlzV2luKCkpIHtcbiAgICAgIHRoaXMuZW5kR2FtZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBlbmRHYW1lKCkge1xuICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoJyNlbmRWaWV3Jyk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmNsYXNzIEVuZFZpZXdDb250cm9sbGVyIHtcbiAgc3RhdGljIHNldEV2ZW50cygpIHtcbiAgICAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgJChkb2N1bWVudCkub24oXG4gICAgICAncGFnZWJlZm9yZXNob3cnLFxuICAgICAgJyNlbmRWaWV3JyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgICQoJyNidG5SZXBsYXknKS5vbihcbiAgICAgICdjbGljaycsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVwbGF5KCk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICApO1xuICAgIC8vICQoJyNidG5TdXBwcmltZXInKS5vbihcbiAgICAvLyAgICdjbGljaycsXG4gICAgLy8gICBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIHRoaXMuc3VwcHJpbWVySm91ZXVyKCk7XG4gICAgLy8gICB9LmJpbmQodGhpcylcbiAgICAvLyApO1xuICAgICQoJyNidG5CYWNrSG9tZScpLm9uKFxuICAgICAgJ2NsaWNrJyxcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5iYWNrSG9tZSgpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0KCkge1xuICAgIC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAkKCcjbmJWaWN0b2lyZXMnKS5odG1sKHNlc3Npb24uY3VycmVudEdhbWUuam91ZXVyLnZpY3RvaXJlcyk7XG4gICAgJCgnI25iTnVscycpLmh0bWwoc2Vzc2lvbi5jdXJyZW50R2FtZS5qb3VldXIubnVscyk7XG4gICAgJCgnI25iRGVmYWl0ZXMnKS5odG1sKHNlc3Npb24uY3VycmVudEdhbWUuam91ZXVyLmRlZmFpdGVzKTtcbiAgfVxuXG4gIHN0YXRpYyByZXBsYXkoKSB7XG4gICAgJC5tb2JpbGUuY2hhbmdlUGFnZSgnI2dhbWVWaWV3Jyk7XG4gIH1cblxuICAvLyBzdGF0aWMgc3VwcHJpbWVySm91ZXVyKCkge1xuICAvLyAgIG1vZGVsLkpvdWV1ckRBTy5yZW1vdmVKb3VldXIoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmpvdWV1ci5ub20pO1xuICAvLyAgIHRoaXMucmV0b3VyQWNjdWVpbCgpO1xuICAvLyB9XG5cbiAgc3RhdGljIGJhY2tIb21lKCkge1xuICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoJyNob21lVmlldycpO1xuICB9XG59XG4iLCIvLyBvbiBpbXBvcnRlIHVuaXF1ZW1lbnQgbGUgbW9kdWxlIGNvbnRyw7RsZXVyXG5pbXBvcnQgKiBhcyBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlci5qcyc7XG5cbnZhciBhcHAgPSB7XG4gIC8vIEFwcGxpY2F0aW9uIENvbnN0cnVjdG9yXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ2RldmljZXJlYWR5JyxcbiAgICAgIHRoaXMub25EZXZpY2VSZWFkeS5iaW5kKHRoaXMpLFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9LFxuXG4gIC8vIGRldmljZXJlYWR5IEV2ZW50IEhhbmRsZXJcbiAgLy9cbiAgLy8gQmluZCBhbnkgY29yZG92YSBldmVudHMgaGVyZS4gQ29tbW9uIGV2ZW50cyBhcmU6XG4gIC8vICdwYXVzZScsICdyZXN1bWUnLCBldGMuXG4gIG9uRGV2aWNlUmVhZHk6IGZ1bmN0aW9uICgpIHtcbiAgICBjb250cm9sbGVyLmluaXQoKTtcbiAgICBjb25zb2xlLmxvZygnbG9sJyk7XG4gIH0sXG59O1xuXG5hcHAuaW5pdGlhbGl6ZSgpO1xuIiwiLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuZSBpbWFnZVxuZXhwb3J0IGNsYXNzIFBpY3R1cmUge1xuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgfVxuXG4gIC8vIFJlbnZvaWUgbCdpbWFnZSBhdSBmb3JtYXQgQmFzZTY0IGF2ZWMgZW4tdMOqdGUgTUlNRVxuICBnZXRCYXNlNjQoKSB7XG4gICAgcmV0dXJuICdkYXRhOmltYWdlL2pwZWc7YmFzZTY0LCcgKyB0aGlzLmRhdGE7XG4gIH1cbn1cblxuLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuIGpvdWV1clxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKGlkLCBuYW1lLCBwaWN0dXJlLCBuYldpbiA9IDAsIG5iTG9zcyA9IDAsIG5iRHJhd24gPSAwKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5waWN0dXJlID0gcGljdHVyZTtcbiAgICB0aGlzLm5iV2luID0gbmJXaW47XG4gICAgdGhpcy5uYkxvc3MgPSBuYkxvc3M7XG4gICAgdGhpcy5uYkRyYXduID0gbmJEcmF3bjtcbiAgfVxufVxuXG4vLyBDbGFzc2UgcG91ciByZXByw6lzZW50ZXIgdW5lIHBhcnRpZSBkZSBUaWNUYWNUb2VcbmV4cG9ydCBjbGFzcyBUaWNUYWNUb2Uge1xuICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKSB7XG4gICAgdGhpcy5wbGF5ZXIxID0gcGxheWVyMTtcbiAgICB0aGlzLnBsYXllcjIgPSBwbGF5ZXIyO1xuICAgIHRoaXMuYm9hcmQgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gICAgdGhpcy5jdXJyZW50UGxheWVyID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IHBsYXllcjEgOiBwbGF5ZXIyOyAvLyBMZSBwcmVtaWVyIGpvdWV1ciBlc3QgY2hvaXNpIGFsw6lhdG9pcmVtZW50XG4gIH1cblxuICAvLyBDaGFuZ2VyIGRlIGpvdWV1ciBjb3VyYW50XG4gIHN3aXRjaEN1cnJlbnRQbGF5ZXIoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIxKSB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjI7XG4gICAgZWxzZSB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjE7XG4gIH1cblxuICAvLyBMZSBqb3VldXIgY291cmFudCBqb3VlIGVuIGNhc2VJZFxuICBwbGF5KGNhc2VJZCkge1xuICAgIHRoaXMuYm9hcmRbY2FzZUlkXSA9IHRoaXMuY3VycmVudFBsYXllci5pZDtcbiAgfVxuXG4gIC8vIFJlbnZvaWUgdnJhaSBzaSBsZSBqb3VldXIgY291cmFudCBhIGdhZ27DqSAob24gdsOpcmlmaWUgXCJicnV0IGZvcmNlXCIgdG91dGVzIGxlcyBwb3NzaWJpbGl0w6lzKVxuICBpc1dpbigpIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuY3VycmVudFBsYXllci5pZDtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMuYm9hcmRbMF0gPT0gaWQgJiYgdGhpcy5ib2FyZFsxXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzJdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbM10gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzVdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbNl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs3XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzhdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMF0gPT0gaWQgJiYgdGhpcy5ib2FyZFszXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzZdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMV0gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzddID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs1XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzhdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzhdID09IGlkKSB8fFxuICAgICAgKHRoaXMuYm9hcmRbMl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzZdID09IGlkKVxuICAgICk7XG4gIH1cblxuICAvLyBSZW52b2llIHZyYWkgcydpbCB5IGEgbWF0Y2ggbnVsIChhdWN1bmUgY2FzZSlcbiAgaXNEcmF3bigpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZC5maW5kKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSAwKSA9PT0gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8vIENsYXNzZSBwb3VyIGfDqXJlciBsYSBwZXJzaXN0YW5jZSBkJ3VuIHRhYmxlYXUgZGUgam91ZXVyc1xuZXhwb3J0IGNsYXNzIFBsYXllcnNEYW8ge1xuICAvLyBTYXV2ZWdhcmRlIGxlIHRhYmxlYXUgZGUgam91ZXVycyBkYW5zIGxlIGxvY2FsIHN0b3JhZ2VcbiAgc3RhdGljIHNhdmVQbGF5ZXJzKHBsYXllcnMpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXllcnMnLCBKU09OLnN0cmluZ2lmeShwbGF5ZXJzKSk7XG4gIH1cblxuICAvLyBSw6ljdXDDqHJlIGxlIHRhYmxlYXUgZGUgam91ZXVycyBkYW5zIGxlIGxvY2FsIHN0b3JhZ2VcbiAgc3RhdGljIGdldEFsbFBsYXllcnMoKSB7XG4gICAgY29uc3Qgc3RyaW5nUGxheWVycyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGxheWVycycpO1xuICAgIC8vIFNpIHRhYmxlYXUgbm9uIHN0b2Nrw6ksIG9uIHJlbnZvaWUgdW4gdGFibGVhdSB2aWRlXG4gICAgaWYgKHN0cmluZ1BsYXllcnMgPT09IG51bGwpIHJldHVybiBuZXcgQXJyYXkoKTtcbiAgICBlbHNlIHJldHVybiBKU09OLnBhcnNlKHN0cmluZ1BsYXllcnMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTY29yZURhbyB7XG4gIHN0YXRpYyBnZXRTY29yZVBsYXllcihwbGF5ZXIpIHt9XG5cbiAgc3RhdGljIHNhdmVTY29yZVBsYXllcihwbGF5ZXIpIHt9XG59XG5cbi8vIENsYXNzZSBwb3VyIG1hbmlwdWxlciB1biB0YWJsZWF1IGRlIGpvdWV1cnNcbmV4cG9ydCBjbGFzcyBQbGF5ZXJzVXRpbHMge1xuICAvLyBSZWNoZXJjaGUgdW4gam91ZXVyIHBhciBzb24gbm9tIGRhbnMgdW4gdGFibGVhdSBkZSBqb3VldXJzXG4gIHN0YXRpYyBmaW5kUGxheWVyQnlOYW1lSW5BcnJheShwbGF5ZXJzLCBwbGF5ZXJOYW1lKSB7XG4gICAgcmV0dXJuIHBsYXllcnMuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudC5uYW1lID09IHBsYXllck5hbWUpO1xuICB9XG5cbiAgLy8gTWV0IMOgIGpvdXIgb3UgYWpvdXRlIHVuIGpvdWV1ciBkYW5zIGxlIHRhYmxlYXUgZGUgam91ZXVyc1xuICBzdGF0aWMgYWRkT3JVcGRhdGVQbGF5ZXJJbkFycmF5KHBsYXllcnMsIHBsYXllcikge1xuICAgIGNvbnN0IHsgaWQsIC4uLnBhcnRpYWxQbGF5ZXIgfSA9IHBsYXllcjsgLy8gcGFydGlhbFBsYXllciA9IHBsYXllciBtb2lucyBsJ2lkIHF1J29uIG5lIHZldXQgcGFzIGVucmVnaXN0cmVyXG4gICAgY29uc3QgcGxheWVySW5kZXggPSBwbGF5ZXJzLmZpbmRJbmRleChcbiAgICAgIChlbGVtZW50KSA9PiBlbGVtZW50Lm5hbWUgPT0gcGxheWVyLm5hbWVcbiAgICApO1xuICAgIGlmIChwbGF5ZXJJbmRleCAhPSAtMSkge1xuICAgICAgcGxheWVyc1twbGF5ZXJJbmRleF0gPSBwYXJ0aWFsUGxheWVyOyAvLyBTaSBsZSBqb3VldXIgZXhpc3RlIGTDqWrDoCwgb24gbGUgbWV0IMOgIGpvdXJcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheWVycy5wdXNoKHBhcnRpYWxQbGF5ZXIpOyAvLyBTaW5vbiBvbiBsJ2Fqb3V0ZSDDoCBsYSBmaW5cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvcmRvdmFBUEkge1xuICBzdGF0aWMgdGFrZVBpY3R1cmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZShcbiAgICAgICAgKGltYWdlRGF0YSkgPT4gcmVzb2x2ZShpbWFnZURhdGEpLFxuICAgICAgICAoZXJyKSA9PiByZWplY3QoZXJyKSxcbiAgICAgICAge1xuICAgICAgICAgIC8vIHF1YWxpdMOpIGVuY29kYWdlIDUwJSwgZm9ybWF0IGJhc2U2NCAoZXQgSlBFRyBwYXIgZMOpZmF1dClcbiAgICAgICAgICBxdWFsaXR5OiA1MCxcbiAgICAgICAgICBkZXN0aW5hdGlvblR5cGU6IG5hdmlnYXRvci5jYW1lcmEuRGVzdGluYXRpb25UeXBlLkRBVEFfVVJMLFxuICAgICAgICAgIGVuY29kaW5nVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5FbmNvZGluZ1R5cGUuSlBFRyxcbiAgICAgICAgICBtZWRpYVR5cGU6IG5hdmlnYXRvci5jYW1lcmEuTWVkaWFUeXBlLlBJQ1RVUkUsXG4gICAgICAgICAgY29ycmVjdE9yaWVudGF0aW9uOiB0cnVlLFxuICAgICAgICAgIHNvdXJjZVR5cGU6IG5hdmlnYXRvci5jYW1lcmEuUGljdHVyZVNvdXJjZVR5cGUuQ0FNRVJBLFxuICAgICAgICAgIGNhbWVyYURpcmVjdGlvbjogbmF2aWdhdG9yLmNhbWVyYS5EaXJlY3Rpb24uRlJPTlQsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=