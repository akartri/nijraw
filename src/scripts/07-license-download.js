
async function nijDownloadLicenseText(id,filename){
  const node=document.getElementById(id);
  if(!node||!node.textContent){
    if(typeof toast==='function')toast('This license text is unavailable.');
    return;
  }
  const blob=new Blob([node.textContent],{type:'text/plain;charset=utf-8'});
  await dl(blob,filename);
}
