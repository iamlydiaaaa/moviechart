<?php
$catalog = simplexml_load_file("./catalog.xml");
$films = $catalog->xpath("//film[position()<5]");

$FILM_POSTERS_URI = "./images/filmPosters/";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/reset.css">
    <script src="https://kit.fontawesome.com/1ee6ded678.js" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="./js/main.js"></script>
    <script>
        $(function() {
            $(window).on('scroll', function() {
                var scNum = $(window).scrollTop()
                if (scNum >= 700) {
                    $('.top_poster>li').css({
                        'opacity': '1',
                        'transform': 'translateY(0px)'
                    })
                }
                if (scNum >= 1500) {
                    $('.section3_txt>.tit').css({
                        'opacity': '1',
                        'transform': 'translateY(0px)'
                    })
                    $('.section3_txt>span').css({
                        'opacity': '1',
                        'transform': 'translateY(0px)'
                    })
                    $('.section3_txt>.button_explore').css({
                        'opacity': '1',
                        'transform': 'translateY(0px)'
                    })
                }
            })
        })
    </script>
    <title>Movie Charts</title>
</head>

<body>
    <header>
        <a href="./index.php" id="logo"><em>MOVIE</em><em>CHARTS</em><em>2021</em></a>
    </header>
    <section id="section1">
        <div id="home">
            <p class="homebg"></p>
            <h1><em>MOVIE</em><em>CHARTS</em><em>2021</em></h1>
            <p class="explore"></p>
        </div>
    </section>
    <section id="section2">
        <article class="main2">
            <h2 class="tit">TOP MOVIES</h2>
            <ul class="top_poster">
                <?php
                foreach ($films as $film) {
                    $desc = $film->description;
                    if (strlen($desc) > 170) {
                        $desc = substr($desc, 0, 170) . "...";
                    }

                    echo "<li>";
                    echo "    <img src='$FILM_POSTERS_URI$film->poster' alt='$film->title poster' />";
                    echo "    <div class='top_wrap'>";
                    echo "        <a href='./html/detail.php?id=$film->id'>";
                    echo "            <p class='top_desc'>$desc</p>";
                    echo "            <p class='top_go'>See detail</p>";
                    echo "        </a>";
                    echo "    </div>";
                    echo "    <div class='top_subtit'>";
                    echo "        <p class='top_tit'>$film->title</p>";
                    echo "    </div>";
                    echo "</li>";
                }
                ?>
            </ul>
        </article>
    </section>
    <section id="section3">
        <article class="main3">
            <div class="section3_txt">
                <h2 class="tit">ALL MOVIES</h2>
                <span> Explore movies released in 2021 -</span>
                <p class="button_explore"><a href="./html/list.html">EXPLORE</a></p>
            </div>
        </article>
    </section>
</body>

</html>