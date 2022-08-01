const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
      { name: '마왕', hp: 150, att: 35, xp: 50 },
    ];
    this.start(name);
  }
  start(name) {
    $gameMenu.addEventListener('submit', this.onGameMenuInput);
    $battleMenu.addEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }
  changeScreen(screen) {
    $startScreen.style.display = 'none';
    $gameMenu.style.display = 'none';
    $battleMenu.style.display = 'none';
    if (screen === 'start') {
      $startScreen.style.display = 'block';
    } else if (screen === 'game') {
      $gameMenu.style.display = 'block';
    } else if (screen === 'battle') {
      $battleMenu.style.display = 'block';
    }
  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    if (input === '1') { // 모험
      this.changeScreen('battle');
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp
      );
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
    } else if (input === '2') { // 휴식
      const { hero } = this;
      hero.hp = hero.maxHp;
      this.updateHeroStat();
      this.showMessage(`휴식을 하여 HP가 회복되었습니다.`);
    } else if (input === '3') { // 종료
      this.quit();
    }
    event.target['menu-input'].value = '';
  }
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if (input === '1') { // 공격
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp === 0) {
        alert(`You Died! 다시 시작하세요.`);
        this.quit();
      } else if (monster.hp === 0) {
        this.showMessage(`${monster.name}(을/를) 잡았습니다! ${monster.xp}(을/를) 얻었습니다!`);
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen('game');
      } else {
        this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`);
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === '2') { // 회복
      const { hero, monster } = this;
      hero.hp = Math.min(hero.maxHp, hero.hp + 20);
      hero.hp -= monster.att;
      this.updateHeroStat();
      this.showMessage(
        '전투 중 휴식을 취하여 20체력을 회복하고, ' +
        `${monster.att}의 데미지를 받았습니다.`
      );
    } else if (input === '3') { // 도망
      this.monster = null;
      this.updateMonsterStat();
      this.changeScreen('game');
      this.showMessage(`무사히 ${this.monster.name}에게서 도망쳤습니다!`);
    }
    event.target['battle-input'].value = '';
  }
  updateHeroStat() {
    const { hero } = this;
    if (hero === null) {
      $heroName.textContent = '';
      $heroLevel.textContent = '';
      $heroHp.textContent = '';
      $heroXp.textContent = '';
      $heroAtt.textContent = '';
      return ;
    }
    $heroName.textContent = hero.name;
    $heroLevel.textContent = `${hero.lev}Lev`;
    $heroHp.textContent = `HP : ${hero.hp}/${hero.maxHp}`;
    $heroXp.textContent = `XP : ${hero.xp}/${hero.lev * 15}`;
    $heroAtt.textContent = `ATT : ${hero.att}`;
  }
  updateMonsterStat() {
    const { monster } = this;
    if (monster === null) {
      $monsterName.textContent = '';
      $monsterHp.textContent = '';
      $monsterAtt.textContent = '';
      return ;
    }
    $monsterName.textContent = monster.name;
    $monsterHp.textContent = `HP : ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.textContent = `ATT : ${monster.att}`;
  }
  showMessage(message) {
    $message.textContent = message;
  }
  quit() {
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $message.textContent = '';
    $gameMenu.removeEventListener('submit', this.onGameMenuInput);
    $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
    this.changeScreen('start');
    game = null;
  }
}
class Unit {
  constructor(game, name, hp, att, xp) {
    this.game = game;
    this.name = name;
    this.hp = hp;
    this.maxHp = hp;
    this.att = att;
    this.xp = xp;
  }
  attack(target) {
    target.hp = Math.max(0, target.hp - this.att);
  }
}
class Hero extends Unit {
  constructor(game, name) {
    super(game, name, 100, 10, 0);
    this.lev = 1;
  }
  heal(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  }
  getXp(monsterXp) {
    this.xp += monsterXp;
    if (this.xp >= this.lev * 15) {
      this.xp -= this.lev * 15;
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨업! 레벨 ${this.lev}`);
    }
  }
}
class Monster extends Unit {
  constructor(game, name, hp, att, xp) {
    super(game, name, hp, att, xp);
  }
}

let game = null;
$startScreen.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = event.target['name-input'].value;
  game = new Game(name);
})