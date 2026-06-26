const STORAGE_KEY='carShopV33Simple';
const brands=[['Toyota','toyota'],['Volkswagen','volkswagen'],['BMW','bmw'],['Mercedes-Benz','mercedesbenz'],['Audi','audi'],['Ford','ford'],['Honda','honda'],['Hyundai','hyundai'],['Kia','kia'],['Nissan','nissan'],['Mazda','mazda'],['Peugeot','peugeot'],['Renault','renault'],['Skoda','skoda'],['Volvo','volvo'],['Tesla','tesla'],['Chevrolet','chevrolet'],['Jeep','jeep'],['Porsche','porsche'],['Lexus','lexus']];
const models={Toyota:['Corolla','Camry','RAV4'],Volkswagen:['Golf','Passat','Tiguan'],BMW:['3 Series','5 Series','X5'],'Mercedes-Benz':['C-Class','E-Class','GLC'],Audi:['A3','A4','Q5'],Ford:['Focus','Fiesta','Kuga'],Honda:['Civic','Accord','CR-V'],Hyundai:['i30','Tucson','Santa Fe'],Kia:['Ceed','Sportage','Sorento'],Nissan:['Qashqai','Juke','X-Trail'],Mazda:['Mazda3','CX-5','CX-30'],Peugeot:['208','308','3008'],Renault:['Clio','Megane','Captur'],Skoda:['Octavia','Fabia','Kodiaq'],Volvo:['XC40','XC60','V60'],Tesla:['Model 3','Model Y','Model S'],Chevrolet:['Spark','Cruze','Malibu'],Jeep:['Renegade','Compass','Wrangler'],Porsche:['911','Cayenne','Macan'],Lexus:['IS','RX','NX']};
const years=['2021','2022','2023','2024','2025'];
const engines=['1.5 Petrol','2.0 Diesel','Hybrid','Electric'];
const vehicleGroups=['Filters','Engine','Brakes','Electrical','Suspension'];
const universalGroups=['Accessories','Tools','Fluids','Cleaning'];
const products=[
['oil-filter','Oil Filter','Filters','Oil Filter','Bosch','vehicle',18],['air-filter','Air Filter','Filters','Air Filter','Mann Filter','vehicle',22],['cabin-filter','Cabin Filter','Filters','Cabin Filter','Mahle','vehicle',26],['fuel-filter','Fuel Filter','Filters','Fuel Filter','Bosch','vehicle',30],
['spark-plugs','Spark Plug Set','Engine','Spark Plug','NGK','vehicle',42],['timing-belt','Timing Belt Kit','Engine','Timing Belt','Contitech','vehicle',120],['water-pump','Water Pump','Engine','Water Pump','SKF','vehicle',75],['engine-mount','Engine Mount','Engine','Engine Mount','Febi','vehicle',90],
['brake-pads','Brake Pads Front','Brakes','Brake Pads','Brembo','vehicle',60],['brake-disc','Brake Disc Front','Brakes','Brake Disc','ATE','vehicle',80],['brake-fluid','Brake Fluid DOT4','Brakes','Brake Fluid','ATE','vehicle',13],['brake-caliper','Brake Caliper','Brakes','Brake Caliper','TRW','vehicle',130],
['battery','Battery 75Ah','Electrical','Battery','Varta','vehicle',155],['alternator','Alternator','Electrical','Alternator','Bosch','vehicle',190],['starter','Starter Motor','Electrical','Starter Motor','Valeo','vehicle',170],['bulb','Headlight Bulb','Electrical','Bulb','Osram','vehicle',12],
['shock-front','Shock Absorber Front','Suspension','Shock Absorber','Sachs','vehicle',70],['control-arm','Control Arm','Suspension','Control Arm','Lemforder','vehicle',85],['spring','Coil Spring','Suspension','Coil Spring','KYB','vehicle',50],['stabilizer','Stabilizer Link','Suspension','Stabilizer Link','Febi','vehicle',20],
['phone-holder','Phone Holder','Accessories','Phone Holder','Baseus','universal',13],['warning-triangle','Warning Triangle','Accessories','Safety','CarPoint','universal',10],['first-aid','First Aid Kit','Accessories','Safety','Holthaus','universal',15],['floor-mats','Floor Mats','Accessories','Floor Mats','Petex','universal',30],
['socket-set','Socket Set','Tools','Socket Set','Proxxon','universal',45],['torque-wrench','Torque Wrench','Tools','Torque Wrench','Gedore','universal',80],['screwdrivers','Screwdriver Set','Tools','Screwdriver','Wera','universal',25],['jack','Hydraulic Jack','Tools','Jack','Michelin','universal',70],
['coolant','Coolant','Fluids','Coolant','Febi','universal',12],['screenwash','Screenwash','Fluids','Screenwash','Sonax','universal',6],['engine-oil','Engine Oil 5W-30','Fluids','Engine Oil','Castrol','universal',33],['adblue','AdBlue 10L','Fluids','AdBlue','Hoyer','universal',17],
['cloths','Microfiber Cloths','Cleaning','Cloths','Sonax','universal',8],['wheel-cleaner','Wheel Cleaner','Cleaning','Cleaner','Nigrin','universal',9],['interior-cleaner','Interior Cleaner','Cleaning','Cleaner','Sonax','universal',11],['car-shampoo','Car Shampoo','Cleaning','Shampoo','Meguiars','universal',7]
].map(([id,name,group,type,maker,partType,price])=>({id,name,group,type,maker,partType,price}));
const repairByGroup={Filters:[['remove-filter','Remove filter','Remove old selected filter',0.3,21],['install-filter','Install new filter','Install new selected filter',0.4,28]],Engine:[['remove-engine-part','Remove engine part','Remove selected engine part',0.8,56],['install-engine-part','Install engine part','Install selected engine part',1.1,77]],Brakes:[['remove-brakes','Remove brake parts','Remove selected brake parts',0.6,42],['install-brakes','Install brake parts','Install selected brake parts',0.9,63]],Electrical:[['diagnose-electrical','Electrical diagnostics','Check selected electrical system',0.7,49],['replace-electrical','Replace electrical part','Replace selected electrical part',0.8,56]],Suspension:[['inspect-suspension','Inspect suspension','Inspect selected suspension group',0.5,35],['replace-suspension','Replace selected suspension part','Replace selected suspension part',1.2,84]]};
let state={selectedBrand:'',selectedGroup:'',selectedGroupType:'',model:'',year:'',engine:'',plate:'',mileage:'',basket:[],orders:[],profile:{name:'',email:''},feedback:null,savedVehicle:null,currentUser:''};
function $(id){return document.getElementById(id)}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function load(){try{state={...state,...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}}catch{}}
window.addEventListener('DOMContentLoaded',()=>{load();wireAuth();renderStatic();showAuth()});
function wireAuth(){$('showLoginBtn').onclick=()=>toggleAuth('login');$('showRegisterBtn').onclick=()=>toggleAuth('register');$('loginBtn').onclick=login;$('registerBtn').onclick=register}
function toggleAuth(mode){const login=mode==='login';$('loginForm').style.display=login?'block':'none';$('registerForm').style.display=login?'none':'block';$('showLoginBtn').classList.toggle('active',login);$('showRegisterBtn').classList.toggle('active',!login);$('loginError').textContent=''}
function login(){
  const u=$('username').value.trim();
  const p=$('password').value;
  const users=JSON.parse(localStorage.getItem('registeredUsers')||'[]');
  const registeredUser=users.find(user=>user.username===u&&user.password===p);

  if(u==='testuser'&&p==='Password123'){
    state.currentUser='testuser';
    state.profile={...state.profile,name:'Test User',email:'testuser@example.com'};
    state.basket=[];
    state.orders=[];
    $('loginError').textContent='';
    showApp();
    save();
    return;
  }

  if(registeredUser){
    state.currentUser=registeredUser.username;
    state.profile={...state.profile,name:registeredUser.name,email:registeredUser.email};
    state.basket=[];
    state.orders=[];
    $('loginError').textContent='';
    showApp();
    save();
    return;
  }

  $('loginError').textContent='Invalid credentials';
}
function register(){
  const name=$('registerName').value.trim();
  const email=$('registerEmail').value.trim();
  const username=$('registerUsername').value.trim();
  const password=$('registerPassword').value;

  if(!name||!email||!username||!password){
    $('registerMessage').className='error';
    $('registerMessage').textContent='Please complete all registration fields.';
    return;
  }

  const users=JSON.parse(localStorage.getItem('registeredUsers')||'[]');
  const existingIndex=users.findIndex(user=>user.username===username);
  const userData={name,email,username,password};

  if(existingIndex>=0){
    users[existingIndex]=userData;
  }else{
    users.push(userData);
  }

  localStorage.setItem('registeredUsers',JSON.stringify(users));
  $('registerMessage').className='success';
  $('registerMessage').textContent='Registration successful. You can now login.';
  toggleAuth('login');
}
function showAuth(){$('authPage').style.display='grid';$('appPage').style.display='none'}
function showApp(){$('authPage').style.display='none';$('appPage').style.display='block';renderAll();showPage('manufacturers')}
function renderStatic(){$('brandGrid').innerHTML=brands.map(([name,slug])=>{
  const localBadges = {
    'Mercedes-Benz': '<div class="brand-local-logo mercedes-logo" aria-label="Mercedes-Benz logo"><span>✦</span></div>',
    'Lexus': '<div class="brand-local-logo lexus-logo" aria-label="Lexus logo"><span>L</span></div>'
  };
  const logoHtml = localBadges[name] || `<img class="brand-logo-img" src="https://cdn.simpleicons.org/${slug}" alt="${name} logo">`;
  return `<button id="brand-${safe(name)}" data-testid="brand-logo" class="brand-card" data-brand="${name}">${logoHtml}<strong>${name}</strong></button>`;
}).join('');document.querySelectorAll('[data-testid=brand-logo]').forEach(b=>b.onclick=()=>selectBrand(b.dataset.brand));renderGroups('vehicleGroups',vehicleGroups,'vehicle');renderGroups('universalGroupsHome',universalGroups,'universal');renderGroups('universalGroupsVehicle',universalGroups,'universal');fillSelect('model',[],'Select model');fillSelect('year',years,'Select year');fillSelect('engine',engines,'Select engine');document.querySelectorAll('.step').forEach(b=>b.onclick=()=>showPage(b.dataset.page));$('basketNavBtn').onclick=()=>showPage('basket');$('profileNavBtn').onclick=()=>showPage('profile');$('feedbackNavBtn').onclick=()=>showPage('feedback');$('logoutBtn').onclick=()=>{state.basket=[];state.orders=[];save();showAuth()};['model','year','engine','numberPlate','mileage'].forEach(id=>{$(id).onchange=saveVehicleFields});$('numberPlate').oninput=saveVehicleFields;$('mileage').oninput=saveVehicleFields;$('saveVehicleBtn').onclick=saveVehicle;['priceFilter','articleTypeFilter','manufacturerFilter'].forEach(id=>$(id).onchange=renderProducts);$('orderBtn').onclick=order;$('showOrderBtn').onclick=showLastOrder;$('saveProfileBtn').onclick=saveProfile;$('saveFeedbackBtn').onclick=saveFeedback}
function renderGroups(id,groups,type){$(id).innerHTML=groups.map(g=>`<button id="${type}-group-${safe(g)}" data-testid="${type}-part-group" class="group-card" data-group="${g}" data-type="${type}">${g}</button>`).join('');$(id).querySelectorAll('button').forEach(b=>b.onclick=()=>selectGroup(b.dataset.group,b.dataset.type))}
function fillSelect(id,list,placeholder){$(id).innerHTML=`<option value="">${placeholder}</option>`+list.map(x=>`<option>${x}</option>`).join('')}
function selectBrand(name){state.selectedBrand=name;state.model='';state.year='';state.engine='';state.plate='';state.mileage='';fillSelect('model',models[name]||[],'Select model');save();renderAll();showPage('vehicle')}
function selectGroup(group,type){state.selectedGroup=group;state.selectedGroupType=type;save();renderAll();showPage('products')}
function saveVehicleFields(){state.model=$('model').value;state.year=$('year').value;state.engine=$('engine').value;state.plate=$('numberPlate').value;state.mileage=$('mileage').value;renderSummary();save()}
function saveVehicle(){saveVehicleFields();if(!state.selectedBrand||!state.model){$('saveVehicleMessage').className='error';$('saveVehicleMessage').textContent='Select manufacturer and model first.';return}state.savedVehicle={brand:state.selectedBrand,model:state.model,plate:state.plate,mileage:state.mileage};$('saveVehicleMessage').className='success';$('saveVehicleMessage').textContent='Vehicle saved.';renderSavedVehicle();save()}
function renderSavedVehicle(){if(!state.savedVehicle){$('savedVehicleCard').style.display='none';return}$('savedVehicleCard').style.display='flex';const savedSlug=(brands.find(b=>b[0]===state.savedVehicle.brand)||['','car'])[1];
if(state.savedVehicle.brand==='Mercedes-Benz') $('savedVehicleLogo').innerHTML='<div class="brand-local-logo mercedes-logo"><span>✦</span></div>';
else if(state.savedVehicle.brand==='Lexus') $('savedVehicleLogo').innerHTML='<div class="brand-local-logo lexus-logo"><span>L</span></div>';
else $('savedVehicleLogo').innerHTML=`<img src="https://cdn.simpleicons.org/${savedSlug}" alt="${state.savedVehicle.brand} logo">`;$('savedVehicleManufacturer').textContent=state.savedVehicle.brand;$('savedVehicleModel').textContent=state.savedVehicle.model;$('savedVehiclePlate').textContent=state.savedVehicle.plate||'-';$('savedVehicleMileage').textContent=state.savedVehicle.mileage||'-'}
function showPage(page){document.querySelectorAll('.page').forEach(p=>p.style.display='none');$(`${page}Page`).style.display='block';document.querySelectorAll('.step').forEach(s=>s.classList.toggle('active',s.dataset.page===page));if(page==='products')renderProducts();if(page==='basket')renderBasket();if(page==='profile')renderProfile()}
function renderAll(){if(state.selectedBrand)fillSelect('model',models[state.selectedBrand]||[],'Select model');$('model').value=state.model||'';$('year').value=state.year||'';$('engine').value=state.engine||'';$('numberPlate').value=state.plate||'';$('mileage').value=state.mileage||'';$('selectedManufacturerText').textContent=state.selectedBrand?`Selected manufacturer: ${state.selectedBrand}`:'No manufacturer selected';document.querySelectorAll('.brand-card').forEach(b=>b.classList.toggle('selected',b.dataset.brand===state.selectedBrand));document.querySelectorAll('.group-card').forEach(b=>b.classList.toggle('selected',b.dataset.group===state.selectedGroup&&b.dataset.type===state.selectedGroupType));renderSavedVehicle();renderSummary();renderBasket()}
function renderSummary(){$('selectionSummary').textContent=[state.selectedBrand||'No manufacturer',state.model||'No model',state.year||'No year',state.engine||'No engine',state.selectedGroup||'No group',state.plate?`Plate: ${state.plate}`:'No plate',state.mileage?`Mileage: ${state.mileage}`:'No mileage'].join(' | ')}
function baseProducts(){return products.filter(p=>p.group===state.selectedGroup&&p.partType===state.selectedGroupType)}
function renderProducts(){renderSummary();const base=baseProducts();fillDynamicFilters(base);let list=base.filter(p=>(!$('priceFilter').value||p.price<=Number($('priceFilter').value))&&(!$('articleTypeFilter').value||p.type===$('articleTypeFilter').value)&&(!$('manufacturerFilter').value||p.maker===$('manufacturerFilter').value));$('productsList').innerHTML=list.length?list.map(productCard).join(''):'<p class="muted">No products for this selection.</p>';document.querySelectorAll('[data-testid=add-to-basket]').forEach(b=>b.onclick=()=>addProduct(b.dataset.id));renderRepairs()}
function fillDynamicFilters(list){const ct=$('articleTypeFilter').value,cm=$('manufacturerFilter').value;const types=[...new Set(list.map(p=>p.type))].sort(),makers=[...new Set(list.map(p=>p.maker))].sort();$('articleTypeFilter').innerHTML='<option value="">All article types</option>'+types.map(x=>`<option>${x}</option>`).join('');$('manufacturerFilter').innerHTML='<option value="">All manufacturers</option>'+makers.map(x=>`<option>${x}</option>`).join('');if(types.includes(ct))$('articleTypeFilter').value=ct;if(makers.includes(cm))$('manufacturerFilter').value=cm}
function productCard(p){return `<article class="product-card" data-testid="product-card"><h3>${p.name}</h3><p>Type: ${p.type}</p><p>Manufacturer: ${p.maker}</p><p>Group: ${p.group}</p><p class="price">€${p.price.toFixed(2)}</p><div class="actions"><input id="qty-${p.id}" type="number" min="1" value="1"><button data-testid="add-to-basket" data-id="${p.id}">Add to basket</button></div></article>`}
function renderRepairs(){const rows=state.selectedGroupType==='vehicle'?(repairByGroup[state.selectedGroup]||[]):[];$('repairTimesBody').innerHTML=rows.length?rows.map(r=>`<tr data-testid="repair-time-row"><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>€${r[4].toFixed(2)}</td><td><button data-testid="add-repair-time" data-id="${r[0]}">Add</button></td></tr>`).join(''):'<tr><td colspan="5">No repair times for this selection.</td></tr>';document.querySelectorAll('[data-testid=add-repair-time]').forEach(b=>b.onclick=()=>addRepair(b.dataset.id))}
function addProduct(id){const p=products.find(x=>x.id===id),qty=Number($(`qty-${id}`).value)||1;addItem({key:`product-${id}`,itemType:'product',name:p.name,price:p.price,quantity:qty})}
function addRepair(id){const r=(repairByGroup[state.selectedGroup]||[]).find(x=>x[0]===id);addItem({key:`repair-${id}`,itemType:'repair-time',name:r[1],price:r[4],quantity:1})}
function addItem(item){item.vehicle=state.selectedBrand?`${state.selectedBrand} ${state.model}`:'Universal';item.year=state.year||'Any';item.engine=state.engine||'Any';item.plate=state.plate;item.mileage=state.mileage;const existing=state.basket.find(x=>x.key===item.key);if(existing)existing.quantity+=item.quantity;else state.basket.push(item);toast(`${item.quantity} x ${item.name} added to basket.`);renderBasket();save()}
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toast.t);toast.t=setTimeout(()=>$('toast').classList.remove('visible'),3000)}
function renderBasket(){$('basketCount').textContent=state.basket.reduce((s,i)=>s+i.quantity,0);const prods=state.basket.filter(i=>i.itemType==='product'),reps=state.basket.filter(i=>i.itemType==='repair-time');$('basketProducts').innerHTML='<h3>Product parts</h3>'+basketList(prods,'No products in basket');$('basketRepairs').innerHTML='<h3>Repair times</h3>'+basketList(reps,'No repair times in basket');$('basketTotal').textContent='€'+state.basket.reduce((s,i)=>s+i.price*i.quantity,0).toFixed(2);document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{state.basket=state.basket.filter(i=>i.key!==b.dataset.remove);renderBasket();save()})}
function basketList(list,empty){return list.length?list.map(i=>`<div class="basket-item" data-testid="basket-item"><strong>${i.name}</strong><p>${i.vehicle} | ${i.year} | ${i.engine} ${i.plate?'| Plate: '+i.plate:''} ${i.mileage?'| Mileage: '+i.mileage:''}</p><p>Qty: ${i.quantity} | €${(i.price*i.quantity).toFixed(2)}</p><button data-remove="${i.key}">Remove</button></div>`).join(''):`<p class="muted">${empty}</p>`}
function order(){if(!state.basket.length){$('orderMessage').className='error';$('orderMessage').textContent='Basket is empty.';return}const o={id:Math.floor(100000+Math.random()*900000),items:[...state.basket],total:state.basket.reduce((s,i)=>s+i.price*i.quantity,0)};state.orders=[o];state.basket=[];$('showOrderBtn').style.display='inline-block';$('orderMessage').className='success';$('orderMessage').textContent=`Order ${o.id} placed successfully.`;renderBasket();save()}
function showLastOrder(){const o=state.orders[0];if(!o)return;const parts=o.items.filter(i=>i.itemType==='product'),reps=o.items.filter(i=>i.itemType==='repair-time');$('orderDetails').style.display='block';$('orderDetails').innerHTML=`<h3>Order ${o.id}</h3><h4>Ordered parts</h4>${basketList(parts,'No ordered parts')}<h4>Ordered repair times</h4>${basketList(reps,'No repair times')}`}
function renderProfile(){const p=state.profile||{};$('profileName').value=p.name||'';$('profileBirthDate').value=p.birthDate||'';$('profileCity').value=p.city||'';$('profileCountry').value=p.country||'';$('profileEmail').value=p.email||'';$('genderMale').checked=p.gender==='Male';$('genderFemale').checked=p.gender==='Female'}
function saveProfile(){
  state.profile={
    name:$('profileName').value,
    birthDate:$('profileBirthDate').value,
    gender:$('genderFemale').checked?'Female':($('genderMale').checked?'Male':''),
    city:$('profileCity').value,
    country:$('profileCountry').value,
    email:$('profileEmail').value
  };

  if(state.currentUser && state.currentUser!=='testuser'){
    const users=JSON.parse(localStorage.getItem('registeredUsers')||'[]');
    const user=users.find(item=>item.username===state.currentUser);
    if(user){
      user.name=state.profile.name;
      user.email=state.profile.email;
      localStorage.setItem('registeredUsers',JSON.stringify(users));
    }
  }

  $('profileMessage').textContent='Profile saved.';
  save();
}
function saveFeedback(){state.feedback={type:$('feedbackType').value,message:$('feedbackMessage').value};$('feedbackResult').textContent='Feedback saved.';$('latestFeedback').textContent=`${state.feedback.type}: ${state.feedback.message}`;save()}
function safe(x){return x.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
