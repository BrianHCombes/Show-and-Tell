angular.module('RB-Page', ['ui.router', 'ngSanitize'])

    .config(['$stateProvider', function($stateProvider) {

        var states =[];
        for(tensPlace=0; tensPlace<10; tensPlace++){
            for(onesPlace=0; onesPlace<10; onesPlace++){
                states.push({name:"view".concat(tensPlace).concat(onesPlace), url:"/view".concat(tensPlace).concat(onesPlace), component:"component".concat(tensPlace).concat(onesPlace)});
                if((tensPlace*10)+onesPlace === 95){break;}
            }
        };

        // alert(states[95].name);

      // Loop over the state definitions and register them
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
        
        // $state.go('view00');
    }]);

    // Below are utilities to show the program info 
    // To account for plunker embeds timing out, preload the async data
    // Show state tree
/*     
    .run(function($uiRouter) {
      var StateTree = window['ui-router-visualizer'].StateTree;
      var el = StateTree.create($uiRouter, null, { height: 200, width: 800});
      // el.className = 'statevis';
    });
*/

    
   // https://github.com/angular-ui/ui-router/wiki/Quick-Reference#stateconfig     
   
      
    