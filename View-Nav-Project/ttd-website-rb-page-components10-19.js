angular.module('RB-Page')
        
    .component('component12', {
      
        templateUrl: 'templates/viewTmpl_12.html',

        controller: ['compFactory', function(compFactory){
            var thisComponent = this;

            thisComponent.viewBtn = function(value){
                if(value === 0){
                    thisComponent.btnAction01 = "Success from the controller function"; 
                }
            };
            thisComponent.display = "This is from this component's controller!!!!";
            
            compFactory.logView(12);
        }]
    })
    
    .component('component13', {
        
        templateUrl: 'templates/viewTmpl_13.html',
        controller: ['compFactory', function(compFactory){
            //alert("component");    
            compFactory.logView(13);
        }]

    })
    
    .component('component14', {
        
        templateUrl: 'templates/viewTmpl_14.html',

        controller: ['compFactory', function(compFactory){
            var thisComponent = this;

            thisComponent.viewBtn = function(value){
                if(value === 0){
                    thisComponent.btnAction01 = "Success from the controller function"; 
                }
            };
            thisComponent.display = "<br>This is from this component's controller!!!!";
            
            compFactory.logView(14);
        }]

    })
    
    .component('component15', {
        
        templateUrl: 'templates/tmpl_15/viewTmpl_15.html',
        
        controller: ['compFactory', function(compFactory){
            var thisComponent = this;

            thisComponent.viewBtn = function(value){
                if(value === 0){
                    thisComponent.btnAction01 = "Success from the controller function"; 
                }
            };
            thisComponent.display = "<br>This is from this component's controller!!!!";
            
            compFactory.logView(15);
        }]
    });
    
