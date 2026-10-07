"""Bruitages synthétisés des 3 vidéos de démo (Odette, Coupe Franche, Mona)."""
import numpy as np, wave, os
import json
SR = 48000; DUR = 13.0
rng = np.random.default_rng(7)
L = np.zeros(int(SR * DUR)); R = np.zeros(int(SR * DUR))

def lowpass(x, cut):  # cut : fréquence de coupure (scalaire ou tableau par échantillon)
    cut = np.broadcast_to(cut, x.shape)
    a = np.exp(-2 * np.pi * cut / SR); y = np.zeros_like(x); s = 0.0
    for i in range(len(x)):
        s = (1 - a[i]) * x[i] + a[i] * s; y[i] = s
    return y

def place(t, sig, gain=1.0, pan=0.0):
    """Ajoute un son à t secondes ; pan de -1 (gauche) à 1 (droite), éventuellement variable."""
    i = int(t * SR); n = min(len(sig), len(L) - i)
    if n <= 0: return
    pan = np.broadcast_to(pan, sig.shape)[:n]
    L[i:i+n] += sig[:n] * gain * np.sqrt((1 - pan) / 2)
    R[i:i+n] += sig[:n] * gain * np.sqrt((1 + pan) / 2)

def tt(d): return np.arange(int(d * SR)) / SR

def whoosh(d=0.85, lo=300, hi=5000, rising=False):
    t = tt(d); x = rng.standard_normal(len(t)); p = t / d
    env = np.sin(np.pi * p) ** 2 if not rising else (p ** 2.2) * (1 - p) ** 0.25
    cut = lo + (hi - lo) * (np.sin(np.pi * p) if not rising else p)
    y = lowpass(x, cut) - lowpass(x, cut * 0.25)  # passe-bande qui balaie
    y = y * env; return y / (np.abs(y).max() + 1e-9)

def boom(f=55, d=0.5):
    t = tt(d); return np.sin(2 * np.pi * (f + 40 * np.exp(-t * 25)) * t) * np.exp(-t * 7)

def pop(f=700, d=0.12):
    t = tt(d); fr = f * (1 + 1.2 * np.exp(-t * 60))
    y = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 38)
    y[:120] += rng.standard_normal(120) * 0.3 * np.linspace(1, 0, 120); return y

def tick(f=2600, d=0.03):
    t = tt(d); return (np.sin(2 * np.pi * f * t) * 0.6 + rng.standard_normal(len(t)) * 0.4) * np.exp(-t * 220)

def ding(fs=(1318.5, 1975.5, 2637), d=1.0):
    t = tt(d); y = sum(np.sin(2 * np.pi * f * t) * np.exp(-t * (3 + k * 2)) / (k + 1) for k, f in enumerate(fs))
    return y * (1 - np.exp(-t * 400))

def swish(d=0.3):
    t = tt(d); x = rng.standard_normal(len(t)); y = x - lowpass(x, 2500)
    return y * np.sin(np.pi * t / d) ** 3

def riser(d=1.1, f0=320, f1=900):
    t = tt(d); fr = f0 + (f1 - f0) * (t / d) ** 1.5
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.sin(np.pi * t / d) ** 2


def buzz(d=0.18, f=140):  # « faux » / erreur
    t = tt(d); return np.sign(np.sin(2*np.pi*f*t)) * 0.5 * np.exp(-t*14) + np.sin(2*np.pi*f*2*t)*0.3*np.exp(-t*20)

def thud(d=0.45):  # tampon
    t = tt(d); return boom(70, d) * 1.2 + rng.standard_normal(len(t)) * np.exp(-t*60) * 0.6



def scribble(d=0.5):  # feutre qui entoure
    t = tt(d); x = rng.standard_normal(len(t)); y = lowpass(x, 3500) - lowpass(x, 900)
    return y * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * t) ** 2) * np.sin(np.pi * t / d) ** 0.5


import sys
def reset(d):
    global L, R
    L = np.zeros(int(SR * d)); R = np.zeros(int(SR * d))
def save(name):
    st = np.stack([L, R], 1); st = st / (np.abs(st).max() + 1e-9) * 0.5
    with wave.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
    print("OK", name)

# Odette : rideau doré aux coupes, « taps » sur le téléphone, ding de confirmation
reset(13.0)
for c in [2.7, 5.2, 9.0, 10.8]: place(c - .2, whoosh(.45, 300, 3500), .35)
for c in [6.2 - .32, 7.15 - .32, 8.1 - .32]: place(c + .2, tick(1400, .04), .5)
place(8.12, ding(), .28)
place(10.8, boom(55, .5), .35)
save("sfx-odette.wav")

# Coupe Franche : impacts des mots, taps, tampon « Réservé », tondeuse
reset(12.0)
for i in range(4): place(.15 + i * .32, thud(.35), .45)
place(2.4, swish(.25), .4)
for c in [0.8, 1.6, 2.4, 3.3, 4.1, 4.9]: place(2.4 + c + .45 - .3, tick(1500, .04), .55)
place(8.4, swish(.25), .4)
place(8.65, thud(.45), .7)
place(10.0, swish(.25), .4)
place(10.75, pop(700, .12), .35)
save("sfx-coupe.wav")

# Mona : traits de crayon (grille), pop de la boule, rebonds des lettres, bulles à chaque parfum
reset(10.0)
place(.05, scribble(.9), .25)
place(1.0, swish(.2), .3)
place(1.95, pop(520, .14), .6)
for i in range(4): place(2.6 + i * .1 + .25, pop(800 + i * 120, .09), .35)
for i in range(5): place(3.8 + i * .5, pop(1100 + i * 90, .08), .3)
place(6.0, whoosh(.4, 400, 4000), .3)
for i in range(3): place(6.0 + i * .72, swish(.2), .3)
place(8.2, whoosh(.4, 400, 4000), .3)
for i in range(5): place(8.2 + .8 + i * .08, pop(900 + i * 150, .08), .3)
save("sfx-mona.wav")
