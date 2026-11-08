
/* Keep the short-landscape side inspector below the real toolstrip.
   Toolbar height varies by breakpoint and device text metrics, so a fixed
   87px offset cannot remain correct as the header evolves. */
(function(){
  const header=document.getElementById('topbar');
  const tools=document.getElementById('toolstrip');
  if(!header||!tools)return;
  let frame=0;
  function measure(){
    frame=0;
    const bottom=Math.ceil(Math.max(header.getBoundingClientRect().bottom,tools.getBoundingClientRect().bottom));
    if(Number.isFinite(bottom)&&bottom>0)
      document.documentElement.style.setProperty('--nij-landscape-dock-top',bottom+'px');
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(measure);}
  schedule();
  if(typeof ResizeObserver==='function'){
    const observer=new ResizeObserver(schedule);
    observer.observe(header);
    observer.observe(tools);
  }
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',()=>{schedule();setTimeout(schedule,100);},{passive:true});
  if(window.visualViewport)window.visualViewport.addEventListener('resize',schedule,{passive:true});
})();
