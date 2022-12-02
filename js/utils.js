// class NetworkError extends Error {
//     constructor(msg, response) {
//       super(msg);
//       this.name = 'NetworkError';
//       this.response = response;
//       this.status = response.status;
//       this.statusText = response.statusText;
//     }
//   }
  
//   export { NetworkError };
  
import pickRandomName from './catlist.js';
//   Sample usage of custom NetworkError
 document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('card');
    let category = document.getElementById('category');
    
    fetch('https://api.thecatapi.com/v1/breeds?limit=7')
          .then(response => {
            if( ! response.ok ) throw new NetworkError('Failed API Call', response);
            return response.json();
          })
          .then(data => {     
                  category.innerHTML = data.map(item => {    
                    return `
                    <option value="${item.id}">${item.name}</option>
                    `
                  }).join('');                      
          })
          .catch(err=>{
            //handle the error and tell the user
        });

    category.addEventListener('change', function(){
    let valor = category.value;
    console.log(valor)
    const url =  `https://api.thecatapi.com/v1/images/search?limit=30&breed_ids=${valor}`;  
    let catnames = {};    
        fetch(url)
          .then(response => {
            if( ! response.ok ) throw new NetworkError('Failed API Call', response);
            return response.json();
          })
          .then(data => {     
             if(data.length > 0){   
                if(document.getElementById('p')){
                  document.getElementById('p').remove();
                }  
                data.forEach(element => catnames[element.id] = pickRandomName());
                localStorage.setItem('Cats', JSON.stringify(catnames));
                let cats = JSON.parse(localStorage.getItem('Cats'))
                //you have the json data to use
                  let content = data.map(item => {    
                    console.log(cats[item.id]);
                    return `
                      <div class="cat-details" id="cats">
                        <img src="${item.url}" alt="cats">
                        <span class="name">${cats[item.id]}</span>
                      </div>
                    `
                  }).join('');
                  card.innerHTML = content;
                                    
             }  else {
                document.getElementById('card').remove();
                const section = document.querySelector('section');
                let p = document.createElement('p');
                    p.id = 'p'
                    p.innerText = 'Please select a category to find some cats';
                    section.appendChild(p);
             }     
          })
          .catch(err=>{
            //handle the error and tell the user
          });
        });

  });

