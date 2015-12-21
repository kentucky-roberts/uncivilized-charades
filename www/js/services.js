angular.module('app.services', [])

.factory("CardService", function() {

  var cardTypes = 
    [
      {
        "id":1,
        "phrase":"One Legged Skier",
        "alt_phrase":"Pussy Cat"
      },
      {
        "id":2,
        "phrase":"Psychedelic Trip",
        "alt_phrase":"Tooth Fairy"
      },
      {
        "id":3,
        "phrase":"European Creeper",
        "alt_phrase":"Long Brown Hair"
      },
      {
        "id":4,
        "phrase":"Twerking Santa",
        "alt_phrase":"Rock A By Baby"
      },
      {
        "id":5,
        "phrase":"Pregnant Twerker",
        "alt_phrase":"Bug On The Ceiling"
      },
      {
        "id":6,
        "phrase":"Police Brutality",
        "alt_phrase":"Walking On The Sun"
      },
      {
        "id":7,
        "phrase":"Taser Victim",
        "alt_phrase":"Milky Way Galaxy"
      },
      {
        "id":8,
        "phrase":"Shwag Weed",
        "alt_phrase":"Dance The Night Away"
      },
      {
        "id":9,
        "phrase":"Bong Rip",
        "alt_phrase":"The Roof Is Out Fire"
      },
      {
        "id":10,
        "phrase":"Panty Thief",
        "alt_phrase":"Michael Jackson Moves"
      },
    ];

  var activeCard = cardTypes[0]; //initialize with 0

  function setActiveCard(index) {
      activeCard = cardTypes[index];
      console.log('activeCard is now ' + activeCard)
  }
  
  return {
    all: function() {
      return cardTypes;
    },
    first: function() {
      return cardTypes[0].phrase;
    },
    oneCard: function() {
      return cardTypes.slice(0,1);
    },
    threeCards: function() {
      return cardTypes.slice(0,3);
    },
    reload: function() {
      return cardTypes.slice(0,3);
    },
    destroyCard: function(index) {
      return cardTypes.slice(index, 1);
    },
    remove: function(card) {
      cards.splice(cards.indexOf(card), 1);
    },
    setActiveCard: function(index) {
      setActiveCard(index);
    },
    get: function(cardId) {
      for (var i = 0; i < cards.length; i++) {
        if (card[i].id === parseInt(cardId)) {
          return cards[i];
        }
      }
      return null;
    } // get:
  };
})




.factory('myModals', ['appModalService', function(appModalService){
  // all app modals here
  var service = {
    showConfirmContact: showConfirmContact,
    showContacts: showContacts
  };
  
  return service;
  
  function showConfirmContact(contact){
    return appModalService.show('confirm-contact-modal.html', 'ConfirmContactDialogCtrl as vm', contact);
  }
  
  function showContacts(otherContact) {
    return appModalService.show('contacts-modal.html', 'ContactDialogCtrl as vm', otherContact);
  }
  
  
}])


.factory('appModalService', 
['$ionicModal', '$rootScope', '$q', '$injector', '$controller', function($ionicModal, $rootScope, $q, $injector, $controller) {
    
  return {
    show: show
  }

  function show(templeteUrl, controller, parameters, options) {
    // Grab the injector and create a new scope
    var deferred = $q.defer(),
        ctrlInstance,
        modalScope = $rootScope.$new(),
        thisScopeId = modalScope.$id,
        defaultOptions = {
          animation: 'slide-in-up',
          focusFirstInput: false,
          backdropClickToClose: true,
          hardwareBackButtonClose: true,
          modalCallback: null
        };

    options = angular.extend({}, defaultOptions, options);

    $ionicModal.fromTemplateUrl(templeteUrl, {
      scope: modalScope,
      animation: options.animation,
      focusFirstInput: options.focusFirstInput,
      backdropClickToClose: options.backdropClickToClose,
      hardwareBackButtonClose: options.hardwareBackButtonClose
    }).then(function (modal) {
      modalScope.modal = modal;

      modalScope.openModal = function () {
        modalScope.modal.show();
      };
      modalScope.closeModal = function (result) {
        deferred.resolve(result);
        modalScope.modal.hide();
      };
      modalScope.$on('modal.hidden', function (thisModal) {
        if (thisModal.currentScope) {
          var modalScopeId = thisModal.currentScope.$id;
          if (thisScopeId === modalScopeId) {
            deferred.resolve(null);
            _cleanup(thisModal.currentScope);
          }
        }
      });

      // Invoke the controller
      var locals = { '$scope': modalScope, 'parameters': parameters };
      var ctrlEval = _evalController(controller);
      ctrlInstance = $controller(controller, locals);
      if (ctrlEval.isControllerAs) {
        ctrlInstance.openModal = modalScope.openModal;
        ctrlInstance.closeModal = modalScope.closeModal;
      }

      modalScope.modal.show()
        .then(function () {
        modalScope.$broadcast('modal.afterShow', modalScope.modal);
      });

      if (angular.isFunction(options.modalCallback)) {
        options.modalCallback(modal);
      }

    }, function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function _cleanup(scope) {
    scope.$destroy();
    if (scope.modal) {
      scope.modal.remove();
    }
  }

  function _evalController(ctrlName) {
    var result = {
      isControllerAs: false,
      controllerName: '',
      propName: ''
    };
    var fragments = (ctrlName || '').trim().split(/\s+/);
    result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
    if (result.isControllerAs) {
      result.controllerName = fragments[0];
      result.propName = fragments[2];
    } else {
      result.controllerName = ctrlName;
    }

    return result;
  }
 
}]);