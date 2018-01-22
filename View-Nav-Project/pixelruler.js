/*
 * To Do's - Allow for negative pixel marker locations - won't work as is.
 * 
 * 
 * 
 * Pixel Ruler Ver 1.0 - Release 03/17/2016 - Now being updated further
 * 
 * Note: Pixel ruler uses jQuery and needs supporting javascript file as follows
 * src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.3.min.js" and pixel
 * ruler itself is sourced from:
 * src="http://www.tarptiedown.com/javascript/pixelruler.js"
 * 
 * copy:
 * <script src="http://www.tarptiedown.com/javascript/pixelruler.js"></script> 
 * and place it at the end of your html
 * 
 * 
 * Pixel Ruler Instructions
 * 
 * Purpose: create an on screen ruler with pixel markers. Mouse over the pixel
 * markers to display marker location in pixels from O. 
 * 
 * Pixel footprint:
 * The first pixel position is designated as pixel one. The demarkation 
 * point is to the right of a pixel. That is, to the left of pixel 
 * one is the 'zero' mark and to the right is the 'one' mark. 
 * So a 50 pixel segment ends on the right of the 50th pixel. 
 * (This issue is addressed because CSS positions starting at 0px of 
 *  which we think as the first pixel. See the left positioning
 *  in code block 3 which is '(markerPosition - 1) + "px";' 
 * 
 * Within your HTML code create a div(s) with class name:  class="pixelRuler".
 * The following is an example of the div content that defines a pixel ruler:
 * Let's say you entered code line is: 
 * <div class="pixelRuler">585-85,112,436,470,569,580</div>
 * 585.....is the length of the ruler
 * 85 .....is the location of the first marker
 * 112.....is the location of the second marker
 * etc.
 * The "-" separates the length value from the marker values
 * The "," separates the marker values from one another
 * Follow this format for proper results.
 * Other guidelines:
 * >> List marker values in ascending order.
 * >> No spaces when separating marker values with commas. 
 * >> Pixel ruler will not properly position if preceeded by a floated element
 *    Further investigation into positioning recommended.
 * 
 */
    
