angular.module('RB-Page')
    .controller("rbCtrl", ['$scope', '$state', 'RBData', 'compFactory', 'GetSet', function($scope, $state, RBData, compFactory, GetSet){

        var rbCtrlself = this;
        rbCtrlself.hyperIndex;
        
        // to see the loaded data brought in by function menuCallback see file: ttd-website-rb-page-JSON-client.json
        // for styling configuration see factory "GetSet"
        menuCallback = function(data){
            rbCtrlself.menu1 = data.menu1;              // is array
            rbCtrlself.menu2 = data.menu2;              // is array
            rbCtrlself.picMenu1 = data.picMenu1A;       // is array
            rbCtrlself.picMenu2 = data.picMenu2A;       // is array
            rbCtrlself.viewNAME = data.viewName;        // is array
        };
        RBData.menuConfig(menuCallback, "menus");

        // function arrayIndex selects moused over hyper menu item and highlights it and unhighlights the others. And shows the proper thumbnail group. 
        rbCtrlself.arrayIndex = function(index){
            // alert("arrayIndex here");
            rbCtrlself.hyperIndex = index;
            rbCtrlself.hyperMenuNum = index + 1;  // not required - for show only unless......??
            
            var selectedTextColor = GetSet.getTextColor1();
            var shadowForSelectedTextColor = GetSet.getShadowTextColor1();
            var unSelectedTextColor = GetSet.getTextColor2();
            var shadowForUnSelectedTextColor = GetSet.getShadowTextColor2();
            
            for(i=0; i<rbCtrlself.viewNAME.length; i++){
                if(index === i){rbCtrlself.viewNAME[i].showView = true;}
                else{rbCtrlself.viewNAME[i].showView = false;}
            }
            
            if(index <= 11){
                for(i=0; i<rbCtrlself.picMenu1.length; i++){
                    if(index === i){rbCtrlself.picMenu1[i].highlight = selectedTextColor; rbCtrlself.picMenu1[i].shadow = shadowForSelectedTextColor;}
                    else{rbCtrlself.picMenu1[i].highlight = unSelectedTextColor; rbCtrlself.picMenu1[i].shadow = shadowForUnSelectedTextColor;}
                }
                for(i=0; i<rbCtrlself.picMenu2.length; i++){
                    rbCtrlself.picMenu2[i].highlight = unSelectedTextColor; rbCtrlself.picMenu2[i].shadow = shadowForUnSelectedTextColor;
                }
            }
            else {
                for(i=0; i<rbCtrlself.picMenu2.length; i++){
                    if((index-12) === i){rbCtrlself.picMenu2[i].highlight = selectedTextColor; rbCtrlself.picMenu2[i].shadow = shadowForSelectedTextColor;}
                    else{rbCtrlself.picMenu2[i].highlight = unSelectedTextColor; rbCtrlself.picMenu2[i].shadow = shadowForUnSelectedTextColor;}
                }
                for(i=0; i<rbCtrlself.picMenu1.length; i++){
                    rbCtrlself.picMenu1[i].highlight = unSelectedTextColor; rbCtrlself.picMenu1[i].shadow = shadowForUnSelectedTextColor;
                }
            };
            showCheckMark();
        };
        
        var showCheckMark = function(){
            // alert("showCheckMark here");
            var markerType1 = GetSet.getMarkerType1();
            var currentViewThumbFromThumbClick = GetSet.getThumbThumbClick();
            var currentViewHyperIndexFromThumbClick = GetSet.getHyperThumbClick();
            // alert(markerType1);
            rbCtrlself.checkMarkColor = GetSet.getTextColor1();
            
            if((currentViewThumbFromThumbClick == 0) && (currentViewHyperIndexFromThumbClick == rbCtrlself.hyperIndex)){
                rbCtrlself.showCheckA = markerType1;} else {rbCtrlself.showCheckA = "&nbsp;";};
                       
            if((currentViewThumbFromThumbClick == 1) && (currentViewHyperIndexFromThumbClick == rbCtrlself.hyperIndex)){
                rbCtrlself.showCheckB = markerType1;} else{rbCtrlself.showCheckB = "&nbsp;";};
            
            if((currentViewThumbFromThumbClick == 2) && (currentViewHyperIndexFromThumbClick == rbCtrlself.hyperIndex)){
                rbCtrlself.showCheckC = markerType1;} else{rbCtrlself.showCheckC = "&nbsp;";};
            
            if((currentViewThumbFromThumbClick == 3) && (currentViewHyperIndexFromThumbClick == rbCtrlself.hyperIndex)){
                rbCtrlself.showCheckD = markerType1;} else{rbCtrlself.showCheckD = "&nbsp;";};  
        };
        
            
        // receiveData serves as a callback function and retrieves all thumbnail image files names from the db. Setting rbCtrlself.hyperIndex = 0 shows the first group of thumbnails on load.
        var receiveData =   function(data){
                                // alert("receiveData here");
                                $scope.$apply(function(){rbCtrlself.showPicObj = data; rbCtrlself.hyperIndex = 0;});
                            };
        RBData.rbGetPicsAjax(receiveData);
        
        
        // ****************************************************************************************************************************************************************
        // getView serves as a callback function and manages the history list.
        var getView  =  function(viewDataArray, viewDataArrayElement, clickSource){
                            //alert("getView here");
                            var bkgndColor = [];    // Contents stay intact for the next return call. But make sure it's not just luck.
                            var color1 = GetSet.getBkgndColor1();
                            var color2 = GetSet.getBkgndColor2();
                            
                            rbCtrlself.currentView = viewDataArray;
                            
                            if(clickSource == "thumbClick"){
                                
                                // The for loop and ensuing < rbCtrlself.bkColor = bkgndColor; > assignment highlight the current view's history button from a thumb click
                                for(i=0; i<rbCtrlself.currentView.length; i++){
                                    if((i+1) == rbCtrlself.currentView.length){
                                        bkgndColor.push(color1);
                                    }
                                    else{
                                        bkgndColor.push(color2);
                                    }
                                }    
                                rbCtrlself.bkColor = bkgndColor;
                                
                                GetSet.setThumbThumbClick(viewDataArray[viewDataArray.length-1].thumb);           // Used to show checkmark for selected thumbnail
                                GetSet.setHyperThumbClick(viewDataArray[viewDataArray.length-1].group - 1);  // Used to show checkmark for selected thumbnail
                                
                            }
                            else if(clickSource == "historyClick"){
                                // The for loop and ensuing < rbCtrlself.bkColor = bkgndColor; > assignment highlight the current view's history button from a view history click
                                for(i=0; i<rbCtrlself.currentView.length; i++){
                                    if(rbCtrlself.currentView[i].view == (viewDataArrayElement.view)){
                                         bkgndColor[i] = color1;
                                    }
                                    else{
                                        bkgndColor[i] = color2;
                                    }
                                }
                                rbCtrlself.bkColor = bkgndColor;
                                GetSet.setThumbThumbClick(viewDataArrayElement.thumb);
                                GetSet.setHyperThumbClick(viewDataArrayElement.group - 1);
                            }
                            showCheckMark();
                            
                            
                                                                                                        
                        };
        compFactory.ref(getView);
        // *****************************************************************************************************************************************************************
            
        // The stateHistory function shows the proper view clicked from the view history menu but does not add to the view history menu    
        rbCtrlself.stateHistory = function(viewHistory){
            //alert("stateHistory here");
            // alert("viewHistory.group is " + viewHistory.group + " viewHistory.view is " + viewHistory.view);
            compFactory.enableHist(false);      // Tells compFactory service to disable adding a view history item.
            rbCtrlself.arrayIndex(viewHistory.group-1); // Selects and highlights the proper hyper menu item  
            // alert("viewHistory.view for $state.go(exp) is: " + viewHistory.view);
            $state.go(viewHistory.view); // displays the selected view and also starts the chain reaction by routing to the associated componrnt.
            
            setTimeout(function(){
                compFactory.enableHist(true); // re-enables ability to add view history items. Delay is OK and callback not needed.
            },100);
        };  
        
        rbCtrlself.clearHistory = function(){
            var currentViewIndex = compFactory.clearView();
            // compFactory.clearView();
            rbCtrlself.arrayIndex(currentViewIndex-1); // Selects and highlights the current view after the previous view history is cleared 
            // GetSet.setMarkerType1("&#174;");
        };
        
        
        
        $state.go('view00');
}])


