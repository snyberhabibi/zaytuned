# Zaytuned Design System

> Palestinian Heritage Educational App - Retro Arab / Cultural Heritage Theme

**Project ID:** `f7471564-62b6-4787-817d-8780db6b6ff3`

---

## Design DNA

Every Zaytuned design shares these traits:

1. **Tatreez-inspired patterns** — Traditional Palestinian embroidery motifs as decorative elements
2. **Warm, earthy palette** — Deep reds, olive greens, gold, terracotta - never cold blues
3. **Cultural authenticity** — Celebrate Palestinian heritage respectfully and authentically
4. **Playful yet educational** — Engaging for both kids and adults
5. **Bilingual support** — Arabic RTL and English LTR with proper typography

---

## Color Palette

### Primary Colors
| Color | Hex | Role |
|-------|-----|------|
| **Tatreez Red** | `#C41E3A` | Primary brand, CTAs, accent highlights |
| **Tatreez Red Dark** | `#9B1B30` | Hover states, depth |
| **Tatreez Red Light** | `#E8445A` | Lighter accents |

### Secondary Colors
| Color | Hex | Role |
|-------|-----|------|
| **Tatreez Green** | `#2D8B4E` | Success, nature, olives |
| **Tatreez Green Dark** | `#1E6B3A` | Depth, hover states |
| **Tatreez Green Light** | `#4CAF50` | Kids mode, playful |
| **Tatreez Black** | `#1A1A1A` | Text, headers, footer bg |

### Accent Colors
| Color | Hex | Role |
|-------|-----|------|
| **Olive** | `#6B8E23` | Brand identity, logo |
| **Olive Light** | `#8FBC8F` | Kids mode borders |
| **Olive Dark** | `#556B2F` | Depth |
| **Gold** | `#D4AF37` | Points, rewards, highlights |
| **Gold Light** | `#F4D03F` | Kids mode accent |
| **Terracotta** | `#E07B53` | Warm accent |

### Neutrals
| Color | Hex | Role |
|-------|-----|------|
| **Cream** | `#FFFEF7` | Light backgrounds, text on dark |
| **Cream Dark** | `#F5F0E1` | Card backgrounds, borders |
| **Sand** | `#E8DCC4` | Subtle backgrounds |
| **Charcoal** | `#36454F` | Footer, deep sections |

---

## Typography

### Primary Font: System Sans + Arabic Support
- Headlines: Weight 800 (Extra Bold), sizes clamp(2.5rem, 5vw, 4rem)
- Body: Weight 400-500, 1.125rem, line-height 1.8
- Arabic: 'Noto Sans Arabic', 'Amiri' fallback, RTL direction

### Text Styles
| Role | Weight | Size | Notes |
|------|--------|------|-------|
| **Heading 1** | 800 | clamp(2.5rem, 5vw, 4rem) | Gradient text option |
| **Heading 2** | 700 | clamp(1.75rem, 4vw, 2.5rem) | Section headers |
| **Heading 3** | 600 | clamp(1.25rem, 3vw, 1.75rem) | Card titles |
| **Body Large** | 400 | 1.125rem | Line-height 1.8 |
| **Caption** | 400 | 0.875rem | Muted foreground color |

---

## Design Elements

### Tatreez Border Pattern
- 3-color gradient stripe: red → black → green
- Applied as pseudo-element around cards
- Size: 4px height, 24px repeating pattern

### Red Accent Bar
- Used below headlines: 60px wide, 4px tall
- Gradient: red → green
- Rounded full

### Glass Effect
- Background: rgba(255, 255, 255, 0.85)
- Backdrop-filter: blur(12px)
- Border: 1px solid rgba(255, 255, 255, 0.5)

### Card Styles
- Background: white
- Border-radius: 20px (lg)
- Shadow: 0 4px 12px rgba(196, 30, 58, 0.12)
- Border: 1px solid rgba(196, 30, 58, 0.08)
- Hover: translateY(-6px), shadow-lg

### Button Styles
**Primary:**
- Gradient: 135deg from tatreez-red to tatreez-red-dark
- Text: white
- Border-radius: full (pill)
- Padding: 0.875rem 1.75rem
- Shadow: md
- Hover: translateY(-3px), scale(1.02)

**Secondary:**
- Background: white
- Border: 2px solid tatreez-red
- Text: tatreez-red
- Hover: bg tatreez-red, text white

---

## Page Layout Patterns

### Header
- Sticky top, z-50
- Glass effect
- Logo left (olive emoji + "Zaytuned")
- Controls right (points, language, mode, passport, games)

### Hero Section
- Tatreez pattern background
- Gradient stripe top
- Floating decorative emojis (olive, thread, orange)
- Centered text, heading-1, gradient text highlight
- Progress summary card

### City Cards Grid
- 1-3 columns responsive
- Card with emoji icon (16x16, gradient bg)
- Progress bar at bottom
- Hover: scale, shadow, tatreez border reveal

### Footer
- Dark gradient: tatreez-black → charcoal
- Logo centered
- Gradient stripe divider
- Heart animation

---

## Animations

| Animation | Duration | Use Case |
|-----------|----------|----------|
| fadeIn | 300ms | General entrance |
| fadeInUp | 500ms | Section reveals |
| fadeInScale | 300ms | Modal/dropdown |
| bounceIn | 600ms | Rewards, stamps |
| heartbeat | 1.5s | Hearts, points |
| float | 3s | Decorative elements |
| wiggle | 500ms | Interactive icons |
| shimmer | 2s | Progress bars |
| stamp | 600ms | Passport stamps |

---

## Cultural Motifs

### Emojis Used
- 🫒 Olive (brand identity)
- 🕌 Jerusalem
- 🍊 Jaffa oranges
- 🔥 Gaza resilience
- ⛰️ Nablus mountains
- 🏛️ Hebron
- 🧵 Embroidery/Tatreez
- 📕 Passport
- 🎮 Games
- 🇵🇸 Palestinian flag
- ⭐ Points/rewards

### City Color Associations
| City | Gradient |
|------|----------|
| Jerusalem | amber-500 → amber-600 |
| Jaffa | orange-400 → orange-500 |
| Gaza | red-500 → red-600 |
| Nablus | emerald-500 → emerald-600 |
| Hebron | purple-500 → purple-600 |

---

## Kids Mode Adjustments
- Softer red: `#E85D75`
- Brighter green: `#4CAF50`
- Larger font-size: 1.1em
- Rounder cards: xl radius
- Thicker borders: 3px olive-light

---

## Do's and Don'ts

### DO
- Use tatreez patterns subtly (3% opacity backgrounds)
- Maintain warm color temperature
- Honor cultural significance of elements
- Support RTL for Arabic content
- Use meaningful animations that enhance UX

### DON'T
- Use cold blues, purples (except Hebron accent)
- Pure white (#ffffff) - use cream instead
- Pure black (#000000) for backgrounds - use tatreez-black
- Overwhelming patterns that distract from content
- Generic stock imagery - use authentic representations
