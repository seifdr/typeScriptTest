<div class="specProfiles">

<?php

    $count = 4;

    for ($i=0; $i < $count ; $i++) { 
       
?>

    <article class="specProfile">
        <div class="specImg">
            <img src="img/animals.jpeg" />
        </div>
        <div class="specContent">
            <h4><?php echo $i; ?> -- Duncan Seif</h4>
            <p>Web Developer<br />Medical Director, Autopsy</p>
            <ul>
                <li>Phone: XXX-XXX-XXXX</li>
                <li>Email: duncan.seif@northwestern.edu</li>
            </ul>  
        </div>
          
    </article>


<?php 

    }
?>


</div>