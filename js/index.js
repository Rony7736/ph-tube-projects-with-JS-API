
function getTimeString(time){
    // get hour minute and seconds
    const hour = parseInt(time / 3600)
    let remainingSeconds = time % 3600
    const remainingMinuts = parseInt(remainingSeconds / 60)
    remainingSeconds = remainingSeconds % 60

    return `${hour} hour ${remainingMinuts} minuits ${remainingSeconds} seconds ago`;
}

const renoveActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn')
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove('active')
    }
    
}

// 1 - Fetch, Load and Show Categories on html

// create loadCategories
const loadCategories = () => {
    
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())                                         // response dile the block a execute hobe
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}


const loadVideos = () => {
    
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())                
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
}

const loadCategoryVideos = (id) => {
    // alert(id)

    // fetch the data 
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)        
    // diynamically category_id number change er jonno template string er vitore ${id} bosano hoise

    .then((res) => res.json())                
    // .then(data => displayVideos(data.category))                              // age amn cilo
    .then((data) => {

        // id r class ke remove kora
        renoveActiveClass()

        // id r class ke active kora
        const activeBtn = document.getElementById(`btn-${id}`)                // id ta uporer parameter er
        activeBtn.classList.add('active')
        
        displayVideos(data.category)
    })
    .catch(error => console.log(error))
}

const loadDetails = async (video_id) => {
    console.log(video_id);

    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`
    const res = await fetch(uri);
    const data = await res.json();
    
    displayDetails(data.video);
}

const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content")

    // showmodal add korar way - 1 
    // document.getElementById("showModalData").click();

    // showmodal add korar way - 2
    document.getElementById("customModal").showModal();

    detailContainer.innerHTML = `
        <img src="${video.thumbnail}">
        <p>${video.description}</p>
    `

}
/* github link er category item link theke copy

const cardDemo = {
    "category_id": "1003",
    "video_id": "aaac",
    "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
    "title": "Laugh at My Pain",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg", 
            "profile_name": "Kevin Hart",
            "verified": false
        }
    ],
    "others": {
        "views": "1.1K",
        "posted_date": "13885"
    },
    "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
}

*/


const displayVideos = (videos) => {

    const videoContainer = document.getElementById('video')
    videoContainer.innerHTML = "";                              // button a click korar pore ager data clear er jonno
    
 
    if(videos.length === 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="min-h-[600px] flex flex-col -gap-5 justify-center items-center">
            <img src="./assets/Icon.png">
            <h2 class="text-4xl font-bold text-center py-8">Oopps!! Sorry, There is no <br> content here</h2>
        </div>
        `; 

        return;
    }
    else{videoContainer.classList.add("grid")}

    videos.forEach(video => {
        // console.log(video);
        const card = document.createElement('div')

        card.classList = 'card card-compact'
        card.innerHTML = `
            <figure class="h-[300px] relative">
                <img class="h-full w-full object-cover" src=${video.thumbnail} alt="Shoes"/>
                ${
                    video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(video.others.posted_date)}</span>`
                }
                
            </figure>

            <div class="px-0 py-2 flex gap-2">
                <div>
                    <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}>
                </div>
                <div>
                    <h2 class="font-bold ">${video.title}</h2>
                    <div class="flex flex-row items-center gap-2">        
                        <p>${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified === true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">` : ""}

                    </div>
                    <p> <button onclick ="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button></p>
                </div>
            </div>
        `
        videoContainer.append(card)
    })   
}

// object theke copyh kora
// {
//     "category_id": "1001",
//     "category": "Music"
// }


// Create DisplayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')

    categories.forEach((item) => {                  // categories gulor upore foreach loop chalano hoise
        // console.log(item);

        /*
        // create normal button 

         const button = document.createElement('button')
         button.classList = 'btn'
         button.innerText = item.categories

         categoryContainer.append(button)

        */

        // create buttton with function

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}"  onclick = "loadCategoryVideos(${item.category_id})" class="btn category-btn">
                ${item.category}
            </button>
        `;


        // add button to caregory container
        categoryContainer.append(buttonContainer)
        
    })                        
}


loadCategories()
loadVideos()