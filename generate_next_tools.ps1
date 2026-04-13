$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$enc = New-Object System.Text.UTF8Encoding($false)

$tools = @(
    @{ id='next-citation-generator'; slug='citation-generator'; name='Citation Generator'; category='text'; desc='Generate APA, MLA, and Chicago citations quickly in your browser.'; icon='fas fa-quote-right'; keywords='citation generator apa mla chicago bibliography' },
    @{ id='next-formula-sheet-maker'; slug='formula-sheet-maker'; name='Formula Sheet Maker'; category='text'; desc='Build printable formula sheets for exam revision and quick reference.'; icon='fas fa-square-root-alt'; keywords='formula sheet equations cheat sheet math physics' },
    @{ id='next-plagiarism-checker'; slug='plagiarism-checker'; name='Plagiarism Checker'; category='text'; desc='Check text overlap locally with private, browser-only similarity metrics.'; icon='fas fa-clone'; keywords='plagiarism similarity checker text overlap originality' },
    @{ id='next-graph-plotter'; slug='graph-plotter'; name='Graph Plotter'; category='math'; desc='Plot quadratic values instantly and export clean coordinate tables.'; icon='fas fa-chart-line'; keywords='graph plotter quadratic equation table coordinates' },
    @{ id='next-ats-resume-checker'; slug='ats-resume-checker'; name='ATS Resume Checker'; category='utility'; desc='Compare resume keywords against job descriptions for ATS readiness.'; icon='fas fa-file-alt'; keywords='ats resume checker job description keyword match' },
    @{ id='next-cover-letter-formatter'; slug='cover-letter-formatter'; name='Cover Letter Formatter'; category='text'; desc='Generate structured, role-focused cover letters in seconds.'; icon='fas fa-envelope-open-text'; keywords='cover letter format job application template' },
    @{ id='next-salary-breakup-calculator'; slug='salary-breakup-calculator'; name='Salary Breakup Calculator'; category='math'; desc='Estimate monthly salary components from annual CTC and percentages.'; icon='fas fa-money-check-alt'; keywords='salary breakup ctc in hand hra pf calculator' },
    @{ id='next-interview-prep-cards'; slug='interview-prep-cards'; name='Interview Prep Cards'; category='utility'; desc='Create focused interview flashcards from role and skill keywords.'; icon='fas fa-layer-group'; keywords='interview prep cards questions answers practice' },
    @{ id='next-thumbnail-caption-maker'; slug='thumbnail-caption-maker'; name='Thumbnail Caption Maker'; category='media'; desc='Generate high-impact thumbnail text and title combinations for creators.'; icon='fas fa-image'; keywords='thumbnail caption youtube title generator' },
    @{ id='next-subtitle-formatter'; slug='subtitle-formatter'; name='Subtitle Formatter'; category='media'; desc='Turn transcript lines into clean SRT subtitle blocks fast.'; icon='fas fa-closed-captioning'; keywords='subtitle formatter srt transcript captions' },
    @{ id='next-script-timer'; slug='script-timer'; name='Script Timer'; category='time'; desc='Estimate script runtime by word count and speaking speed.'; icon='fas fa-stopwatch'; keywords='script timer read time words per minute' },
    @{ id='next-hashtag-title-generator'; slug='hashtag-title-generator'; name='Hashtag and Title Generator'; category='text'; desc='Create platform-ready titles and hashtags for growth-focused content.'; icon='fas fa-hashtag'; keywords='hashtag generator title generator social media seo' },
    @{ id='next-audio-cleanup-notes'; slug='audio-cleanup-notes'; name='Audio Cleanup Notes'; category='media'; desc='Remove filler words from transcripts and prepare cleaner narration text.'; icon='fas fa-wave-square'; keywords='audio cleanup transcript remove filler words' },
    @{ id='next-invoice-generator'; slug='invoice-generator'; name='Invoice Generator'; category='utility'; desc='Create itemized invoices with subtotal, tax, and grand total.'; icon='fas fa-file-invoice-dollar'; keywords='invoice generator billing gst vat' },
    @{ id='next-gst-vat-calculator'; slug='gst-vat-calculator'; name='GST and VAT Calculator'; category='math'; desc='Calculate inclusive and exclusive GST or VAT values precisely.'; icon='fas fa-percentage'; keywords='gst vat calculator tax inclusive exclusive' },
    @{ id='next-quotation-maker'; slug='quotation-maker'; name='Quotation Maker'; category='utility'; desc='Build professional client quotations with timeline and scope.'; icon='fas fa-file-signature'; keywords='quotation maker proposal estimate client' },
    @{ id='next-margin-calculator'; slug='margin-calculator'; name='Margin Calculator'; category='math'; desc='Compute profit, markup, and net margin for pricing decisions.'; icon='fas fa-calculator'; keywords='margin calculator profit markup pricing' },
    @{ id='next-receipt-parser'; slug='receipt-parser'; name='Receipt Parser'; category='utility'; desc='Extract totals and key fields from OCR-style receipt text.'; icon='fas fa-receipt'; keywords='receipt parser ocr expense extraction' },
    @{ id='next-form-format-validator'; slug='form-format-validator'; name='Form Format Validator'; category='govt'; desc='Validate PAN, Aadhaar, passport, email, and phone formats instantly.'; icon='fas fa-check-circle'; keywords='form validator pan aadhaar passport format' },
    @{ id='next-eligibility-calculator'; slug='eligibility-calculator'; name='Eligibility Calculator'; category='govt'; desc='Check age and income criteria for common application workflows.'; icon='fas fa-user-check'; keywords='eligibility calculator age income criteria' },
    @{ id='next-macros-calculator'; slug='macros-calculator'; name='Macros Calculator'; category='math'; desc='Calculate daily protein, carbs, and fats by goal and body weight.'; icon='fas fa-utensils'; keywords='macros calculator protein carbs fat' },
    @{ id='next-calorie-planner'; slug='calorie-planner'; name='Calorie Planner'; category='math'; desc='Estimate BMR and maintenance calories with activity adjustments.'; icon='fas fa-fire'; keywords='calorie planner bmr tdee nutrition' },
    @{ id='next-interval-timer-planner'; slug='interval-timer-planner'; name='Interval Timer Planner'; category='time'; desc='Generate structured work-rest schedules for HIIT and study sprints.'; icon='fas fa-clock'; keywords='interval timer planner hiit pomodoro' },
    @{ id='next-habit-tracker'; slug='habit-tracker'; name='Habit Tracker'; category='utility'; desc='Create printable habit tracking grids for daily consistency.'; icon='fas fa-tasks'; keywords='habit tracker printable routine productivity' },
    @{ id='next-meal-planner'; slug='meal-planner'; name='Meal Planner'; category='utility'; desc='Distribute calories by meal count for practical daily planning.'; icon='fas fa-concierge-bell'; keywords='meal planner calories nutrition schedule' },
    @{ id='next-sip-calculator'; slug='sip-calculator'; name='SIP Calculator'; category='math'; desc='Estimate future wealth from monthly SIP investments and expected return.'; icon='fas fa-piggy-bank'; keywords='sip calculator mutual fund investment future value' },
    @{ id='next-emi-calculator'; slug='emi-calculator'; name='EMI Calculator'; category='math'; desc='Calculate EMI, interest paid, and total repayment for loans.'; icon='fas fa-hand-holding-usd'; keywords='emi calculator loan repayment interest' },
    @{ id='next-fd-calculator'; slug='fd-calculator'; name='FD Calculator'; category='math'; desc='Compute fixed deposit maturity with compounding frequency options.'; icon='fas fa-coins'; keywords='fd calculator fixed deposit maturity interest' },
    @{ id='next-tax-estimator'; slug='tax-estimator'; name='Tax Estimator'; category='math'; desc='Estimate annual tax liability with slab-based calculations.'; icon='fas fa-file-invoice'; keywords='tax estimator slab calculator income tax' },
    @{ id='next-budgeting-sheet'; slug='budgeting-sheet'; name='Budgeting Sheet'; category='utility'; desc='Generate monthly budget summaries from income and expense lines.'; icon='fas fa-wallet'; keywords='budgeting sheet monthly expenses planner' },
    @{ id='next-debt-payoff-planner'; slug='debt-payoff-planner'; name='Debt Payoff Planner'; category='math'; desc='Prioritize debts using high-interest payoff strategies.'; icon='fas fa-chart-pie'; keywords='debt payoff planner avalanche snowball' },
    @{ id='next-itinerary-builder'; slug='itinerary-builder'; name='Itinerary Builder'; category='utility'; desc='Create day-wise travel itineraries from highlights and duration.'; icon='fas fa-route'; keywords='itinerary builder travel planner day wise' },
    @{ id='next-packing-list-builder'; slug='packing-list-builder'; name='Packing List Builder'; category='utility'; desc='Generate travel packing checklists by weather and trip type.'; icon='fas fa-suitcase-rolling'; keywords='packing list travel checklist luggage' },
    @{ id='next-timezone-planner'; slug='timezone-planner'; name='Timezone Planner'; category='time'; desc='Plan meetings across multiple UTC offsets from one base time.'; icon='fas fa-globe-asia'; keywords='timezone planner meeting converter utc' },
    @{ id='next-visa-doc-checker'; slug='visa-doc-checker'; name='Visa Document Checker'; category='govt'; desc='Generate practical visa application checklist by purpose and country.'; icon='fas fa-passport'; keywords='visa document checklist travel docs' },
    @{ id='next-api-tester-lite'; slug='api-tester-lite'; name='API Tester Lite'; category='dev'; desc='Run simple GET and POST requests and inspect API responses.'; icon='fas fa-plug'; keywords='api tester get post json response' },
    @{ id='next-jwt-decoder'; slug='jwt-decoder'; name='JWT Decoder'; category='dev'; desc='Decode JWT headers and payloads safely in your browser.'; icon='fas fa-user-secret'; keywords='jwt decoder token payload header' },
    @{ id='next-code-formatter-lite'; slug='code-formatter-lite'; name='Code Formatter Lite'; category='dev'; desc='Format JSON, JavaScript, HTML, and CSS instantly.'; icon='fas fa-code'; keywords='code formatter json javascript html css' },
    @{ id='next-mock-data-generator'; slug='mock-data-generator'; name='Mock Data Generator'; category='dev'; desc='Generate sample user, product, and order datasets as JSON.'; icon='fas fa-database'; keywords='mock data generator fake json sample' },
    @{ id='next-quiz-creator'; slug='quiz-creator'; name='Quiz Creator'; category='text'; desc='Generate quick multi-choice quiz templates by topic.'; icon='fas fa-question-circle'; keywords='quiz creator mcq worksheet teacher' },
    @{ id='next-worksheet-generator'; slug='worksheet-generator'; name='Worksheet Generator'; category='text'; desc='Create printable math worksheets with randomized questions.'; icon='fas fa-file-alt'; keywords='worksheet generator math practice teacher' },
    @{ id='next-flashcard-maker'; slug='flashcard-maker'; name='Flashcard Maker'; category='text'; desc='Build front-back flashcards from custom topic terms.'; icon='fas fa-clone'; keywords='flashcard maker study memory cards' },
    @{ id='next-puzzle-generator'; slug='puzzle-generator'; name='Puzzle Generator'; category='text'; desc='Generate quick word-scramble style puzzle prompts.'; icon='fas fa-puzzle-piece'; keywords='puzzle generator word scramble classroom' },
    @{ id='next-aim-trainer'; slug='aim-trainer'; name='Aim Trainer'; category='fun'; desc='Practice reaction speed and click timing directly in browser.'; icon='fas fa-crosshairs'; keywords='aim trainer reaction speed click test' },
    @{ id='next-sensitivity-converter'; slug='sensitivity-converter'; name='Sensitivity Converter'; category='math'; desc='Convert mouse sensitivity between different DPI settings.'; icon='fas fa-mouse-pointer'; keywords='sensitivity converter dpi edpi gaming' },
    @{ id='next-tournament-bracket-builder'; slug='tournament-bracket-builder'; name='Tournament Bracket Builder'; category='fun'; desc='Generate seeded first-round matchups for tournament events.'; icon='fas fa-trophy'; keywords='tournament bracket builder fixtures' },
    @{ id='next-hindi-writing-assistant'; slug='hindi-writing-assistant'; name='Hindi Writing Assistant'; category='text'; desc='Convert basic Roman Hindi into readable Devanagari output.'; icon='fas fa-language'; keywords='hindi writing assistant roman to devanagari' },
    @{ id='next-transliteration-tool'; slug='transliteration-tool'; name='Transliteration Tool'; category='text'; desc='Convert between simple English and Hindi transliteration forms.'; icon='fas fa-exchange-alt'; keywords='transliteration english hindi convert' },
    @{ id='next-speech-to-text-notes'; slug='speech-to-text-notes'; name='Speech to Text Notes'; category='text'; desc='Capture spoken notes into editable text using browser speech APIs.'; icon='fas fa-microphone'; keywords='speech to text notes dictation voice typing' },
    @{ id='next-image-to-text-ocr'; slug='image-to-text-ocr'; name='Image to Text OCR'; category='text'; desc='Extract text from JPG and PNG images with browser-side OCR.'; icon='fas fa-font'; keywords='image to text ocr jpg png text extractor' },
    @{ id='next-pdf-ocr-extractor'; slug='pdf-ocr-extractor'; name='PDF OCR Extractor'; category='text'; desc='Extract text from scanned PDF pages using in-browser OCR.'; icon='fas fa-file-pdf'; keywords='pdf ocr extractor scanned pdf to text' },
    @{ id='next-audio-to-text-transcriber'; slug='audio-to-text-transcriber'; name='Audio to Text Transcriber'; category='text'; desc='Transcribe speech live from your microphone into editable text notes.'; icon='fas fa-microphone-lines'; keywords='audio to text speech transcriber dictation' },
    @{ id='next-video-to-mp3-converter'; slug='video-to-mp3-converter'; name='Video to MP3 Converter'; category='media'; desc='Convert video files into downloadable MP3 audio in your browser.'; icon='fas fa-file-audio'; keywords='video to mp3 converter extract audio' },
    @{ id='next-grammar-checker'; slug='grammar-checker'; name='Grammar Checker'; category='text'; desc='Check grammar, punctuation, and clarity with instant suggestions.'; icon='fas fa-spell-check'; keywords='grammar checker sentence correction punctuation' },
    @{ id='next-ai-text-detector'; slug='ai-text-detector'; name='AI Text Detector'; category='text'; desc='Estimate whether writing looks human or AI-generated with heuristics.'; icon='fas fa-robot'; keywords='ai detector ai text checker' },
    @{ id='next-expense-tracker'; slug='expense-tracker'; name='Expense Tracker'; category='utility'; desc='Track expenses by category and compare spend against monthly income.'; icon='fas fa-receipt'; keywords='expense tracker monthly budget spending' },
    @{ id='next-time-difference-calculator'; slug='time-difference-calculator'; name='Time Difference Calculator'; category='time'; desc='Calculate exact time difference between two dates across UTC offsets.'; icon='fas fa-business-time'; keywords='time difference calculator date time gap' },
    @{ id='next-trip-cost-calculator'; slug='trip-cost-calculator'; name='Trip Cost Calculator'; category='utility'; desc='Estimate full trip budget including fuel, stay, food, tolls, and activities.'; icon='fas fa-route'; keywords='trip cost calculator travel budget estimator' },
    @{ id='next-fuel-cost-calculator'; slug='fuel-cost-calculator'; name='Fuel Cost Calculator'; category='math'; desc='Calculate fuel required, total cost, and cost per kilometer for any trip.'; icon='fas fa-gas-pump'; keywords='fuel cost calculator petrol diesel mileage' }
)

