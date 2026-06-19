$games = @(
  @('troll-puzzle-quest','Troll Puzzle Quest','Solve five funny trick scenes by finding the unexpected answer.','Puzzle'),
  @('aura-points','Aura Points','Make choices, protect your aura score, and reveal your final internet rank.','Casual'),
  @('mog-off-battle','Mog-Off Battle','Run a friendly local photo battle where players decide every winner.','Casual'),
  @('guess-the-brainrot','Guess the Brainrot','Identify internet slang, meme formats, and online culture from clues.','Quiz'),
  @('brainrot-merge','Brainrot Merge','Merge matching meme tiles and unlock increasingly absurd evolutions.','Puzzle'),
  @('locked-in-reaction-test','Locked-In Reaction Test','Measure your reaction speed across five rapid rounds.','Arcade'),
  @('meme-higher-lower','Meme Higher or Lower','Guess which classic internet meme has the higher popularity score.','Quiz'),
  @('troll-obby','Troll Obby','Jump through a compact obstacle course filled with deceptive platforms.','Arcade'),
  @('one-button-challenge','One Button Challenge','Beat ten changing rules using the same single button.','Arcade'),
  @('meme-sound-quiz','Meme Sound Quiz','Recognize synthesized sound clues and choose the right meme moment.','Quiz'),
  @('daily-internet-quiz','Daily Internet Quiz','Answer five quick questions about games and online culture.','Quiz'),
  @('emoji-decode-battle','Emoji Decode Battle','Decode movies, games, and internet culture from symbol clues.','Quiz'),
  @('chaos-would-you-rather','Chaos Would You Rather','Choose between impossible internet scenarios and compare your instincts.','Casual'),
  @('npc-simulator','NPC Simulator','Choose responses and survive an increasingly strange livestream.','Simulation'),
  @('daily-meme-bracket','Daily Meme Bracket','Vote through a knockout bracket and crown one internet champion.','Casual'),
  @('67-troll-challenge','67 Troll Challenge','Stop a trick counter exactly on 67 before time runs out.','Arcade'),
  @('face-mogged','Face Mogged','A local, user-decided style-card battle with no automated attractiveness scoring.','Casual')
)
$root = Join-Path $PSScriptRoot '..\games\viral'
foreach ($g in $games) {
  $slug,$name,$description,$genre = $g
  $html = @"
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>$name &mdash; Play Free Online | Vibox Viral Arcade</title><meta name="description" content="$description Play free online on mobile or desktop with no download or signup."><link rel="canonical" href="https://vibox.app/games/viral/$slug.html"><meta property="og:type" content="website"><meta property="og:title" content="$name &mdash; Free Browser Game"><meta property="og:description" content="$description"><meta property="og:url" content="https://vibox.app/games/viral/$slug.html"><meta property="og:image" content="https://vibox.app/assets/og-image.png"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"><link rel="stylesheet" href="../style.css"><link rel="stylesheet" href="style.css"><script type="application/ld+json">{"@context":"https://schema.org","@type":"VideoGame","name":"$name","description":"$description","genre":"$genre","playMode":"SinglePlayer","gamePlatform":"Web Browser","url":"https://vibox.app/games/viral/$slug.html","isAccessibleForFree":true}</script></head><body class="viral-game-body" data-game="$slug">
<header class="ga-header"><div class="ga-header-inner"><a class="ga-logo" href="index.html"><span class="ga-logo-v">V</span>ibox<span class="ga-logo-dot">.</span>Viral</a><nav class="ga-nav"><a class="ga-nav-link" href="index.html"><i class="fas fa-fire"></i> Viral Arcade</a><a class="ga-nav-link" href="../index.html"><i class="fas fa-gamepad"></i> All Games</a></nav></div></header>
<main class="game-shell"><section class="game-top"><div><span class="game-badge">$genre &middot; free browser game</span><h1>$name</h1><p>$description</p></div><div class="game-stats"><span class="game-stat">Score <b id="score">0</b></span><span class="game-stat">Streak <b id="streak">0</b></span><span class="game-stat">Best <b id="best">0</b></span></div></section><section class="game-stage" id="game-stage" aria-live="polite"></section><section class="game-how"><h2>How to play $name</h2><p>Follow the instructions inside the game, complete the round, and try to beat your locally saved best score. $name works with touch, mouse, and keyboard where appropriate.</p><h2>More viral games</h2><div class="related-games"><a href="aura-points.html">Aura Points</a><a href="guess-the-brainrot.html">Guess the Brainrot</a><a href="locked-in-reaction-test.html">Reaction Test</a><a href="daily-meme-bracket.html">Meme Bracket</a><a href="index.html">All 17 games</a></div></section></main><footer class="ga-footer">&copy; 2026 Vibox &middot; <a href="index.html">Viral Arcade</a> &middot; <a href="../index.html">All Games</a></footer><script src="games-data.js"></script><script src="engine.js"></script></body></html>
"@
  Set-Content -LiteralPath (Join-Path $root "$slug.html") -Value $html -Encoding utf8
}
Write-Host "Generated $($games.Count) viral game pages."
