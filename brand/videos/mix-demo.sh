#!/bin/sh
# Assemble une vidéo de démo : images rendues + musique (fondu) + bruitages.
# Usage : ./mix-demo.sh odette 13 [0.9]   (nom, durée en secondes, volume de la musique)
cd "$(dirname "$0")"
N=$1; D=$2
ffmpeg -loglevel error -y -framerate 30 -i "/tmp/claude-0/demo-$N/f%04d.jpg" -i "musique-$N.mp3" -i "sfx-$N.wav" -filter_complex "\
[1:a]atrim=0:$D,afade=t=in:d=0.2,afade=t=out:st=$(echo "$D - 1.2" | bc):d=1.2,volume=${3:-0.55}[m];\
[2:a]volume=0.9[s];[m][s]amix=inputs=2:normalize=0,alimiter=limit=0.9[a]" \
  -map 0:v -map "[a]" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -t "$D" "demo-$N.mp4"
echo "OK demo-$N.mp4"
