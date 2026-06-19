param([switch]$SkipJavaScript)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$errors = [System.Collections.Generic.List[string]]::new()

function Add-ValidationError([string]$Message) {
    $script:errors.Add($Message)
    Write-Host "ERROR: $Message" -ForegroundColor Red
}

Write-Host 'Validating Vibox registry...'
$registryPath = Join-Path $root 'js/utils/tools.js'
$registry = Get-Content -Raw -LiteralPath $registryPath
$matches = [regex]::Matches($registry, "id:\s*'([^']+)'[\s\S]*?url:\s*'([^']+)'", [Text.RegularExpressions.RegexOptions]::None)
$seenIds = @{}
$seenUrls = @{}

foreach ($match in $matches) {
    $id = $match.Groups[1].Value
    $url = $match.Groups[2].Value
    if ($seenIds.ContainsKey($id)) { Add-ValidationError "Duplicate tool id: $id" } else { $seenIds[$id] = $true }
    if ($seenUrls.ContainsKey($url)) { Write-Host "WARN: Multiple entries use $url" -ForegroundColor Yellow } else { $seenUrls[$url] = $true }
    if (-not (Test-Path -LiteralPath (Join-Path $root $url))) { Add-ValidationError "Tool '$id' points to missing file: $url" }
}

if ($matches.Count -lt 100) { Add-ValidationError "Registry unexpectedly contains only $($matches.Count) tools" }
Write-Host "Registry: $($matches.Count) tools"

Write-Host 'Validating service-worker assets...'
$sw = Get-Content -Raw -LiteralPath (Join-Path $root 'sw.js')
$assetMatches = [regex]::Matches($sw, "^\s*'\./([^']+)'", [Text.RegularExpressions.RegexOptions]::Multiline)
foreach ($match in $assetMatches) {
    $asset = $match.Groups[1].Value
    if ($asset -eq '') { continue }
    if (-not (Test-Path -LiteralPath (Join-Path $root $asset))) { Add-ValidationError "Service worker references missing asset: $asset" }
}

Write-Host 'Validating first-party HTML references...'
$htmlFiles = Get-ChildItem -LiteralPath $root -Recurse -Filter '*.html' -File |
    Where-Object { $_.FullName -notmatch '[\\/](node_modules|dist|public|games)[\\/]' }
foreach ($file in $htmlFiles) {
    $html = Get-Content -Raw -LiteralPath $file.FullName
    $refs = [regex]::Matches($html, '(?:href|src)\s*=\s*["'']([^"''#?]+)')
    foreach ($refMatch in $refs) {
        $ref = $refMatch.Groups[1].Value.Trim()
        if (-not $ref -or $ref -match '^(https?:|//|data:|blob:|mailto:|tel:|javascript:|\{)') { continue }
        $target = if ($ref.StartsWith('/')) { Join-Path $root $ref.TrimStart('/') } else { Join-Path $file.DirectoryName $ref }
        try { $target = [IO.Path]::GetFullPath($target) } catch { Add-ValidationError "Invalid path in $($file.Name): $ref"; continue }
        if (-not (Test-Path -LiteralPath $target)) {
            Add-ValidationError "$($file.FullName.Substring($root.Length + 1)) references missing file: $ref"
        }
    }
}

if (-not $SkipJavaScript) {
    $node = Get-Command node -ErrorAction SilentlyContinue
    if ($node) {
        Write-Host 'Checking first-party JavaScript syntax...'
        $scripts = Get-ChildItem -LiteralPath (Join-Path $root 'js') -Recurse -Filter '*.js' -File |
            Where-Object { $_.FullName -notmatch '[\\/]vendor[\\/]' }
        foreach ($script in $scripts) {
            & $node.Source --check $script.FullName 2>&1 | Out-Null
            if ($LASTEXITCODE -ne 0) { Add-ValidationError "JavaScript syntax check failed: $($script.FullName.Substring($root.Length + 1))" }
        }
    } else {
        Write-Host 'WARN: Node.js not found; skipped JavaScript syntax checks.' -ForegroundColor Yellow
    }
}

if ($errors.Count) {
    Write-Host "Validation failed with $($errors.Count) error(s)." -ForegroundColor Red
    exit 1
}

Write-Host 'Validation passed.' -ForegroundColor Green