.factory('GetSet', ['RBData', function(RBData){
        
        // var markerType1 = "&#10004;";
        var markerType1 = "";

        var bkgndColor1 = "";
        //var bkgndColor2 = "#e6e6e6";
        var bkgndColor2 = "";
        
        var textColor1 = "";
        var shadowTextColor1 = "";
        
        var textColor2 = "";
        var shadowTextColor2 = "";
        
        var currentViewThumbFromThumbClick;
        var currentViewHyperIndexFromThumbClick;
        
        var styleCallback = function(data){
            // alert("in callback " + data.picMenu1A[0].highlight + " " + data.picMenu1A[0].shadow);
            textColor1 = data.picMenu1A[0].highlight;          // default initialize for selected text highlight on hyper menu, checkmark and history menu
            bkgndColor1 = data.picMenu1A[0].highlight;         // default initialize for selected text highlight on hyper menu, checkmark and history menu
            shadowTextColor1 = data.picMenu1A[0].shadow;       // default initialize for selected text highlight on hyper menu, checkmark and history menu
            textColor2 = data.picMenu1A[1].highlight;          // default initialize for selected text highlight on hyper menu, checkmark and history menu
            shadowTextColor2 = data.picMenu1A[1].shadow;       // default initialize for selected text highlight on hyper menu, checkmark and history menu
            
            markerType1 = data.styling[0].marker2;
            bkgndColor2 = data.styling[1].bkColor2;
        };
        
        RBData.menuConfig(styleCallback, "menus");

        return  {

            getMarkerType1: function(){return markerType1;},                        
            setMarkerType1: function(value){markerType1 = value;},                  // markerType1 is check mark
            
            getBkgndColor1: function(){return bkgndColor1;},                        // 
            setBkgndColor1: function(value){bkgndColor1 = value;},
            
            getBkgndColor2: function(){return bkgndColor2;},
            setBkgndColor2: function(value){bkgndColor2 = value;},
           
            getTextColor1: function(){return textColor1;},
            setTextColor1: function(value){textColor1 = value;},                    
            
            getShadowTextColor1: function(){return shadowTextColor1;},
            setShadowTextColor1: function(value){shadowTextColor1 = value;},
            
            getTextColor2: function(){return textColor2;},
            setTextColor2: function(value){textColor2 = value;},
            
            getShadowTextColor2: function(){return shadowTextColor2;},
            setShadowTextColor2: function(value){shadowTextColor2 = value;},
            
            getThumbThumbClick: function(){return currentViewThumbFromThumbClick;},
            setThumbThumbClick: function(value){currentViewThumbFromThumbClick = value;},
            
            getHyperThumbClick: function(){return currentViewHyperIndexFromThumbClick;},
            setHyperThumbClick: function(value){currentViewHyperIndexFromThumbClick = value;}
            
            
            
/*             
            selectedTextColor = data.picMenu1A[0].highlight;          // default initialize for selected text highlight on hyper menu, checkmark and history menu
            shadowForSelectedTextColor = data.picMenu1A[0].shadow;    // default initialize for selected text highlight shadow on hyper menu, checkmark and history menu 
            unSelectedTextColor = data.picMenu1A[1].highLight;        // default initialize for unselected text highlight for hyper menu, checkmark and history menu 
            shadowForUnSelectedTextColor = data.picMenu1A[1].shadow;
        
*/
            
        };


}])


