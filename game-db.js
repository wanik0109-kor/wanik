from pathlib import Path
import re
import json
import textwrap

source_path = Path("/mnt/data/guild_master_simulator_v4/index.html")
output_dir = Path("/mnt/data/guild_master_simulator_db_v1")
output_dir.mkdir(parents=True, exist_ok=True)

index_path = output_dir / "index.html"
db_path = output_dir / "game-db.js"

source = source_path.read_text(encoding="utf-8")

# -------------------------------------------------------------------
# game-db.js
# -------------------------------------------------------------------
db_code = r'''/*
  길드 마스터 시뮬레이터 - 게임 기본 데이터
  이 파일은 index.html과 같은 폴더에 두어야 합니다.

  역할:
  - 게임 제작자가 정한 고정 데이터 보관
  - 캐릭터 이름, 직업, 종족, 성별, 성격
  - 아이템, 던전 난이도, 인카운터 이름

  플레이어의 골드와 보유 캐릭터는 이 파일이 아니라
  브라우저 localStorage에 저장됩니다.
*/

globalThis.GAME_DB = {
  version: 1,

  settings: {
    startingGold: 300,
    gachaCost: 10
  },

  firstNames: [
    { id: "aiden", name: "아이든" },
    { id: "kael", name: "카엘" },
    { id: "rowan", name: "로완" },
    { id: "lucan", name: "루칸" },
    { id: "eren", name: "에렌" },
    { id: "darian", name: "다리안" },
    { id: "mira", name: "미라" },
    { id: "serah", name: "세라" },
    { id: "luna", name: "루나" },
    { id: "elina", name: "엘리나" },
    { id: "vera", name: "베라" },
    { id: "talia", name: "탈리아" }
  ],

  lastNames: [
    { id: "ironwood", name: "아이언우드" },
    { id: "blackthorn", name: "블랙쏜" },
    { id: "silvermoon", name: "실버문" },
    { id: "redgrave", name: "레드그레이브" },
    { id: "stormborn", name: "스톰본" },
    { id: "ashford", name: "애쉬포드" },
    { id: "nightfall", name: "나이트폴" },
    { id: "goldleaf", name: "골드리프" },
    { id: "frostbane", name: "프로스트베인" },
    { id: "ravencrest", name: "레이븐크레스트" },
    { id: "stoneheart", name: "스톤하트" },
    { id: "wildbrook", name: "와일드브룩" }
  ],

  jobs: [
    {
      id: "warrior",
      name: "전사",
      icon: "⚔️",
      description: "공격과 방어에 능한 근접 전투원입니다."
    },
    {
      id: "knight",
      name: "기사",
      icon: "🛡️",
      description: "방패와 중갑을 사용하는 수호자입니다."
    },
    {
      id: "ranger",
      name: "정찰자",
      icon: "🏹",
      description: "활과 추적에 능한 원거리 전투원입니다."
    },
    {
      id: "rogue",
      name: "도적",
      icon: "🗡️",
      description: "함정 해제와 잠입에 능한 모험가입니다."
    },
    {
      id: "wizard",
      name: "마법사",
      icon: "🔮",
      description: "강력하지만 불안정한 마법 사용자입니다."
    },
    {
      id: "priest",
      name: "사제",
      icon: "⛪",
      description: "치유와 축복을 담당하는 성직자입니다."
    },
    {
      id: "alchemist",
      name: "연금술사",
      icon: "⚗️",
      description: "물약과 폭발물을 사용하는 연구자입니다."
    },
    {
      id: "berserker",
      name: "광전사",
      icon: "🪓",
      description: "위험을 감수하고 힘을 끌어내는 전사입니다."
    },
    {
      id: "bard",
      name: "음유시인",
      icon: "🎻",
      description: "동료의 사기와 운을 돕는 지원가입니다."
    },
    {
      id: "monk",
      name: "수도승",
      icon: "🥋",
      description: "맨손 전투와 정신 수련의 전문가입니다."
    },
    {
      id: "necromancer",
      name: "강령술사",
      icon: "💀",
      description: "죽음과 영혼을 다루는 금지된 마법사입니다."
    },
    {
      id: "monster_hunter",
      name: "괴물 사냥꾼",
      icon: "🐺",
      description: "괴물의 습성과 약점을 연구하는 전문가입니다."
    }
  ],

  races: [
    {
      id: "human",
      name: "인간",
      description: "가장 흔하고 다양한 문화를 가진 종족입니다."
    },
    {
      id: "elf",
      name: "엘프",
      description: "장수하며 마법과 감각이 뛰어난 종족입니다."
    },
    {
      id: "dwarf",
      name: "드워프",
      description: "강인한 육체와 뛰어난 제작 기술을 가진 종족입니다."
    },
    {
      id: "orc",
      name: "오크",
      description: "강한 육체와 전투 중심의 문화를 가진 종족입니다."
    },
    {
      id: "beastkin",
      name: "수인",
      description: "동물의 특징과 예민한 감각을 가진 종족입니다."
    },
    {
      id: "goblin",
      name: "고블린",
      description: "작고 영리하며 생존력이 높은 종족입니다."
    },
    {
      id: "undead",
      name: "언데드",
      description: "죽음에서 돌아온 불사의 존재입니다."
    },
    {
      id: "demonkin",
      name: "마족",
      description: "강한 마력과 이질적인 신체를 지닌 종족입니다."
    }
  ],

  genders: [
    { id: "male", name: "남자" },
    { id: "female", name: "여자" }
  ],

  personalities: [
    {
      id: "righteous",
      name: "정의로운",
      description: "불의를 참지 못하고 약자를 돕습니다."
    },
    {
      id: "aggressive",
      name: "과격한",
      description: "갈등을 힘으로 해결하려는 경향이 강합니다."
    },
    {
      id: "speciesist",
      name: "종족차별주의자",
      description: "특정 종족을 열등하게 여기거나 배척합니다."
    },
    {
      id: "orc_supremacist",
      name: "오크우월주의자",
      description: "오크가 다른 종족보다 우월하다고 믿습니다."
    },
    {
      id: "anarchist",
      name: "아나키스트",
      description: "국가, 길드, 권위와 규율을 거부합니다."
    },
    {
      id: "purist",
      name: "순혈주의자",
      description: "혼혈과 타 종족 문화를 부정적으로 봅니다."
    },
    {
      id: "alcohol_dependent",
      name: "알코올 의존증",
      description: "술이 없으면 불안정해지고 판단력이 흐려집니다."
    },
    {
      id: "drug_dependent",
      name: "약물 의존증",
      description: "특정 약물에 의존하며 금단 증상을 겪습니다."
    },
    {
      id: "greedy",
      name: "탐욕스러운",
      description: "보상과 재물을 무엇보다 중요하게 여깁니다."
    },
    {
      id: "cowardly",
      name: "겁많은",
      description: "위험한 상황에서 위축되거나 도망치려 합니다."
    },
    {
      id: "cynical",
      name: "냉소적인",
      description: "타인의 선의와 명예를 쉽게 믿지 않습니다."
    },
    {
      id: "loyal",
      name: "충성스러운",
      description: "길드와 동료를 위해 자신을 희생할 수 있습니다."
    },
    {
      id: "sadistic",
      name: "가학적인",
      description: "타인이 고통받거나 두려워하는 모습을 즐깁니다."
    },
    {
      id: "masochistic",
      name: "피학적인",
      description: "위험과 고통을 견디는 상황에서 만족을 느낍니다."
    },
    {
      id: "kleptomaniac",
      name: "도벽이 있는",
      description: "가치와 상관없이 남의 물건을 충동적으로 훔칩니다."
    },
    {
      id: "compulsive_gambler",
      name: "도박 중독자",
      description: "돈이나 목숨이 걸린 위험한 내기를 거부하지 못합니다."
    },
    {
      id: "cult_fanatic",
      name: "사이비 광신도",
      description: "정체불명의 신이나 교단의 가르침을 맹목적으로 따릅니다."
    },
    {
      id: "necrophile",
      name: "네크로필리아",
      description: "시체에 성적 집착을 보이는 왜곡된 성향입니다."
    },
    {
      id: "cannibalistic",
      name: "식인 성향",
      description: "지성체의 살을 먹는 행위를 욕망이나 의식으로 여깁니다."
    },
    {
      id: "misogynistic",
      name: "여성혐오자",
      description: "여성을 열등하게 여기거나 적대적으로 대합니다."
    },
    {
      id: "misandrist",
      name: "남성혐오자",
      description: "남성을 불신하고 열등하게 여기거나 적대적으로 대합니다."
    },
    {
      id: "narcissistic",
      name: "자기애가 강한",
      description: "자신이 특별하고 우월하다고 믿으며 타인의 희생을 당연시합니다."
    },
    {
      id: "paranoid",
      name: "피해망상적인",
      description: "동료가 자신을 배신하거나 해치려 한다고 끊임없이 의심합니다."
    },
    {
      id: "death_seeker",
      name: "죽음을 갈망하는",
      description: "자신의 목숨을 가볍게 여기며 치명적인 위험에 뛰어듭니다."
    }
  ],

  items: {
    rope: {
      name: "밧줄",
      icon: "🪢",
      price: 30,
      description: "주사위를 확인한 뒤 파티 전체를 한 번 다시 굴립니다."
    },
    bandage: {
      name: "붕대",
      icon: "🩹",
      price: 20,
      description: "주사위를 굴리기 전에 부상 캐릭터 1명을 치료합니다."
    },
    lockpick: {
      name: "락픽",
      icon: "🗝️",
      price: 50,
      description: "생환하여 던전을 완료하면 누적 골드 보상이 50% 증가합니다."
    }
  },

  difficulties: {
    easy: {
      key: "easy",
      name: "이지",
      rangeSize: 9,
      rewardMultiplier: 1,
      description: "성공 범위 9칸 · 보상 100%"
    },
    normal: {
      key: "normal",
      name: "노멀",
      rangeSize: 7,
      rewardMultiplier: 1.3,
      description: "성공 범위 7칸 · 보상 130%"
    },
    hard: {
      key: "hard",
      name: "하드",
      rangeSize: 5,
      rewardMultiplier: 1.7,
      description: "성공 범위 5칸 · 보상 170%"
    }
  },

  encounterNames: [
    "무너지는 철문",
    "괴수의 돌진",
    "봉인석 파괴",
    "용암 협곡 도약",
    "거인의 쇠사슬",
    "침수된 수문",
    "잠든 감시자",
    "낡은 유리 다리",
    "독가스 회랑",
    "그림자 숲 잠입",
    "폭주하는 마력핵",
    "메아리 금지 구역"
  ]
};
'''

