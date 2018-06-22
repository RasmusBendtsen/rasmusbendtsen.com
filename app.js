var todoApp = angular.module('MyApp', ['firebase']);

//CONTROLLERS

todoApp.controller('mainController', ['$scope', '$firebaseArray', '$firebaseAuth', '$log', function ($scope, $firebaseArray, $firebaseAuth, $log) {
    $scope.thisIsMyController = "this is my controller";

    $scope.menuItems = [
        {
            htmlInjection: "/tiles/combo.html",
            title: "Combo",
            teaser: "Sound Design Challenge",
            imgUrl: "/images/combo.png",
            itemKeywords: ["Audio Design"],
            imagePos: "258px"
        },
        {
            htmlInjection: "/tiles/CloudTodo.html",
            title: "Cloud Synced Todo App",
            teaser: "Simple todo application, responsive and instantly syncing across desktop and mobile devices.",
            imgUrl: "/images/CloudTodo.jpg",
            itemKeywords: ["UX/ID", "Frontend/Web"],
            imagePos: "0px"
        },
        {
            htmlInjection: "/tiles/djstation.html",
            title: "DjStation",
            teaser: "Tangible Table Interface: DJStation is an interactive and audiovisual installation based on a tangible user interface with fiducial tracking.",
            imgUrl: "/images/DjStationTable01.png",
            itemKeywords: ["UX/ID"],
            imagePos: "258px"
        },
        {
            htmlInjection: "/tiles/masterthesis.html",
            title: "Sound Design Propsal for the Future Sound of Electric Traffic",
            teaser: "Master Thesis :: prototype of Sound For Electric Vehicles, Functional and aesthetic conciderations",
            imgUrl: "/images/MasterThesisPrototype.png",
            itemKeywords: ["Audio Design", "UX/ID"],
            imagePos: "258px"
        },
        {
            htmlInjection: "/tiles/photosandgraphics.html",
            title: "Photography",
            teaser: "Various photos from around the world...",
            imgUrl: "//c1.staticflickr.com/9/8463/8428503554_0361fc9e51_n.jpg",
            itemKeywords: ["Photography"],
            imagePos: "258px"
        },
        {
            htmlInjection: "/tiles/music.html",
            title: "Music",
            teaser: "Bedroom productions, new and old compositions",
            imgUrl: "/images/DerRabeLive.png",
            itemKeywords: ["Music"],
            imagePos: "200px"
        },

        {
            htmlInjection: "/tiles/playstationDjController.html",
            title: "Playstation DJ Controller",
            teaser: "What would djing be like with if you used a hacked Playstation Controller",
            imgUrl: "/images/DjStationPS3.png",
            itemKeywords: ["UX/ID"],
            imagePos: "258px"
        },


        {
            htmlInjection: "/tiles/sophiesDreamLeap_trailer.html",
            title: "Sophies Dreamleap - Trailer",
            teaser: "Sound design for the game trailer",
            imgUrl: "/images/SophiesDreamLeap_trailer.png",
            itemKeywords: ["Audio Design", "Music", "Computer Games"],
            imagePos: "258px"
        },
                {
            htmlInjection: "/tiles/sophiesdreamleap.html",
            title: "Sophies Dream Leap - Game Audio",
            teaser: "Game audio for the the game",
            imgUrl: "/images/sophiesdreamleap01.jpg",
            itemKeywords: ["Audio Design", "Computer Games"],
            imagePos: "258px"
        },
        {
            htmlInjection: "/tiles/carnivale.html",
            title: "Carnivale Intro",
            teaser: "Sound Design Challenge",
            imgUrl: "/images/carnivale1.jpg",
            itemKeywords: ["Audio Design"],
            imagePos: "258px"
        },
        {
            htmlInjection: "/tiles/rasmusbendtsenCom.html",
            title: "rasmusbendtsen.com",
            teaser: "This website",
            imgUrl: "/images/rasmusbendtsen.com.png",
            itemKeywords: ["UX/ID", "Frontend/Web"],
            imagePos: "0px"
        },
        {
            htmlInjection: "/tiles/WebsiteGraphicDesign.html",
            title: "Intranet design",
            teaser: "Graphical deesigns for corporate intranet",
            imgUrl: "/images/Coming_Soon_Placeholder.png",
            itemKeywords: ["UX/ID", "Frontend/Web"],
            imagePos: "258px"
        }
    ];

    $scope.keywords = ["Music", "UX/ID", "Audio Design", "Photography", "Computer Games", "Frontend/Web"];

    $scope.activeKeywords = [];

    $scope.id = 0;

    $scope.toggleFooter = function () {

        var footer = document.getElementById('footer');
        if (footer.classList.contains('footerVisibel')) {
            footer.classList.remove('footerVisibel');
        } else {
            footer.classList.add('footerVisibel');
        }

    }

}]);