.factory('RBData', ['$http', function($http){
   
            return  {
          
                rbGetPicsAjax:  function(receiveData){
                                    var picArray = [];
                                        var xhttp = new XMLHttpRequest();
                                        xhttp.onreadystatechange = function() {
                                            if(xhttp.readyState == 4){
                                            }    
                                            if (xhttp.readyState == 4 && xhttp.status == 200) {
                                                picArray = xhttp.responseText;  
                                                if(picArray.length <= 2)
                                                    alert("Query unsucessful");
                                                picArray = JSON.parse(picArray);
                                                var rbData = picArray;
                                                receiveData(rbData);
                                            }
                                        };
                                        xhttp.open("GET", "ttd-website-rb-page-server_Exp8.php?q=queryTest", true);
                                        xhttp.send();
                                },
                        
                menuConfig: function(menuCallbackRef, menuToPopulate){
                                switch(menuToPopulate){
                                    case "menus":   return $http.get('ttd-website-rb-page-JSON-client.json', { cache: true }).then(function(resp) {
                                                        menuCallbackRef(resp.data);
                                                    });
                                                    break;
                                }
                            }        
            };
}])


// compFactory handles the view history menu
.factory('compFactory', [ function(){

    var getView = function(){}; // visible to whole factory 
    var viewDataArray = [];     // visible to whole factory and is a cache
    var viewDataArrayElement = {}; // visible to whole factory
    var enable = true;          // visible to whole factory
    

    return {
                // ref is called here in the parent scope
                ref:        function(viewRef){
                                getView = viewRef;
                            },

                // enableHist is called here in the parent scope
                enableHist: function(enableBoolean){
                                enable = enableBoolean;
                            },
                
                // the logView function is called whenever a view is called and comes from its component controller
                // it will add to the view history menu when the enable variable is true
                logView:    function(viewData){
                    
                            var groupNum = Math.floor((viewData/4)+1); // Calcualtes what group the view came from. < viewData >  is the component number and is the view number by assocaition.
                            var groupThumb = viewData%4;
                            var clickSource = "";
                    
                            // when enable is true it adds to the view history menu because a thumbnail from the thumbnail group was clicked.
                            // when enable is false it's because a view history menu item was clicked so no need to add the view history menu.
                               
                                if(viewData <= 9){
                                    viewData = "view0" + viewData;
                                }
                                else {
                                var viewData = "view" + viewData;
                                }
                               
                                viewData = {view:viewData, group:groupNum, thumb:groupThumb};
                                // alert("From the factory: " + viewData.thumb);
                                
                                viewDataArrayElement = viewData;
                                
                                if(enable === true){ 
                                    viewDataArray.push(viewData);
                                    clickSource = "thumbClick";
                                }
                                else{
                                    // alert("factory");
                                    clickSource = "historyClick";
                                }
                                getView(viewDataArray, viewDataArrayElement, clickSource);
                            },
                            
                // Clears the history view except for the current view            
                clearView:  function(){
                            var length = viewDataArray.length;
                            viewDataArray.splice(0, length, viewDataArrayElement); // clear array and place current view at index position 0
                            getView(viewDataArray, viewDataArray[0], "thumbClick");
                            return viewDataArrayElement.group;   // return index (group) number so hyper index is updated reflecting current view. 
                }            
                            
    };            
}]);    
            

