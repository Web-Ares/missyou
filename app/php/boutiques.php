<?php
$button = $_GET['id'];
if($button == '1'){
    $json_data = '{
        "boutiqueNames":[
                "Boutique Tollet",
                "Diamond Plaza building"
            ],
        "sliders": [
            {
                "background": "pic/boutique1.jpg",
                "title": "Boutique Tollet",
                "address": "Rue des Fripiers 36 1000 Bruxelles Belgium",
                "phone": "+32 3 294 3996"

            },
            {
                "background": "pic/boutique1.jpg",
                "title": "Diamond Plaza building",
                "address": "Rue des Fripiers 36 1000 Bruxelles Belgium",
                "phone": "+32 3 777 6665"

            }
        ]
    }';
}
if($button == '2'){
    $json_data = '{
        "boutiqueNames":[
                "Boutique 1",
                "Boutique 2",
                "Boutique 3"
            ],
        "sliders": [
            {
                "background": "pic/boutique1.jpg",
                "title": "Boutique 1",
                "address": "Rue des Fripiers 36 1000 Bruxelles Belgium",
                "phone": "+32 3 294 3996"

            },
            {
                "background": "pic/boutique1.jpg",
                "title": "Boutique 2",
                "address": "Rue des Fripiers 36 1000 Bruxelles Belgium",
                "phone": "+32 3 777 6665"

            },
            {
                "background": "pic/boutique1.jpg",
                "title": "Boutique 3",
                "address": "Rue des Fripiers 36 1000 Bruxelles Belgium",
                "phone": "+32 3 777 66666666"

            }
        ]
    }';
}
$json_data = str_replace("\r\n",'',$json_data);
$json_data = str_replace("\n",'',$json_data);


echo $json_data;
exit;
?>
