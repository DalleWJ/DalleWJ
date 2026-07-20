"""One-off icon generator for the holiday quiz app. Not part of the app runtime."""
import math
import numpy as np
from PIL import Image, ImageDraw

SIZE = 1024

def lerp(a, b, t):
    return tuple(a[i] + (b[i] - a[i]) * t for i in range(3))

def make_base():
    # Diagonal gradient: sunset coral -> hot pink -> deep turquoise
    c1 = np.array([255, 140, 105])   # coral
    c2 = np.array([255, 94, 141])    # pink
    c3 = np.array([46, 196, 182])    # turquoise

    y, x = np.mgrid[0:SIZE, 0:SIZE]
    t = (x + y) / (2 * SIZE)  # 0..1 diagonal
    t = t.astype(np.float32)

    # two-stage gradient c1->c2->c3
    t2 = np.clip(t * 2, 0, 1)
    seg1 = t < 0.5
    out = np.zeros((SIZE, SIZE, 3), dtype=np.float32)
    for ch in range(3):
        a = c1[ch] + (c2[ch] - c1[ch]) * np.clip(t * 2, 0, 1)
        b = c2[ch] + (c3[ch] - c2[ch]) * np.clip((t - 0.5) * 2, 0, 1)
        out[..., ch] = np.where(seg1, a, b)
    img = Image.fromarray(out.astype(np.uint8), 'RGB')
    return img.convert('RGBA')

def rounded_mask(size, radius_ratio=0.225):
    mask = Image.new('L', (size, size), 0)
    d = ImageDraw.Draw(mask)
    r = int(size * radius_ratio)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=255)
    return mask

def draw_scene(img):
    d = ImageDraw.Draw(img, 'RGBA')
    cx, cy = SIZE * 0.5, SIZE * 0.40
    sun_r = SIZE * 0.17

    # soft glow behind sun
    glow = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for i in range(6, 0, -1):
        alpha = int(18 * i)
        rr = sun_r * (1 + i * 0.16)
        gd.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=(255, 255, 255, alpha))
    glow = glow.filter(__import__('PIL.ImageFilter', fromlist=['ImageFilter']).GaussianBlur(SIZE * 0.02))
    img.alpha_composite(glow)
    d = ImageDraw.Draw(img, 'RGBA')

    # sun rays
    for i in range(12):
        ang = i * (2 * math.pi / 12)
        r1 = sun_r * 1.28
        r2 = sun_r * 1.68
        x1, y1 = cx + math.cos(ang) * r1, cy + math.sin(ang) * r1
        x2, y2 = cx + math.cos(ang) * r2, cy + math.sin(ang) * r2
        d.line([x1, y1, x2, y2], fill=(255, 255, 255, 235), width=int(SIZE * 0.018))

    # sun body
    d.ellipse([cx - sun_r, cy - sun_r, cx + sun_r, cy + sun_r], fill=(255, 255, 255, 255))

    # a friendly quiz "?" inside the sun, drawn with arcs/circle instead of font (font-independent)
    qcol = (255, 122, 89, 255)
    qcx, qcy = cx, cy - sun_r * 0.08
    qr = sun_r * 0.62
    bbox = [qcx - qr, qcy - qr * 1.05, qcx + qr, qcy + qr * 0.85]
    d.arc(bbox, start=200, end=470, fill=qcol, width=int(SIZE * 0.028))
    # drop of the question mark
    dx, dy = qcx, qcy + qr * 0.62
    dr = SIZE * 0.017
    d.line([qcx, qcy + qr * 0.15, dx, dy - dr * 1.6], fill=qcol, width=int(SIZE * 0.028))
    d.ellipse([dx - dr, dy + dr * 1.2, dx + dr, dy + dr * 3.2], fill=qcol)

    # two little "waves" at the bottom for a beach/holiday feel
    wave_col = (255, 255, 255, 210)
    wy = SIZE * 0.74
    d.arc([SIZE * 0.10, wy, SIZE * 0.55, wy + SIZE * 0.16], start=0, end=180, fill=wave_col, width=int(SIZE * 0.03))
    d.arc([SIZE * 0.45, wy + SIZE * 0.07, SIZE * 0.92, wy + SIZE * 0.23], start=0, end=180, fill=(255, 255, 255, 150), width=int(SIZE * 0.03))

    return img

def build():
    base = make_base()
    base = draw_scene(base)
    return base

def export_square(img, size, path, corner=None):
    resized = img.resize((size, size), Image.LANCZOS)
    if corner:
        mask = rounded_mask(size, corner)
        out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        out.paste(resized, (0, 0), mask)
        out.save(path)
    else:
        resized.convert('RGB').save(path)

if __name__ == '__main__':
    master = build()
    master.save('/home/user/DalleWJ/icons/master.png')

    # Apple touch icon: iOS applies its own corner mask, so ship a full square (no alpha needed, iOS ignores it and adds rounding itself)
    export_square(master, 180, '/home/user/DalleWJ/icons/apple-touch-icon.png')

    # Maskable / any-purpose PWA icons: keep transparency off edges minimal, square with slight rounding is fine for 'any'
    for s in (192, 512):
        export_square(master, s, f'/home/user/DalleWJ/icons/icon-{s}.png')

    # Maskable icon needs extra safe-area padding (icon content within inner 80%)
    pad_canvas = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    scale = 0.72
    inner = master.resize((int(SIZE * scale), int(SIZE * scale)), Image.LANCZOS)
    off = (SIZE - inner.width) // 2
    bg = Image.new('RGBA', (SIZE, SIZE), (255, 148, 114, 255))
    bg.alpha_composite(inner, (off, off))
    for s in (192, 512):
        bg.resize((s, s), Image.LANCZOS).save(f'/home/user/DalleWJ/icons/maskable-{s}.png')

    # Favicon
    export_square(master, 32, '/home/user/DalleWJ/icons/favicon-32.png')
    export_square(master, 16, '/home/user/DalleWJ/icons/favicon-16.png')

    print('done')
