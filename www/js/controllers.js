angular.module('app.controllers', [])

.controller('PlatformCtrl', function($scope) {

  ionic.Platform.ready(function(){
    // will execute when device is ready, or immediately if the device is already ready.
  });

  var deviceInformation = ionic.Platform.device();

  var isWebView = ionic.Platform.isWebView();
  var isIPad = ionic.Platform.isIPad();
  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();
  var isWindowsPhone = ionic.Platform.isWindowsPhone();

  var currentPlatform = ionic.Platform.platform();
  var currentPlatformVersion = ionic.Platform.version();

  ionic.Platform.exitApp(); // stops the app
})

.controller('AccountController', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.settings.airplaneMode = localStorage.getItem('airplaneMode') === '1' ? 1 : 0;
})

.controller('AppController', function($scope) {

  //  $scope.onTouch = function(event){
  //   $(event.target).addClass("press");
  // };
  // $scope.onRelease = function(event){
  //   $(event.target).removeClass("press");
  // };
})

.controller('UserController', function($scope) {})
.controller('HomeController', function($scope) {

})


.controller('GameController', ['$scope', '$window', '$interval', '$timeout', '$ionicModal', '$http', '$ionicSwipeCardDelegate', 'CardService',
    function($scope, $window, $interval, $timeout, $ionicModal, $http, $ionicSwipeCardDelegate, CardService) {
  $scope.cards = CardService.all();
  $scope.firstCard = CardService.first();
  $scope.oneCard = CardService.oneCard();
  $scope.threeCards = CardService.threeCards();
  console.log($scope.threeCards.length);
  // $scope.onTouch = function(event){
  //   $(event.target).addClass("press");
  // };
  // $scope.onRelease = function(event){
  //   $(event.target).removeClass("press");
  // };

}])




.controller('CardsCtrl', ['$scope', '$window', '$interval', '$timeout', '$ionicModal', '$ionicLoading', '$http', '$ionicSwipeCardDelegate', 'CardService',
    function($scope, $window, $interval, $timeout, $ionicModal, $ionicLoading, $http, $ionicSwipeCardDelegate, CardService) {

  $scope.showLoading = function() {
    $ionicLoading.show(); //options default to values in $ionicLoadingConfig
  };
  $scope.showLoading();



  var cardTypes = CardService.all();

  $scope.all = CardService.all();
  $scope.oneCard = CardService.oneCard();

  $scope.setActiveCard = CardService.setActiveCard();

  $scope.cards = {
    master: Array.prototype.slice.call(cardTypes, 0),
    active: Array.prototype.slice.call(cardTypes, 0),
    selected: [],
    discards: [],
    liked: [],
    skipped: [],
    disliked: []
  };

  $scope.playerCards = {};

  $scope.reload = function(){
    CardService.reload();
  };

  $scope.cardsControl = {};
  
  $scope.cardDestroyed = function(index) {
    $scope.cards.master.splice(index, 1);
  };



  $scope.deal = function() {
    $scope.playerName = "PLayer 1";

    var newCards = cardTypes[Math.floor(Math.random() * cardTypes.length)];

    newCard.id = Math.random();

    $scope.cards.active.push(angular.extend({}, newCard));
  };


  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.active.push(angular.extend({}, newCard));
  };

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  };



// Buttons for development //
$scope.upClick = function() {
  $scope.cardsControl.swipeUp();
  console.log("upClick()");
};
$scope.downClick = function() {
  $scope.cardsControl.swipeDown();
  console.log("downClick()");
};
$scope.yesClick = function() {
  $scope.cardsControl.swipeRight();
};
$scope.noClick = function() {
  $scope.cardsControl.swipeLeft();
};
  
  // $scope.cardSwipedLeft = function(index) {
  //   console.log('LEFT SWIPE');
  //   $scope.addCard();
  // };
  
  // $scope.cardSwipedRight = function(index) {
  //   console.log('RIGHT SWIPE');
  //   $scope.addCard();
  // };



  $scope.$on('removeCard', function(event, element, card) {
    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    $scope.cards.discards.push(discarded);
  });

  $scope.cardSwipedUp = function(index) {
    console.log('UP SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.selected.push(card);
    $scope.cards.splice(index, 1);
  };



  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.disliked.push(card);
    $scope.cardDestroyed();
    CardService.setActiveCard(index);
  };

  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.liked.push(card);
    //$scope.removeCard(index);
    $scope.cardDestroyed(index);
    CardService.setActiveCard(index);
  };



  $scope.showAlt = false;

  $scope.onHold = function(index){
    console.log("You are holding the card down!");
    $("swipe-card").removeClass("with-shadow").addClass("without-shadow");
  };

  $scope.onRelease = function(index){
    console.log("... released me!");
    $("swipe-card").removeClass("without-shadow").addClass("with-shadow");
    $scope.showAlt = $scope.showAlt === false ? true: false;
    console.log($scope.showAlt);
  };

  $scope.cardSwiped = function(index) {
    $scope.cardDestroyed();
    $scope.addCard();
  };


  // $scope.onDragDown = function(index){
  //   console.log("... you are dragging the card!");
  // };

  // $scope.onTap = function() {
  //   console.log("Tapped!");
  //   $(td-card).addClass("no-shadow");
  // };
  
  // $scope.onDoubleTap = function() {
  //   console.log("Double-Tapped!");
  // };

  // $scope.onHold = function(){
  //   console.log("onHold just happened!");
  //   $(td-card).addClass("without-shadow");    
  // };



  //$scope.reload();
  $scope.hideLoading = function() {
    $timeout(function() {
      $ionicLoading.hide();
    }, 1000);
  };
  $scope.hideLoading(); 
}])

.controller('CardCtrl', ['$scope', '$timeout', 'CardService', function($scope, $timeout, CardService) {

  var card = this;
  
    card.showAlt = true;
    console.log(card.showAlt);

  
  card.togglePhrases = function() {
      card.showAlt = card.showAlt === false ? true: false;
      console.log(card.phrase);
  };

  card.setActivePhrase = function() {
    console.log(card.showAlt);
  };

  card.showAltPhrase = function() {
    card.showAlt = false;
    console.log(card.showAlt);
  };

  card.showPhrase = function() {
    card.showAlt = true;
    console.log(card.showAlt);
  };
  
}]);