$categoryUrl = @{
    text='tools/text/index.html'
    math='tools/math/index.html'
    utility='tools/utility/index.html'
    media='tools/media/index.html'
    time='tools/time/index.html'
    govt='tools/government/index.html'
    dev='tools/dev/index.html'
    fun='tools/fun/index.html'
}
$categoryName = @{
    text='Text Tools'
    math='Math Tools'
    utility='Utility Tools'
    media='Media Tools'
    time='Time Tools'
    govt='Government Tools'
    dev='Developer Tools'
    fun='Fun Tools'
}
$categoryColor = @{
    text='#2ecc71'
    math='#00bcd4'
    utility='#5c6bc0'
    media='#e91e63'
    time='#ff5722'
    govt='#9c27b0'
    dev='#f39c12'
    fun='#ffeb3b'
}

$pageTemplate = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="referrer" content="no-referrer">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: blob:; connect-src 'self' https:; worker-src 'self' blob:; media-src 'self' blob: mediastream:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com;">
    <title>__TITLE__</title>
    <meta name="description" content="__DESC__">
    <link rel="canonical" href="__CANONICAL__">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Vibox">
    <meta property="og:url" content="__CANONICAL__">
    <meta property="og:title" content="__TITLE__">
    <meta property="og:description" content="__DESC__">
    <meta property="og:image" content="https://vibox.app/assets/og-image.png">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="__TITLE__">
    <meta name="twitter:description" content="__DESC__">
    <meta name="twitter:image" content="https://vibox.app/assets/og-image.png">
    <script type="application/ld+json">
    {
      "@context":"https://schema.org",
      "@type":"SoftwareApplication",
      "name":"__NAME__",
      "applicationCategory":"UtilitiesApplication",
      "operatingSystem":"Web",
      "url":"__CANONICAL__",
      "description":"__DESC__",
      "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}
    }
    </script>
    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .next-wrap { max-width: 980px; margin: 0 auto; padding: 24px 18px 40px; }
        .next-hero { margin-bottom: 20px; }
        .next-hero h1 { margin-bottom: 8px; }
        .next-muted { color: var(--text-muted, #94a3b8); }
        .next-fields { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 14px; }
        .next-field { display: flex; flex-direction: column; gap: 6px; }
        .next-field input, .next-field select, .next-field textarea {
            width: 100%;
            border: 1px solid rgba(148,163,184,0.25);
            border-radius: 10px;
            background: var(--surface-color);
            color: var(--text-color);
            padding: 10px 12px;
            font-size: 0.95rem;
        }
        .next-actions { display: flex; gap: 10px; margin-top: 14px; margin-bottom: 14px; }
        .tool-output-box { margin-top: 12px; border: 1px solid rgba(148,163,184,0.25); border-radius: 10px; background: var(--surface-color); padding: 12px; }
        .tool-output-box pre { white-space: pre-wrap; word-break: break-word; margin: 0; }
        .next-faq { margin-top: 26px; border-top: 1px solid rgba(148,163,184,0.2); padding-top: 16px; }
        .next-faq h2 { margin-bottom: 8px; }
        .next-faq p { margin-bottom: 10px; }
    </style>
    <script src="../../js/utils/theme-preload.js"></script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1683164345425180" crossorigin="anonymous"></script>
</head>
<body data-tool-id="__SLUG__" data-tool-name="__NAME__" data-tool-description="__DESC__" data-tool-category="__CAT_NAME__" data-tool-category-url="../../__CAT_URL__">
    <header>
        <div class="container">
            <a href="../../index.html" class="logo">Vibox</a>
            <nav>
                <ul>
                    <li><a href="../../index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="../../tools/index.html"><i class="fas fa-cube"></i> All Tools</a></li>
                    <li><a id="category-link" href="../../__CAT_URL__"><i class="fas fa-arrow-left"></i> Back to __CAT_NAME__</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="next-wrap">
        <section class="next-hero">
            <h1 id="tool-name">__NAME__</h1>
            <p id="tool-description" class="next-muted">__DESC__</p>
        </section>

        <section id="tool-app"></section>
        <section id="tool-output" class="tool-output-box"><pre>Fill the fields and click Run Tool.</pre></section>

        <section class="next-faq">
            <h2>__NAME__: Quick Notes</h2>
            <p>This tool runs fully in your browser for privacy-first usage. No account is required and there are no upload limits for text-based inputs.</p>
            <p>For best results, use clear structured input and review the generated output before final publishing or submission.</p>
            <p>Explore related utilities from <a href="../../__CAT_URL__">__CAT_NAME__</a> to complete your workflow faster.</p>
        </section>
    </main>

    <script src="../../js/utils/common.js" type="module"></script>
    <script type="module" src="../../js/utils/next-tools.js"></script>
</body>
</html>
'@

$nextDir = Join-Path $root 'tools\next'
New-Item -ItemType Directory -Force -Path $nextDir | Out-Null

foreach ($t in $tools) {
    $title = "$($t.name) - Free Online Tool | Vibox"
    $canonical = "https://vibox.app/tools/next/$($t.slug).html"
    $html = $pageTemplate.Replace('__TITLE__', $title)
    $html = $html.Replace('__DESC__', $t.desc)
    $html = $html.Replace('__CANONICAL__', $canonical)
    $html = $html.Replace('__NAME__', $t.name)
    $html = $html.Replace('__SLUG__', $t.slug)
    $html = $html.Replace('__CAT_URL__', $categoryUrl[$t.category])
    $html = $html.Replace('__CAT_NAME__', $categoryName[$t.category])
    [System.IO.File]::WriteAllText((Join-Path $nextDir ($t.slug + '.html')), $html, $enc)
}

$indexHtml = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="referrer" content="no-referrer">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: blob:; connect-src 'self' https:; worker-src 'self' blob:; media-src 'self' blob: mediastream:; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com;">
    <title>Growth Toolkit - New Tools | Vibox</title>
    <meta name="description" content="Explore newly launched Vibox tools for students, creators, finance, careers, travel, and developers.">
    <link rel="canonical" href="https://vibox.app/tools/next/index.html">
    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="icon" href="/favicon-192.png" type="image/png" sizes="192x192">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="../../js/utils/theme-preload.js"></script>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1683164345425180" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <div class="container">
            <a href="../../index.html" class="logo">Vibox</a>
            <nav>
                <ul>
                    <li><a href="../../index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="../index.html"><i class="fas fa-cube"></i> All Tools</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="container">
            <h1>Growth Toolkit: New Launches</h1>
            <p class="text-muted">All newly added niche tools for students, creators, jobs, finance, travel, and developers.</p>
            <div id="next-grid" class="tool-grid"></div>
        </section>
    </main>

    <script src="../../js/utils/common.js" type="module"></script>
    <script type="module" src="index.inline.js"></script>
</body>
</html>
'@
[System.IO.File]::WriteAllText((Join-Path $nextDir 'index.html'), $indexHtml, $enc)

$indexJs = @'
import { tools } from '../../js/utils/tools.js';

const grid = document.getElementById('next-grid');
const list = tools.filter(t => t.id.startsWith('next-'));

if (!list.length) {
    grid.innerHTML = '<p class="text-muted">No new tools available.</p>';
} else {
    grid.innerHTML = list.map(tool => `
        <a href="../../${tool.url}" class="tool-card zoom-in spotlight-card">
            <div class="tool-thumb" style="color:${tool.color}"><i class="${tool.icon}"></i></div>
            <div class="tool-info">
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
            </div>
            <div class="tool-arrow"><i class="fas fa-chevron-right"></i></div>
        </a>
    `).join('');
}

let raf = null;
if (grid) {
    grid.onmousemove = (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
            for (const card of document.getElementsByClassName('spotlight-card')) {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }
            raf = null;
        });
    };
}
'@
[System.IO.File]::WriteAllText((Join-Path $nextDir 'index.inline.js'), $indexJs, $enc)

