/*
  길드 마스터 시뮬레이터 - 게임 기본 데이터

  이 파일은 index.html과 같은 폴더에 두어야 합니다.

  플레이어의 골드, 보유 캐릭터, 아이템 등의 세이브 데이터는
  이 파일이 아니라 브라우저 localStorage에 저장됩니다.
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
    {
      id: "male",
      name: "남자"
    },
    {
      id: "female",
      name: "여자"
    }
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
