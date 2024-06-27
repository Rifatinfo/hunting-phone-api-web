const loadPhone = async(searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards 
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones 
      const showAllContainer =  document.getElementById('show-all-container');
      if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
      }
      else{
        showAllContainer.classList.add('hidden');
      }
      console.log('is show all', isShowAll);
    // display only first 12 phones 
    if(!isShowAll){
        phones =  phones.slice(0, 12);
    }
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
                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phones.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
                `;
                // append child 
                phoneContainer.appendChild(phoneCard);

    });

      // hide loading spinner 
      toggleLoadingSpinner(false);
}

// modals 
const handleShowDetails = async(id) => {
  console.log('handle show all', id);
  // load single phone data 
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   const phone = data.data;
   console.log(data);
   showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
   console.log(phone);
   const phoneName = document.getElementById('show-details-phone-name');
   phoneName.innerText = phone.name;
  //  <p><span>GPS : </span> ${phone?.others?.GPS || 'No GPS'}</p> 

   const showDetailContainer = document.getElementById('show-details-container');
   showDetailContainer.innerHTML = `
   <div class="flex justify-center items-center p-5"> <img src="${phone.image}" alt="" /></div>
    <p><span class="text-xl font-semibold">Display Size :</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="text-xl font-semibold"> Chipset :</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="text-xl font-semibold">Memory :</span> ${phone?.mainFeatures?.memory}</p>
    <p> <span class="text-xl font-semibold">Slug :</span>${phone?.slug}</p>
    <p> <span class="text-xl font-semibold">Release data : </span>${phone?.releaseDate}</p>
    <p><span>Storage : </span>${phone?.mainFeatures?.storage}</P>
    <p><span Release data :>GPS : </span> ${phone?.others?.GPS ? phone.others.GPS :  'No GPS available in this device'}</p>
   `


   // show the modal 
   show_details_modal.showModal();
}

// handle search button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
} 

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all 
const handleShowAl = () => {
    handleSearch(true);
}

// loadPhone();

