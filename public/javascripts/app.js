angular.module('superhero', [])
    .controller('MainCtrl', [
  '$scope', '$http',
  function ($scope, $http) {
            $scope.superheroes = [];
            $scope.villians = [];

            $scope.saveVillian = function () {

                var URLname = $scope.villianName;

                $.post("/marvel?c=" + URLname, URLname, function (data, status) {
                    console.log(data);

                    if (data.status == 0) {
                        alert('Could not find the villian ' + data.character + '.\n\nThe API being used is super sensitive to character names! You could try a different spelling! For example, instead of The Hulk, just try Hulk');
                        return
                    }
                    var imagePath = data.data[0].thumbnail.path;
                    var extension = "." + data.data[0].thumbnail.extension;
                    var name = data.data[0].name;
                    var fullimage = imagePath + extension;

                    var newVillian = {
                        name: name,
                        image: fullimage
                    };

                    console.log(newVillian);
                    $scope.create(newVillian);
                });

                $scope.villianName = '';
            };

            $scope.getAll = function () {
                return $http.get('/villians').success(function (data) {
                    console.log(data)
                    angular.copy(data, $scope.villians);
                })
            }

            $scope.delete = function (villian) {
                console.log('removing ' + villian._id);
                $("#" + villian._id).fadeOut();
                $http.delete('/villians/' + villian._id).success(
                    function (data) {
                        console.log("delete is working");
                    });
                $scope.getAll();
            };

            $scope.create = function (villian) {
                console.log(villian);
                return $http.post('/villians', villian).success(function (data) {
                    $scope.villians.push(data);
                });
            };

            $scope.getSpiderman = function () {
                var superhero = "spider-man";
                $.post("/marvel?c=" + superhero, superhero, function (data, status) {
                    addSpiderman(data);
                });
            }


            $scope.getAll();
            $scope.getSpiderman();

            //compare super heroes
            $scope.getCharacter = function () {
                var superhero = $scope.superhero;
                $.post("/marvel?c=" + superhero, superhero, function (data, status) {
                    if (data.status !== 0) {
                        addCharacter(data);
                    } else {
                        alert('Could not find the character ' + data.character + '.\n\nYou could try a different spelling! For example, instead of Dr. Strange try Doctor Strange.');
                        $("#oppImg").attr("src", "http://thumbs4.ebaystatic.com/d/l225/m/mmU1YlSNtrBDFEvJZZm2hUQ.jpg");
                        $('#oppName').html("<span class='pull-left'><strong >Name</strong></span>" + ":(");
                        $('#oppNumStories').html("<span class='pull-left'><strong >Number of Stories</strong></span>" + 0);
                        $('#oppApp').html("<span class='pull-left'><strong >Comic book appearances</strong></span>" + 0);
                        $('#oppDesc').html("<strong >Description:</br></strong>" + "...");
                    }
                });
            }


            /*
            $scope.generateList = function () {
                var myvillians = ['Doctor Octopus', 'Iron Man', 'Norman Osborn', 'Kraven the Hunter'];
                $.each(myvillians, function (index, name) {
                    console.log(name);
                    $.post("/marvel?c=" + name, name, function (data, status) {
                        var imagePath = data.data[0].thumbnail.path;
                        var extension = "." + data.data[0].thumbnail.extension;
                        var name = data.data[0].name;
                        var fullimage = imagePath + extension;
                        var id = name.substring(0, 5);

                        $('#villiansTable').append("<div id='" + id + "' class='col-lg-3 col-md-4 col-sm-6'><div class='borders'><img src='" + fullimage + "'class='img-responsive img-rounded'><h4>" + name + "</h4><button type='submit' class='btn btn-danger btn-sm'>Delete</button></div></div>");
                    });
                });
            }
            $scope.generateList();*/

  }
]);



function addCharacter(data) {
    console.log(data);
    var imagePath = data.data[0].thumbnail.path;
    var extension = "." + data.data[0].thumbnail.extension;
    $("#oppImg").attr("src", imagePath + extension);
    if (data.data[0].name == "Spider-Man") {
        alert('Great choice!');
    }
    $('#oppName').html("<span class='pull-left'><strong >Name</strong></span>" + data.data[0].name);
    $('#oppNumStories').html("<span class='pull-left'><strong >Number of Stories</strong></span>" + data.data[0].stories.available);
    $('#oppApp').html("<span class='pull-left'><strong >Comic book appearances</strong></span>" + data.data[0].comics.available);
    if (data.data[0].description == "") {
        $('#oppDesc').html("<strong >Description:</br></strong>" + "No description found...");
    } else {
        $('#oppDesc').html("<strong >Description:</br></strong>" + data.data[0].description);
    }
}

function addSpiderman(data) {
    var imagePath = data.data[0].thumbnail.path;
    var extension = "." + data.data[0].thumbnail.extension;
    $('#opponent').prepend("<img id='oppImg'class='img-responsive img-rounded'src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJ_AajaaOaQGpHldIAp0k6ASyA9sZvQHWvpgQvqiRlF3z6PGbWw'>");
    $('#spider-man').prepend("<img class='img-responsive img-rounded'src=" + imagePath + extension + ">")
    $('#spiName').html("<span class='pull-left'><strong >Name</strong></span>" + data.data[0].name);
    $('#spiNumStories').html("<span class='pull-left'><strong >Number of Stories</strong></span>" + data.data[0].stories.available);
    $('#spiApp').html("<span class='pull-left'><strong >Comic book appearances</strong></span>" + data.data[0].comics.available);
    $('#spiDesc').html("<strong >Description:</br></strong>" + data.data[0].description);
    $("#oppImg").attr("src", "http://i.annihil.us/u/prod/marvel/i/mg/9/90/5261a86cacb99.jpg");
    $('#oppName').html("<span class='pull-left'><strong >Name</strong></span>" + "Deadpool");
    $('#oppNumStories').html("<span class='pull-left'><strong >Number of Stories</strong></span>" + 891);
    $('#oppApp').html("<span class='pull-left'><strong >Comic book appearances</strong></span>" + 684);
    $('#oppDesc').html("<strong >Description:</br></strong>" + "No description found...");
}

$(document).ready(function () {

    // Add smooth scrolling to all links
    $("a").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        $('.nav li').removeClass('active');
        $(this).parent().addClass('active');
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            console.log(hash);
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        } // End if
    });
});
