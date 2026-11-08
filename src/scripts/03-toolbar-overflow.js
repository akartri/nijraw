
/* Navigation cue for the horizontally scrollable editing toolbar. */
(function(){
  const bar=document.getElementById('actionbar');
  const cue=document.getElementById('toolstrip-chevron');
  if(!bar||!cue){console.error('NijRAW: toolbar navigation controls missing');return;}
  let frame=0;
  function sync(){
    frame=0;
    // The cue owns a flex cell, so measure overflow against the full toolstrip
    // width to avoid visibility flicker when the cue itself takes up space.
    const strip=document.getElementById('toolstrip');
    const contentWidth=bar.scrollWidth;
    const overflow=contentWidth-(strip?strip.clientWidth:bar.clientWidth)>4;
    cue.hidden=!overflow;
    const max=Math.max(0,bar.scrollWidth-bar.clientWidth);
    if(cue.hidden)return;
    const atEnd=bar.scrollLeft>=max-4;
    cue.toggleAttribute('data-back',atEnd);
    const label=atEnd?'Earlier tools':'More tools';
    cue.querySelector('.toolstrip-chevron-text').textContent=atEnd?'Back':'More';
    cue.setAttribute('aria-label',label+' — tap to scroll the toolbar');
    cue.title=label+' — tap or swipe sideways';
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(sync);}
  cue.addEventListener('click',function(){
    const max=Math.max(0,bar.scrollWidth-bar.clientWidth);
    const back=bar.scrollLeft>=max-4;
    const amount=Math.max(180,bar.clientWidth*.68);
    const next=back?Math.max(0,bar.scrollLeft-amount):Math.min(max,bar.scrollLeft+amount);
    bar.scrollTo({left:next,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    schedule();
  });
  bar.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  if(typeof ResizeObserver==='function')new ResizeObserver(schedule).observe(bar);
  if(typeof MutationObserver==='function')new MutationObserver(schedule).observe(bar,{childList:true,subtree:true,attributes:true,attributeFilter:['style','class']});
  schedule();
})();
