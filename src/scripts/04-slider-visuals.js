
/* ── Visual-only slider fill sync (additive; touches no app logic) ──────────
   Sets --fa/--fb percent color-stops on every range input so the CSS can
   paint a value fill: bipolar sliders (min<0<max) fill outward from centre,
   unipolar sliders fill from the left. Sync on real interactions, explicit
   slider-state updates, and panel creation: no 120-ms background polling. */
var syncRangeFills;
(function(){
  function upd(el){
    var min = el.min === '' ? 0 : Number(el.min);
    var max = el.max === '' ? 100 : Number(el.max);
    var span = max - min; if (!(span > 0)) return;
    var p = (Number(el.value) - min) / span * 100;
    p = Math.max(0, Math.min(100, p));
    var a, b;
    if (min < 0 && max > 0){
      if (!el.hasAttribute('data-bi')) el.setAttribute('data-bi','');
      var c = (0 - min) / span * 100;
      a = Math.min(p, c); b = Math.max(p, c);
    } else { a = 0; b = p; }
    el.style.setProperty('--fa', a.toFixed(3) + '%');
    el.style.setProperty('--fb', b.toFixed(3) + '%');
    el._fillV = el.value;
  }
  function scan(){
    var els = document.querySelectorAll('input[type=range]');
    for (var i = 0; i < els.length; i++) if (els[i]._fillV !== els[i].value) upd(els[i]);
  }
  syncRangeFills = scan;
  var pending=0;
  function scheduleScan(){
    if(pending || document.hidden) return;
    pending=requestAnimationFrame(function(){pending=0;scan();});
  }
  document.addEventListener('input', function(e){
    var t = e.target; if (t && t.type === 'range') upd(t);
  }, true);
  document.addEventListener('change', function(e){
    var t = e.target; if (t && t.type === 'range') upd(t);
  }, true);
  document.addEventListener('click',scheduleScan);
  document.addEventListener('keyup',scheduleScan);
  document.addEventListener('visibilitychange',function(){if(!document.hidden)scheduleScan();});
  if(typeof MutationObserver==='function'){
    new MutationObserver(scheduleScan).observe(document.body,{subtree:true,childList:true});
  }
  scan();
})();
