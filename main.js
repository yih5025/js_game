const $body = document.querySelector('body');
const $startScreen = document.querySelector('#start-screen');
const $storyScreen = document.querySelector('#story-screen');
const $gameMenu = document.querySelector('#game-menu');
const $battleMenu = document.querySelector('#battle-menu');
const $attackMenu = document.querySelector('#attack-menu');
const $itemMenu = document.querySelector('#item-menu');
const $heroImage = document.querySelector('#hero-img');
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
const $heroMuscle = document.querySelector('#hero-muscle');
const $heroFat = document.querySelector('#hero-fat');
const $heroKg = document.querySelector('#hero-kg');
const $heroHeight = document.querySelector('#hero-height');
const $monsterImage = document.querySelector('#monster-img');
const $monsterStat = document.querySelector('#monster-stat');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');
const $menuInterface = document.querySelector('#menu-interface');
const $heroBattleInterface = document.querySelector('#hero-battle-interface');
const $monsterBattleInterface = document.querySelector('#monster-battle-interface');
const $skillEffect = document.querySelector('#skill-effect');
const $heroAttackSkill = document.querySelectorAll('.hero-attack-skill');
const $skillEffectBeam1 = document.querySelector('#skill-effect-beam1');
const $openingMusic = document.querySelector('#openingMusic');

