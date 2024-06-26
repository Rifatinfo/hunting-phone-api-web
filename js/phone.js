const loadPhone = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards 
    phoneContainer.textContent = '';

    // display only first 12 phones 
    phones =  phones.slice(0, 12);
    phones.forEach( phones => {
        console.log(phones);
        // 2 create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        // 3 set inner HTML 
        phoneCard.innerHTML = `
                    <figure>
                      <img
                        src="${phones.image}"
                        alt="" />
                    </figure>
                    <div class="card-body">
                      <h2 class="card-title">${phones.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                `;
                // append child 
                phoneContainer.appendChild(phoneCard);

    });
}

// handle search button 
const handleSearch = () => {
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    console.log(searchText);
    loadPhone(searchText);
} 


loadPhone();

