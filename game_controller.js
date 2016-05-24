(function() {
  angular.module('BoomBucket').controller('GameController', ['$scope', function($scope) {

    this.teamA;
    this.teamB;
    this.currentTeam;
    this.inning;

    this.setupNewGame = function() {
      this.teamA = {
        name: 'Team A',
        score: 0
      };
      this.teamB = {
        name: 'Team B',
        score: 0
      };
      this.currentTeam = this.teamA;
      this.inning = 1;
    };

    $scope.$on('AddPoints', function(_, pointsToAdd) {
      this.currentTeam.score += pointsToAdd;
    }.bind(this));

    $scope.$on('EndOfInning', function() {
      if (this.isTopInning()) {
        this.setBottomOfInning();
      } else if (this.inning === 9) {
        this.endOfGame();
      } else {
        this.setTopOfInning();
      }
    }.bind(this));

    $scope.$on('GoBackAnInning', function() {
      if (this.isTopInning() && this.inning != 1) {
        this.goBackToBottomOfInning();
      } else {
        this.goBackToTopOfInning();
      }
    }.bind(this));

    this.isTopInning = function() {
      return this.currentTeam === this.teamA;
    };

    this.isBottomInning = function() {
      return this.currentTeam === this.teamB;
    };

    this.setBottomOfInning = function() {
      this.currentTeam = this.teamB;
    };

    this.setTopOfInning = function() {
      this.currentTeam = this.teamA;
      this.inning += 1;
    };

    this.goBackToBottomOfInning = function() {
      this.currentTeam = this.teamB;
      this.inning -= 1;
    }

    this.goBackToTopOfInning = function() {
      this.currentTeam = this.teamA;
    }

    this.endOfGame = function() {
      console.log("GAME OVER");
      if (teamA.score > teamB.score) {
        console.log("Team A wins");
      } else if (teamA.score < teamB.score) {
        console.log("Team B wins");
      } else {
        console.log("Ties are for Father's Day");
      }
    };

    this.setupNewGame();
  }]);
})();
