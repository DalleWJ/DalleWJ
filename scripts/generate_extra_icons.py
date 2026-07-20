"""Draw the two picture-riddle icons Fluent Emoji doesn't have: Eiffel Tower and a snowboard.
Matches the glossy rounded style of the downloaded Fluent Emoji 3D assets."""
import math
from PIL import Image, ImageDraw, ImageFilter

S = 512  # supersample, downscale at the end for smooth edges
OUT = "/home/user/DalleWJ/images"


def new_canvas():
    return Image.new("RGBA", (S, S), (0, 0, 0, 0))


def vgrad(size, top, bottom):
    w, h = size
    grad = Image.new("RGBA", (1, h), 0)
    for y in range(h):
        t = y / max(1, h - 1)
        px = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(4))
        grad.putpixel((0, y), px)
    return grad.resize((w, h))


def soft_shadow(mask_img, blur=14, offset=(0, 10), alpha=90):
    shadow = Image.new("RGBA", mask_img.size, (0, 0, 0, 0))
    alpha_ch = mask_img.split()[3].point(lambda a: alpha if a > 0 else 0)
    shadow.putalpha(alpha_ch)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    base = Image.new("RGBA", mask_img.size, (0, 0, 0, 0))
    base.alpha_composite(shadow, offset)
    return base


def eiffel_tower():
    img = new_canvas()
    draw = ImageDraw.Draw(img)
    cx = S / 2
    base_y = S * 0.86
    top_y = S * 0.08
    base_half = S * 0.30

    tiers = [
        (0.00, 1.00, base_half, S * 0.155),
        (0.155, 0.40, S * 0.155, S * 0.075),
        (0.40, 0.62, S * 0.075, S * 0.040),
        (0.62, 1.00, S * 0.040, 0.0),
    ]

    metal_top = (255, 214, 140, 255)
    metal_bot = (196, 128, 46, 255)

    def half_width_at(frac):
        y0, y1 = 0.0, 1.0
        for t0, t1, w0, w1 in tiers:
            if t0 - 1e-6 <= frac <= t1 + 1e-6:
                local = (frac - t0) / max(1e-6, (t1 - t0))
                return w0 + (w1 - w0) * local
        return 0.0

    steps = 160
    poly_left = []
    poly_right = []
    for i in range(steps + 1):
        frac = i / steps
        y = base_y - (base_y - top_y) * frac
        hw = half_width_at(frac)
        poly_left.append((cx - hw, y))
        poly_right.append((cx + hw, y))
    body_poly = poly_left + poly_right[::-1]

    grad = vgrad((S, S), metal_top, metal_bot)
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).polygon(body_poly, fill=255)
    tower_layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    tower_layer.paste(grad, (0, 0), mask)

    shadow = soft_shadow(tower_layer, blur=10, offset=(0, 14), alpha=70)
    img.alpha_composite(shadow)

    lace = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ld = ImageDraw.Draw(lace)
    n_x = 5
    for i in range(n_x):
        frac0 = 0.02 + i * (0.60 / n_x)
        frac1 = frac0 + (0.60 / n_x)
        y0 = base_y - (base_y - top_y) * frac0
        y1 = base_y - (base_y - top_y) * frac1
        hw0 = half_width_at(frac0)
        hw1 = half_width_at(frac1)
        ld.line([(cx - hw0, y0), (cx + hw1, y1)], fill=(120, 70, 20, 230), width=3)
        ld.line([(cx + hw0, y0), (cx - hw1, y1)], fill=(120, 70, 20, 230), width=3)
    for frac in (0.155, 0.40, 0.62):
        hw = half_width_at(frac)
        y = base_y - (base_y - top_y) * frac
        ld.line([(cx - hw - 6, y), (cx + hw + 6, y)], fill=(120, 70, 20, 230), width=5)

    legs_gap = base_half * 0.62
    arch_top = base_y - S * 0.155
    ld.line([(cx - base_half, base_y), (cx - legs_gap, arch_top)], fill=(120, 70, 20, 230), width=5)
    ld.line([(cx + base_half, base_y), (cx + legs_gap, arch_top)], fill=(120, 70, 20, 230), width=5)
    ld.arc([cx - legs_gap, arch_top - S * 0.06, cx + legs_gap, arch_top + S * 0.10], 200, 340, fill=(120, 70, 20, 230), width=5)

    lace_mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(lace_mask).polygon(body_poly, fill=255, outline=255)
    dilated = lace_mask.filter(ImageFilter.MaxFilter(9))
    lace.putalpha(Image.composite(lace.split()[3], Image.new("L", (S, S), 0), dilated))

    img.alpha_composite(tower_layer)
    img.alpha_composite(lace)

    draw = ImageDraw.Draw(img)
    draw.line([(cx, top_y), (cx, top_y - S * 0.05)], fill=(196, 128, 46, 255), width=4)
    draw.ellipse([cx - 5, top_y - S * 0.05 - 5, cx + 5, top_y - S * 0.05 + 5], fill=(255, 214, 140, 255))

    highlight = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    hd = ImageDraw.Draw(highlight)
    hd.polygon([(cx - base_half * 0.55, base_y), (cx - S * 0.01, top_y), (cx + S * 0.02, top_y), (cx - base_half * 0.15, base_y)],
               fill=(255, 255, 255, 55))
    img.alpha_composite(highlight)

    img = img.resize((256, 256), Image.LANCZOS)
    img.save(f"{OUT}/eiffel-tower.png")
    print("saved eiffel-tower.png")


