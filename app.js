const films = [
 {title:'Beyond the threshold',learner:'Alex Morgan',initials:'AM',type:'Environment',detail:'A study in scale, light and impossible architecture.',image:'bronze-portal',clip:'portal',label:'Environment reveal',tag:'Unreal Engine',number:'01'},
 {title:'The world beneath',learner:'Jamie Chen',initials:'JC',type:'Environment',detail:'From wireframe to a world worth exploring.',image:'digital-landscape',clip:'landscape',label:'World building',tag:'Unreal Engine',number:'02'},
 {title:'Into the golden hour',learner:'Alex Morgan',initials:'AM',type:'Cinematic',detail:'Finding a story in the spaces between worlds.',image:'bronze-portal',clip:'portal',label:'Lighting study',tag:'Cinematic',number:'03'},
 {title:'Signals from the summit',learner:'Jamie Chen',initials:'JC',type:'Cinematic',detail:'A quiet journey through a digital wilderness.',image:'digital-landscape',clip:'landscape',label:'Concept film',tag:'Cinematic',number:'04'}
];
let category='All';
const grid=document.querySelector('#grid');
function render(){
 const query=document.querySelector('#search').value.trim().toLowerCase();
 const shown=films.filter(f=>(category==='All'||f.type===category)&&`${f.title} ${f.learner} ${f.label}`.toLowerCase().includes(query));
 grid.querySelectorAll('video').forEach(v=>v.pause());
 grid.innerHTML=shown.map(f=>`<article class="card"><div class="media"><video tabindex="0" playsinline preload="none" poster="assets/${f.image}.png" aria-label="${f.title} — sample concept clip"><source src="assets/${f.clip}.mp4" type="video/mp4">Your browser does not support video.</video><button class="play-cover" aria-label="Play ${f.title}"><span class="film-kind">${f.label.toUpperCase()}</span><span class="play-circle"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3L21 12L5 21Z"/></svg></span><span class="play-label">Watch film · Silent concept</span><span class="duration">0:08</span></button><div class="video-error" role="alert" hidden><p>This clip could not load.</p><button class="retry" type="button">Try again</button></div></div><div class="card-info"><div><h3>${f.title}</h3><p class="description">${f.detail}</p></div><span class="index">/${f.number}</span></div><div class="learner"><span class="avatar" aria-hidden="true">${f.initials}</span><span class="credit"><strong>${f.learner}</strong><small>Games Development · Year 2</small></span><span class="tag">${f.tag}</span></div></article>`).join('');
 document.querySelector('#result-count').textContent=`${shown.length} ${shown.length===1?'film':'films'} · ${new Set(shown.map(f=>f.learner)).size} ${new Set(shown.map(f=>f.learner)).size===1?'creator':'creators'}`;
 document.querySelector('#empty').hidden=shown.length>0;
 grid.querySelectorAll('.media').forEach(media=>{
  const video=media.querySelector('video'),button=media.querySelector('button');
  const error=media.querySelector('.video-error'),retry=media.querySelector('.retry');
  function failed(){
   const hadFocus=media.contains(document.activeElement);
   error.hidden=false;button.hidden=true;video.controls=false;
   if(hadFocus)retry.focus();
  }
  async function play(){
   error.hidden=true;button.hidden=true;video.controls=true;
   video.focus();
   try{await video.play();}catch{failed();}
  }
  button.addEventListener('click',play);
  retry.addEventListener('click',()=>{video.load();play();});
  video.addEventListener('play',()=>{grid.querySelectorAll('video').forEach(v=>{if(v!==video)v.pause();});});
  video.addEventListener('error',failed);
  video.addEventListener('ended',()=>{
   const hadFocus=document.activeElement===video;
   video.controls=false;button.hidden=false;
   if(hadFocus)button.focus();
  });
 });
}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.type;document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render();}));
document.querySelector('#search').addEventListener('input',render);
document.querySelector('#reset').addEventListener('click',()=>{document.querySelector('#search').value='';document.querySelector('[data-type="All"]').click();document.querySelector('#search').focus();});
render();