//SERVICES
todoApp.service('listItemService', function () {
    this.doSomethingPlease = function () {
        alert('I did this...');
    };
});


//DIRECTIVES


//TILES

todoApp.directive('tileDirective', [function () {

    //directive controller
    var controller = ['$scope', '$firebaseArray', '$log', function ($scope, $firebaseArray, $log) {


        $scope.tileOpenBool = false;

        $scope.hideAllOtherTiles = function (index) {
            $log.info('hideAllOtherTiles, index: ' + index);
            for (itm in $scope.menuItemsLocal) {
                if (itm != index) {
                    $log.info('looooping..., index: ' + itm);
                    var currentDOMel = itm + ' tile';
                    var element = document.getElementById(currentDOMel);
                    element.classList.add('hideAllOtherTiles');
                }
            }
        }

        $scope.openTile = function (index) {
            $log.info('openTile kicked in, index: ' + index);

            $scope.hideAllOtherTiles(index);

            //ADD the class: TileExpanded:
            $scope.tileOpenBool = true;
            var currentDOMel = index + ' tile';
            var element = document.getElementById(currentDOMel);
            element.classList.add('tileExpanded');

            //ADD the class: tileHeaderImageActive:
            var tileHeaderImage_Div = document.getElementById('tileHeaderImage' + index);
            tileHeaderImage_Div.classList.add('tileHeaderImageActive');

            //ADD the class: tileActive:
            var currentDOMelem = 'TileDescriptionOverlayContainer' + index;
            var tileOverlay = document.getElementById(currentDOMelem);
            tileOverlay.classList.add('tileActive');

            //REMOVE keywords
            var KwDiv = document.getElementById('KeywordsDiv');
            KwDiv.classList.add('KeywordsDiv');

            //set background image
            //var currentTileImageUrl = element.getElementsByClassName('tileHeaderImage');
            //$('img.siteBGImage').src = currentTileImageUrl.tileHeaderImage1.src;




        }

        $scope.CloseTile = function (index) {
            $log.info('CloseTile kicked in, index: ' + index);
            $scope.tileOpenBool = false;

            //ADD BACK filtering keywords
            var KwDiv = document.getElementById('KeywordsDiv');
            KwDiv.classList.remove('KeywordsDiv');


            //remove tileExpanded
            var currentDOMel = index + ' tile';
            var element = document.getElementById(currentDOMel);
            element.classList.remove('tileExpanded');

            //REMOVE the class: tileHeaderImageActive:
            var tileHeaderImage_Div = document.getElementById('tileHeaderImage' + index);
            tileHeaderImage_Div.classList.remove('tileHeaderImageActive');

            var currentDOMelem = 'TileDescriptionOverlayContainer' + index;
            var tileOverlay = document.getElementById(currentDOMelem);
            tileOverlay.classList.remove('tileActive');

            for (itm in $scope.menuItemsLocal) {
                $log.info('Loop: item: ' + itm);
                if (itm != index) {
                    $log.info('Loop: index: ' + itm);
                    var currentDOMel = itm + ' tile';
                    var element = document.getElementById(currentDOMel);
                    element.classList.remove('hideAllOtherTiles');
                }
            }
            //reset background image
            //$('img.siteBGImage').src = "http://rasmusbendtsen.com/pics/Audio%20Design%20Master%20Thesis,%20prototype%20pic3.jpg";

        }





        $scope.shouldTileBeVisibel = function (index) {
            //$log.info("############    " + $scope.menuItemsLocal[index].title + "     ####################");
            if ($scope.activeKeywordsLocal.length == 0) {
                //$log.info("No Keywords active...");
                return true;
            } else {
                var visiBool = false;
                var curTilesAddedKeyWords = $scope.menuItemsLocal[index].itemKeywords; // 
                $log.info("curTilesAddedKeyWords: " + curTilesAddedKeyWords);
                var activatedKeywords = $scope.activeKeywordsLocal;
                $log.info("activatedKeywords: " + activatedKeywords);

                $log.info("activatedKeywords: " + activatedKeywords);
                for (itm in curTilesAddedKeyWords) {
                    i = itm;
                    $log.log("item: " + itm);
                    $log.log("curTilesAddedKeyWords[i]: " + curTilesAddedKeyWords[i]);
                    $log.log("i: " + i);
                    $log.log("activatedKeywords.indexOf(curTilesAddedKeyWords[i]: " + activatedKeywords.indexOf(curTilesAddedKeyWords[i]));

                    if ((activatedKeywords.indexOf(curTilesAddedKeyWords[i])) != -1) { // Er dennes kw blandt de aktiverede?
                        // Der ER et match
                        $log.warn(" = not hidden");
                        visiBool = true; // ja den skal vises
                        break;
                    } else {
                        //i++;
                    }
                }
                $log.info("RETURNING VisiBool: " + visiBool);
                return visiBool;
            }

            $log.info(itm + "  --->  THERE IS A MAAATCH!!!!  activeKeywordsLocal: " + $scope.activeKeywordsLocal + "  %%%%  thisTilesAddedKeyWords: " + thisTilesAddedKeyWords + " %%%%  $scope.menuItemsLocal[index]: " + $scope.menuItemsLocal[index].title);



            $log.info(itm + "   EEEELSE: activeKeywordsLocal: " + $scope.activeKeywordsLocal + "  %%%%  thisTilesAddedKeyWords: " + thisTilesAddedKeyWords + " %%%%  $scope.menuItemsLocal[index]: " + $scope.menuItemsLocal[index].title);

            $log.info(itm + "   __  BOTTOM__ activeKeywordsLocal: " + $scope.activeKeywordsLocal + ", thisTilesAddedKeyWords: " + thisTilesAddedKeyWords + ", $scope.menuItemsLocal[index]: " + $scope.menuItemsLocal[index]);


        }





                    }];

    return {
        templateUrl: 'directive.html',
        replace: true,
        scope: {
            menuItemsLocal: "=",
            activeKeywordsLocal: "=",
            index: '@'
        },
        controller: controller
    }
            }]);


