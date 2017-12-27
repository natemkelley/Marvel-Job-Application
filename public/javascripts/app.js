angular.module('superhero', [])
    .controller('MainCtrl', [
  '$scope', '$http',
  function ($scope, $http) {
            $scope.superheroes = [];
            $scope.addSuperhero = function () {
                var newSuperhero = {
                    url: $scope.url,
                    caption: $scope.caption
                };
                if ($scope.url === '') {
                    return;
                }
                console.log(newSuperhero);
                $scope.create(newSuperhero);
                $scope.url = '';
                $scope.caption = '';
            };

            $scope.getAll = function () {
                return $http.get('/superheroes').success(function (data) {
                    angular.copy(data, $scope.superheroes);
                })
            }


            $scope.delete = function (superhero) {
                console.log(superhero);
                $http.delete('/superheroes/' + superhero._id).success(
                    function (data) {
                        console.log("delete is working")
                    });
                $scope.getAll();
            };

            $scope.create = function (superhero) {
                console.log(superhero);
                return $http.post('/superheroes', superhero).success(function (data) {
                    $scope.superheroes.push(data);
                });
            };

            $scope.getAll();

  }
]);
