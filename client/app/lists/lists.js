angular.module('grouply.lists', [])

.factory('Lists', function($http) {
  return {
    getList: function() {
      return $http({
        method: 'GET',
        url: 'api/lists'
      })
      .then(function(res) {
        console.log('students received', res.data)
        return res.data;
      });
    },
  };
})

.controller('listsController', function($scope, Lists) {
  $scope.data = {};
  $scope.pairs = [];

  var displayStudents = function() {
    Lists.getList().then(function(students) {
      console.log('here\'s the list', students);
      $scope.data.list = students;
    })
    .catch(function(error) {
      console.log(error);
    });
  };

  $scope.createGroups = function() {
  };

  $scope.getOptimalPairStrategy = function(students) {

    var lowestScore;
    var lowestPermutations = [];
    var styles = ['kinesthetic', 'visual', 'auditory', 'tactile'];
    var pairStrategy = {
      kinesthetic: {
        tactile: 1,
        visual: 2,
        auditory: 3
      },
      visual: {
        auditory: 1,
        tactile: 2,
        kinesthetic: 3
      },
      auditory: {
        visual: 1,
        kinesthetic: 2,
        tactile: 3
      },
      tactile: {
        kinesthetic: 1,
        auditory: 2,
        visual: 3
      }
    };

    /*
    students = {
      kinesthetic: 5,
      visual: 3,
      auditory: 3,
      tactile: 2
    }
    */

    // save the permutation of styles -- will be 24
    // for each permutation of styles
      // initialize a score
      // for each style
        // take the modulo of the number of students
        // if result does not equal 0
          // if there are students left
            // iterate through the pair stategy for current style
              // if students[key of the current style] > 0
                // add the value of the pairing * 2 to score
                // decrease the total of students left for the two styles
                // break the loop
          // else
            // TODO: what to do with a left over student.
      // if lowestPermutations is an empty array
        // push the style permutation into lowestPermutations
        // set score as lowestScore
      // else
        // if the score is lower than lowestScore
          // set score as lowestScore
          // set lowestPermutations to empty array
          // push style permutation into lowestPermutations
        // if the score is equal to lowestScore
          // push style permutation into lowestPermutations
  }

  $scope.getAllPairs = function(studentArray) {
    var possiblePairs = [];
    var pair = [];

    for (var i = 0; i < studentArray.length; i++) {
      for (var j = i; j < studentArray.length; j++) {
        if (studentArray[i] !== studentArray[j]) {
          possiblePairs.push([studentArray[i], studentArray[j]]);
          studentArray.slice(i, 1);
        }
      }
    }
    return possiblePairs;
  };

  $scope.getAPossiblePairGroup = function(studentArray, possiblePairGroup) {
    var allPossiblePairs = $scope.getAllPairs(studentArray);
    possiblePairGroup = possiblePairGroup || [allPossiblePairs[0]];

    for (var i = 0; i < allPossiblePairs.length; i++) {
      var inGroup = false;
      for (var p = 0; p < possiblePairGroup.length; p++) {
        if (allPossiblePairs[i][0] === possiblePairGroup[p][0] || allPossiblePairs[i][0] === possiblePairGroup[p][1] || allPossiblePairs[i][1] === possiblePairGroup[p][0] || allPossiblePairs[i][1] === possiblePairGroup[p][1]) {
          inGroup = true;
        }
      }
      if (!inGroup) {
        possiblePairGroup.push(allPossiblePairs[i]);
      }
    }

    return possiblePairGroup;
  };

  $scope.createPairs = function() {
    var pairStrategy = {
      kinesthetic: ['kinesthetic', 'tactile', 'visual', 'auditory'],
      visual: ['visual', 'auditory', 'tactile', 'kinesthetic'],
      auditory: ['auditory', 'visual', 'kinesthetic', 'tactile'],
      tactile: ['tactile', 'kinesthetic', 'auditory', 'visual']
    };

    var students_styles = {};
    students_styles.auditory = [];
    students_styles.kinesthetic = [];
    students_styles.visual = [];
    students_styles.tactile = [];

    $scope.data.list.forEach(function(student) {
      console.log(student);
      for (var key in student.styles) {
        students_styles[key].push(student);
      }
    });

    console.log('student styles: ', students_styles);

    $scope.pairs = [];
    for(var style in students_styles) {
      var pairGroup = $scope.getAPossiblePairGroup(students_styles[style]);
      $scope.pairs.push(pairGroup);
    }

    $scope.pairsObj = {};
    $scope.pairsObj.auditoryPairs = $scope.pairs[0];
    $scope.pairsObj.kinestheticPairs = $scope.pairs[1];
    $scope.pairsObj.visualPairs = $scope.pairs[2];
    $scope.pairsObj.tactilePairs = $scope.pairs[3];

    console.log($scope.pairsObj);
  };


  displayStudents();
});