class Game{
    constructor(){  //처음 게임 시작 클래스 생성
        this.monster = null; 
        this.hero = null;
        this.monsterList = [ //몬스터 리스트
            { name: '작은악마', hp: 25, att: 10, xp: 10 },
            { name: '그린작은악마', hp: 30, att: 12, xp: 13 },
            { name: '블랙작은악마', hp: 35, att: 14, xp: 16 },
            { name: '오크', hp: 40, att: 18, xp: 20 },
            { name: '해골오크', hp: 45, att: 20, xp: 24 },
            { name: '눈골렘', hp: 50, att: 25, xp: 28 },
            { name: '왕골렘', hp: 55, att: 27, xp: 32 },
            { name: '비행도마뱀', hp: 40, att: 40, xp: 36 },
            { name: '푸른비행도마뱀', hp: 45, att: 44, xp: 40 },
            { name: '고트데빌', hp: 250, att: 60, xp: 100},
        ];
        this.startStory();
    }
    startStory(){
        this.changeScreen('start');
        $startScreen.addEventListener('submit', (event) => { //처음 시작 시 캐릭터 이름 입력
            event.preventDefault(); // 이벤트 무시하고
            const name = event.target['name-input'].value; //캐릭터 이름 인풋 네임 변수에 저장
            this.startGame(name); //몬스터 리스트 생성 후 게임 시작 이름 입력 한 값 전해 줌
        });
    }
    startGame(name){  // 처음 시작 시 함수
        $gameMenu.addEventListener('submit', this.onGameMenuInput); // 게임 메뉴 이벤트 리스너 활성화
        $battleMenu.addEventListener('submit', this.onBattleMenuInput); // 배틀 메뉴 이벤트 리스너 활성화
        $attackMenu.addEventListener('submit', this.onAttackMenuInput); // 공격 메뉴 이벤트 리스너 활성화 
        $itemMenu.addEventListener('submit', this.onItemMenuInput);// 아이템 메뉴 이벤트 리스너 활성화
        this.changeScreen('game'); // 게임 메뉴로 화면 전환 함수 어떤 화면으로 전환 할 지 정해준다
        this.hero = new Hero(this, name); // 영웅 클래스로 새로운 영웅 객체 생성, 게임 객체와 함께 이름 전해줌.
        this.updateHeroStat(); // 영웅 스텟을 표시함.
        this.showMessage(''); //메세지 창 함수
        this.hero.heroImg(); // 영웅 이미지 화면에 영웅 기본 모습 표시 함수
    }
    changeScreen(screen){ //게임 화면 전환 함수 어떤 화면으로 전환할지 전달 받음
        if(screen === 'start'){ //처음 시작화면이고 나머지 화면은 안 보임
            $startScreen.style.display = 'block';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
            $attackMenu.style.display = 'none';
            $itemMenu.style.display = 'none';
            $storyScreen.style.display = 'none';
        }else if(screen === 'game'){ //게임 메뉴 화면
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'block';
            $battleMenu.style.display = 'none';
            $attackMenu.style.display = 'none';
            $itemMenu.style.display = 'none';
            $storyScreen.style.display = 'none';
        }else if(screen === 'battle'){//배틀 메뉴 화면
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'block';
            $attackMenu.style.display = 'none';
            $itemMenu.style.display = 'none';
            $storyScreen.style.display = 'none';
        }else if(screen === 'attack'){// 공격 메뉴 화면
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
            $attackMenu.style.display = 'block';
            $itemMenu.style.display = 'none';
            $storyScreen.style.display = 'none';
        }else if(screen === 'item'){//아이템 메뉴 화면
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
            $attackMenu.style.display = 'none';
            $itemMenu.style.display = 'block';
            $storyScreen.style.display = 'none';
        }else if(screen === 'story'){
            $startScreen.style.display = 'none';
            $gameMenu.style.display = 'none';
            $battleMenu.style.display = 'none';
            $attackMenu.style.display = 'none';
            $itemMenu.style.display = 'none';
            $storyScreen.style.display = 'block';
        }
    }
    onGameMenuInput = (event) => {// 게임메뉴 화면 이벤트 리스너 콜백 함수
        event.preventDefault(); 
        const input = event.target['menu-input'].value; //인풋 값 받고
        if(input === '1'){ //모험을 선택하면 몬스터를 만나고 배틀 화면으로 전환
            this.changeScreen('battle'); 
            this.createMonster();// 몬스터 생성함수로 이때부터 몬스터가 생성된다.
            this.updateMonsterStat();//몬스터 스텟을 화면에 표시
            this.showMessage(`${this.monster.name}몬스터가 나타났다!`);
            this.hero.heroBattleInterface('1'); //영웅을 전투 장소로 이동 및 표시 함수 
            this.monster.monsterBattleInterface(); //몬스터를 전투 장소로 표시 함수
        }else if(input === '2'){//휴식을 취해서 체력을 모두 회복한다.
            this.hero.hp = this.hero.maxHp;
            this.updateHeroStat();
            this.showMessage('휴식을 취해서 체력을 모두 회복했다!');
        }else if(input === '3'){  //마을 탐험 선택입력
            this.quit();
        }
    }
    onBattleMenuInput = (event) => {// 전투화면 이벤트 리스너 콜백 함수
        event.preventDefault();
        const input = event.target['battle-input'].value;
        const { hero, monster } = this; // this.monster, this.hero 간소화 -> 구조분해 할당
        if(input === '3'){ // 도망치기
            this.randomExit(); //랜덤확률로 도망칠 수 있는 함수 게임 메뉴 화면으로 간다
            return;
        }
        if(input === '1'){ //공격 화면으로 전환
            this.changeScreen('attack');
        }
        if(input === '2'){  //아이템 메뉴 화면으로 전환
            this.changeScreen('item');
        }
    }
    onItemMenuInput = (event) =>{ //아이템 창 함수
        event.preventDefault();
        const input = event.target['item-input'].value;
        const { hero, monster} = this;
        let recoveryHp = 0;
        let increaseStrength = 0;
        if(input === '1'){ //물 일 때
            hero.hp += 5;
            hero.strength += 1;
            recoveryHp = 5;
            increaseStrength = 1;
        }else if(input === '2'){ //닭가슴살
            hero.hp += 10;
            hero.strength += 3;
            recoveryHp = 10;
            increaseStrength = 3;
        }else if(input === '3'){ //단백질 보충제
            hero.hp += 7;
            hero.strength += 2;
            recoveryHp = 7;
            increaseStrength = 2;
        }else if(input === '4'){
            hero.hp += 20;
            hero.strength += 1;
            recoveryHp = 20;
            increaseStrength = 1;
        }else if(input === '5'){
            hero.hp += 10;
            hero.strength += 1;
            recoveryHp = 5;
            increaseStrength = 1;
        }else if(input === '6'){
            hero.hp += 10;
            hero.strength += 1;
            recoveryHp = 10;
            increaseStrength = 1;
        }else if(input === '7'){
            hero.hp -= 100;
            hero.strength += 30;
            recoveryHp = -100;
            increaseStrength = 30;
        }else if(input === '8'){
            this.changeScreen('battle');
            return;
        }
        monster.attack(hero); //몬스터도 한 대 때리는 함수
        this.updateHeroStat();
        this.showMessage(`HP: ${recoveryHp}증가 근력: ${increaseStrength}증가, ${monster.att}의 데미지를 받았다!`);
        this.changeScreen('battle');
        if(hero.hp <= 0){ // 영웅 체력이 0이하 일 때
            this.showMessage(`${hero.lev} 레벨에서 죽었다. 새로운 게임을 시작해보세요.`);
            this.quit(); //게임 종료 함수
        }
    }
    randomExit(){ //랜덤으로 도망치는 함수
        let randomNumber = Math.floor(Math.random() * 10);
        if(randomNumber > 3){ //70프로 확률로 도망치기
            this.showMessage('무사히 도망쳤다!');
            this.changeScreen('game'); //게임 메뉴 화면으로 바꾸고
            this.monster = null; // 몬스터 비워두고
            this.updateMonsterStat(); //몬스터 스텟 다시 표시하고
            return;
        }
        this.monster.attack(this.hero); // 못 도망 쳤을 때 한 턴 소비한 걸로 치고 몬스터가 영웅 공격
        this.updateHeroStat(); // 맞았으니까 스텟 표시
        this.showMessage('도망치지 못 했다!');
        if(this.hero.hp <= 0){ // 영웅 체력이 0이하 일 때
            this.showMessage(`${this.hero.muscle} 골격근에서 죽었다. 새로운 게임을 시작해보세요.`);
            this.quit(); //게임 종료 함수
        }
    }
    onAttackMenuInput = (event) => { //공격 메뉴 이벤트 리스너 콜백함수
        event.preventDefault();
        const input = event.target['attack-input'].value;
        this.hero.heroBattleInterface('0');
        let heroDoesDamage = this.hero.skill(input, this.monster); // 영웅이 스킬로 몬스터 공격하고, 데미지 변수에 저장
        this.hero.heroBattleInterface('1');
        if(heroDoesDamage === 'back'){ //뒤로가기
            this.changeScreen('battle');
            return;
        }
        if(heroDoesDamage === 'heal'){ //회복이면 회복만 하고 배틀 화면으로 전환
            this.changeScreen('battle');
            return;
        }
        this.monster.attack(this.hero); //몬스터도 한 대 때리는 함수
        this.progressOfBattle(heroDoesDamage);// 전투 진행상황 표시 함수
        this.updateHeroStat();
        this.updateMonsterStat();
    }
    progressOfBattle(heroDoesDamage){ //전투 진행 상황 함수
        const { hero, monster } = this;
        if(hero.hp <= 0){ // 영웅 체력이 0이하 일 때
            this.showMessage(`${hero.muscle} 골격근에서 죽었다. 새로운 게임을 시작해보세요.`);
            this.quit(); //게임 종료 함수
        }else if(monster.hp <= 0){ // 몬스터 체력이 0 이하 일 때
            this.showMessage(`${monster.name}을 잡아서 ${monster.xp}경험치를 얻었다!`);
            this.hero.getXp(monster.xp); //몬스터가 갖고 있는 경험치만큼 영웅이 경험치 획득
            this.monster = null; // 몬스터 비워두고
            this.changeScreen('game');// 게임 화면으로 전환
        }else{
            this.showMessage(`${heroDoesDamage}의 데미지를 주고, ${monster.att}의 데미지를 받았다!`);
            this.changeScreen('battle'); 
        }
    }
    updateHeroStat(){ //영웅 스텟 표시 함수
        const { hero } = this;
        //const hero = this.hero;
        if(hero === null){// 영웅이 없으면 비워 둠
            $heroName.textContent = '';
            $heroLevel.textContent = '';
            $heroHp.textContent = '';
            $heroAtt.textContent = '';
            $heroXp.textContent = '';
            $heroMuscle.textContent = '';
            $heroHeight.textContent = '';
            $heroKg.textContent = '';
            $heroFat.textContent = '';
            return;
        }
        //영웅 생성 시 영웅 스텟 창에 표시
        $heroName.textContent = hero.name;
        $heroLevel.textContent = `레벨: ${hero.lev}`;
        $heroHp.textContent = `HP: ${hero.hp} / ${hero.maxHp}`;
        $heroAtt.textContent = `공격력: ${hero.att}`;
        $heroXp.textContent = `경험치: ${hero.xp} / ${hero.lev * 15}`;
        $heroMuscle.textContent = `근육량: ${hero.muscle}kg`;
        $heroFat.textContent = `체지방: ${hero.fat}kg`;
        $heroKg.textContent = `몸무게: ${hero.kg}kg`;
        $heroHeight.textContent = `키: ${hero.height}cm`;
    }
    createMonster(){ //몬스터 생성함수
        const randomIndex = Math.floor(Math.random() * this.monsterList.length);
        const randomMonster = this.monsterList[randomIndex];//랜덤으로 몬스터 생성하기
        this.monster = new Monster( // 몬스터 클래스로 새로운 몬스터 객체 생성
            this, //게임과 몬스터 클래스를 연결
            randomMonster.name,
            randomMonster.hp,
            randomMonster.att,  
            randomMonster.xp,
        );
        this.monster.monsterImage(randomMonster.name);//몬스터 이미지를 표시하는 함수
    }
    updateMonsterStat(){ //몬스터 스텟 표시 함수
        const { monster } = this;
        if(monster === null){
            $monsterName.textContent = '';
            $monsterHp.textContent = '';
            $monsterAtt.textContent = '';
            return;
        }
        $monsterName.textContent = monster.name;
        $monsterHp.textContent = `HP: ${monster.hp} / ${monster.maxHp}`;
        $monsterAtt.textContent = `공격력: ${monster.att}`;
    }
    showMessage(text){ //메세지 창 함수
        $message.textContent = text;
    }
    quit(){ //게임 종료 함수 영웅과 몬스터를 비우고 표시 후에, 이벤트 리스너 닫아버림
        this.hero = null;
        this.monster = null;
        this.updateHeroStat();
        this.updateMonsterStat();
        $gameMenu.removeEventListener('submit', this.onGameMenuInput);
        $battleMenu.removeEventListener('submit', this.onBattleMenuInput);
        this.changeScreen('start');
        game = null; // 이번 게임 끝
    }
}

