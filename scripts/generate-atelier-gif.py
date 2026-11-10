from __future__ import annotations

import math
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/npg/optimized/atelier-isometrico.gif"
SIZE = (800, 600)
W, H = SIZE


def clamp(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def ease_out(value: float) -> float:
    value = clamp(value)
    return 1 - (1 - value) ** 3


def ease_in_out(value: float) -> float:
    value = clamp(value)
    return value * value * (3 - 2 * value)


def lerp(start: float, end: float, amount: float) -> float:
    return start + (end - start) * amount


def points_offset(points: list[tuple[float, float]], dx: float, dy: float) -> list[tuple[float, float]]:
    return [(x + dx, y + dy) for x, y in points]


def stage_progress(global_progress: float, start: float, end: float) -> float:
    return clamp((global_progress - start) / (end - start))


def make_background() -> Image.Image:
    top = (57, 91, 76)
    bottom = (154, 190, 163)
    background = Image.new("RGBA", SIZE)
    pixels = background.load()
    for y in range(H):
        amount = y / (H - 1)
        color = tuple(round(lerp(top[channel], bottom[channel], amount)) for channel in range(3))
        for x in range(W):
            pixels[x, y] = (*color, 255)

    atmosphere = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(atmosphere)
    draw.ellipse((75, 428, 748, 600), fill=(20, 43, 32, 72))
    atmosphere = atmosphere.filter(ImageFilter.GaussianBlur(20))
    return Image.alpha_composite(background, atmosphere)


def draw_platform(frame: Image.Image) -> None:
    overlay = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    top = [(111, 432), (399, 307), (700, 430), (421, 574)]
    front = [(111, 432), (421, 574), (421, 592), (111, 448)]
    right = [(421, 574), (700, 430), (700, 448), (421, 592)]

    draw.polygon(front, fill=(111, 119, 105, 255))
    draw.polygon(right, fill=(91, 103, 93, 255))
    draw.polygon(top, fill=(218, 209, 185, 255))
    draw.line(top + [top[0]], fill=(249, 243, 222, 255), width=3, joint="curve")

    frame.alpha_composite(overlay)


def draw_shell(frame: Image.Image, global_progress: float) -> None:
    draw_platform(frame)

    wall_progress = ease_in_out(stage_progress(global_progress, 0.035, 0.22))
    wall_offset = lerp(-92, 0, wall_progress)
    if wall_progress > 0:
        shell = Image.new("RGBA", SIZE, (0, 0, 0, 0))
        draw = ImageDraw.Draw(shell)

        left_wall = [(111, 184), (399, 76), (399, 332), (111, 432)]
        right_wall = [(399, 76), (700, 184), (700, 430), (399, 332)]
        draw.polygon(points_offset(left_wall, 0, wall_offset), fill=(239, 233, 221, 255))
        draw.polygon(points_offset(right_wall, 0, wall_offset), fill=(65, 91, 78, 255))

        # Window, mullions, and a simple picture frame become part of the shell.
        window = [(164, 204), (285, 157), (285, 302), (164, 350)]
        draw.polygon(points_offset(window, 0, wall_offset), fill=(124, 176, 157, 255), outline=(250, 247, 236, 255))
        draw.line(points_offset([(224, 181), (224, 326)], 0, wall_offset), fill=(247, 244, 232, 255), width=8)
        draw.line(points_offset([(164, 276), (285, 230)], 0, wall_offset), fill=(247, 244, 232, 255), width=7)

        picture = [(477, 158), (553, 186), (553, 260), (477, 232)]
        draw.polygon(points_offset(picture, 0, wall_offset), fill=(232, 225, 209, 255), outline=(248, 240, 218, 255))
        draw.polygon(points_offset([(489, 177), (541, 194), (541, 242), (489, 225)], 0, wall_offset), fill=(204, 135, 92, 255))

        draw.line(points_offset([(111, 184), (399, 76), (700, 184)], 0, wall_offset), fill=(250, 246, 231, 255), width=5, joint="curve")
        shell.putalpha(shell.getchannel("A"))
        frame.alpha_composite(shell)

    floor_progress = ease_out(stage_progress(global_progress, 0.16, 0.31))
    if floor_progress > 0:
        floor = Image.new("RGBA", SIZE, (0, 0, 0, 0))
        draw = ImageDraw.Draw(floor)
        opacity = round(255 * floor_progress)
        for index in range(8):
            left = 130 + index * 28
            draw.line((left, 440 + index * 2, 405 + index * 2, 565 - index * 2), fill=(170, 143, 108, round(opacity * 0.7)), width=2)
        draw.line((114, 431, 421, 573), fill=(246, 235, 204, opacity), width=4)
        draw.line((421, 573, 697, 431), fill=(176, 157, 129, opacity), width=3)
        frame.alpha_composite(floor)


def layer_from(draw_function) -> tuple[Image.Image, tuple[float, float]]:
    layer = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw_function(ImageDraw.Draw(layer))
    bbox = layer.getbbox()
    if bbox is None:
        raise ValueError("object layer is empty")
    padding = 8
    crop_box = (
        max(0, bbox[0] - padding),
        max(0, bbox[1] - padding),
        min(W, bbox[2] + padding),
        min(H, bbox[3] + padding),
    )
    cropped = layer.crop(crop_box)
    center = ((crop_box[0] + crop_box[2]) / 2, (crop_box[1] + crop_box[3]) / 2)
    return cropped, center


def draw_rug(draw: ImageDraw.ImageDraw) -> None:
    draw.ellipse((218, 418, 515, 505), fill=(180, 139, 91, 80))
    draw.ellipse((218, 408, 515, 492), fill=(225, 189, 133, 255), outline=(245, 222, 178, 255), width=3)
    draw.arc((239, 420, 494, 480), 190, 345, fill=(177, 126, 79, 180), width=2)
    draw.arc((252, 426, 482, 474), 190, 345, fill=(177, 126, 79, 160), width=2)
    draw.arc((267, 431, 468, 468), 190, 345, fill=(177, 126, 79, 145), width=2)


def draw_builtin(draw: ImageDraw.ImageDraw) -> None:
    # A built-in storage wall is the first planned element to settle in.
    draw.polygon([(496, 226), (635, 178), (635, 366), (496, 416)], fill=(77, 61, 49, 90))
    draw.polygon([(488, 217), (627, 169), (627, 350), (488, 399)], fill=(184, 122, 75, 255), outline=(239, 200, 145, 255))
    draw.polygon([(488, 217), (627, 169), (627, 188), (488, 237)], fill=(215, 161, 103, 255))
    draw.polygon([(501, 246), (548, 230), (548, 315), (501, 332)], fill=(52, 70, 63, 255), outline=(219, 170, 113, 255))
    draw.polygon([(558, 226), (614, 207), (614, 288), (558, 307)], fill=(52, 70, 63, 255), outline=(219, 170, 113, 255))
    draw.line((499, 341, 624, 298), fill=(244, 197, 134, 255), width=5)
    draw.polygon([(507, 345), (622, 305), (622, 350), (507, 390)], fill=(58, 71, 64, 255), outline=(208, 162, 107, 255))
    for offset in range(3):
        draw.line((572 + offset * 13, 206 - offset * 4, 572 + offset * 13, 271 - offset * 4), fill=(237, 189, 126, 255), width=2)
    draw.rectangle((523, 187, 544, 216), fill=(224, 202, 164, 255))
    draw.rectangle((549, 178, 572, 208), fill=(211, 151, 98, 255))
    draw.ellipse((581, 183, 601, 204), fill=(70, 113, 79, 255))


def draw_sofa(draw: ImageDraw.ImageDraw) -> None:
    draw.ellipse((230, 406, 479, 466), fill=(27, 40, 34, 72))
    draw.polygon([(236, 333), (405, 366), (452, 349), (282, 317)], fill=(187, 190, 175, 255))
    draw.polygon([(236, 333), (236, 396), (282, 418), (282, 317)], fill=(154, 158, 148, 255))
    draw.polygon([(282, 317), (452, 349), (452, 409), (282, 378)], fill=(194, 198, 185, 255))
    draw.polygon([(248, 369), (432, 403), (432, 441), (248, 406)], fill=(180, 184, 172, 255))
    draw.polygon([(241, 362), (264, 367), (264, 416), (241, 407)], fill=(132, 137, 132, 255))
    draw.polygon([(423, 394), (452, 387), (452, 433), (423, 441)], fill=(137, 142, 135, 255))
    draw.polygon([(296, 325), (343, 334), (343, 369), (296, 359)], fill=(76, 99, 94, 255))
    draw.polygon([(359, 337), (406, 346), (406, 381), (359, 371)], fill=(76, 99, 94, 255))


def draw_table(draw: ImageDraw.ImageDraw) -> None:
    draw.ellipse((311, 431, 432, 469), fill=(31, 44, 36, 74))
    draw.line((372, 447, 372, 499), fill=(103, 72, 48, 255), width=7)
    draw.ellipse((332, 438, 412, 465), fill=(210, 151, 91, 255), outline=(244, 195, 126, 255), width=2)
    draw.ellipse((354, 444, 389, 455), fill=(237, 203, 145, 255))
    draw.rectangle((359, 440, 367, 450), fill=(61, 101, 74, 255))
    draw.rectangle((372, 439, 379, 449), fill=(204, 112, 78, 255))


def draw_lamp(draw: ImageDraw.ImageDraw) -> None:
    draw.ellipse((512, 393, 566, 411), fill=(26, 39, 32, 75))
    draw.line((539, 405, 539, 250), fill=(84, 65, 49, 255), width=4)
    draw.polygon([(507, 248), (572, 248), (557, 278), (521, 278)], fill=(210, 121, 76, 255), outline=(238, 167, 106, 255))
    draw.ellipse((521, 269, 557, 282), fill=(249, 210, 135, 255))
    draw.ellipse((530, 283, 548, 302), fill=(255, 231, 159, 100))


def draw_plant(draw: ImageDraw.ImageDraw) -> None:
    draw.ellipse((158, 433, 229, 455), fill=(29, 42, 33, 75))
    draw.polygon([(163, 393), (224, 393), (214, 448), (174, 448)], fill=(172, 83, 57, 255), outline=(215, 126, 83, 255))
    draw.line((195, 400, 193, 311), fill=(64, 105, 69, 255), width=4)
    leaves = [
        (171, 323, 207, 347, 27),
        (194, 338, 232, 364, -12),
        (161, 351, 197, 375, 18),
        (198, 369, 239, 396, -18),
        (155, 379, 190, 399, 24),
    ]
    for x1, y1, x2, y2, _angle in leaves:
        draw.ellipse((x1, y1, x2, y2), fill=(55, 111, 74, 255), outline=(37, 77, 57, 255), width=2)
    draw.line((193, 400, 206, 342), fill=(37, 78, 54, 255), width=2)


def draw_decor(draw: ImageDraw.ImageDraw) -> None:
    # Small accessories arrive last, making the space feel inhabited.
    draw.polygon([(300, 254), (344, 238), (344, 270), (300, 287)], fill=(221, 186, 130, 255), outline=(246, 221, 173, 255))
    draw.polygon([(310, 260), (334, 251), (334, 267), (310, 276)], fill=(59, 92, 78, 255))
    draw.rectangle((471, 379, 494, 397), fill=(220, 166, 104, 255))
    draw.rectangle((478, 371, 487, 386), fill=(223, 230, 207, 255))
    draw.rectangle((588, 342, 612, 354), fill=(225, 183, 120, 255))
    draw.rectangle((593, 331, 610, 344), fill=(71, 105, 85, 255))


@dataclass(frozen=True)
class Furniture:
    name: str
    layer: Image.Image
    final_center: tuple[float, float]
    box_center: tuple[float, float]
    start_scale: float
    start_angle: float
    start: float
    end: float
    box_color: tuple[int, int, int]


def make_furniture() -> list[Furniture]:
    raw = [
        ("rug", draw_rug, (366, 451), (404, 500), 0.32, -8, 0.27, 0.42, (178, 116, 68)),
        ("cabinet", draw_builtin, (558, 290), (654, 482), 0.42, 8, 0.18, 0.39, (186, 124, 74)),
        ("sofa", draw_sofa, (345, 378), (220, 493), 0.34, -9, 0.36, 0.59, (202, 140, 84)),
        ("table", draw_table, (371, 455), (320, 503), 0.28, 12, 0.54, 0.71, (174, 111, 66)),
        ("lamp", draw_lamp, (539, 342), (550, 503), 0.32, -5, 0.64, 0.81, (195, 112, 68)),
        ("plant", draw_plant, (195, 384), (164, 501), 0.36, -12, 0.72, 0.91, (164, 91, 62)),
        ("decor", draw_decor, (442, 300), (470, 500), 0.38, 7, 0.82, 1.0, (185, 121, 71)),
    ]
    furniture: list[Furniture] = []
    for name, draw_function, center, box_center, scale, angle, start, end, color in raw:
        layer, _ = layer_from(draw_function)
        furniture.append(Furniture(name, layer, center, box_center, scale, angle, start, end, color))
    return furniture


def draw_unpacking_box(frame: Image.Image, center: tuple[float, float], progress: float, color: tuple[int, int, int]) -> None:
    visible = 1 - ease_out(stage_progress(progress, 0.76, 1.0))
    if visible <= 0:
        return

    box = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(box)
    cx, cy = center
    width, height = 42, 30
    left, top = cx - width, cy - height
    right, bottom = cx + width, cy + height
    open_amount = ease_out(stage_progress(progress, 0.26, 0.56))
    alpha = round(255 * visible)
    side_color = (*color, alpha)
    top_color = (min(color[0] + 30, 255), min(color[1] + 25, 255), min(color[2] + 18, 255), alpha)
    dark_color = (max(color[0] - 34, 0), max(color[1] - 28, 0), max(color[2] - 20, 0), alpha)

    draw.ellipse((left - 12, bottom - 3, right + 13, bottom + 15), fill=(27, 40, 32, round(alpha * 0.35)))
    draw.polygon([(left, top), (cx, top - 13), (right, top), (cx, top + 14)], fill=top_color)
    draw.polygon([(left, top), (cx, top + 14), (cx, bottom), (left, bottom - 12)], fill=side_color)
    draw.polygon([(cx, top + 14), (right, top), (right, bottom - 12), (cx, bottom)], fill=dark_color)
    draw.line((left, top, cx, top + 14, right, top), fill=(244, 205, 139, alpha), width=2)

    flap_left = [(left + 3, top + 2), (cx - 4, top - 10 - 27 * open_amount), (cx - 4, top + 2)]
    flap_right = [(right - 3, top + 2), (cx + 4, top - 10 - 27 * open_amount), (cx + 4, top + 2)]
    draw.polygon(flap_left, fill=top_color, outline=(245, 207, 144, alpha))
    draw.polygon(flap_right, fill=top_color, outline=(245, 207, 144, alpha))
    frame.alpha_composite(box)


def place_furniture(frame: Image.Image, item: Furniture, progress: float) -> None:
    active = stage_progress(progress, item.start, item.end)
    if active <= 0:
        return

    amount = ease_out(active)
    start_x, start_y = item.box_center
    final_x, final_y = item.final_center
    center_x = lerp(start_x, final_x, amount)
    center_y = lerp(start_y, final_y, amount) - math.sin(amount * math.pi) * 22
    scale = lerp(item.start_scale, 1.0, amount)
    angle = lerp(item.start_angle, 0.0, amount)

    draw_unpacking_box(frame, item.box_center, active, item.box_color)

    width = max(1, round(item.layer.width * scale))
    height = max(1, round(item.layer.height * scale))
    transformed = item.layer.resize((width, height), Image.Resampling.BICUBIC)
    transformed = transformed.rotate(angle, resample=Image.Resampling.BICUBIC, expand=True)
    alpha = transformed.getchannel("A").point(lambda value: round(value * clamp(active * 1.65)))
    transformed.putalpha(alpha)
    position = (round(center_x - transformed.width / 2), round(center_y - transformed.height / 2))
    frame.alpha_composite(transformed, position)


def compose(progress: float, furniture: list[Furniture]) -> Image.Image:
    frame = make_background()
    draw_shell(frame, progress)
    for item in furniture:
        place_furniture(frame, item, progress)

    # A soft light pass gives the finished room a small, deterministic breathing motion.
    glow = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    amount = math.sin(progress * math.pi * 2) * 0.5 + 0.5
    glow_draw.ellipse((115, 75, 474, 348), fill=(255, 236, 179, round(5 + amount * 8)))
    glow = glow.filter(ImageFilter.GaussianBlur(52))
    return Image.alpha_composite(frame, glow).convert("RGB")


def main() -> None:
    furniture = make_furniture()
    build_frames = [compose(index / 74, furniture) for index in range(75)]
    # Finished house first, then unpack to the empty shell and rebuild for a clean loop.
    frames = list(reversed(build_frames)) + build_frames
    quantized = [frame.quantize(colors=128, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE) for frame in frames]
    quantized[0].save(
        OUTPUT,
        save_all=True,
        append_images=quantized[1:],
        duration=40,
        loop=0,
        disposal=2,
        optimize=True,
    )
    print(f"created {OUTPUT} ({len(frames)} frames, 800x600, 25 fps)")


if __name__ == "__main__":
    main()
