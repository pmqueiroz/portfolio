#!/usr/bin/env bash
set -euo pipefail

commit="${1:-933c0066ca060351215cbf126b3eb8a5657af0c0}"
base="https://raw.githubusercontent.com/SerenityOS/serenity/$commit"
root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/public/emoji"
manifest="$root/src/helpers/emoji-manifest.json"

rm -rf "$out"
mkdir -p "$out"

curl -fsSL "$base/LICENSE" -o "$out/LICENSE"
curl -fsSL "$base/Meta/emoji-file-list.txt" -o "$out/.list"

grep '\.png$' "$out/.list" \
  | xargs -P 16 -I {} curl -fsSL "$base/Base/res/emoji/{}" -o "$out/{}"

sed 's/\.png$//' "$out/.list" | sort | python3 -c 'import json, sys; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))' > "$manifest"
rm "$out/.list"

echo "synced $(ls "$out"/*.png | wc -l) emoji from SerenityOS@$commit"
