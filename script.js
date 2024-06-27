const imageContainer = document.getElementById('image-container');

let photoArray=[];
let loadedImage=0;
let totalImages;
let count=0;
const YOUR_ACCESS_KEY = "zr0gSKKmFZQ0G406HDw7yKpmHZEBkzFdHKuwBQWNJ_M";
let ready = false;
let apiUrl=`https://api.unsplash.com/photos/random?client_id=${YOUR_ACCESS_KEY}&count=${count}`



function imageLoaded(){
console.log("ready")
 loadedImages++;
if (totalImages===loadedImages){
     count=10;
      ready=true;
  console.log('loaded');
}
}
async  function getPhotos(){
  try {
    const response=  await fetch(apiUrl);
      photoArray  = await response.json();
    console.log("photoArray");
    displayPhoto();
  }
  catch(error) {
    console.log("error");
  }
}
// create elements for links & photos, add to DOM
 photoArray.forEach((photo)=>{
     
     const item = document.createElement('a');
     //item.setAttribute('href',photo.links.html);
     //item.setAttribute('target','_blank');
     setAttributes(item,{href:photo.links.html, target:'_blank'});
     const image = document.createElement('img');
     //image.setAttribute('src',photo.urls.regular);
     //image.setAttribute('alt',photo.current_user_collections.description);
     //image.setAttribute('title',photo.current_user_collections.description);
     setAttributes(image,
        {
            src: photo.urls.regular,
            alt: photo.alt_description
        });
    image.addEventListener('load',imageLoaded);
     
     item.appendChild(image);
     imageContainer.appendChild(item);
 });
}


window.addEventListener('scroll',()=>{
  
  if (window.innerHeight+ window.scrollY >= document.body.offsetHeight - 1000 && ready){
    getPhotos();
    ready=false;
    console.log("scrolled")
  }
})
