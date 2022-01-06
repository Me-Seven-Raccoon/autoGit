const inputText = document.querySelector('.inputText');
const buttonSearch = document.querySelector('.search');
const conteinerSearch = document.querySelector('.conteiner_search');
const conteinerList = document.querySelector('.conteiner-list');
const conteinerName = document.querySelector('.name');
const buttonDele = document.querySelector('.buttonDel');

function getPost(text){
    return fetch(`https://api.github.com/search/repositories?q=${text}`)
        .then(response => response.json())
}

function elRedactName(el){
    const info = document.createElement('div');
    info.classList.add('name')
    info.id = el.id
    info.textContent = el.full_name
    return info
}

function elRedactAll(el){
    const contElement = document.createElement('div');
    contElement.classList.add('contElement');
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('buttonDel');
    const info = document.createElement('div');
    info.classList.add('conteinerInfo')
    const name = document.createElement('p');
    name.textContent = `Name: ${el.name}`;
    const owner = document.createElement('p');
    owner.textContent = `Owner: ${el.owner.login}`;
    const star = document.createElement('p');
    star.textContent = `Stars: ${el.stargazers_count}`;
    info.appendChild(name);
    info.appendChild(owner);
    info.appendChild(star);
    contElement.appendChild(info);
    contElement.appendChild(buttonDelete);
    return contElement;
}

const debounce = (fn, debounceTime) => {
    let time;
  return function (){
    const call = () => { fn.apply(this, arguments)}
    clearTimeout(time);
    time = setTimeout(call, debounceTime)
  }
};


function result(){
// inputText.addEventListener('keyup', run => {
    let text = inputText.value;
    getPost(text).then(content => {
        const newArr = content.items
        const elArr = [];
        for(let i = 0; i < newArr.length; i++){
            if(i < 5){
                elArr.push(newArr[i]);
                const elName = elRedactName(newArr[i])
                conteinerSearch.appendChild(elName)
            }
        }
        conteinerSearch.addEventListener('click', (e) => {
            if(e.target.classList.contains('name')){
                for(let i = 0; i < elArr.length; i++){
                    if(e.target.id == elArr[i].id){
                        const elInfo = elRedactAll(elArr[i])
                        conteinerList.appendChild(elInfo)
                    }
                }
                inputText.value ='';
                conteinerSearch.innerHTML ='';
            }
        })
        conteinerList.addEventListener('click', (e) => {
            if (e.target.classList.contains('buttonDel')){
               e.target.closest('.contElement').remove();
            }
        })
    })
// }) 
}
let run = debounce(result, 1000)
inputText.addEventListener('keyup', run)