$toolsFile = Join-Path $root 'js\utils\tools.js'
$toolsText = [System.IO.File]::ReadAllText($toolsFile)
$entries = ($tools | ForEach-Object {
    "    { id: '$($_.id)', name: '$($_.name)', category: '$($_.category)', url: 'tools/next/$($_.slug).html', description: '$($_.desc)', icon: '$($_.icon)', color: '$($categoryColor[$_.category])', keywords: '$($_.keywords)' },"
}) -join "`r`n"
$toolsBlock = "    // Next Tools (Generated)`r`n    // BEGIN NEXT TOOLS`r`n$entries`r`n    // END NEXT TOOLS"
if ($toolsText -match 'BEGIN NEXT TOOLS') {
    $toolsText = [regex]::Replace($toolsText, '(?s)\s*// Next Tools \(Generated\).*?// END NEXT TOOLS\s*', "`r`n$toolsBlock`r`n")
} else {
    $toolsText = [regex]::Replace($toolsText, '\r?\n\];\s*$', "`r`n$toolsBlock`r`n];`r`n")
}
[System.IO.File]::WriteAllText($toolsFile, $toolsText, $enc)

$sitemapFile = Join-Path $root 'sitemap.xml'
$sitemapText = [System.IO.File]::ReadAllText($sitemapFile)
$urlLines = @('    <url><loc>https://vibox.app/tools/next/index.html</loc><lastmod>2026-04-13</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>') + ($tools | ForEach-Object {
    "    <url><loc>https://vibox.app/tools/next/$($_.slug).html</loc><lastmod>2026-04-13</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>"
})
$sitemapBlock = "    <!-- Next Tools (Generated) -->`r`n    <!-- BEGIN NEXT TOOLS URLS -->`r`n$($urlLines -join "`r`n")`r`n    <!-- END NEXT TOOLS URLS -->"
if ($sitemapText -match 'BEGIN NEXT TOOLS URLS') {
    $sitemapText = [regex]::Replace($sitemapText, '(?s)\s*<!-- Next Tools \(Generated\) -->.*?<!-- END NEXT TOOLS URLS -->\s*', "`r`n$sitemapBlock`r`n")
} else {
    $sitemapText = [regex]::Replace($sitemapText, '\r?\n</urlset>\s*$', "`r`n$sitemapBlock`r`n`r`n</urlset>`r`n")
}
[System.IO.File]::WriteAllText($sitemapFile, $sitemapText, $enc)

Write-Output "Generated new tools: $($tools.Count)"
Write-Output "Updated: tools/next/*.html, tools/next/index.inline.js, js/utils/tools.js, sitemap.xml"
