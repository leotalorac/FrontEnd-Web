var CACHE_NAME = 'task-manager-pwa';
var urlsToCache = [
 
];


self.addEventListener("fetch",()=>{

});


self.addEventListener("push",e=>{
  const data = JSON.parse(e.data.text());
  console.log(data);
  const title = data.titulo;
  const options = {
      body:data.cuerpo,
      icon:"icons/logo.png"
  };

  e.waitUntil(self.registration.showNotification(title,options));
});