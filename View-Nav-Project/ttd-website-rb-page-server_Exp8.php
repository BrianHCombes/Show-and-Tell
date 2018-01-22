<?php

$q = $_REQUEST["q"];
//echo $q;
// Reference URL's: http://www.w3schools.com/php/php_ref_mysqli.asp


$imageArray = array(    array("picColA"=>"DSCN3181.jpg", "picColB"=>"DSCN3469.jpg", "picColC"=>"DSCN2049.jpg", "picColD"=>"DSCN2453.jpg"),
                        array("picColA"=>"DSCN2453.jpg", "picColB"=>"DSCN2049.jpg", "picColC"=>"DSCN3469.jpg", "picColD"=>"DSCN3181.jpg"),
                        array("picColA"=>"DSCN3469.jpg", "picColB"=>"DSCN3181.jpg", "picColC"=>"DSCN2453.jpg", "picColD"=>"DSCN2049.jpg"),
                        array("picColA"=>"DSCN2049.jpg", "picColB"=>"DSCN2453.jpg", "picColC"=>"DSCN3181.jpg", "picColD"=>"DSCN3469.jpg"),
                        array("picColA"=>"DSCN3181.jpg", "picColB"=>"DSCN3469.jpg", "picColC"=>"DSCN2049.jpg", "picColD"=>"DSCN2453.jpg"),
                        array("picColA"=>"DSCN2453.jpg", "picColB"=>"DSCN2049.jpg", "picColC"=>"DSCN3469.jpg", "picColD"=>"DSCN3181.jpg"),
                        array("picColA"=>"DSCN3469.jpg", "picColB"=>"DSCN3181.jpg", "picColC"=>"DSCN2453.jpg", "picColD"=>"DSCN2049.jpg"),
                        array("picColA"=>"DSCN2049.jpg", "picColB"=>"DSCN2453.jpg", "picColC"=>"DSCN3181.jpg", "picColD"=>"DSCN3469.jpg"),
                        array("picColA"=>"DSCN3181.jpg", "picColB"=>"DSCN3469.jpg", "picColC"=>"DSCN2049.jpg", "picColD"=>"DSCN2453.jpg"),
                        array("picColA"=>"DSCN2453.jpg", "picColB"=>"DSCN2049.jpg", "picColC"=>"DSCN3469.jpg", "picColD"=>"DSCN3181.jpg"),
                        array("picColA"=>"DSCN3469.jpg", "picColB"=>"DSCN3181.jpg", "picColC"=>"DSCN2453.jpg", "picColD"=>"DSCN2049.jpg"),
                        array("picColA"=>"DSCN2049.jpg", "picColB"=>"DSCN2453.jpg", "picColC"=>"DSCN3181.jpg", "picColD"=>"DSCN3469.jpg"),
                        array("picColA"=>"DSCN3181.jpg", "picColB"=>"DSCN3469.jpg", "picColC"=>"DSCN2049.jpg", "picColD"=>"DSCN2453.jpg"),
                        array("picColA"=>"DSCN2453.jpg", "picColB"=>"DSCN2049.jpg", "picColC"=>"DSCN3469.jpg", "picColD"=>"DSCN3181.jpg"),
                        array("picColA"=>"DSCN3469.jpg", "picColB"=>"DSCN3181.jpg", "picColC"=>"DSCN2453.jpg", "picColD"=>"DSCN2049.jpg"),
                        array("picColA"=>"DSCN2049.jpg", "picColB"=>"DSCN2453.jpg", "picColC"=>"DSCN3181.jpg", "picColD"=>"DSCN3469.jpg"),
                        array("picColA"=>"DSCN3181.jpg", "picColB"=>"DSCN3469.jpg", "picColC"=>"DSCN2049.jpg", "picColD"=>"DSCN2453.jpg"),
                        array("picColA"=>"DSCN2453.jpg", "picColB"=>"DSCN2049.jpg", "picColC"=>"DSCN3469.jpg", "picColD"=>"DSCN3181.jpg"),
                        array("picColA"=>"DSCN3469.jpg", "picColB"=>"DSCN3181.jpg", "picColC"=>"DSCN2453.jpg", "picColD"=>"DSCN2049.jpg"),
                        array("picColA"=>"DSCN2049.jpg", "picColB"=>"DSCN2453.jpg", "picColC"=>"DSCN3181.jpg", "picColD"=>"DSCN3469.jpg"),
                        array("picColA"=>"DSCN3181.jpg", "picColB"=>"DSCN3469.jpg", "picColC"=>"DSCN2049.jpg", "picColD"=>"DSCN2453.jpg"),
                        array("picColA"=>"DSCN2453.jpg", "picColB"=>"DSCN2049.jpg", "picColC"=>"DSCN3469.jpg", "picColD"=>"DSCN3181.jpg"),
                        array("picColA"=>"DSCN3469.jpg", "picColB"=>"DSCN3181.jpg", "picColC"=>"DSCN2453.jpg", "picColD"=>"DSCN2049.jpg"),
                        array("picColA"=>"DSCN2049.jpg", "picColB"=>"DSCN2453.jpg", "picColC"=>"DSCN3181.jpg", "picColD"=>"DSCN3469.jpg")
                    );



    $servername = "23.229.167.12";
