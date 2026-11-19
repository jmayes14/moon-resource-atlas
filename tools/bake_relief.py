"""Bake terrain relief from NASA LOLA elevation (ldem_16_uint) into the NASA LROC color map.

Inputs:  dl/ldem16.tif (5760x2880 uint16, 0.5 m units), moonstyles/assets/moon_color.jpg (4096x2048)
Output:  moonstyles/assets/moon.jpg (4096x2048)

Shading is direction-free (sky-view style + local relief) so polar views don't get a pinwheel
pattern, plus a gentle north-west light in middle latitudes for a 3D feel. Near the poles,
where the color map has no real data, the picture fades to gray terrain shading.
"""
import sys
import numpy as np
import tifffile
from PIL import Image

S = sys.argv[1]
h = tifffile.imread(f"{S}/dl/ldem16.tif").astype(np.float32) * 0.5  # meters
H, W = h.shape
lat = 90 - (np.arange(H) + 0.5) / H * 180
coslat = np.maximum(np.cos(np.radians(lat)), 0.03)[:, None]
dy_m = 1737400 * np.pi / H  # meters per pixel north-south

def blur(a, r):
    # separable box blur, wraps in longitude
    k = 2 * r + 1
    c = np.cumsum(np.pad(a, ((0, 0), (r + 1, r)), mode="wrap"), axis=1)
    a = (c[:, k:] - c[:, :-k]) / k
    c = np.cumsum(np.pad(a, ((r + 1, r), (0, 0)), mode="edge"), axis=0)
    return (c[k:, :] - c[:-k, :]) / k

gy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) / (2 * dy_m)
gy[0], gy[-1] = 0, 0
gx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) / (2 * dy_m * coslat)
slope = np.hypot(gx, gy)

# 1. sky-view style: steeper ground is darker
sky = 1 / np.sqrt(1 + (slope * 2.2) ** 2)
# 2. local relief: crater floors darker, rims lighter
rel = h - blur(blur(h, 10), 10)
rel = np.tanh(rel / 900)
# 3. gentle directional light from the north-west, fading out toward the poles
az, alt = np.radians(315), np.radians(40)
lx, ly, lz = np.cos(alt) * np.sin(az), np.cos(alt) * np.cos(az), np.sin(alt)
nx, ny, nz = -gx, gy, np.ones_like(gx)
n = np.sqrt(nx ** 2 + ny ** 2 + 1)
direc = np.clip((nx * lx + ny * ly + nz * lz) / n, 0, 1)
fade_dir = np.clip((80 - np.abs(lat)) / 20, 0, 1)[:, None]

shade = 0.62 * sky + 0.22 * (0.5 + 0.5 * rel) + 0.16
shade = shade * (1 - 0.35 * fade_dir) + 0.35 * fade_dir * (direc * 1.05)
shade = shade / np.percentile(shade, 60)  # median-ish ground = 1.0

# resample to the color map size
sh_img = Image.fromarray(np.clip(shade * 127.5, 0, 255).astype(np.uint8)).resize((4096, 2048), Image.BILINEAR)
sh = np.asarray(sh_img).astype(np.float32) / 127.5

col = np.asarray(Image.open(f"{S}/moonstyles/assets/moon_color.jpg").convert("RGB")).astype(np.float32)
lat2 = 90 - (np.arange(2048) + 0.5) / 2048 * 180
polar = np.clip((np.abs(lat2) - 72) / 8, 0, 1)[:, None, None]   # 0 below 72°, 1 above 80°
gray = np.array([150, 147, 141], np.float32)
base = col * (1 - polar) + gray * polar
strength = 0.55 + 0.45 * polar          # relief stronger near the poles
out = base * (1 - strength + strength * sh[:, :, None])
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(f"{S}/moonstyles/assets/moon.jpg", quality=84, optimize=True, progressive=True)
print("done", out.shape)