db_path.write_text(db_code, encoding="utf-8")

# -------------------------------------------------------------------
# index.html modifications
# -------------------------------------------------------------------
html = source

# Add external DB script before the main game script.
script_anchor = '''  <script>
    (() => {
      "use strict";'''
script_replacement = '''  <script src="./game-db.js"></script>
  <script>
    (() => {
      "use strict";'''
if script_anchor not in html:
    raise RuntimeError("Main script anchor was not found.")
html = html.replace(script_anchor, script_replacement, 1)

# Increase card height and add profile/personality styling.
html = html.replace("min-height: 158px;", "min-height: 196px;", 1)

css_anchor = '''    .char-job {
      color: var(--muted);
      font-size: .82rem;
    }

    .char-stats {'''
css_replacement = '''    .char-job {
      color: var(--muted);
      font-size: .82rem;
    }

    .char-profile {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 8px;
    }

    .profile-chip {
      display: inline-flex;
      align-items: center;
      min-height: 23px;
      padding: 3px 7px;
      border-radius: 999px;
      color: #d6cde0;
      background: rgba(255,255,255,.055);
      border: 1px solid rgba(255,255,255,.075);
      font-size: .69rem;
      font-weight: 750;
    }

    .char-personality {
      margin-top: 8px;
      color: #dcb8ef;
      font-size: .75rem;
      line-height: 1.45;
    }

    .char-personality strong {
      color: #f2dcff;
    }

    .char-stats {'''
