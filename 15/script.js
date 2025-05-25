const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
//incearca sa le iei din local storage daca nu lasa empty array
const items = JSON.parse(localStorage.getItem('items')) || [];

const checkAllBtn = document.querySelector('.check-all');
const uncheckAllBtn = document.querySelector('.uncheck-all');
const clearAllBtn = document.querySelector('.clear-all');

function addItem(e){
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;//ne vom uita inauntru la tot form tegul si vom cauta ceva cu numele item
  const item={
    text:text,
    done:false
  }
  items.push(item);
  populateList(items,itemsList);
  localStorage.setItem('items',JSON.stringify(items));//pune in localstorage itemul
  this.reset();//form element are aceasta proprietate
  
}

//pot pune orice array si orice destinatie.De fiecare data cand adaugam un element va recreea intreaga lista 
function populateList(plates=[],platesList){
  if (plates.length === 0) {
    platesList.innerHTML = '<li>Loading Tapas...</li>';
    return;
  }
  //Introduce conținutul HTML generat în interiorul elementului DOM platesList
  platesList.innerHTML=plates.map((plate,i) =>{
    return `
      <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
        <label for="item${i}">${plate.text}</label>
        <button class="delete-item" data-index="${i}">🗙</button>
      </li>    
    `;
  }).join('');
}

function toggleDone(e){
  if(!e.target.matches('input'))return;//daca dai click altundeva
  const el=e.target;// elementul pe care s-a dat click(checkboxul)
  const index=el.dataset.index;// preia indexul din atributul data-index al inputului
  items[index].done=!items[index].done;//// inversează valoarea 'done' (true devine false și invers)
  localStorage.setItem('items',JSON.stringify(items));
  populateList(items,itemsList);

}

// Bifează tot
checkAllBtn.addEventListener('click', () => {
  items.forEach(item => item.done = true);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
});

// Debifează tot
uncheckAllBtn.addEventListener('click', () => {
  items.forEach(item => item.done = false);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
});

// Șterge tot
clearAllBtn.addEventListener('click', () => {
  items.length = 0; // golește array-ul
  localStorage.removeItem('items');
  populateList(items, itemsList);
});

//event listener pentru butoanele de șters 
itemsList.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-item')) {
    const index = e.target.dataset.index;
    items.splice(index, 1); // elimină elementul
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }
});

addItems.addEventListener('submit',addItem);
itemsList.addEventListener('click',toggleDone);
populateList(items,itemsList);