class Hero{ //영웅 객체를 생성하는 클래스
    constructor(game, name){ //영웅 초기 값
        this.game = game;
        this.name = name;
        this.lev = 1;
        this.hp = 90;
        this.maxHp = 90;
        this.xp = 0;
        this.att = 30;
        this.height = 170;
        this.muscle = 30;
        this.kg = 70;
        this.fat = 7;
        this.water = 10;
        this.chickenBreast = 10;
        this.protein = 0;
        this.brownRice = 10;
        this.broccoli = 0;
        this.carrot = 0;
        this.steroid = 0;
        this.game.updateHeroStat(); //만들고 스텟 표시
        this.heroImg(); //영웅 이미지 표시 
    }
    heroBattleInterface(token){ //영웅 전투 스테이지 화면 표시
        let i = 1;
        let battleInterfaceIntervalId;
        if(token === '1'){
            console.log('start');
            battleInterfaceIntervalId = setInterval(() => { // 시간을 두고 표시
                if(this.game.monster === null){ // 몬스터가 없으면 -> 죽으면 , 전투 스테이지에서 나온다.
                    console.log('clear');
                    clearInterval(battleInterfaceIntervalId);
                    $heroAttackSkill.id = `hero-battle-interface`;
                }
                if(i >= 5){
                    i = 1;
                }else{ 
                    $heroBattleInterface.id = `hero-battle-interface-ready${i}`;//css id를 바꾸면서 애니메이션 만듬
                    i++;
                }
            }, 
            250);
            $heroBattleInterface.id = 'hero-battle-interface';
        }
        if(token === '0'){
            clearInterval(battleInterfaceIntervalId);
            $heroBattleInterface.id = 'hero-battle-interface';
            console.log('stop');
            return;
        }
    }
    skill(skillNumber, target){ //스킬 함수 밑에 힐이랑 뒤로가기 입력 값 생성 해야 됨
        let i = 1;
        let skillDamge;
        $heroBattleInterface.classList.add('hero-attack-skill');
        if(skillNumber === '1'){
            let skillIntervalId = setInterval(() => { // 시간을 두고 표시
                if(i >= 5){
                    clearInterval(skillIntervalId);
                }else{
                    $heroBattleInterface.id = `hero-attack1-skill${i}`;//css id를 바꾸면서 애니메이션 만듬
                    i++;
                }
            }, 
            200);
            skillDamge = this.att * 1;
            target.hp -= skillDamge;
            return skillDamge;
        }else if(skillNumber === '2'){
            let skillIntervalId = setInterval(() => { // 시간을 두고 표시
                if(i >= 5){
                    clearInterval(skillIntervalId);
                }else{
                    $heroBattleInterface.id = `hero-attack2-skill${i}`;//css id를 바꾸면서 애니메이션 만듬
                    i++;
                }
            }, 
            200);
            skillDamge = this.att * 1.5;
            target.hp -= skillDamge;
            return skillDamge;
        }else if(skillNumber === '3'){
            let skillIntervalId = setInterval(() => { // 시간을 두고 표시
                if(i >= 5){
                    clearInterval(skillIntervalId);
                }else{
                    $heroBattleInterface.id = `hero-attack3-skill${i}`;//css id를 바꾸면서 애니메이션 만듬
                    i++;
                }
            }, 
            200);
            skillDamge = this.att * 2;
            target.hp -= skillDamge;
            return skillDamge;
        }else if(skillNumber === '4'){
            let skillIntervalId = setInterval(() => { // 시간을 두고 표시
                if(i >= 5){
                    clearInterval(skillIntervalId);
                }else{
                    $heroBattleInterface.id = `hero-attack4-skill${i}`;//css id를 바꾸면서 애니메이션 만듬
                    i++;
                }
            }, 
            200);
            skillDamge = this.att * 2.5;
            target.hp -= skillDamge;
            return skillDamge;
        }else if(skillNumber === '5'){
            let skillIntervalId = setInterval(() => { // 시간을 두고 표시
                if(i >= 5){
                    clearInterval(skillIntervalId);
                }else{
                    $heroBattleInterface.id = `hero-attack5-skill${i}`;//css id를 바꾸면서 애니메이션 만듬
                    i++;
                }
            }, 
            200);
            skillDamge = this.att * 3;
            target.hp -= skillDamge;
            return skillDamge;
        }else if(skillNumber === '6'){
            let skillIntervalId = setInterval(() => { // 시간을 두고 표시
                if(i >= 5){
                    clearInterval(skillIntervalId);
                }else{
                    $heroBattleInterface.id = `hero-attack6-skill${i}`;//css id를 바꾸면서 애니메이션 만듬
                    i++;
                }
            }, 
            200);
            skillDamge = this.att * 5;
            target.hp -= skillDamge;
            return skillDamge;
        }else if(skillNumber === '7'){ //회복스킬
            let skillIntervalId = setInterval(() => { // 시간을 두고 표시
                if(i >= 5){
                    clearInterval(skillIntervalId);
                }else{
                    $heroBattleInterface.id = `hero-attack7-skill${i}`;//css id를 바꾸면서 애니메이션 만듬
                    i++;
                }
            }, 
            200);
            this.game.hero.heal(this.game.monster);
            return 'heal';
        }else if(skillNumber === '8'){ //뒤로가기
            return 'back';
        }
    }
    heal(monster){ //영웅이 공격력 만큼 힐 하고, 한턴 소비해서 맞음
        this.hp += this.att;
        this.game.updateHeroStat();
        this.showMessage(`${this.att}의 HP를 회복하고, ${this.game.monster.att}의 데미지를 받았다!`);
    }
    getXp(xp){ //경험치 얻는 함수 몬스터 경험치를 받고
        this.muscle += 0.1 * xp;
        this.maxHp += this.muscle * 0.1;
        this.att = this.muscle;
        this.fat -= 0.1;
        this.kg = this.kg + (xp * 0.1) - 0.1;
        this.game.showMessage(`근성장! 근육량이${this.muscle}이 되었다!`);
    }
    heroImg(){ //영웅 이미지 표시함수
        let i = 1;
        let heroImgInterval = setInterval(() => {
            if(i >= 5){
                i = 1;
            }else{
                $heroImage.id = `hero-stand${i}`;
                i++;
            }
            if(this.game.hero === null){
                clearInterval(heroImgInterval);
                $heroImage.id = 'hero-image';
            }
        }, 
        200);
    }
}

