(function() {
  angular.module('BoomBucket').controller('GameController', ['$scope', function($scope) {
    var that = this;

    this.teamA;
    this.teamB;
    this.currentTeam;
    this.inning;
    this.hits;

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
      this.hits = 0;
    };

    this.hitButtonClicked = function(number) {
      this.hits = this.hits * 10 + number;
    };

    this.clearButtonClicked = function() {
      this.hits = 0;
    };

    this.bucketButtonClicked = function(multiplier) {
      this.currentTeam.score += this.hits * multiplier;
      this.hits = 0;
    };

    this.isTopInning = function() {
      return this.currentTeam === this.teamA;
    };

    this.isBottomInning = function() {
      return this.currentTeam === this.teamB;
    };

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