//    $servername = "localhost";
    $username = "BrianHCombes";
    $password = "fullStack0109";
    $dbname = "ttd_product_rb_db";
    
/* 

//    Local connection used for development    
$servername = "127.0.0.1";
$username = "root";
// $password = "tiggerC$0109#";  (old password)
$password = "aisleDrone811";   // (new password as of 04/21/2017)
$dbname = "ttd_product_rb_db";

*/

// Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
};

// Query to retrieve image information    

// if(1){
if($q === "queryTest"){

    // $sql = "SELECT * FROM ttd_product_rb_db.rb_images";
    
    $sql = "SELECT * FROM ttd_product_rb_db.rb_images JOIN ttd_product_rb_db.view_name WHERE ttd_product_rb_db.rb_images.product_id = ttd_product_rb_db.view_name.view_row_id;";


        $result = mysqli_query($conn, $sql);

        $queryResult = array();
/*         
       
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($queryResult, $row["rb_picColA"], $row["rb_picColB"], $row["rb_picColC"], $row["rb_picColD"]); 

            }
        }
        
*/
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($queryResult, $row["rb_picColA"], $row["rb_picColB"], $row["rb_picColC"], $row["rb_picColD"], $row["view_name_colA"], $row["view_name_colB"], $row["view_name_colC"], $row["view_name_colD"]); 

            }
        }

        
        $picRow_pics4 = array();
        $multi_dim_pics4 = array();
/*         

        for($i=0; $i<count($queryResult); $i+=4){
            $picRow_pics4['picColA'] = $queryResult[$i+0]; 
            $picRow_pics4['picColB'] = $queryResult[$i+1];
            $picRow_pics4['picColC'] = $queryResult[$i+2];
            $picRow_pics4['picColD'] = $queryResult[$i+3];
        array_push($multi_dim_pics4, $picRow_pics4);
        }

*/
       
        for($i=0; $i<count($queryResult); $i+=8){
            $picRow_pics4['picColA'] = $queryResult[$i+0]; 
            $picRow_pics4['picColB'] = $queryResult[$i+1];
            $picRow_pics4['picColC'] = $queryResult[$i+2];
            $picRow_pics4['picColD'] = $queryResult[$i+3];
            $picRow_pics4['viewColA'] = $queryResult[$i+4];
            $picRow_pics4['viewColB'] = $queryResult[$i+5];
            $picRow_pics4['viewColC'] = $queryResult[$i+6];
            $picRow_pics4['viewColD'] = $queryResult[$i+7];
        array_push($multi_dim_pics4, $picRow_pics4);
        }

        echo json_encode($multi_dim_pics4);
    };
// mysqli_close($conn);
 

/*     

if($q === "sqlTest"){

    $sql = "SELECT * FROM ttd_product_rb_db.rb_images";

            $result = mysqli_query($conn, $sql);

            $queryResult = array();
            if (mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                    array_push($queryResult, $row["instruction_id"], $row["instruction_image"], $row["caption_text1"]); 

                }
            }
            echo json_encode($queryResult);
    }    
*/
   
    
    
// if($q === "standard" || $q === "mount" || $q === "connect" || $q === "anywhere" || $q === "pointer" || $q === "keeper"){
/*
    $sql = "SELECT instruction_images.instruction_id, instruction_image, caption_text1 FROM instruction_images

            JOIN instruction_captions ON instruction_images.instruction_id = instruction_captions.instruction_id

            WHERE instruction_images.technique = '" . $q . "'

            ORDER BY instruction_order ASC;";


            $result = mysqli_query($conn, $sql);

            $queryResult = array();
            if (mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                    array_push($queryResult, $row["instruction_id"], $row["instruction_image"], $row["caption_text1"]); 

                }
            }
            echo json_encode($queryResult);
    }
// mysqli_close($conn);
 * 
 */
if($q == "test"){
    
       echo json_encode($imageArray);
}       

/*
$testData = array("DSCN2049.jpg", "DSCN2453.jpg", "DSCN3181.jpg", "DSCN3469.jpg");
            alert("This is the server page");
            //echo "The data is " . $testData[0] . "<br>";
            // $jsonData = json_encode($testData);
             echo json_encode($testData);
            //echo "The json data is: " . $jsonData;
 */