if css_anchor not in html:
    raise RuntimeError("Character CSS anchor was not found.")
html = html.replace(css_anchor, css_replacement, 1)

html = html.replace(
    '''    .slot span { color: var(--muted); font-size: .72rem; }''',
    '''    .slot span { display: block; color: var(--muted); font-size: .72rem; line-height: 1.45; }''',
    1
)

# Replace internal fixed-data constants with aliases to GAME_DB.
constants_pattern = re.compile(
    r'''      const STORAGE_KEY = "dicebound-expedition-v1";\n'''
    r'''      const SAVE_VERSION = 4;\n'''
    r'''      const GACHA_COST = 10;\n\n'''
    r'''      const DIFFICULTIES = \{.*?\n'''
    r'''      const ENCOUNTER_NAMES = \[.*?\n'''
    r'''      \];''',
    re.S
)

constants_replacement = '''      const STORAGE_KEY = "dicebound-expedition-v1";
      const SAVE_VERSION = 5;

      const GAME_DB = globalThis.GAME_DB;
      const requiredLists = [
        "firstNames",
        "lastNames",
        "jobs",
        "races",
        "genders",
        "personalities",
        "encounterNames"
      ];

      const invalidDatabase = !GAME_DB
        || requiredLists.some(key => !Array.isArray(GAME_DB[key]) || GAME_DB[key].length === 0)
        || !GAME_DB.items
        || !GAME_DB.difficulties;

      if (invalidDatabase) {
        document.body.innerHTML = `
          <main class="app-shell">
            <section class="panel" style="margin-top:24px">
              <h1 style="margin-top:0">게임 데이터 파일을 불러오지 못했습니다.</h1>
              <p class="panel-subtitle">
                <strong>game-db.js</strong> 파일이 index.html과 같은 폴더에 있는지 확인해 주세요.
                GitHub의 파일명과 대소문자도 정확히 같아야 합니다.
              </p>
            </section>
          </main>
        `;
        console.error("GAME_DB가 없거나 필수 데이터가 비어 있습니다.");
        return;
      }

      const GACHA_COST = Number(GAME_DB.settings?.gachaCost) || 10;
      const STARTING_GOLD = Number(GAME_DB.settings?.startingGold) || 300;
      const DIFFICULTIES = GAME_DB.difficulties;
      const ITEM_DEFS = GAME_DB.items;
      const ENCOUNTER_NAMES = GAME_DB.encounterNames;'''

