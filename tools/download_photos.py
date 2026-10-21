"""
Unsplash şəkillərini assets/img/photos/ qovluğuna yükləyir.
Bir dəfə işə salın:   python tools/download_photos.py
Sonra sayt internetsiz də tez açılır və GitHub Pages-də şəkillər öz serverinizdən gəlir.

Artıq mövcud olan fayllara toxunmur — mağazanın öz şəkillərini eyni adla qoysanız, onlar qalacaq.
"""
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = (ROOT / "assets" / "js" / "data.js").read_text(encoding="utf-8")
OUT = ROOT / "assets" / "img" / "photos"
OUT.mkdir(parents=True, exist_ok=True)

block = re.search(r"const PHOTOS = \{(.*?)\};", DATA, re.S).group(1)
photos = dict(re.findall(r'(\w+):\s*"([^"]+)"', block))

UA = {"User-Agent": "Mozilla/5.0 (ideal-mebel photo fetcher)"}


def final_url(photo_id: str) -> str:
    req = urllib.request.Request(f"https://unsplash.com/photos/{photo_id}/download", headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.geturl()


def sized(url: str, width: int) -> str:
    parts = urllib.parse.urlsplit(url)
    q = dict(urllib.parse.parse_qsl(parts.query))
    q.pop("dl", None)
    q.update({"w": str(width), "q": "80", "fm": "jpg", "fit": "max"})
    return urllib.parse.urlunsplit(parts._replace(query=urllib.parse.urlencode(q)))


ok, failed = 0, []
for key, pid in photos.items():
    dest = OUT / f"{key}.jpg"
    if dest.exists():
        print(f"  = {key}.jpg artıq var, keçirəm")
        continue
    try:
        url = sized(final_url(pid), 2000 if key == "hero" else 1400)
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=60) as r:
            dest.write_bytes(r.read())
        print(f"  + {key}.jpg  ({dest.stat().st_size // 1024} KB)")
        ok += 1
    except Exception as e:  # noqa: BLE001
        failed.append(key)
        print(f"  ! {key}: {e}")

print(f"\nYükləndi: {ok}. Xəta: {len(failed)} {failed if failed else ''}")
if failed:
    print("Xəta olan şəkillər üçün data.js-də başqa Unsplash ID yazın və ya öz şəklinizi qoyun.")
sys.exit(1 if failed and not ok else 0)
