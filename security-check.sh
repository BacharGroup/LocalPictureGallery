#!/usr/bin/env bash
# LocalPictureGallery – automated security check
# Verifies that the HTML file cannot talk to a network or persist data.
# Runs in GitHub Actions on every push / pull request / release, and can be run locally:
#   bash security-check.sh LocalPictureGallery.html
set -u
FILE="${1:-LocalPictureGallery.html}"
fail=0

check() {  # check <label> <regex>  → fails if the regex matches anywhere in the file
  local label="$1" re="$2" hits
  hits=$(grep -nEi -- "$re" "$FILE" || true)
  if [ -n "$hits" ]; then
    echo "FAIL  $label"; echo "$hits" | sed 's/^/      /'; fail=1
  else
    echo "PASS  $label"
  fi
}

echo "Checking $FILE"
[ -f "$FILE" ] || { echo "FAIL  file not found"; exit 1; }

check "no http(s):// URLs"                      'https?://'
check "no external scripts / stylesheets"       '<script[^>]*\bsrc=|<link[^>]*rel="(stylesheet|preload|prefetch|modulepreload)"|<link[^>]*href="(https?:)?//'
check "no iframes / embeds / objects"           '<(iframe|embed|object)\b'
check "no fetch / XHR / WebSocket / beacon"     '\b(fetch|XMLHttpRequest|WebSocket|sendBeacon|EventSource)\b'
check "no dynamic code (eval / Function)"       '\beval\s*\(|\bnew\s+Function\s*\('
check "no dynamic imports"                      '\bimport\s*\('
check "no persistent storage"                   '\b(localStorage|sessionStorage|indexedDB|openDatabase|caches)\b|document\.cookie'
check "no form submission"                      '<form\b|\.submit\s*\('
check "no service worker / push"                '\b(serviceWorker|PushManager)\b'

# Every image source must be a blob: URL (browser memory), never an external address
srcs=$(grep -oE '\.src\s*=\s*[^;]+' "$FILE" | grep -vE 'it\.url' || true)
# static <img src> / <link href> must be inline data: URIs or a relative icons/ path – never an address
ext=$(grep -oE '<(img|link)[^>]*\b(src|href)="[^"]*"' "$FILE" | grep -oE '(src|href)="[^"]*"' | grep -vE '="(data:image/png;base64,[A-Za-z0-9+/=]+|icons/icon-[0-9]+\.png)"' || true)
if [ -n "$ext" ]; then echo "FAIL  img/link sources must be inline data: or icons/ only"; echo "$ext" | sed 's/^/      /'; fail=1
else echo "PASS  img/link sources are inline or icons/ only"; fi
if [ -n "$srcs" ]; then echo "FAIL  img.src assignments must use blob URLs only"; echo "$srcs" | sed 's/^/      /'; fail=1
else echo "PASS  image sources are blob: URLs only"; fi

# Single-file: exactly one <script>, exactly one <style>, both inline
ns=$(grep -c '<script' "$FILE"); nst=$(grep -c '<style' "$FILE")
if [ "$ns" = "1" ] && [ "$nst" = "1" ]; then echo "PASS  single inline <script> and <style>"
else echo "FAIL  expected one <script> and one <style>, found $ns / $nst"; fail=1; fi

echo
if [ $fail -eq 0 ]; then echo "ALL CHECKS PASSED – file is self-contained, no network, no storage"
else echo "SOME CHECKS FAILED"; fi
exit $fail
