<?php 

$dataArr = [
    [
        'PAR-18-597',
        'Clinical Observational (CO) Studies in Musculoskeletal, Rheumatic, and Skin Diseases (R01)',
        'NIAMS',
        '6/2/2018',
        '11/4/2020'
    ],
    [
        'PAR-16-143',
        'Complex Integrated Multi-Component Projects in Aging Research (U19)',
        'NIA',
        '4/25/2016',
        '9/8/2019'
    ],
    [
        'PA-16-167',
        'Diet and Physical Activity Assessment Methodology (R01)',
        'NIDDK, NCI, NIAAA, NCCIH, ODS',
        '5/5/2016',
        '5/8/2019'
    ]
]

?>

<div id="fundingTBL">
    <div class="f-row hd-row">
        <div>Number</div>
        <div>Title</div>
        <div>Participating Org</div>
        <div>Open Date</div>
        <div>Expiration Date</div>
    </div>
    <?php 

        for ($i=0; $i < count( $dataArr ); $i++) { 
            echo "<div class='f-row' >" ;
                echo "<div><strong>Number:&nbsp;</strong>". $dataArr[$i][0] ."</div>";
                echo "<div><strong>Title:&nbsp;</strong>". $dataArr[$i][1] ."</div>";
                echo "<div><strong>Participating Org:&nbsp;</strong>". $dataArr[$i][2] ."</div>";
                echo "<div><strong>Open Date:&nbsp;</strong></span>". $dataArr[$i][3] ."</div>";
                echo "<div><strong>Expiration Date:&nbsp;</strong>". $dataArr[$i][4] ."</div>";
            echo "</div>";
        }

    ?>
    <!-- <div class="f-row hd-row">
        <div>PAR-18-597</div>
        <div><a href="#">Clinical Observational (CO) Studies in Musculoskeletal, Rheumatic, and Skin Diseases (R01)</a></div>
        <div>NIAMS</div>
        <div>6/2/2018</div>
        <div>11/4/2020</div>
    </div> -->
</div>