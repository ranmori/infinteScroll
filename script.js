const imageContainer = document.getElementById('image-container');
// make an image array
let photoArray = [];
let loadedImage = 0;
let totalImages = 0;
// you can also set count to 0
let count = 30;
let ready = false;

// get the api from unsplash free api
const apiKey = 'MSa4BcQDK0Re27ekRQl5ibIXSzTMsaLXHSYN5sg8J44';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;



function imageLoaded(){
console.log("ready")
 loadedImage++;
if (loadedImage === totalImages){
      ready=true;
  console.log('loaded');
}
}
function setAttributes(element,attributes){
  for (const key in attributes){
    element.setAttribute(key,attributes[key]);
  }
}

// add to dom

function displayPhoto(){
  loadedImage=0;

  totalImages = photoArray.length;
  photoArray.forEach((photo)=>{
    //create a link to unsplash
    const item=document.createElement('a');
    setAttributes(item,
                  { href: photo.links.html,
      target: '_blank',
                       });
    // create an image element
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // check if image is loaded
    img.addEventListener('load', imageLoaded);
    //add image to imageconatiner and link element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// get the photos using async and await
async  function getPhotos(){
  try {
    const response=  await fetch(apiUrl);
      photoArray  = await response.json();
    //console.log("photoArray");
    displayPhoto();
  }
  catch(error) {
    //console.log("error");
  }
}
// check if scroll on the bottom

window.addEventListener('scroll', () => {
  
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
     ready=false;
    getPhotos();
   
    console.log("scrolled");
  }
});

// on load call function
getPhotos();