try {
    var pixelRulerCount = document.getElementsByClassName("pixelRuler").length;
    var arrayOfAllPixelRulers = [];
    var rulerParts = [];
    var arrayOfAllPixelRulerMarkers = [];
    var arrayOfAllPixelRulerSegments = [];
    var arrayOfAllLastSegmentLengths = [];
    
//  ----------------------------------------------------------------------------------------------------------------      
//  Code block 1: 
//  This creates all the configuration arrays using the declared 
//  array variables above. Each of the array elements contain all the necessary 
//  information to determine array type, array number, segemnt location, marker
//  location. An example of a pixel ruler segment (element in the 
//  arrayOfAllPixelRulerSegments is: pRS-1-250 where pRS stands for "pixel Ruler
//  Segment", the "1" stands for the particular pixel ruler node and the "250"
//  stands for the location of the segment in pixels. Note the element parts are
//  separated by "-"
//  The array element breakdown is as follows:
//  
//  The first part of the element:
//     pR      stands for "pixel Ruler"
//     pRS     stands for "pixel Ruler Segment"
//     pRM     stands for "pixel Ruler Marker"
//     pRLSL   stands for "pixel Ruler Last Segment Length"
//  
//  The second part of the element:
//     Example: if a 0, it would be the first pixel ruler (or node) because the
//     pixel rulers are declared with class names in the HTML block and thus 
//     become an array of pixel ruler element nodes.
//  
//  The third part of the element:
//     When first part = "pR" - Example: if a 420, it would be the length 
//     of the pixel ruler  
//  
//     When first part = "pRS" - Example: if a 350, it would be the location 
//     of a segment at 350 pixels from the left of the origin of the ruler. 
//     All segments are 50 pixels long and alternately colored.
//   
//     When first part = "pRM" - Example: if a 456, it would be the location of
//     a marker.
//   
//     When first part = "pRLSL" - Example: the third part (number) is the 
//     starting location of the last segment.
//    
//  The fourth part of the element 
//  (only a fourth part when first part is pRLSL) 
//     When the first part = "pRLSL" - Example: if the fourth part is 38, it 
//     would be the length of the last segment. It can range from 0 to 49.
//     This is derived from a ruler length of (for example)738, or 438,
//     or 588, etc. This is because all segments are 50 pixels long but the 
//     last segment may not be. In each of these cases the last segment is 38
//     pixels long.
//  
//  Once all the arrays are built they are then used to construct the pixel
//  rulers. See the particular code blocks:
//  Code Block 1: Creates the configuration arrays (explained above)
//  Code Block 2: Makes the pixel ruler segments
//  Code Block 3: Places the pixel ruler markers
//  Code Block 4: Adds event handlers to the ruler markers 
//         


    for(pixelRulerNum = 0; pixelRulerNum < pixelRulerCount; pixelRulerNum++){
        var rulerConfig = document.getElementsByClassName("pixelRuler")[pixelRulerNum].innerHTML;
        var rulerParts = rulerConfig.split("-");
        var rulerLength = rulerParts[0];
        arrayOfAllPixelRulers.push("pR-" + pixelRulerNum + "-" + rulerLength);
    
        var rulerMarkers = rulerParts[1];
        var arrayOfRulerMarkers = rulerMarkers.split(",");
        for(markers = 0; markers < arrayOfRulerMarkers.length; markers++){
            arrayOfRulerMarkers[markers] = "pRM-" + pixelRulerNum + "-" + arrayOfRulerMarkers[markers];
        }
        arrayOfAllPixelRulerMarkers = arrayOfAllPixelRulerMarkers.concat(arrayOfRulerMarkers);
            
        // Create array of pixel segment locations    
        var fiftyPixSegments = parseInt(Number(rulerLength)/50);
        var lastSegmentLocation = fiftyPixSegments*50;
        var lastSegmentSize = Number(rulerLength)%50;
        
        for(segmentCount = 0; segmentCount < fiftyPixSegments; segmentCount++){
            arrayOfAllPixelRulerSegments.push("pRS-"+pixelRulerNum+"-"+(50*segmentCount));
        }
            // Adds the last segment location if the last segment is greater than 0 and less than fifty
            if(lastSegmentSize > 0 && fiftyPixSegments > 0){  
            arrayOfAllPixelRulerSegments.push("pRS-"+pixelRulerNum+"-"+((fiftyPixSegments)*50));
        }
       
        // Create array of last segment lengths     
        arrayOfAllLastSegmentLengths.push("pRLSL-"+pixelRulerNum+"-"+lastSegmentLocation+"-"+lastSegmentSize);
        
        // CSS styling - Note: The <br> in the innerHTML content assures normal element flow.
        document.getElementsByClassName("pixelRuler")[pixelRulerNum].innerHTML = "<br>";
        document.getElementsByClassName("pixelRuler")[pixelRulerNum].style.position = "relative";
    }
   
//  ----------------------------------------------------------------------------------------------------------------  
//  Code Block 2: 
//  This section makes the pixel ruler segments. Each created segment is a div with an ID
    // This for loop loops through each pixel ruler. The segments for each ruler are built.
    for(pixelRulerIndex = 0; pixelRulerIndex < arrayOfAllPixelRulers.length; pixelRulerIndex++){ 
            
        var lastSegmentParts = [];
        var segment = [];
        var segmentArray = [];
        var segmentParts =  [];

        // This for loop extracts segments from the selected pixel ruler 
        // (but not the markers. See next code block for markers.)
        for(segmentIndex = 0; segmentIndex < arrayOfAllPixelRulerSegments.length; segmentIndex++){
            segment = arrayOfAllPixelRulerSegments[segmentIndex];
            segmentParts = segment.split("-");
            if(segmentParts[1] == pixelRulerIndex){
                segmentArray.push(arrayOfAllPixelRulerSegments[segmentIndex]);
            }
        }
        lastSegmentParts = arrayOfAllLastSegmentLengths[pixelRulerIndex].split("-");

        // This loop creates and places the segments
        for(segmentIndex = 0; segmentIndex < segmentArray.length; segmentIndex++){
            segmentParts = segmentArray[segmentIndex].split("-");
            var segment = document.createElement("DIV");
            var divName = segmentArray[segmentIndex];
            segment.setAttribute("id",divName);
            document.getElementsByClassName("pixelRuler")[segmentParts[1]].appendChild(segment); 

            var segmentPosition = Number(segmentParts[2]); 
            document.getElementById(segmentArray[segmentIndex]).style.position = "absolute";
            document.getElementById(segmentArray[segmentIndex]).style.left = segmentPosition + "px";
            document.getElementById(segmentArray[segmentIndex]).style.top = "0px";
            document.getElementById(segmentArray[segmentIndex]).style.height = "20px";

            if(segmentPosition == lastSegmentParts[2]){
                document.getElementById(segmentArray[segmentIndex]).style.width = lastSegmentParts[3] + "px";
            }
            else
                document.getElementById(segmentArray[segmentIndex]).style.width = "50px";

            if((segmentPosition+100)%100 > 0)
                document.getElementById(segmentArray[segmentIndex]).style.backgroundColor = "green";
            else
                document.getElementById(segmentArray[segmentIndex]).style.backgroundColor = "red";

            document.getElementById(segmentArray[segmentIndex]).style.color = "white";
            document.getElementById(segmentArray[segmentIndex]).innerHTML = segmentPosition;
        }
    }
    
// ----------------------------------------------------------------------------------------------------------
// Code Block 3:
// This section places the markers. It first extracts the markers for the 
// particular pixel ruler from the arrayOfAllPixelRulerMarkers and places them
// accordingly.
    for(elementIndex = 0; elementIndex < arrayOfAllPixelRulerMarkers.length; elementIndex++){
        
        var markerElement = arrayOfAllPixelRulerMarkers[elementIndex];
        var markerElementParts = markerElement.split("-");
        var marker = document.createElement("DIV");
        var divNameA = arrayOfAllPixelRulerMarkers[elementIndex];
        marker.setAttribute("id",divNameA);
        document.getElementsByClassName("pixelRuler")[markerElementParts[1]].appendChild(marker);
        
        var markerPosition = Number(markerElementParts[2]);
        document.getElementById(arrayOfAllPixelRulerMarkers[elementIndex]).style.position = "absolute";
        document.getElementById(arrayOfAllPixelRulerMarkers[elementIndex]).style.left = (markerPosition - 1) + "px";
        document.getElementById(arrayOfAllPixelRulerMarkers[elementIndex]).style.top = "0px";
        document.getElementById(arrayOfAllPixelRulerMarkers[elementIndex]).style.height = "20px";
        document.getElementById(arrayOfAllPixelRulerMarkers[elementIndex]).style.width = "1px";
        document.getElementById(arrayOfAllPixelRulerMarkers[elementIndex]).style.backgroundColor = "white";
    }
  
  
// ----------------------------------------------------------------------------------------------------------
// Code Block 4:  
// This section attaches event handlers to the created markers and displays the 
// the marker location in number of pixels. It displays at the left end of the 
// pixel ruler. 
    // Helpful links
    // http://stackoverflow.com/questions/16064127/trigger-mouseover-on-element-created-by-javascript
    // http://www.w3schools.com/jquery/event_on.asp
    // assigning event handlers in a for loop in jquery
    // http://www.w3schools.com/jquery/event_target.asp
    
    var index;
    $(document).ready(function(){
        //alert(arrayOfAllPixelRulerMarkers);
        //alert(arrayOfAllPixelRulerMarkers.length);
        
        for(index = 0; index < arrayOfAllPixelRulerMarkers.length; index++){
            $("#" + arrayOfAllPixelRulerMarkers[index]).on("mouseover", function(){markerNumDisplay(event.target.id);});
        }
    }); 
     
    function markerNumDisplay(pixelRulerMarker){
        //alert();
        var pixelRulerMarkerParts = pixelRulerMarker.split("-");
        var pixelRulerMarkerLocation = pixelRulerMarkerParts[2];
        var pixelRulerSegmentIdForNumDisplay = "pRS-" + pixelRulerMarkerParts[1] + "-0";

        document.getElementById(pixelRulerSegmentIdForNumDisplay).style.position = "absolute";
        document.getElementById(pixelRulerSegmentIdForNumDisplay).style.left = "0px";
        document.getElementById(pixelRulerSegmentIdForNumDisplay).style.color = "yellow";
        document.getElementById(pixelRulerSegmentIdForNumDisplay).style.fontWeight = "bold";
        document.getElementById(pixelRulerSegmentIdForNumDisplay).innerHTML = pixelRulerMarkerLocation;
    }
}
catch(err){}   
