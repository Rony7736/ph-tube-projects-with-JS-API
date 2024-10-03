

// 1 - Fetch, Load and Show Categories on html

// create loadCategories
const loadCategories = () => {
    
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())                // response dile the block a execute hobe
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}


// object theke copyh kora
// {
//     "category_id": "1001",
//     "category": "Music"
// }


// Create DisplayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')

    categories.forEach((item) => {                  // categories er upore foreach loop chalano hoise
        console.log(item);

        // create a button
        const button = document.createElement('button')
        button.classList = 'btn'
        button.innerText = item.categories

        // add button to caregory container
        categoryContainer.append(button)
        
    })                        
}


loadCategories()
loadVideos()