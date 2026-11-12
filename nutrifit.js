const FOODS = [
    /* ---------------- FOOD DATABASE (per 100g) ---------------- */
  {name:"Peito de frango grelhado", emoji:"🍗", kcal:165, protein:31, carb:0, fat:3.6, fiber:0, sodium:74, potassium:256, calcium:15, iron:1.0, vitC:0},
  {name:"Arroz branco cozido", emoji:"🍚", kcal:130, protein:2.7, carb:28, fat:0.3, fiber:0.4, sodium:1, potassium:35, calcium:10, iron:0.2, vitC:0},
  {name:"Batata doce cozida", emoji:"🍠", kcal:86, protein:1.6, carb:20, fat:0.1, fiber:3.0, sodium:55, potassium:337, calcium:30, iron:0.6, vitC:2.4},
  {name:"Ovo cozido", emoji:"🥚", kcal:155, protein:13, carb:1.1, fat:11, fiber:0, sodium:124, potassium:126, calcium:50, iron:1.2, vitC:0},
  {name:"Aveia em flocos", emoji:"🥣", kcal:389, protein:16.9, carb:66, fat:6.9, fiber:10.6, sodium:2, potassium:429, calcium:54, iron:4.7, vitC:0},
  {name:"Banana", emoji:"🍌", kcal:89, protein:1.1, carb:23, fat:0.3, fiber:2.6, sodium:1, potassium:358, calcium:5, iron:0.3, vitC:8.7},
  {name:"Whey protein (pó)", emoji:"🥤", kcal:400, protein:80, carb:8, fat:6, fiber:1, sodium:150, potassium:200, calcium:120, iron:0.5, vitC:0},
  {name:"Azeite de oliva", emoji:"🫒", kcal:884, protein:0, carb:0, fat:100, fiber:0, sodium:2, potassium:1, calcium:1, iron:0.6, vitC:0},
  {name:"Amendoim torrado", emoji:"🥜", kcal:567, protein:25.8, carb:16.1, fat:49.2, fiber:8.5, sodium:18, potassium:705, calcium:92, iron:4.6, vitC:0},
  {name:"Brócolis cozido", emoji:"🥦", kcal:35, protein:2.4, carb:7.2, fat:0.4, fiber:3.3, sodium:41, potassium:293, calcium:40, iron:0.7, vitC:64.9},
  {name:"Atum em lata (água)", emoji:"🐟", kcal:116, protein:26, carb:0, fat:0.8, fiber:0, sodium:247, potassium:237, calcium:11, iron:1.4, vitC:0},
  {name:"Feijão carioca cozido", emoji:"🫘", kcal:127, protein:8.7, carb:22.8, fat:0.5, fiber:8.5, sodium:2, potassium:355, calcium:27, iron:2.1, vitC:1.2},
  {name:"Pão integral", emoji:"🍞", kcal:247, protein:13, carb:41, fat:3.4, fiber:6.8, sodium:400, potassium:248, calcium:107, iron:2.5, vitC:0},
  {name:"Iogurte natural desnatado", emoji:"🥛", kcal:56, protein:5.7, carb:7.7, fat:0.2, fiber:0, sodium:76, potassium:255, calcium:190, iron:0.1, vitC:0.8},
  {name:"Castanha do Pará", emoji:"🌰", kcal:656, protein:14.3, carb:12.3, fat:66.4, fiber:7.5, sodium:3, potassium:659, calcium:160, iron:2.4, vitC:0.7},
  {name:"Salmão grelhado", emoji:"🐠", kcal:208, protein:20.4, carb:0, fat:13.4, fiber:0, sodium:59, potassium:363, calcium:9, iron:0.3, vitC:0},
  {name:"Queijo cottage", emoji:"🧀", kcal:98, protein:11.1, carb:3.4, fat:4.3, fiber:0, sodium:364, potassium:104, calcium:83, iron:0.1, vitC:0},
  {name:"Maçã", emoji:"🍎", kcal:52, protein:0.3, carb:14, fat:0.2, fiber:2.4, sodium:1, potassium:107, calcium:6, iron:0.1, vitC:4.6},
  {name:"Abacate", emoji:"🥑", kcal:160, protein:2, carb:8.5, fat:14.7, fiber:6.7, sodium:7, potassium:485, calcium:12, iron:0.6, vitC:10},
  {name:"Carne bovina magra grelhada", emoji:"🥩", kcal:217, protein:26.4, carb:0, fat:11.8, fiber:0, sodium:66, potassium:318, calcium:12, iron:2.6, vitC:0},
];

/* reference daily values (approx, for chart proportions) */
const MICRO_REF = {
  fiber:{label:"Fibras", unit:"g", ref:30, color:"var(--fiber)"},
  sodium:{label:"Sódio", unit:"mg", ref:2300, color:"var(--protein)"},
  potassium:{label:"Potássio", unit:"mg", ref:3500, color:"var(--carb)"},
  calcium:{label:"Cálcio", unit:"mg", ref:1000, color:"var(--fat)"},
  iron:{label:"Ferro", unit:"mg", ref:14, color:"var(--accent)"},
  vitC:{label:"Vitamina C", unit:"mg", ref:90, color:"#4C8C4A"},
};

/* ---------------- STATE ---------------- */
let log = []; // {food, grams}

/* ---------------- INIT ---------------- */
const foodSelect = document.getElementById('foodSelect');
FOODS.forEach((f, i) => {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = `${f.emoji} ${f.name}`;
  foodSelect.appendChild(opt);
});