html, replaced_count = constants_pattern.subn(constants_replacement, html, count=1)
if replaced_count != 1:
    raise RuntimeError(f"Fixed data constants replacement failed: {replaced_count}")

# Default gold comes from DB settings.
html = html.replace("          gold: 300,", "          gold: STARTING_GOLD,", 1)
html = html.replace(
    "merged.gold = Number.isFinite(Number(merged.gold)) ? Number(merged.gold) : 300;",
    "merged.gold = Number.isFinite(Number(merged.gold)) ? Number(merged.gold) : STARTING_GOLD;",
    1
)

# Replace character migration block.
old_migration_pattern = re.compile(
    r'''          merged\.characters = merged\.characters\.map\(character => \(\{\n'''
    r'''            \.\.\.character,\n'''
    r'''            alive: character\.alive !== false,\n'''
    r'''            injured: Boolean\(character\.injured\),\n'''
    r'''            trauma: Boolean\(character\.trauma\),\n'''
    r'''            successCount: Number\.isFinite\(Number\(character\.successCount\)\)\n'''
    r'''              \? Number\(character\.successCount\)\n'''
    r'''              : 0\n'''
    r'''          \}\)\);'''
)

new_migration = '''          merged.characters = merged.characters.map(character => {
            const firstName = findDbEntry(GAME_DB.firstNames, character.firstNameId);
            const lastName = findDbEntry(GAME_DB.lastNames, character.lastNameId);
            const matchedJob = findDbEntry(GAME_DB.jobs, character.jobId)
              || GAME_DB.jobs.find(job => job.name === character.job);
            const race = findDbEntry(GAME_DB.races, character.raceId);
            const gender = findDbEntry(GAME_DB.genders, character.genderId);
            const personality = findDbEntry(GAME_DB.personalities, character.personalityId);

            return {
              ...character,
              firstNameId: firstName?.id || null,
              lastNameId: lastName?.id || null,
              legacyName: character.legacyName
                || (!(firstName && lastName) ? (character.name || null) : null),
              jobId: matchedJob?.id || null,
              legacyJobName: character.legacyJobName
                || (!matchedJob ? (character.job || null) : null),
              legacyJobIcon: character.legacyJobIcon
                || (!matchedJob ? (character.icon || "🧭") : null),
              raceId: race?.id || pick(GAME_DB.races).id,
              genderId: gender?.id || pick(GAME_DB.genders).id,
              personalityId: personality?.id || pick(GAME_DB.personalities).id,
              alive: character.alive !== false,
              injured: Boolean(character.injured),
              trauma: Boolean(character.trauma),
              successCount: Number.isFinite(Number(character.successCount))
                ? Number(character.successCount)
                : 0
            };
          });'''

