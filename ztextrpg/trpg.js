const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
const $monsterStat = document.querySelector('#monster-stat');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');

class Hero{
    constructor(name, level, hp, xp, att){
        this.name = name;
        this.level = level;
        this.hp = hp;
        this.xp = xp;
        this.att = att;
        this.maxHP = hp;
        this.maxXp = this.level * 15;
    }
    levelUP(){
        this.level = this.level + 1;
        this.maxHP = this.maxHP + 25;
        this.att = this.att + 15;
        this.hp = this.maxHP;
        this.maxXp = this.level * 15;
    }
}

let FirstHero;

$startScreen.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = document.querySelector('#name-input');
    $startScreen.style.display = 'none';
    $gameMenu.style.display = 'block';
    let heroName = name.value;
    FirstHero = new Hero(`${heroName}`, 1, 100, 0, 20);
    $heroName.textContent = `이름: ${FirstHero.name}`;
    $heroLevel.textContent = `레벨: ${FirstHero.level}`;
    $heroHp.textContent = `HP: ${FirstHero.hp} / ${FirstHero.maxHP}`;
    $heroXp.textContent = `경험치: ${FirstHero.xp} / ${FirstHero.maxXp}`;
    $heroAtt.textContent = `공격력: ${FirstHero.att}`;
});

class Monster{
    constructor(name, hp, att, xp){
        this.name = name;
        this.hp = hp;
        this.att = att;
        this.xp = xp;
        this.maxHP = hp;
    }
}

let monsterList = [
    {name: '슬라임', hp: 25, att: 10, xp: 15},
    {name: '스켈레톤', hp: 50, att: 20, xp: 25},
    {name: '마왕', hp: 250, att: 50, xp: 100},
];

let FirstMonster;

$gameMenu.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.target['menu-input'].value;
    if(input === '1'){ //모험 -> 몬스터를 만남
        $gameMenu.style.display = 'none';
        $battleMenu.style.display = 'block';
        $monsterStat.style.display = 'block';
        let monsterCopy = monsterList[Math.floor(Math.random() * monsterList.length)];
        FirstMonster = new Monster(monsterCopy.name, monsterCopy.hp, monsterCopy. att, monsterCopy.xp); //나만의 깊은 복사 ㅋㅋ
        $monsterName.textContent = `이름: ${FirstMonster.name}`;
        $monsterHp.textContent = `HP: ${FirstMonster.hp} / ${FirstMonster.maxHP}`;
        $monsterAtt.textContent = `공격력: ${FirstMonster.att}`;
        $message.textContent = '몬스터를 만났습니다!';
    }else if(input === '2'){//휴식 -> hp를 모두 회복함
        FirstHero.hp = FirstHero.maxHP;
        $heroHp.textContent = $heroHp.textContent = `HP: ${FirstHero.hp} / ${FirstHero.maxHP}`;
        $message.textContent = '휴식을 취해서 체력을 모두 회복했다!';
    }else if(input === '3'){//종료 -> 게임을 종료함?

    }else{
        alert('1, 2, 3만 입력해주세요.');
        return;
    }
});

$battleMenu.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = event.target['battle-input'].value;
    if(input === '1'){ //공격 -> 내 공격력 만큼 상대 hp를 깎고, 내 hp를 상대 공격력 만큼 깎는다.
        FirstMonster.hp = FirstMonster.hp - FirstHero.att;
        FirstHero.hp = FirstHero.hp - FirstMonster.att;
        $monsterHp.textContent = `HP: ${FirstMonster.hp} / ${FirstMonster.maxHP}`;
        $heroHp.textContent = `HP: ${FirstHero.hp} / ${FirstHero.maxHP}`;
        $message.textContent = '모험가가 공격하자, 몬스터도 반격을 했다!';
        if(FirstHero.hp <= 0){
            $battleMenu.style.display = 'none';
            $monsterStat.style.display = 'none';
            $message.textContent = '모험가가 죽었습니다. 게임이 끝났습니다.';
        }
        if(FirstMonster.hp <= 0){
            $gameMenu.style.display = 'block';
            $battleMenu.style.display = 'none';
            $monsterStat.style.display = 'none';
            $message.textContent = `${FirstMonster.name}을 처치하고, ${FirstMonster.xp} 만큼의 경험치를 얻었습니다!`;
            FirstHero.xp = FirstHero.xp + FirstMonster.xp;
            $heroXp.textContent = `경험치: ${FirstHero.xp} / ${FirstHero.maxXp}`;
        }
        if(FirstHero.xp >= FirstHero.maxXp){
            let RestXp = FirstHero.xp - FirstHero.maxXp;
            FirstHero.xp = RestXp;
            FirstHero.levelUP();
            $heroLevel.textContent = `레벨: ${FirstHero.level}`;
            $heroHp.textContent = `HP: ${FirstHero.hp} / ${FirstHero.maxHP}`;
            $heroXp.textContent = `경험치: ${FirstHero.xp} / ${FirstHero.maxXp}`;
            $heroAtt.textContent = `공격력: ${FirstHero.att}`;
        }
    }else if(input === '2'){ //회복 -> 내 hp를 반 회복한다.
        FirstHero.hp =FirstHero.hp + (FirstHero.maxHP / 2);
    }else if(input === '3'){ //도망 -> 게임메뉴 페이지로 간다.
        $gameMenu.style.display = 'block';
        $battleMenu.style.display = 'none';
        $monsterStat.style.display = 'none';
    }else{
        alert('1, 2, 3만 입력해주세요.');
        return;
    }
});