function updatePreview(){
  const f = FOODS[foodSelect.value];
  const g = parseFloat(document.getElementById('gramsInput').value) || 0;
  const factor = g/100;
  document.getElementById('foodPreview').innerHTML = `
    <span class="emoji">${f.emoji}</span>
    <span>${Math.round(f.kcal*factor)} kcal · P ${(f.protein*factor).toFixed(1)}g · C ${(f.carb*factor).toFixed(1)}g · G ${(f.fat*factor).toFixed(1)}g</span>
  `;
}
foodSelect.addEventListener('change', updatePreview);
document.getElementById('gramsInput').addEventListener('input', updatePreview);
updatePreview();

document.getElementById('addBtn').addEventListener('click', () => {
  const idx = parseInt(foodSelect.value);
  const grams = parseFloat(document.getElementById('gramsInput').value);
  if(!grams || grams <= 0) return;
  log.push({food: FOODS[idx], grams});
  render();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  log = [];
  render();
});

['goalKcal','goalProtein','goalCarb','goalFat'].forEach(id => {
  document.getElementById(id).addEventListener('input', render);
});

/* ---------------- RENDER ---------------- */
function computeTotals(){
  const t = {kcal:0, protein:0, carb:0, fat:0, fiber:0, sodium:0, potassium:0, calcium:0, iron:0, vitC:0};
  log.forEach(entry => {
    const factor = entry.grams/100;
    const f = entry.food;
    t.kcal += f.kcal*factor;
    t.protein += f.protein*factor;
    t.carb += f.carb*factor;
    t.fat += f.fat*factor;
    t.fiber += f.fiber*factor;
    t.sodium += f.sodium*factor;
    t.potassium += f.potassium*factor;
    t.calcium += f.calcium*factor;
    t.iron += f.iron*factor;
    t.vitC += f.vitC*factor;
  });
  return t;
}

function renderLog(){
  const listEl = document.getElementById('logList');
  if(log.length === 0){
    listEl.innerHTML = '<div class="empty-state">Nenhum alimento registrado ainda. Adicione o primeiro acima ⤴</div>';
    return;
  }
  listEl.innerHTML = log.map((entry, i) => {
    const factor = entry.grams/100;
    const kcal = Math.round(entry.food.kcal*factor);
    return `
      <div class="log-item">
        <span class="emoji">${entry.food.emoji}</span>
        <span>
          <div class="name">${entry.food.name}</div>
          <div class="grams">${entry.grams} g</div>
        </span>
        <span class="kcal">${kcal} kcal</span>
        <button class="del" title="Remover" data-i="${i}">✕</button>
      </div>
    `;
  }).join('');
  listEl.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', () => {
      log.splice(parseInt(btn.dataset.i), 1);
      render();
    });
  });
}

function renderMacros(totals){
  const goals = {
    kcal: parseFloat(document.getElementById('goalKcal').value) || 1,
    protein: parseFloat(document.getElementById('goalProtein').value) || 1,
    carb: parseFloat(document.getElementById('goalCarb').value) || 1,
    fat: parseFloat(document.getElementById('goalFat').value) || 1,
  };

  const rows = [
    {key:'kcal', label:'Calorias', unit:'kcal', color:'var(--accent)'},
    {key:'protein', label:'Proteína', unit:'g', color:'var(--protein)'},
    {key:'carb', label:'Carboidrato', unit:'g', color:'var(--carb)'},
    {key:'fat', label:'Gordura', unit:'g', color:'var(--fat)'},
  ];

  document.getElementById('macroBars').innerHTML = rows.map(r => {
    const val = totals[r.key];
    const pct = Math.min(100, (val/goals[r.key])*100);
    return `
      <div class="macro-row">
        <div class="macro-head">
          <span class="name">${r.label}</span>
          <span class="nums">${Math.round(val)} / ${Math.round(goals[r.key])} ${r.unit}</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%; background:${r.color};"></div></div>
      </div>
    `;
  }).join('');

  // plate ring (protein/carb/fat share of total calorie contribution)
  const circumference = 2 * Math.PI * 82;
  const pCal = totals.protein*4, cCal = totals.carb*4, fCal = totals.fat*9;
  const totalCal = pCal + cCal + fCal;
  const setRing = (id, val, offsetVal) => {
    const el = document.getElementById(id);
    const len = totalCal > 0 ? (val/totalCal)*circumference : 0;
    el.setAttribute('stroke-dasharray', `${len} ${circumference}`);
    el.setAttribute('stroke-dashoffset', -offsetVal);
  };
  setRing('ringProtein', pCal, 0);
  setRing('ringCarb', cCal, (pCal/totalCal||0)*circumference);
  setRing('ringFat', fCal, ((pCal+cCal)/totalCal||0)*circumference);
  document.getElementById('kcalTotal').textContent = Math.round(totals.kcal);
}

function renderMicros(totals){
  const grid = document.getElementById('microGrid');
  grid.innerHTML = Object.keys(MICRO_REF).map(key => {
    const m = MICRO_REF[key];
    const val = totals[key];
    const pct = Math.min(100, (val/m.ref)*100);
    return `
      <div class="micro-item">
        <div class="macro-head">
          <span class="name">${m.label}</span>
          <span class="nums">${val.toFixed(1)} / ${m.ref} ${m.unit}</span>
        </div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%; background:${m.color};"></div></div>
      </div>
    `;
  }).join('');
}

function render(){
  const totals = computeTotals();
  renderLog();
  renderMacros(totals);
  renderMicros(totals);
}

render();