html, migrated_count = old_migration_pattern.subn(new_migration, html, count=1)
if migrated_count != 1:
    raise RuntimeError(f"Character migration replacement failed: {migrated_count}")

# Insert DB/profile helper functions after pick().
pick_anchor = '''      function pick(list) {
        return list[randomInt(0, list.length - 1)];
      }

      function clamp(value, min, max) {'''
pick_replacement = '''      function pick(list) {
        return list[randomInt(0, list.length - 1)];
      }

      function findDbEntry(list, id) {
        if (!id || !Array.isArray(list)) return null;
        return list.find(entry => entry.id === id) || null;
      }

      function getCharacterName(character) {
        if (character.legacyName) return character.legacyName;

        const firstName = findDbEntry(GAME_DB.firstNames, character.firstNameId);
        const lastName = findDbEntry(GAME_DB.lastNames, character.lastNameId);
        const fullName = [firstName?.name, lastName?.name].filter(Boolean).join(" ");

        return fullName || character.name || "이름 없는 모험가";
      }

      function getCharacterJob(character) {
        const job = findDbEntry(GAME_DB.jobs, character.jobId);

        return job || {
          id: null,
          name: character.legacyJobName || character.job || "무직",
          icon: character.legacyJobIcon || character.icon || "🧭",
          description: "이전 버전에서 모집된 모험가의 직업입니다."
        };
      }

      function getCharacterProfile(character) {
        return {
          name: getCharacterName(character),
          job: getCharacterJob(character),
          race: findDbEntry(GAME_DB.races, character.raceId)
            || { id: null, name: "미상", description: "" },
          gender: findDbEntry(GAME_DB.genders, character.genderId)
            || { id: null, name: "미상" },
          personality: findDbEntry(GAME_DB.personalities, character.personalityId)
            || { id: null, name: "성격 미상", description: "" }
        };
      }

      function escapeHtml(value) {
        return String(value)
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#039;");
      }

      function clamp(value, min, max) {'''
if pick_anchor not in html:
    raise RuntimeError("pick() helper anchor was not found.")
html = html.replace(pick_anchor, pick_replacement, 1)

# Replace createCharacter().
create_pattern = re.compile(
    r'''      function createCharacter\(\) \{\n'''
    r'''        const job = pick\(JOBS\);\n'''
    r'''        return \{\n'''
    r'''          id: uid\(\),\n'''
    r'''          name: pick\(NAMES\),\n'''
    r'''          job: job\.name,\n'''
    r'''          icon: job\.icon,\n'''
    r'''          alive: true,\n'''
    r'''          injured: false,\n'''
    r'''          trauma: false,\n'''
    r'''          successCount: 0\n'''
    r'''        \};\n'''
    r'''      \}'''
)

