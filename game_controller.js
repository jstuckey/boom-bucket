(function() {
  angular
    .module('BoomBucket')
    .controller('GameController', GameController);

  GameController.$inject = ['$scope'];

  function GameController($scope) {
    var vm = this;

    vm.inning;
    vm.isBottomInning = isBottomInning;
    vm.isTopInning = isTopInning;
    vm.teamA;
    vm.teamB;

    var currentTeam;

    setupNewGame();

    function setupNewGame() {
      vm.teamA = {
        name: 'Team A',
        score: 0
      };
      vm.teamB = {
        name: 'Team B',
        score: 0
      };
      currentTeam = vm.teamA;
      vm.inning = 1;
    }

    function endOfGame() {
      console.log("GAME OVER");
      if (teamA.score > teamB.score) {
        console.log("Team A wins");
      } else if (teamA.score < teamB.score) {
        console.log("Team B wins");
      } else {
        console.log("Ties are for Father's Day");
      }
    }

    function goBackToBottomOfInning() {
      currentTeam = vm.teamB;
      vm.inning -= 1;
    }

    function goBackToTopOfInning() {
      currentTeam = vm.teamA;
    }

    function isTopInning() {
      return currentTeam === vm.teamA;
    }

    function isBottomInning() {
      return currentTeam === vm.teamB;
    }

    function setBottomOfInning() {
      currentTeam = vm.teamB;
    }

    function setTopOfInning() {
      currentTeam = vm.teamA;
      vm.inning += 1;
    };

    $scope.$on('AddPoints', function(_, pointsToAdd) {
      currentTeam.score += pointsToAdd;
    });

    $scope.$on('EndOfInning', function() {
      if (isTopInning()) {
        setBottomOfInning();
      } else if (vm.inning === 9) {
        endOfGame();
      } else {
        setTopOfInning();
      }
    });

    $scope.$on('GoBackAnInning', function() {
      if (isTopInning() && vm.inning != 1) {
        goBackToBottomOfInning();
      } else {
        goBackToTopOfInning();
      }
    });
  }
})();
