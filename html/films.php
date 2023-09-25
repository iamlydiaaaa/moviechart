<?php
$sortMethod = $_GET["sortBy"];
$sortDirection = $_GET["direction"];
$pageOffset = $_GET["offset"];
$pageLength = $_GET["pageLength"];
$searchTerm = $_GET["searchTerm"];

$catalog = simplexml_load_file("../catalog.xml");

if ($searchTerm !== "") {
    $films = $catalog->xpath("//film[contains(translate(title/text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),translate('$searchTerm','ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'))]");
} else {
    $films = $catalog->xpath('//film');
}

function compareRelease($filmA, $filmB)
{
    return
        strtotime(end($filmA->releases)) - strtotime(end($filmB->releases));
}

function compareRuntime($filmA, $filmB)
{
    return $filmA->runtime - $filmB->runtime;
}

function compareTitles($filmA, $filmB)
{
    return strcmp($filmA->title, $filmB->title);
}

function comparePopularity($filmA, $filmB)
{
    return $filmA->popularity - $filmB->popularity;
}

$sortedFilms;

switch ($sortMethod) {
    case 'release':
        usort($films, 'compareRelease');
        break;
    case 'runtime':
        usort($films, 'compareRuntime');
        break;
    case "title":
        usort($films, 'compareTitles');
        break;
    case "popularity":
    default:
        usort($films, 'comparePopularity');
        break;
}

if ($sortDirection === "DESC") {
    $films = array_reverse($films);
}

$pagedFilms = array_slice($films, $pageOffset, $pageLength, false);

$output = new stdClass();
$output->pageCount = ceil(count($films) / $pageLength);
$output->films = $pagedFilms;

header('Content-Type: application/json; charset=utf-8');
echo json_encode($output);
