<?php
$FILM_POSTERS_URI = "../images/filmPosters/";
$CAST_CREW_URI = "../images/castCrew/";

$id = $_GET["id"];
$catalog = simplexml_load_file("../catalog.xml");
$films = $catalog->xpath("//film[id='$id']");
$film = $films[0];

$genres = $catalog->xpath("//film[id='$id']//genre");

$directors = $catalog->xpath("//film[id='$id']//director");
$producers = $catalog->xpath("//film[id='$id']//producer");
$screenWriters = $catalog->xpath("//film[id='$id']//screenwriter");
$stars = $catalog->xpath("//film[id='$id']//star");

$warnings = $catalog->xpath("//film[id='$id']//warning");

$releaseDate =
    $catalog->xpath("//film[id='$id']//release[last()]")[0];

$genreSummary =
    $genres[1]
    ? $genres[0] . " | " . $genres[1]
    : $genres[0];

$ageRestriction = $film->rating->ageRestriction;

$tomatoeMeter = $film->scores->rottenTomatoes->tomatoeMeter;
$audienceScore = $film->scores->rottenTomatoes->audienceScore;
$imdb = $film->scores->imdb / 10;

$score = $tomatoeMeter ?: $audienceScore ?: $imdb;

function getCrewMember($catalog, $id)
{
    return $catalog->xpath("//member[id='$id']")[0];
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/reset.css">
    <script src="https://kit.fontawesome.com/1ee6ded678.js" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="./js/main.js"></script>
    <title><?php echo "$film->title" ?></title>
    <script>
        $(function() {
            $(window).on('scroll', function() {
                var scNum = $(window).scrollTop()
                if (scNum >= 520) {
                    $('.detail_header').css({
                        'height': '80px',
                        'background-color': 'rgba(0,0,0,0.9)'
                    })
                    $('.detail_top_tit').css({
                        'display': 'block'
                    })
                } else {
                    $('.detail_header').css({
                        'height': '0',
                        'background-color': 'transparent'
                    })
                    $('.detail_top_tit').css({
                        'display': 'none'
                    })
                }
            })

            $('.detail_tap li').eq(0).on('click', function(e) {
                $('.detail_tap li').removeClass();
                $('.detail_tap li').eq(0).addClass('on');
                e.preventDefault();
                scrollNum = $('.detail_info').offset().top
                $('html,body').stop().animate({
                    scrollTop: scrollNum
                }, 1000)
            })
            $('.detail_tap li').eq(1).on('click', function(e) {
                $('.detail_tap li').removeClass();
                $('.detail_tap li').eq(1).addClass('on');
                e.preventDefault();
                scrollNum = $('.detail_casts').offset().top
                $('html,body').stop().animate({
                    scrollTop: scrollNum
                }, 1000)
            })
            $('.detail_tap li').eq(2).on('click', function(e) {
                $('.detail_tap li').removeClass();
                $('.detail_tap li').eq(2).addClass('on');
                e.preventDefault();
                scrollNum = $('.detail_rate').offset().top
                $('html,body').stop().animate({
                    scrollTop: scrollNum
                }, 1000)
            })
        })
    </script>
</head>

<body>
    <header class="detail_header">
        <a href="../index.php" id="logo"><em>MOVIE</em><em>CHARTS</em><em>2021</em></a>
        <div>
            <h2 class="detail_top_tit"><?php echo "$film->title" ?></h2>
            <p class="detail_back"><a href="./list.html">Back to lists</a></p>
        </div>
    </header>

    <div id="detail">
        <div class="detail_top">
            <div class="detail_top_txt">
                <p class="detail_tit"><?php echo $film->title ?></p>
                <p class="detail_top_genre"><?php echo $genreSummary ?></p>
                <ul class="detail_top_info">
                    <?php
                    if ($score) {
                        echo "<li class='detail_top_rate'><strong> Rate:</strong><span>$score</span></li>";
                    }
                    ?>
                    <li class="detail_top_rank"><strong>Rank</strong><span><?php echo "$film->popularity" ?></span></li>
                    <?php
                    if ($ageRestriction) {
                        echo "<li class='detail_top_age'><strong>Age</strong><span>$ageRestriction</span></li>";
                    }
                    ?>
                </ul>
            </div>
            <p class="detail_img"><img src="<?php echo $FILM_POSTERS_URI . $film->poster ?>" height="380" alt="poster"></p>
        </div>
        <div class="detail_main">
            <div>
                <ul class="detail_tap">
                    <li class="on"><a href="#">Information</a></li>
                    <li><a href="#">Cast members</a></li>
                    <li><a href="#">Rate</a></li>
                </ul>
                <div class="detail_contents">
                    <ul class="detail_info">
                        <h3>Information</h3>
                        <?php if ($releaseDate) {
                            echo "<li>Released date: ";
                            echo "$releaseDate->date ($releaseDate->location)";
                            echo "</li>";
                        } ?>
                        <li>Genre: <?php
                                    echo $genres[0];
                                    foreach (array_slice($genres, 1) as $genre) {
                                        echo ", $genre";
                                    };
                                    ?></li>
                        <li>Director: <?php
                                        echo getCrewMember($catalog, $directors[0])->name;
                                        foreach (array_slice($directors, 1) as $director) {
                                            echo ", " . getCrewMember($catalog, $director)->name;
                                        }
                                        ?></li>
                        <li>Runtime: <?php echo "$film->runtime" ?> minutes</li>
                        <li>Language: English</li>
                        <?php
                        if ($ageRestriction) {
                            echo "<li>Warnings: $ageRestriction";
                            if ($warnings) {
                                echo " ($warnings[0]";
                                foreach (array_slice($warnings, 1) as $warning) {
                                    echo " | $warning";
                                };
                                echo ")";
                            }
                            echo "</li>";
                        }
                        ?>
                        <li>Cast members: <?php
                                            echo getCrewMember($catalog, $stars[0])->name;
                                            foreach (array_slice($stars, 1) as $star) {
                                                echo ", " . getCrewMember($catalog, $star)->name;
                                            }
                                            ?></li>
                        <li>Distributer: <?php echo "$film->distributor" ?></li>
                        <li>Producer: <?php
                                        echo getCrewMember($catalog, $producers[0])->name;
                                        foreach (array_slice($producers, 1) as $producer) {
                                            getCrewMember($catalog, $producer)->name;
                                        }
                                        ?></li>
                        <li>Screenwriter: <?php
                                            echo getCrewMember($catalog, $screenWriters[0])->name;
                                            foreach (array_slice($screenWriters, 1) as $screenWriter) {
                                                echo ", " . getCrewMember($catalog, $screenWriter)->name;
                                            }
                                            ?></li>
                    </ul>
                    <div class="detail_desc">
                        <h3>Description</h3>
                        <p><?php echo $film->description ?></p>
                    </div>
                    <div class="detail_casts">
                        <h3>Cast Members</h3>
                        <ul>
                            <?php
                            foreach ($stars as $star) {
                                $crewMember = getCrewMember($catalog, $star);
                                echo "<li><div><img src='$CAST_CREW_URI$crewMember->photo' alt=''></div><strong>$crewMember->name</strong></li>";
                            }
                            ?>
                        </ul>
                    </div>
                    <?php
                    if ($score) {
                        echo "
                        <div class='detail_rate'>
                            <h3>Rate</h3>
                            <ul>";

                        if ($tomatoeMeter) {
                            echo "
                                <li>
                                    <h4>RottenTomatoes: Tomatoe Meter</h4>
                                    <span class='detail_rate_score bar01'>$tomatoeMeter</span>
                                </li>";
                        }
                        if ($audienceScore) {
                            echo "
                                <li>
                                    <h4>RottenTomatoes: Audience Score</h4>
                                    <span class='detail_rate_score bar02'>$audienceScore</span>
                                </li>";
                        }
                        if ($imdb) {
                            echo "
                                <li>
                                    <h4>IMDB: Rating</h4>
                                    <span class='detail_rate_score bar03'>$imdb</span>
                                </li>";
                        }

                        echo "
                            </ul>
                        </div>";
                    }
                    echo "<style>.bar01::after{width: $tomatoeMeter";
                    echo "%}</style>";
                    echo "<style>.bar02::after{width: $audienceScore";
                    echo "%}</style>";
                    echo "<style>.bar03::after{width:";
                    echo $imdb * 10;
                    echo "%}</style>";
                    ?>
                </div>
            </div>
        </div>
    </div>
    <footer class="footer">
        <p>Movie Charts 2021</p>
        <p>COMPX222 - 2021 Project by Frances Guest and Lydia Kim</p>
    </footer>
</body>

</html>