def snowboard():
    img = new_canvas()
    cx, cy = S / 2, S / 2
    length = S * 0.86
    width = S * 0.30

    def board_outline(l, w):
        pts = []
        steps = 60
        for i in range(steps + 1):
            t = i / steps
            y = -l / 2 + l * t
            taper = 1 - 0.55 * (abs(t - 0.5) * 2) ** 3
            edge_w = w / 2 * taper
            if t < 0.06:
                edge_w *= (t / 0.06) ** 0.6
            if t > 0.94:
                edge_w *= ((1 - t) / 0.06) ** 0.6
            pts.append((cx + edge_w, cy + y))
        left = [(cx - (p[0] - cx), p[1]) for p in pts]
        return pts + left[::-1]

    poly = board_outline(length, width)

    board_layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    top_c = (58, 166, 255, 255)
    bot_c = (46, 196, 182, 255)
    grad = vgrad((S, S), top_c, bot_c)
    mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(mask).polygon(poly, fill=255)
    board_layer.paste(grad, (0, 0), mask)

    shadow = soft_shadow(board_layer, blur=12, offset=(6, 16), alpha=80)
    img.alpha_composite(shadow)
    img.alpha_composite(board_layer)

    deco = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    dd = ImageDraw.Draw(deco)
    dd.ellipse([cx - S * 0.05, cy - S * 0.30, cx + S * 0.05, cy - S * 0.14], fill=(255, 255, 255, 180))
    dd.polygon([(cx, cy - S * 0.08), (cx - S * 0.09, cy + S * 0.10), (cx + S * 0.09, cy + S * 0.10)], fill=(255, 210, 63, 210))
    deco_mask = Image.new("L", (S, S), 0)
    ImageDraw.Draw(deco_mask).polygon(poly, fill=255)
    r, g, b, a = deco.split()
    a = Image.composite(a, Image.new("L", (S, S), 0), deco_mask)
    deco.putalpha(a)
    img.alpha_composite(deco)

    highlight = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    hd = ImageDraw.Draw(highlight)
    hd.polygon([(cx - width * 0.22, cy - length / 2 + 10), (cx - width * 0.05, cy - length / 2 + 10),
                (cx - width * 0.12, cy + length / 2 - 10), (cx - width * 0.30, cy + length / 2 - 10)],
               fill=(255, 255, 255, 60))
    hl_a = Image.composite(highlight.split()[3], Image.new("L", (S, S), 0), mask)
    highlight.putalpha(hl_a)
    img.alpha_composite(highlight)

    img = img.rotate(28, resample=Image.BICUBIC, expand=False)
    img = img.resize((256, 256), Image.LANCZOS)
    img.save(f"{OUT}/snowboard.png")
    print("saved snowboard.png")


if __name__ == "__main__":
    eiffel_tower()
    snowboard()
