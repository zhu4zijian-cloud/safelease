export const normalize = s => s.trim().toUpperCase().replace(/\s+/g,' ');
export function compareNames(masked,owner){
 const a=normalize(masked),b=normalize(owner),words=a.split(' '),target=b.split(' ');
 if(!a||!b)return 'empty';
 if(/\b(PTE|LTD|LLP|SERVICES)\b/.test(a+' '+b))return 'manual';
 if(!/^[A-Z X]+$/.test(a)||!/^[A-Z ]+$/.test(b))return 'manual';
 if(a.replace(/[X ]/g,'').length<3)return 'few';
 if(words.length!==target.length)return 'mismatch';
 const match=words.every((word,i)=>{
  const tail=word.endsWith('XX'); const prefix=tail?word.slice(0,-2):word;
  const rx='^'+prefix.replace(/X/g,'[A-Z]')+(tail?'[A-Z]{1,3}':'')+'$';
  return new RegExp(rx).test(target[i]);
 });return match?'match':'mismatch';
}
export function daysBetween(a,b){return Math.ceil((new Date(b+'T12:00:00Z')-new Date(a+'T12:00:00Z'))/86400000)}
export function addDays(date,days){let d=new Date(date+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+Number(days));return d.toISOString().slice(0,10)}
export function leaseMonths(start,end){const s=new Date(start+'T00:00:00Z'),e=new Date(addDays(end,1)+'T00:00:00Z');let m=(e.getUTCFullYear()-s.getUTCFullYear())*12+e.getUTCMonth()-s.getUTCMonth();if(e.getUTCDate()>s.getUTCDate())m++;return Math.max(0,m)}
export function validLink(v){try{return ['http:','https:'].includes(new URL(v).protocol)}catch{return false}}
export function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
export const defaultState=()=>({lang:'en',demo:true,name:'Lin Yue',email:'lin.yue@example.com',school:'Orchard Institute',lease:{address:'Blk 456 Clementi Ave 3 #08-12',owner:'Tan Mei Ling',start:'2027-08-01',end:'2029-01-31',deposit:950,rent:950,refundDays:14,clause:'4.2'},rooms:[{name:'Bedroom',zh:'卧室',required:6},{name:'Bathroom',zh:'浴室',required:5},{name:'Kitchen',zh:'厨房',required:5},{name:'Living room',zh:'客厅',required:7}],record:{status:'draft',started:null,confirmed:null},checks:[],reminders:true,notificationsRead:false,renewal:12,refundReceived:false,template:0,letters:{},reviewDrafts:[]});
let db;
export async function database(){if(db)return db;db=await new Promise((resolve,reject)=>{const req=indexedDB.open('safelease-photos',1);req.onupgradeneeded=()=>req.result.createObjectStore('photos',{keyPath:'id'});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)});return db}
export async function photoStore(action,value){const d=await database();return new Promise((resolve,reject)=>{const tx=d.transaction('photos',action==='getAll'?'readonly':'readwrite'),s=tx.objectStore('photos');let req=action==='getAll'?s.getAll():action==='clear'?s.clear():s.put(value);tx.oncomplete=()=>resolve(req.result);tx.onerror=()=>reject(tx.error)})}
