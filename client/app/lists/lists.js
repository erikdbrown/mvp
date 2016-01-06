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
      auditory: ['auditory', 'visual', 'kinesthetic', 'tactile'],
      kinesthetic: ['kinesthetic', 'tactile', 'visual', 'auditory'],
      visual: ['visual', 'auditory', 'tactile', 'kinesthetic'],
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