
/* Toolbar popovers must be direct viewport overlays, never children of
   a horizontally clipped toolbar. Their IDs and original handlers stay intact. */
(function(){
  for(const id of ['rotpop','autopop','denoisepop']){
    const popup=document.getElementById(id);
    if(!popup){ console.error('NijRAW: missing toolbar popup',id); if(typeof toast==='function')toast('A toolbar control is unavailable: '+id); continue; }
    document.body.appendChild(popup);
    popup.setAttribute('role','dialog');
    popup.setAttribute('aria-label',id==='rotpop'?'Rotate and straighten':id==='autopop'?'Auto Improve options':'Noise reduction options');
  }
  const bar=document.getElementById('actionbar');
  if(bar)bar.addEventListener('scroll',function(){
    for(const id of ['rotpop','autopop','denoisepop']){
      const popup=document.getElementById(id);
      if(popup)popup.classList.remove('show');
    }
  },{passive:true});
})();
