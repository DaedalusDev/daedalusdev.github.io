import{$ as e,C as t,D as n,Et as r,G as i,K as a,M as o,N as s,Q as c,S as l,V as u,Y as ee,Z as te,_t as ne,b as re,et as d,gt as ie,ht as f,it as ae,mt as p,pt as m,rt as h,t as oe,tt as g,vt as se}from"./sim-host-Be882gNM.js";import{t as ce}from"./lang-CinEKAeC.js";import{c as _,y as v}from"./storage-keys-C1-fnRrk.js";import{t as y}from"./level-ids-B0kRZO7j.js";import{t as le}from"./structure-identity-DSZq9h0K.js";var b={common:1,rare:2,epic:3};function x(e,t){switch(e.kind){case`duration`:case`energy`:return{...e,factor:Math.max(0,1-(1-e.factor)*t)};case`refillBonus`:case`energyCapacity`:case`inventorySlots`:case`stackCapacity`:return{...e,delta:e.delta*t}}}function ue(e,t,n){let r=b[t];return{id:e,rarity:t,effects:n.map(e=>x(e,r))}}var S={"^":`N`,">":`E`,v:`S`,"<":`W`};function de(e){switch(e){case`#`:return{kind:`obstacle`,moisture:0,growth:0};case`s`:return{kind:`seeded`,moisture:0,growth:0};case`g`:return{kind:`growing`,moisture:0,growth:120};case`r`:return{kind:`ripe`,moisture:0,growth:240};case`c`:return{kind:`ripe`,moisture:0,growth:240,family:`corn`};case`y`:return{kind:`ripe`,moisture:0,growth:240,family:`soy`};case`t`:return{kind:`tilled`,moisture:0,growth:0};case`o`:return{kind:`ore`,moisture:0,growth:0};default:throw Error(`caractère de carte inconnu : « ${e} »`)}}function C(e){let t=e.split(`
`).map(e=>e.replace(/\s+$/,``));for(;t.length&&t[0].trim()===``;)t.shift();for(;t.length&&t[t.length-1].trim()===``;)t.pop();if(t.length===0)throw Error(`carte vide`);let n=t.length,r=Math.max(...t.map(e=>e.length)),i=Array.from({length:r*n},()=>({kind:`soil`,moisture:0,growth:0})),a=null;for(let e=0;e<n;e++){let n=t[e];for(let t=0;t<n.length;t++){let o=n[t];if(o!==`.`){if(o===` `)throw Error(`espace non autorisé dans la carte (utilise « . » pour le sol)`);if(o in S){if(a)throw Error(`plusieurs robots sur la carte`);a={x:t,y:e,dir:S[o]},i[e*r+t]={kind:`base`,moisture:0,growth:0};continue}i[e*r+t]=de(o)}}}if(!a)throw Error(`aucun robot sur la carte`);return{width:r,height:n,tiles:i,robots:[{...a,inventory:p()}],clock:360}}function w(e,t,n,r,i){let a={id:i.id,footprint:[{x:t,y:n}],accessFaces:r,effect:i.effect??{kind:`depot`},sprite:i.sprite??`silo`,contents:[],...i.label===void 0?{}:{label:i.label}};return{...e,structures:[...e.structures??[],a]}}var fe={id:y.PREMIERS_PAS,build:()=>C(`>...`),objective:e=>e.robots[0].x===e.width-1,solution:`move()
move()
move()`,unlocks:[`move`]},pe={id:y.PREPARER_AVENIR,build:()=>C(`>...`),objective:e=>e.tiles.filter(e=>e.kind===`tilled`).length===3,solution:`till()
move()
till()
move()
till()`,unlocks:[`till`]},me={id:y.SEMER,build:()=>d(C(`>ttt`),`seeds`,3),objective:e=>e.tiles.filter(e=>e.kind===`seeded`).length===3,solution:`plant()
move()
plant()
move()
plant()`,unlocks:[`plant`]},he={id:y.LONG_COULOIR,build:()=>C(`>......`),objective:e=>s(e).x>=6,solution:`repeat 6 {
  move()
}`,unlocks:[`repeat`]},ge={id:y.PREMIERE_RECOLTE,build:()=>d(C(`>.`),`seeds`,1),objective:e=>(o(e).crops??0)>=1,solution:`till()
plant()
repeat 2 {
  water()
  wait()
}
harvest()`,unlocks:[`water`,`harvest`,`wait`]},_e={id:y.LA_RANGEE,build:()=>C(`>rrrr`),objective:e=>(o(e).crops??0)>=4,solution:`repeat 4 {
  harvest()
  move()
}`,unlocks:[]},ve={id:y.TRI_SELECTIF,build:()=>C(`>r.r.`),conditions:[{id:`harvestTwo`,check:e=>(o(e).crops??0)>=2},{id:`noRipeLeft`,check:e=>e.tiles.every(e=>e.kind!==`ripe`)}],solution:`repeat 4 {
  if (lookAhead() == "ripe") {
    harvest()
  }
  move()
}`,unlocks:[`lookAhead`,`if`,`else`],variants:[()=>C(`>.r.r`),()=>C(`>rr..`)]},ye={id:y.JUSQUAU_MUR,build:()=>C(`>r.rr`),conditions:[{id:`harvestThree`,check:e=>(o(e).crops??0)>=3},{id:`noRipeLeft`,check:e=>e.tiles.every(e=>e.kind!==`ripe`)}],solution:`while (lookAhead() != "wall") {
  if (lookAhead() == "ripe") {
    harvest()
  }
  move()
}`,unlocks:[`while`]},be={id:y.VIRAGE,build:()=>C(`>..
..r`),objective:e=>(o(e).crops??0)>=1,solution:`move()
move()
turn("right")
harvest()`,unlocks:[`turn`]},T={id:y.SE_REPERER,build:()=>C(`>...r`),objective:e=>(o(e).crops??0)>=1,solution:`while (distanceAhead() > 1) {
  move()
}
harvest()`,unlocks:[`distanceAhead`]},E={id:y.REJOINDRE_CIBLE,build:()=>C(`>...
....
....
...r`),objective:e=>(o(e).crops??0)>=1,solution:`while (facing() != "E") {
  turn("right")
}
while (posX() < 3) {
  move()
}
while (facing() != "S") {
  turn("right")
}
while (posY() < 2) {
  move()
}
harvest()`,unlocks:[`posX`,`posY`,`facing`],variants:[()=>C(`..<.
....
....
...r`),()=>C(`....
^...
....
...r`)]},D={id:y.INVENTAIRE,build:()=>C(`>rrr`),objective:e=>(o(e).crops??0)>=3,solution:`while (cropCount() < 3) {
  harvest()
  move()
}`,unlocks:[`cropCount`]},O={id:y.ROUTINE,build:()=>d(C(`>...`),`seeds`,2),conditions:[{id:`seedFirst`,check:e=>e.tiles[1].kind===`seeded`},{id:`seedSecond`,check:e=>e.tiles[3].kind===`seeded`}],solution:`function semer() {
  till()
  plant()
}
semer()
move()
move()
semer()`,unlocks:[`function`]},k={id:y.AUTOMATISER,build:()=>d(C(`>....`),`seeds`,4),conditions:[{id:`seedAll`,check:e=>e.tiles.filter(e=>e.kind===`seeded`).length===4}],solution:`function step() {
  till()
  plant()
  move()
}
repeat 4 {
  step()
}`,unlocks:[]},A={id:y.GRANDE_RECOLTE,build:()=>C(`>rrr
...r
...r`),conditions:[{id:`harvestFive`,check:e=>(o(e).crops??0)>=5},{id:`noRipeLeft`,check:e=>e.tiles.every(e=>e.kind!==`ripe`)}],solution:`while (cropCount() < 5) {
  if (lookAhead() == "ripe") {
    harvest()
    move()
  } else {
    turn("right")
  }
}`,unlocks:[]},j={id:y.ENERGIE,build:()=>ee(C(`>....`),20),objective:e=>e.tiles.filter(e=>e.kind===`tilled`).length===4,solution:[`function goHome() {`,`  turn("left")`,`  turn("left")`,`  while (distanceAhead() > 0) {`,`    move()`,`  }`,`  while (batteryLevel() < 100) {`,`    wait()`,`  }`,`  turn("left")`,`  turn("left")`,`}`,`till()`,`move()`,`till()`,`goHome()`,`move()`,`move()`,`till()`,`move()`,`till()`].join(`
`),unlocks:[`batteryLevel`,`isNight`]},M={id:y.LE_DETOUR,build:()=>C(`>#.
..r`),objective:e=>(o(e).crops??0)>=1,solution:`if (lookAhead() == "obstacle") {
  turn("right")
  move()
  turn("left")
}
move()
harvest()`,unlocks:[]},N={id:y.TRI_VERGER,build:()=>C(`>rgrgr`),conditions:[{id:`harvestRipe`,check:e=>e.tiles.filter(e=>e.kind===`ripe`).length===0},{id:`keepGrowing`,check:e=>e.tiles.filter(e=>e.kind===`growing`).length===2}],solution:`repeat 5 {
  if (lookAhead() == "ripe") {
    harvest()
  }
  move()
}`,unlocks:[],variants:[()=>C(`>grrgr`),()=>C(`>rrggr`)]},xe={id:y.CYCLE_DE_VIE,build:()=>d(C(`>..`),`seeds`,2),objective:e=>(o(e).crops??0)>=2,growthSpeed:2,solution:`till()
plant()
water()
move()
till()
plant()
water()
wait()
harvest()
move()
turn("left")
turn("left")
harvest()`,unlocks:[]},Se={id:y.QUADRILLAGE,build:()=>d(C(`>..
...`),`seeds`,5),objective:e=>e.tiles.filter(e=>e.kind===`seeded`).length===5,solution:`function sow() {
  till()
  plant()
}
sow()
move()
sow()
move()
turn("right")
sow()
move()
turn("right")
sow()
move()
sow()`,unlocks:[]},Ce={id:y.GRAND_VERGER,build:()=>C(`>rgr
...g
...r`),conditions:[{id:`harvestThree`,check:e=>(o(e).crops??0)===3},{id:`noRipeLeft`,check:e=>e.tiles.filter(e=>e.kind===`ripe`).length===0}],solution:`function scan() {
  if (lookAhead() == "ripe") {
    harvest()
  }
}
scan()
move()
scan()
move()
scan()
move()
turn("right")
scan()
move()
scan()`,unlocks:[]},we={id:y.POUSSES_FRAGILES,build:()=>C(`>gr
...`),conditions:[{id:`harvestRipe`,check:e=>(o(e).crops??0)===1&&e.tiles.filter(e=>e.kind===`ripe`).length===0},{id:`noTrample`,check:e=>e.tiles.filter(e=>e.kind===`growing`).length===1}],solution:`turn("right")
move()
turn("left")
move()
move()
turn("left")
harvest()`,unlocks:[],trampleCrops:!0},Te={id:y.RESERVE,build:()=>e(C(`>ttttt`),`seeds`,{capacity:3,base:2}),objective:e=>e.tiles.filter(e=>e.kind===`seeded`).length===5,solution:`plant()
move()
plant()
move()
plant()
turn("left")
turn("left")
move()
move()
wait()
turn("right")
turn("right")
move()
move()
move()
plant()
move()
plant()`,unlocks:[]},Ee={id:y.TRI_VARIETES,build:()=>C(`>rcrcy`),conditions:[{id:`harvestWheat`,check:e=>e.tiles.filter(e=>e.kind===`ripe`&&(e.family??`wheat`)===`wheat`).length===0},{id:`keepOthers`,check:e=>e.tiles.filter(e=>e.kind===`ripe`&&(e.family??`wheat`)!==`wheat`).length===3}],solution:`repeat 5 {
  if (cropAhead() == "wheat") {
    harvest()
  }
  move()
}`,unlocks:[`cropAhead`],variants:[()=>C(`>crycr`),()=>C(`>ycrrc`)]};function P(e){return w(w(C(e),0,0,[`S`],{id:`silo-wheat`,label:`🌾`}),4,0,[`S`],{id:`silo-corn`,label:`🌽`})}function F(e,t){let n=(e.structures??[]).find(e=>e.id===t)?.contents??[];return{wheat:m(n,{item:f,family:`wheat`}),corn:m(n,{item:f,family:`corn`})}}var De={id:y.TRI_VERS_SILOS,build:()=>P(`.....
.....
>rcrc`),conditions:[{id:`wheatStored`,check:e=>{let t=F(e,`silo-wheat`);return t.wheat===2&&t.corn===0}},{id:`cornStored`,check:e=>{let t=F(e,`silo-corn`);return t.corn===2&&t.wheat===0}}],solution:`repeat 4 {
  harvest()
  move()
}
turn("left")
move()
store("corn")
turn("left")
repeat 4 {
  move()
}
turn("right")
store("wheat")`,unlocks:[`store`],variants:[()=>P(`.....
.....
>crcr`),()=>P(`.....
.....
>ccrr`)]};function Oe(e,t,n){let r=new oe(e.build(),{growthSpeed:e.growthSpeed??1,trampleCrops:e.trampleCrops??!1}),{error:i}=ce(t,r,e.maxSteps===void 0?void 0:{maxSteps:e.maxSteps},n);return i?{outcome:`error`,error:i,frames:r.frames,finalWorld:r.world}:{outcome:(e.conditions?e.conditions.every(e=>e.check(r.world)):e.objective(r.world))?`success`:`failure`,error:null,frames:r.frames,finalWorld:r.world}}var I={PREMIER_SERVICE:`kitchen-01-premier-service`},ke=[`.###..`,`....^.`,`####..`].join(`
`),Ae={x:0,y:0},je={x:4,y:0},Me={x:5,y:0},Ne={x:4,y:2},Pe={x:5,y:2},Fe=200,Ie=1,Le=3;function L(e,t,n,r,i){return{id:e,footprint:[t],accessFaces:[n],effect:r,sprite:i}}function Re(){let t=C(ke),r=g(e({...t,robots:[ae(t.robots[0])]},`crops`,{capacity:Ie,base:Fe}),L(`larder`,je,`S`,{kind:`refill`,resource:`crops`},`fridge`));return r=g(r,a({id:`chopper`,footprint:[Ae],accessFaces:[`S`],recipe:`chop-crops`,sprite:`cutting-board`})),r=g(r,a({id:`mill`,footprint:[Me],accessFaces:[`S`],recipe:`mill-crops`,sprite:`stand-mixer`})),r=g(r,a({id:`pot`,footprint:[Pe],accessFaces:[`N`],recipe:`cook-soup`,sprite:`stove-pot`,pileCap:Le})),r=g(r,L(`pass`,Ne,`N`,{kind:`store`,resource:`dish`},`service-hatch`)),{...r,room:n(r.clock)}}var ze=`refill("wheat").turn("left").move().move().move().move().turn("right").store("wheat").refill("prepped").turn("right").move().move().move().move().move().turn("right").store("prepped").refill("dish").turn("right").move().turn("left").store("dish").turn("left").turn("left").refill("wheat").turn("right").move().turn("left").store("wheat").refill("flour").turn("left").turn("left").store("flour").turn("right").move().turn("right")`.split(`.`),Be=[{id:I.PREMIER_SERVICE,build:Re,objective:e=>(e.room?.served??0)>=13,solution:`repeat 17 {\n${ze.map(e=>`  ${e}`).join(`
`)}\n}`,unlocks:[`move`,`turn`,`store`,`refill`,`repeat`]}],Ve=[fe,pe,me,he,ge,_e,ve,ye,be,T,E,D,O,k,A,j,M,N,xe,Se,Ce,we,Te,Ee,De],R=`common`;function z(e){return{variantId:e,slots:r[e].slots.map(()=>null)}}function He(e,t){let n=h(e,r[t.variantId]);return t.slots.forEach((e,t)=>{e&&(n=i(n,t,e))}),n}function Ue(e,t){let n=e;for(let a=0;a<e.robots.length;a++){let e=t[a];e&&(n=h(n,r[e.variantId],a),e.slots.forEach((e,t)=>{e&&(n=i(n,t,e,a))}))}return n}function We(e,t,n){let r=e.slots.map((e,r)=>r===t?n:e);return{...e,slots:r}}function Ge(e){if(!e||typeof e!=`object`)return!1;let t=e;return!(typeof t.id!=`string`||!Array.isArray(t.effects)||t.rarity!==void 0&&!(typeof t.rarity==`string`&&t.rarity in b))}function Ke(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.variantId!=`string`||!(t.variantId in r)||!Array.isArray(t.slots)?!1:t.slots.every(e=>e===null||Ge(e))}function B(){let e=localStorage.getItem(_);if(!e)return null;try{let t=JSON.parse(e);return Ke(t)?t:null}catch{return null}}function qe(e){e===null?localStorage.removeItem(_):localStorage.setItem(_,JSON.stringify(e))}function Je(e,t){return e===0||t===0||e===13||t===8}var Ye=6,Xe=10;function Ze(e){let t=e>>>0||1;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}var V=(e,t,n)=>t+Math.floor(e()*(n-t+1)),H=(e,t)=>t*14+e,U=[[0,-1],[1,0],[0,1],[-1,0]];function Qe(e){let t=new Set([H(1,4)]),n=V(e,50,72),r=1,i=4,a=n*40;for(;t.size<n&&a-- >0;){let[n,a]=U[Math.floor(e()*U.length)],o=r+n,s=i+a;o<0||s<0||o>=14||s>=9||Je(o,s)||(r=o,i=s,t.add(H(r,i)))}return t}function $e(e){let t=new Uint8Array(126),n=[H(1,4)];t[n[0]]=1;let r=0;for(;n.length;){let i=n.pop();r+=1;let a=i%14,o=Math.floor(i/14);for(let[r,i]of[[0,-1],[1,0],[0,1],[-1,0]]){let s=a+r,c=o+i;if(s<0||c<0||s>=14||c>=9)continue;let l=H(s,c);t[l]||e[l]===`obstacle`||(t[l]=1,n.push(l))}}return r}function W(e=Math.random){let t=V(e,12,16),n=Qe(e),r=Array.from({length:126},(e,t)=>{let r=t%14,i=Math.floor(t/14);return r===0&&i===4?`depleted`:n.has(t)?r===1&&i===4?`depleted`:`rock`:`obstacle`}),i=[];for(let e=0;e<r.length;e++)r[e]===`rock`&&i.push(e);for(let t=i.length-1;t>0;t--){let n=Math.floor(e()*(t+1));[i[t],i[n]]=[i[n],i[t]]}let a=0,o=V(e,Ye,Xe),s=n.size+1,l=0;for(;l<o&&a<i.length;){let e=i[a++];r[e]=`obstacle`,$e(r)===s-l-1?l+=1:r[e]=`rock`}let u=0;for(let e of i){if(u>=t)break;r[e]===`rock`&&(r[e]=`ore`,u+=1)}return c(w({width:14,height:9,tiles:r.map(e=>({kind:e,moisture:0,growth:0})),robots:[{x:1,y:4,dir:`E`,inventory:p()}],clock:360},0,4,[`E`],{id:`mine-depot`,effect:{kind:`store`,resource:`ore`},sprite:`mine-cart`}),`ore`,5,0)}function G(e){return te(u(e,{x:2,y:2,dir:`W`}),ne,{capacity:5,stock:5},1)}var et=20260825;function K(t){switch(t){case`farm`:return G(e(C(`>....
.....
.....`),`seeds`,{capacity:5,base:20}));case`mine`:return W(Ze(et));case`kitchen`:return{...e(C(`>....
.....
.....`),`crops`,{capacity:30,base:30}),room:n(360)};default:return C(`>.`)}}function q(){return{version:20,clock:360,gold:0,buildings:{farm:{worldState:K(`farm`),unlocked:!0}},inventory:[],globalStock:{},robots:[{id:`r1`,modelId:`farmhand`,firmware:``,draft:``,loadout:z(R),assignment:`farm`},{id:`r2`,modelId:`farmhand`,firmware:``,draft:``,loadout:z(R),assignment:`farm`}],nextRobotId:3,modules:[],nextModuleId:1,ownedStructures:[{id:`st1`,kind:`well`}],nextStructureId:2}}function tt(e){let t=new Set;for(let[n,r]of Object.entries(e.buildings))r?.unlocked&&t.add(n);return t}function J(e){return Number.parseInt(e.replace(/^r/,``),10)||0}function nt(e,t){return e.robots.filter(e=>e.assignment===t).sort((e,t)=>J(e.id)-J(t.id))}function rt(e){return[...e.robots].sort((e,t)=>J(e.id)-J(t.id))}var Y={generalist:{id:`generalist`,label:`Polyvalent`,icon:`🤖`,price:60,innate:[],world:`all`},farmhand:{id:`farmhand`,label:`Fermier MK1`,icon:`🧑‍🌾`,price:120,innate:[{kind:`duration`,action:`plant`,factor:.75},{kind:`duration`,action:`harvest`,factor:.75}],world:`farm`},miner:{id:`miner`,label:`Mineur MK1`,icon:`⛏️`,price:120,innate:[{kind:`duration`,action:`mine`,factor:.7}],world:`mine`}},it=[`generalist`,`farmhand`,`miner`];function X(e){return Y[e]}function Z(e){return e===`farm`?`farmhand`:e===`mine`?`miner`:`generalist`}var at=15,ot=20;function st(e){if(!e||typeof e!=`object`)return!1;let t=e;if(typeof t.version!=`number`||!t.buildings||typeof t.buildings!=`object`)return!1;let n=t.buildings.farm;return!!n&&typeof n.worldState==`object`&&n.worldState!==null}function ct(e){if(!e||typeof e!=`object`)return;let t=e;Array.isArray(t.robots)||t.robot&&typeof t.robot==`object`&&(t.robots=[t.robot],delete t.robot)}function lt(){let e=localStorage.getItem(v);try{let n=e?JSON.parse(e):q();if(e&&!st(n))return q();for(let e of Object.values(n.buildings))ct(e?.worldState);for(let e of Object.values(n.buildings))for(let t of e?.worldState?.robots??[]){if(Array.isArray(t.inventory))continue;let e=t.inventory??{},n=ie.filter(t=>(e[t]??0)>0),r=Math.max(2,n.length),i=n.map(t=>({item:t,count:e[t]}));for(;i.length<r;)i.push(null);t.inventory=i,t.capacity&&(t.refillCap=t.capacity,delete t.capacity)}for(let e of Object.values(n.buildings)){if(!e)continue;let t=e;if(!Array.isArray(t.robots)){let e=typeof t.firmware==`string`?t.firmware:``;t.robots=e?[{firmware:e,draft:e}]:[]}delete t.firmware}let r=n.buildings.farm;if(r?.worldState){let e=K(`farm`).robots.length;for(;r.worldState.robots.length<e;)r.worldState=G(r.worldState)}let i=B();for(let e of Object.values(n.buildings)){if(!e)continue;let t=e,n=e.worldState?.robots?.length??0;for(t.robots??=[];t.robots.length<n;)t.robots.push({firmware:``,draft:``});for(let e of t.robots)e.loadout===void 0&&(e.loadout=i?JSON.parse(JSON.stringify(i)):z(R))}if((typeof n.version==`number`?n.version:0)<4){let e=n.inventory??=[];for(let t of Object.values(n.buildings))for(let n of t?.robots??[])if(n.loadout?.variantId===`rare`){for(let t of n.loadout.slots.slice(1))t&&e.push(t);n.loadout={variantId:R,slots:[n.loadout.slots[0]??null]}}}if(!Array.isArray(n.robots)){let e=[],t=1;for(let[r,i]of Object.entries(n.buildings))if(i)for(let n of i.robots??[])e.push({id:`r${t++}`,modelId:Z(r),firmware:n.firmware,draft:n.draft,...n.loadout===void 0?{}:{loadout:n.loadout},assignment:r});n.robots=e,n.nextRobotId=t}for(let e of n.robots??[])e.loadout===void 0&&(e.loadout=i?JSON.parse(JSON.stringify(i)):z(R));let a=e=>{for(let t of e?.effects??[])t.kind===`stockCapacity`&&(t.kind=`refillBonus`)};for(let e of n.inventory??[])a(e);for(let e of n.robots??[])for(let t of e.loadout?.slots??[])a(t);if((typeof n.version==`number`?n.version:0)<13){let e={"chop-wheat":`chop-crops`,"chop-corn":`chop-crops`},t=new Set([`cook-soup`]);for(let r of Object.values(n.buildings))for(let n of r?.worldState?.structures??[]){let r=n.effect?.recipe;if(r===void 0)continue;let i=e[r];if(!(i===void 0&&!t.has(r))&&(i!==void 0&&(n.effect.recipe=i),n.machine)){let e=se[i??r]?.in.length??n.machine.input?.length??1;n.machine.input=Array.from({length:e},()=>null),n.machine.output=null,n.machine.progress=0}}}if((typeof n.version==`number`?n.version:0)<at){let e=new Map((n.ownedStructures??[]).map(e=>[e.id,e.kind]));for(let t of Object.values(n.buildings))for(let n of t?.worldState?.structures??[]){let t=n.id===void 0?void 0:e.get(n.id);t!==void 0&&(n.sprite=le[t].sprite)}}if((typeof n.version==`number`?n.version:0)<ot){let e=n.buildings.mine;if(e){let t=K(`mine`);e.worldState={...t,robots:e.worldState?.robots??t.robots,...e.worldState?.stocks!==void 0&&{stocks:e.worldState.stocks}},delete e.discovered}}if((typeof n.version==`number`?n.version:0)<18){let e=n.buildings.mine;if(e?.worldState&&e.discovered===void 0){let n=e.worldState,r=new Set;for(let e=0;e<n.height;e++)for(let i=0;i<n.width;i++){let a=n.tiles[e*n.width+i];!t(n,i,e)&&a?.kind!==`ore`&&r.add(re(i,e))}e.discovered=l(r,n.width,n.height)}}{let e=n.buildings.mine;for(let t of e?.worldState?.structures??[])t.id===`mine-depot`&&t.sprite===`silo`&&(t.sprite=`mine-cart`)}return{...n,version:20,clock:typeof n.clock==`number`?n.clock:360,gold:typeof n.gold==`number`?n.gold:0,inventory:Array.isArray(n.inventory)?n.inventory:[],globalStock:typeof n.globalStock==`object`&&n.globalStock!==null?n.globalStock:{},robots:n.robots,nextRobotId:n.nextRobotId,modules:Array.isArray(n.modules)?n.modules:[],nextModuleId:typeof n.nextModuleId==`number`?n.nextModuleId:1,ownedStructures:Array.isArray(n.ownedStructures)?n.ownedStructures:[{id:`st1`,kind:`well`}],nextStructureId:typeof n.nextStructureId==`number`?n.nextStructureId:Math.max(2,...(n.ownedStructures??[]).map(e=>Number.parseInt(String(e.id??``).replace(/^st/,``),10)).filter(e=>Number.isFinite(e)).map(e=>e+1))}}catch{return q()}}function ut(e){localStorage.setItem(v,JSON.stringify(e))}var Q=[{id:`farm`,label:`Ferme`,icon:`🌾`,position:{col:1,row:1}},{id:`mine`,label:`Minage`,icon:`⛏️`,position:{col:2,row:1}},{id:`power`,label:`Électricité`,icon:`⚡`,position:{col:1,row:2}},{id:`kitchen`,label:`Cuisine`,icon:`🍞`,position:{col:2,row:2}}],dt=new Set(Q.map(e=>e.id));function $(e){return dt.has(e)}function ft(e,t){return $(e)&&t.has(e)}export{Be as C,b as D,C as E,x as O,Ve as S,Oe as T,R as _,ut as a,z as b,Z as c,nt as d,K as f,qe as g,B as h,lt as i,ue as k,X as l,W as m,ft as n,Y as o,tt as p,$ as r,it as s,Q as t,rt as u,He as v,I as w,We as x,Ue as y};