class Monster{ //몬스터 객체를 생성하는 몬스터 클래스
    constructor(game, name, hp, att, xp){ //몬스터랑 게임이랑 연결하고, 몬스터 값 전달 받고 적용
        this.game = game;
        this.name = name;
        this.maxHp = hp;
        this.hp = hp;
        this.xp = xp;
        this.att = att;
    }
    monsterId(monster){ //몬스터 이름을 css id로 바꿔주는 함수 후에 배틀인터페이스할때 필요함
        if(monster.name === '작은악마'){
            return `monster-littleDevil`;
        }else if(monster.name === '그린작은악마'){
            return `monster-greenLittleDevil`;
        }else if(monster.name === '블랙작은악마'){
            return `monster-blackLittleDevil`;
        }else if(monster.name === '오크'){
            return `monster-oak`;
        }else if(monster.name === '해골오크'){
            return `monster-blackOak`;
        }else if(monster.name === '눈골렘'){
            return `monster-snowGolem`;
        }else if(monster.name === '왕골렘'){
            return `monster-kingGolem`;
        }else if(monster.name === '비행도마뱀'){
            return `monster-flyingLizard`;
        }else if(monster.name === '푸른비행도마뱀'){
            return `monster-blueFlyingLizard`;
        }else if(monster.name === '고트데빌'){
            return `monster-goatDevil`;
        }
        return monsterId;
    }
    monsterImage(name){ // 몬스터 이미지 표시 함수, 이름을 받고 이름에 따라 몬스터 이미지가 다르게 됨
        if(name === '작은악마'){
            this.monsterChangeId('작은악마', 'monster-littleDevil-stand'); // 몬스터 css id를 바꿈으로써 이미지가 바뀐다.
        }
        if(name === '그린작은악마'){
            this.monsterChangeId('그린작은악마', 'monster-greenLittleDevil-stand');
        }
        if(name === '블랙작은악마'){
            this.monsterChangeId('블랙작은악마', 'monster-blackLittleDevil-stand');
        }
        if(name === '오크'){
            this.monsterChangeId('오크', 'monster-oak-stand');
        }
        if(name === '해골오크'){
            this.monsterChangeId('해골오크', 'monster-blackOak-stand');
        }
        if(name === '눈골렘'){
            this.monsterChangeId('눈골렘', 'monster-snowGolem-stand');
        }
        if(name === '왕골렘'){
            this.monsterChangeId('왕골렘', 'monster-kingGolem-stand');
        }
        if(name === '비행도마뱀'){
            this.monsterChangeId('비행도마뱀', 'monster-flyingLizard-stand');
        }
        if(name === '푸른비행도마뱀'){
            this.monsterChangeId('푸른비행도마뱀', 'monster-blueFlyingLizard-stand');
        }
        if(name === '고트데빌'){
            this.monsterChangeId('고트데빌', 'monster-goatDevil-stand');
        }
    }
    monsterChangeId(name, monsterImgId){ //몬스터 이미지를 바꾸는 함수 첫 번째 이름 매개변수?는 언제 쓸지 모름
        let i = 1;
        let intervalId = setInterval(() => {
            if(i >= 5){
                i = 1;
            }else{
                $monsterImage.id = `${monsterImgId}${i}`; // 몬스터 css id를 받아서 몬스터 이미지 id를 바꿔서 이미지 전환함.
                i++;
            }
            if(this.game.monster === null){ //몬스터가 없으면, 죽으면 기본 빈 화면으로 전환
                $monsterImage.id = 'monster-img';
                clearInterval(intervalId);
            }
        }, 200);
    }
    monsterBattleInterface(){ //몬스터 전투화면 이동 함수
        let i = 1;
        let monsterIdVar = this.monsterId(this.game.monster) //몬스터 아이디를 받아서
        let battleInterfaceIntervalId = setInterval(() => {
            if(i >= 5){
                i = 1;
            }else{
                $monsterBattleInterface.id = `${monsterIdVar}-battle-interface-ready${i}`; //전투화면에 몬스터 배치, 마치 포켓몬 전투 같음
                i++;
            }
            if(this.game.monster === null){ //
                $monsterBattleInterface.id = 'monster-battle-interface'; //몬스터가 없으면, 죽으면, 기본 빈 화면으로 전환
                clearInterval(battleInterfaceIntervalId);
            }
        }, 
        200);
    }
    attack(target){ // 영웅을 공격하는 함수
        target.hp -= this.att; //공격력 만큼 데미지 들어옴
        this.monsterAttack(this.name);
    }
    monsterAttack(name){ //몬스터 공격 이미지 함수

    }
}

let game =  null;
$storyScreen.addEventListener('click', (event) => {
    event.preventDefault();
    game = new Game(); // 게임 클래스로 새로운 게임 객체 생성하고 이름을 전해 줌
    let openingBGM = new Audio('./bgm/opening_BGM.mp3');
    openingBGM.play(); // 음악 플레이
});