create_replacement = '''      function createCharacter() {
        return {
          id: uid(),
          firstNameId: pick(GAME_DB.firstNames).id,
          lastNameId: pick(GAME_DB.lastNames).id,
          jobId: pick(GAME_DB.jobs).id,
          raceId: pick(GAME_DB.races).id,
          genderId: pick(GAME_DB.genders).id,
          personalityId: pick(GAME_DB.personalities).id,
          alive: true,
          injured: false,
          trauma: false,
          successCount: 0
        };
      }'''

html, create_count = create_pattern.subn(create_replacement, html, count=1)
if create_count != 1:
    raise RuntimeError(f"createCharacter replacement failed: {create_count}")

# Character-name/job/icon references in game logic.
logic_replacements = {
    'newcomers.map(c => c.name).join(", ")': 'newcomers.map(getCharacterName).join(", ")',
    'members.map(c => c.name).join(", ")': 'members.map(getCharacterName).join(", ")',
    'name: character.name,': 'name: getCharacterName(character),',
    'addLog(`붕대 1개를 사용해 ${character.name}의 부상을 치료했습니다.`);':
        'addLog(`붕대 1개를 사용해 ${getCharacterName(character)}의 부상을 치료했습니다.`);'
}
for old, new in logic_replacements.items():
    if old not in html:
        raise RuntimeError(f"Logic reference not found: {old}")
    html = html.replace(old, new)

# Replace roster rendering body.
roster_start = html.index("      function renderRoster() {")
roster_end = html.index("\n      function renderParty() {", roster_start)

new_roster_function = r'''      function renderRoster() {
        const living = state.characters.filter(c => c.alive);
        if (!living.length) {
          els.roster.innerHTML = '<div class="empty">아직 모험가가 없습니다.<br>10골드 가챠로 첫 파티를 모아보세요.</div>';
          return;
        }

        els.roster.innerHTML = living.map(character => {
          const selected = state.partyIds.includes(character.id);
          const profile = getCharacterProfile(character);
          const safeName = escapeHtml(profile.name);
          const safeJob = escapeHtml(profile.job.name);
          const safeRace = escapeHtml(profile.race.name);
          const safeGender = escapeHtml(profile.gender.name);
          const safePersonality = escapeHtml(profile.personality.name);
          const safePersonalityDescription = escapeHtml(profile.personality.description || "");

          const statusParts = [];
          if (character.trauma) {
            statusParts.push('<span class="status-badge trauma">🧠 트라우마</span>');
          }
          if (character.injured) {
            statusParts.push('<span class="status-badge injury">🩹 부상</span>');
          }
          if (!statusParts.length) {
            statusParts.push('<span class="status-badge">정상</span>');
          }
          const status = `<span class="status-stack">${statusParts.join("")}</span>`;

          return `
            <article class="character ${selected ? "selected" : ""} ${character.injured ? "injured" : ""}"
              data-character-id="${character.id}" role="button" tabindex="0"
              aria-label="${safeName} 파티 편성">
              <div class="char-top">
                <div class="avatar">${profile.job.icon}</div>
                <span class="party-badge ${selected ? "on" : ""}">${selected ? "파티" : "대기"}</span>
              </div>
              <div class="char-name">${safeName}</div>
              <div class="char-job">${safeJob}</div>
              <div class="char-profile">
                <span class="profile-chip">${safeGender}</span>
                <span class="profile-chip">${safeRace}</span>
              </div>
              <div class="char-personality" title="${safePersonalityDescription}">
                성격 · <strong>${safePersonality}</strong>
              </div>
              <div class="char-stats">
                <span class="die-label">D6 🎲 · 모험 성공 ${character.successCount || 0}회</span>
                ${status}
              </div>
            </article>
          `;
        }).join("");

        els.roster.querySelectorAll("[data-character-id]").forEach(card => {
          card.addEventListener("click", () => toggleParty(card.dataset.characterId));
          card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggleParty(card.dataset.characterId);
            }
          });
        });
      }
'''

html = html[:roster_start] + new_roster_function + html[roster_end:]

# Replace party rendering.
party_start = html.index("      function renderParty() {")
party_end = html.index("\n      function renderItems() {", party_start)