//KEYWORD

todoApp.directive('keyWord', [function () {

    //directive controller
    var controller = ['$scope', '$firebaseArray', '$log', function ($scope, $firebaseArray, $log) {

        $scope.KWselectedBool = false;

        $scope.toggleKeyword = function (keyword, index) {
            $log.info("start... Status:  " + keyword + " is now " + $scope.KWselectedBool);
            $scope.KWselectedBool = !$scope.KWselectedBool;
            $log.info("TOGGLE.. toggle.. toggle....: " + keyword + " is now " + $scope.KWselectedBool);

            if ($scope.activeKeywordsLocal.indexOf(keyword) == -1) {
                $scope.activeKeywordsLocal.push(keyword);
                $log.info("Pushed " + keyword);
            } else {
                i = $scope.activeKeywordsLocal.indexOf(keyword);
                $scope.activeKeywordsLocal.splice(i, 1);
                $log.info("Poped " + keyword);
            }
            $log.info("activeKeywordsLocal: " + $scope.activeKeywordsLocal);

        }



    }];

    return {
        templateUrl: 'keyword-directive.html',
        replace: true,
        scope: {
            keywordsLocal: "=",
            activeKeywordsLocal: "=",
            index: '@'
        },
        controller: controller
    }
}]);




//INACTIVE KEYWORD

todoApp.directive('inactiveKeyword', [function () {

    //directive controller
    var controller = ['$scope', '$firebaseArray', '$log', function ($scope, $firebaseArray, $log) {

    }];

    return {
        templateUrl: 'inactive-keyword-directive.html',
        replace: true,
        scope: {
            keywordsLocal: "=",
            activeKeywordsLocal: "=",
            index: '@'
        },
        controller: controller
    }
}]);


/*

            //Remove or rename bindings
            //OneWayBindingToParentScope: "&",
            //OneWayBindingFromParentScope: '@',

@ allows a value defined on the directive attribute to be passed to the directive's isolate scope. The value could be a simple string value (myattr="hello") or it could be an AngularJS interpolated string with embedded expressions (myattr="my_{{helloText}}"). You can think of it as "one-way" communication from the parent scope into the child directive. John Lindquist has a series of short screencasts explaining each of these. Screencast on @ is here: https://egghead.io/lessons/angularjs-isolate-scope-attribute-binding

& allows the directive's isolate scope to pass values into the parent scope for evaluation in the expression defined in the attribute. Note that the directive attribute is implicitly an expression and does not use double curly brace expression syntax. This one is tougher to explain in text. Screencast on & is here: https://egghead.io/lessons/angularjs-isolate-scope-expression-binding

= sets up a two-way binding expression between the directive's isolate scope and the parent scope. Changes in the child scope and propagated to the parent and vice-versa. Think of = as a combination of @ and &. Screencast on = is here: https://egghead.io/lessons/angularjs-isolate-scope-two-way-binding*/