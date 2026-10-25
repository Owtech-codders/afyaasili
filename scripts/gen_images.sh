#!/bin/bash
# AfyaAsili - AI product image generation
# Generates product photos, hero and about images into the deliverable folder.
# Runs in parallel batches to save time. Logs results.

OUT="/home/z/my-project/download/afyaasili/img"
mkdir -p "$OUT/products"

gen() {
  local prompt="$1"
  local file="$2"
  local size="$3"
  if [ -s "$file" ]; then
    echo "SKIP (exists): $file"
    return 0
  fi
  for attempt in 1 2 3; do
    if z-ai image -p "$prompt" -o "$file" -s "$size" >/dev/null 2>&1 && [ -s "$file" ]; then
      echo "OK: $file (attempt $attempt)"
      return 0
    fi
    sleep 2
  done
  echo "FAIL: $file"
  return 1
}

# ---------- Batch 1 (6 parallel) ----------
gen "Professional product photography of a kraft paper pouch filled with green moringa leaf powder, small wooden spoon with green powder beside it, fresh moringa leaves, natural beige background, warm soft studio lighting, clean minimal composition, high quality, detailed" "$OUT/products/moringa-powder-1.jpg" "1024x1024" &
gen "Top-down flat lay of green moringa powder in a wooden bowl with fresh moringa leaves and seeds on a rustic wooden table, natural window light, professional food photography, high quality, detailed" "$OUT/products/moringa-powder-2.jpg" "1024x1024" &
gen "Professional product photography of a clean glass supplement jar filled with green herbal capsules, fresh green moringa leaves beside it, natural beige background, soft studio light, minimal composition, high quality, detailed" "$OUT/products/moringa-capsules-1.jpg" "1024x1024" &
gen "Close-up of green herbal capsules spilling from a glass jar onto a rustic wooden surface with fresh green leaves, warm natural light, professional product photography, high quality, detailed" "$OUT/products/moringa-capsules-2.jpg" "1024x1024" &
gen "Professional product photography of a glass jar of golden raw honey with wooden honey dipper, honeycomb pieces, warm amber tones, natural wooden background, soft light, high quality, detailed" "$OUT/products/honey-1.jpg" "1024x1024" &
gen "Close-up of golden honey dripping from a wooden dipper into a glass jar, warm backlight, rustic wooden background, professional product photography, high quality, detailed" "$OUT/products/honey-2.jpg" "1024x1024" &
wait

# ---------- Batch 2 (6 parallel) ----------
gen "Herbal ginger tea in a clear glass cup with lemon slices and fresh ginger root, light steam, warm cozy lighting, wooden table, professional beverage photography, high quality, detailed" "$OUT/products/ginger-tea-1.jpg" "1024x1024" &
gen "Top-down flat lay of dried ginger herbal tea blend with dried ginger slices, lemongrass and empty tea bags on a rustic wooden table, natural light, professional food photography, high quality" "$OUT/products/ginger-tea-2.jpg" "1024x1024" &
gen "Vibrant deep red hibiscus herbal tea in a clear glass cup, dried hibiscus flowers scattered on rustic wooden table, warm natural light, professional product photography, high quality, detailed" "$OUT/products/hibiscus-tea-1.jpg" "1024x1024" &
gen "Dried deep red hibiscus flowers in a wooden bowl on a rustic table, small linen pouch beside it, top-down flat lay, natural light, professional food photography, high quality" "$OUT/products/hibiscus-tea-2.jpg" "1024x1024" &
gen "Professional product photography of a small amber glass bottle of eucalyptus essential oil with fresh green eucalyptus leaves, clean natural beige background, soft shadows, minimal composition, high quality, detailed" "$OUT/products/eucalyptus-oil-1.jpg" "1024x1024" &
gen "Amber glass essential oil bottle with a ceramic steam diffuser and fresh eucalyptus branches, calm spa atmosphere, warm soft light, professional product photography, high quality" "$OUT/products/eucalyptus-oil-2.jpg" "1024x1024" &
wait

# ---------- Batch 3 (6 parallel) ----------
gen "Professional product photography of a clear glass jar of white cold-pressed coconut oil, fresh coconut halves beside it, bright natural tropical background, soft daylight, minimal composition, high quality, detailed" "$OUT/products/coconut-oil-1.jpg" "1024x1024" &
gen "Glass jar of white coconut oil with cracked coconuts and a green palm leaf on a light wooden table, top-down flat lay, natural light, professional food photography, high quality" "$OUT/products/coconut-oil-2.jpg" "1024x1024" &
gen "Professional product photography of a clear jar of translucent aloe vera gel, fresh aloe vera leaves beside it, clean white and soft green natural background, bright soft light, minimal composition, high quality, detailed" "$OUT/products/aloe-gel-1.jpg" "1024x1024" &
gen "Fresh cut aloe vera leaf with clear gel dripping onto a clean white surface, close-up macro shot, natural bright light, professional product photography, high quality, detailed" "$OUT/products/aloe-gel-2.jpg" "1024x1024" &
gen "Wide banner of assorted natural herbal products on a rustic wooden table: mortar and pestle, dried herbs, glass honey jar, green moringa leaves, turmeric roots, warm earthy tones, soft natural window light, professional photography, generous empty space on the left side, high quality, detailed" "$OUT/hero.jpg" "1440x720" &
gen "Hands of an African herbalist holding a wooden bowl of dried herbs and natural ingredients, colorful natural remedies and green leaves on wooden table, warm sunlight, authentic East African market atmosphere, professional photography, high quality, detailed" "$OUT/about.jpg" "1152x864" &
wait

echo "---- RESULTS ----"
ls -la "$OUT" "$OUT/products" | grep -E "jpg|png" || true
echo "DONE"
