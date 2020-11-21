// Your API key: 
// 563492ad6f917000010000010020991b2d794cec964a4171f2d76a77
const auth = "563492ad6f917000010000010020991b2d794cec964a4171f2d76a77";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector("form");
const moreBtn = document.querySelector(".more");
let searchValue;
let page=1;
let currentValue;
let fetchLink;

searchInput.addEventListener("input", updatePhoto);
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    currentValue = searchValue;
    searchPhoto(searchValue);
})
moreBtn.addEventListener("click", loadMore);



function updatePhoto(e){
    searchValue = e.target.value;
}

async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method:'GET',
        headers:{
            Accept:'application/json',
            Authorization: auth

        }
    });


    const data = await dataFetch.json();
    return data
}

 function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img> `;

        gallery.appendChild(galleryImg);
    });
}


async function curatedPhotos(){
    fetchLink="https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function searchPhoto(query){
    clear();
    fetchLink=`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data= await fetchApi(fetchLink);
       
    generatePictures(data);



}
function clear(){
    gallery.innerHTML ="";
    searchInput.value = "";
}

async function loadMore(){
    page++;
    if(currentValue){

        fetchLink = `https://api.pexels.com/v1/search?query=${currentValue}&per_page=15&page=${page}`;
        
    }else{
        fetchLink =`https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();

