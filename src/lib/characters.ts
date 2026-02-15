import { Character } from '@/types';

export const CHARACTERS: Character[] = [
  {
    id: 'knight',
    name: 'Knight',
    class: 'Knight',
    hp: 125,
    atk: 15,
    mana: 40,
    speed: 20,
    strengthUtility: 'Defensive Tank',
    shortDescription: 'Heavy armor specialist focusing on defense and protecting allies.',
    primaryStatBuff: '+5 Defense Boost',
    skills: [
      { name: 'Shield Bash', description: '20 Mana. Roll 9+ → moderate damage + stun 1 turn' },
      { name: 'Fortified Strike', description: '16 Mana. Deals moderate damage and the Knight takes 20% less damage.' },
      { name: 'Ultimate — Iron Fortress', description: '60 Mana. Roll 14+ → -75% damage taken for one turn + taunt all enemies' }
    ],
    spriteUrl: '/assets/knight.png'
  },
  {
    id: 'archer',
    name: 'Archer',
    class: 'Archer',
    hp: 105,
    atk: 22,
    mana: 50,
    speed: 26,
    strengthUtility: 'Mobile Ranged DPS',
    shortDescription: 'Swift marksman with deadly accuracy. Rain arrows from a distance.',
    primaryStatBuff: '+10 Speed Boost',
    skills: [
      { name: 'Rapid Fire', description: '20 Mana. Roll 8+ → two light hits' },
      { name: 'Pinning Arrow', description: '25 Mana. Roll 10+ → moderate damage + −5 speed' },
      { name: 'Ultimate — Tempest Volley', description: '60 Mana. Roll 11+ → damage all enemies + −3 speed' }
    ],
    spriteUrl: '/assets/archer.png'
  },
  {
    id: 'wizard',
    name: 'Wizard',
    class: 'Wizard',
    hp: 110,
    atk: 20,
    mana: 70,
    speed: 22,
    strengthUtility: 'AoE Controller',
    shortDescription: 'Master of arcane arts dealing massive area damage and controlling the battlefield.',
    primaryStatBuff: '+8 Magic Boost',
    skills: [
      { name: 'Fireball', description: '20 Mana. Roll 7+ → moderate damage, Roll 15+ hits all enemies' },
      { name: 'Arcane Barrier', description: '35 Mana. Auto → −30% damage taken by party for 2 turns' },
      { name: 'Ultimate — Falling Star Cataclysm', description: '80 Mana. 1-turn channel, then Roll 14+ → very high AoE damage' }
    ],
    spriteUrl: '/assets/wizard.png'
  },
  {
    id: 'assassin',
    name: 'Assassin',
    class: 'Assassin',
    hp: 100,
    atk: 25,
    mana: 40,
    speed: 24,
    strengthUtility: 'Burst Risk Dealer',
    shortDescription: 'Strikes from the shadows with lethal precision and high risk.',
    primaryStatBuff: '+12 Crit Boost',
    skills: [
      { name: 'Shadow Strike', description: '25 Mana. Roll 10+ → high damage + poison (5 dmg ×2 turns)' },
      { name: 'Backstab', description: '35 Mana. Roll 13+ → very high damage if target does not attack Assassin' },
      { name: 'Ultimate — Execution Mark', description: '60 Mana. Roll 16+ → deal 45% of target’s max HP as true damage' }
    ],
    spriteUrl: '/assets/assassin.png'
  },
  {
    id: 'bard',
    name: 'Bard',
    class: 'Bard',
    hp: 110,
    atk: 18,
    mana: 60,
    speed: 22,
    strengthUtility: 'Support & Control',
    shortDescription: 'Enhances allies with melodies and disrupts enemies with discordant notes.',
    primaryStatBuff: '+10 Support Boost',
    skills: [
      { name: 'Healing Melody', description: '25 Mana. Roll 7+ → heal ally or self for 25% HP' },
      { name: 'Harmonic Shield', description: '25 Mana. Auto → block next damage instance' },
      { name: 'Ultimate — Requiem of Return', description: '60 Mana. Roll 14+ → revive ally at 30% HP' }
    ],
    spriteUrl: '/assets/bard.png',
    levelStats: [
      { level: 1, hp: 110, atk: 18, speed: 22, mana: 60 },
      { level: 2, hp: 123, atk: 20, speed: 24, mana: 70 },
      { level: 3, hp: 136, atk: 22, speed: 26, mana: 80 },
      { level: 4, hp: 149, atk: 24, speed: 28, mana: 90 },
      { level: 5, hp: 162, atk: 26, speed: 30, mana: 105 },
      { level: 6, hp: 175, atk: 28, speed: 32, mana: 120 }
    ]
  }
];
