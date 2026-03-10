# PumpQuest - Summary of Remaining Tasks

## Completed in This Session
✅ Fixed CREDITS page layout - displays token exchange logos (DexScreener 📊, Pump.fun 🚀, Jupiter ♃) horizontally with community icons  
✅ Fixed ABOUT page layout - displays token exchange logos horizontally on same line with Follow Us icons  
✅ Removed text labels, now showing only symbols/logos

## Core Bugs to Fix
1. **Enemy Persistence Bug** - Defeated enemies don't disappear from map correctly
   - Status: Needs investigation in game engine
   - Location: `server/js/` and `client/js/` - collision/entity management
   - Impact: Critical - core gameplay issue

2. **Loot Respawn System** - Items need to respawn after time interval
   - Status: Needs implementation
   - Location: `server/js/world.js` - item management
   - Impact: High - affects game economy

## Missing Features from Specification

### Theme Implementation (High Priority)
3. **Story & NPC Dialogue** - Replace medieval fantasy with memecoin theme
   - NPCs should reference "Crypto Hunters", "PumpVerse", "legendary tokens"
   - Location: `server/js/` - NPC data and dialogue
   - Status: Not started

4. **Entity Names** - Transform game entities to memecoin theme
   - Knight → Crypto Hunter
   - Rat → Spam Bot
   - Skeleton → Dead Coin  
   - Goblin → Rug Dev
   - Boss → Market Manipulator
   - Gold → Meme Tokens
   - Sword → Hash Blade
   - Armor → Blockchain Shield
   - Potion → Gas Boost
   - Location: `server/js/entitydata.js`, `client/js/`
   - Status: Not started

5. **Area Names** - Rename map regions
   - Village → Genesis Launch
   - Forest → Meme Jungle
   - Dungeon → Rug Pull Cave
   - Castle → Market Citadel
   - Location: `client/js/` - UI labels
   - Status: Not started

### Scoring & Progression System (Medium Priority)
6. **Market Score System** - Track player progress
   - Enemy defeat: +10 points
   - Fragment collected: +20 points
   - Area cleared: +50 points
   - Location: `client/js/app.js` and `server/js/`
   - Status: Not started

7. **Token Fragment System** - Enemy drops
   - When enemies die, drop token fragments (DOGE, PEPE, WOJAK, CHAD)
   - Players collect to increase score
   - Location: `server/js/world.js` - loot generation
   - Status: Not started

8. **Leaderboard UI** - Display top Crypto Hunters
   - Show player name + market score
   - Location: `client/index.html` and `client/js/`
   - Status: Not started

### UI & Branding (Medium Priority)
9. **Zone Progression System** - Add difficulty levels
   - Zone 1: Beginner
   - Zone 2: Intermediate  
   - Zone 3: Advanced
   - Display entry messages
   - Location: `client/js/app.js`
   - Status: Not started

10. **Project Logo** - Display PumpQuest branding
    - Logo path: `/img/project/logo.png`
    - Display locations: Main menu, loading screen, about page
    - Current: Using favicon placeholder
    - Location: `client/index.html`, `client/js/app.js`
    - Status: Partial (logo references in code, need actual logo image)

11. **Window Size Increase** - Make game window larger
    - Current: Standard dimensions
    - Needed: Increase canvas/game area
    - Location: `client/css/main.css`, `client/index.html`
    - Status: Not started

12. **Real TG & CA Logos** - Display actual platform logos
    - Currently using emoji symbols as placeholder
    - Needed: Real DexScreener, Pump.fun, Jupiter, Telegram, X logos
    - Location: `client/index.html` (ABOUT and CREDITS pages)
    - Status: Partial (using emoji placeholders)

### Social & Configuration (Low Priority)
13. **Project Configuration** - Pull from config file
    - File: `client/config/project.json`
    - Status: Config file exists but not fully integrated into all UI elements
    - Needed: Ensure all social links pull from config

14. **Share Feature** - Social sharing buttons
    - Share score on X (Twitter)
    - Template: "I just scored [score] points hunting memecoins in MEMECOIN QUEST"
    - Location: `client/js/app.js`
    - Status: Not started

15. **Socket Integration** - Ensure websocket stability
    - Current: BrowserQuest multiplayer works
    - Ensure: No regression from theme changes
    - Status: Being maintained, monitor closely

## Testing Checklist
- [ ] Game server starts correctly
- [ ] Player movement works
- [ ] Enemies spawn properly
- [ ] Items drop from enemies  
- [ ] Multiplayer functionality intact
- [ ] Enemy death animation and removal works
- [ ] Defeated enemies don't reappear
- [ ] Loot respawns after time
- [ ] Score tracking displays correctly
- [ ] Leaderboard shows properly
- [ ] Theme text displays (NPC dialogue, entity names)
- [ ] Zone progression messages appear
- [ ] Social links work from config
- [ ] All pages display correctly (ABOUT, CREDITS, Token page)

## Notes
- Core engine must remain stable - only modify text, UI, and config
- Multiplayer/networking should not be affected
- All changes should be configurable via `project.json` where possible