new_party_function = r'''      function renderParty() {
        const slots = Array.from({ length: 4 }, (_, index) => {
          const id = state.partyIds[index];
          const character = id ? state.characters.find(c => c.id === id && c.alive) : null;

          if (!character) {
            return `<div class="slot"><div><div class="slot-avatar">＋</div><span>빈 자리</span></div></div>`;
          }

          const profile = getCharacterProfile(character);

          return `
            <div class="slot filled">
              <div>
                <div class="slot-avatar">${profile.job.icon}</div>
                <strong>${escapeHtml(profile.name)}</strong>
                <span>${escapeHtml(profile.gender.name)} · ${escapeHtml(profile.race.name)} · ${escapeHtml(profile.job.name)}</span>
                <span>성격 ${escapeHtml(profile.personality.name)}</span>
                <span>${character.trauma ? "트라우마" : "정상"}${character.injured ? " · 부상 D6±2" : " · D6"} · 모험 성공 ${character.successCount || 0}회</span>
              </div>
            </div>
          `;
        });

        els.partySlots.innerHTML = slots.join("");
      }
'''

html = html[:party_start] + new_party_function + html[party_end:]

# Graveyard rendering with full profile.
old_graveyard = '''        els.graveyard.innerHTML = dead.length
          ? dead.map(c => `<span class="grave">🪦 ${c.name} · ${c.job} · 모험 성공 ${c.successCount || 0}회${c.trauma ? " · 트라우마" : ""}</span>`).join("")
          : '<span class="panel-subtitle">아직 기록된 사망자가 없습니다.</span>';'''

new_graveyard = '''        els.graveyard.innerHTML = dead.length
          ? dead.map(character => {
              const profile = getCharacterProfile(character);
              return `<span class="grave">🪦 ${escapeHtml(profile.name)} · ${escapeHtml(profile.gender.name)} ${escapeHtml(profile.race.name)} ${escapeHtml(profile.job.name)} · 성격 ${escapeHtml(profile.personality.name)} · 모험 성공 ${character.successCount || 0}회${character.trauma ? " · 트라우마" : ""}</span>`;
            }).join("")
          : '<span class="panel-subtitle">아직 기록된 사망자가 없습니다.</span>';'''

if old_graveyard not in html:
    raise RuntimeError("Graveyard rendering block was not found.")
html = html.replace(old_graveyard, new_graveyard, 1)

# Bandage target list uses profile helpers.
old_bandage = '''${injured.map(c => `<button data-bandage-target="${c.id}">${c.icon} ${c.name} 치료</button>`).join("")}'''
new_bandage = '''${injured.map(character => {
                  const profile = getCharacterProfile(character);
                  return `<button data-bandage-target="${character.id}">${profile.job.icon} ${escapeHtml(profile.name)} 치료</button>`;
                }).join("")}'''
if old_bandage not in html:
    raise RuntimeError("Bandage target rendering was not found.")
html = html.replace(old_bandage, new_bandage, 1)

# Reset text and log use the configured starting gold.
html = html.replace(
    "골드, 모험가, 묘지, 아이템, 파티, 디버프, 성공 횟수와 기록이 모두 삭제되며 300G로 다시 시작합니다.",
    "골드, 모험가, 묘지, 아이템, 파티, 디버프, 성공 횟수와 기록이 모두 삭제되며 시작 골드로 다시 시작합니다.",
    1
)
html = html.replace(
    'addLog("전체 게임 데이터를 초기화했습니다. 길드 자금 300G로 새 게임을 시작합니다.");',
    'addLog(`전체 게임 데이터를 초기화했습니다. 길드 자금 ${STARTING_GOLD}G로 새 게임을 시작합니다.`);',
    1
)

# Save final HTML.
index_path.write_text(html, encoding="utf-8")

print(f"Created: {index_path}")
print(f"Created: {db_path}")
print(f"index.html: {index_path.stat().st_size:,} bytes")
print(f"game-db.js: {db_path.stat().st_size:,} bytes")