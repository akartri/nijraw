
// This tiny handler runs before the large offline RAW modules are parsed.
// Cancel therefore works even during the earliest startup loading screen.
window.nijStartupRestoreSkip=false;
window.nijStartupRestorePrepared=false;
document.getElementById('progcancel').addEventListener('click',function(){
  if(window.nijStartupRestorePrepared)return;
  window.nijStartupRestoreSkip=true;
  document.getElementById('prog').classList.remove('show');
});
