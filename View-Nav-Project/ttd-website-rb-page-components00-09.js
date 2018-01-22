angular.module('RB-Page')
        
    .component('component00', {
        
        // template: 'This is templat 00',
        templateUrl: 'templates/tmpl00/viewTmpl_00.html',
        controller: ['compFactory', function(compFactory){
            
            compFactory.logView(00);
        }]

    })
    
    .component('component02', {
        
        templateUrl: 'templates/viewTmpl_02.html',

        controller: ['compFactory', function(compFactory){
            
            compFactory.logView(02);
        }]    
    });