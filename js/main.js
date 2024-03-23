var elMovList = document.querySelector('.movie__list')
var elSel__category = document.querySelector('.sel__category')
var  partMovie = movies.splice(1,100)
var elOffBody = document.querySelector('.offcanvas-body')
function fnRender(data) {
  var locData = JSON.parse(window.localStorage.getItem('localData'))
  elMovList.innerHTML = ''
  data.forEach((item)=>{
    var newLi = document.createElement('li')
    newLi.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="	https://i.ytimg.com/vi/${item.ytid}/hq720.jpg?" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${item.Title}</h5>
    <p class="card-text">${item.fulltitle}</p>
    <p class="card-text">${item.movie_year}</p>
    <p class="card-text">${item.imdb_rating}</p>
    <div class="d-flex align-items-center justify-content-between">
    <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" class="btn btn-primary">Go somewhere</a>
    <i onclick="setId('${item.ytid}')" 
    class="${locData.find((j)=> j.ytid == item.ytid)?'bi bi-heart-fill text-danger' : 'bi bi-heart text-dark'}"></i>
    </div>
    </div>
    </div>
    `

    elMovList.appendChild(newLi)
  });
}
  
function fnYear(value){
  if(value == 'old'){
    fnRender(partMovie.sort((a,b)=>a.movie_year - b.movie_year));
  }else{
    fnRender(partMovie.sort((a,b)=>b.movie_year - a.movie_year));
  }
}

function fnRating(value) {
  if(value == 'min'){
    fnRender(partMovie.sort((a,b)=>a.imdb_rating - b.imdb_rating));
  }else{
    fnRender(partMovie.sort((a,b)=>b.imdb_rating - a.imdb_rating));
  }
}



  var CategoriesArr = []
  partMovie.forEach((item)=> {
    if(CategoriesArr.includes(item.Categories) == false){
      CategoriesArr.push(item.Categories)
    }
  })
  CategoriesArr.sort().forEach((item)=>{
    var newOption = document.createElement('option')
    newOption.textContent = item
    newOption.value = item
    elSel__category.appendChild(newOption)
  })

function fnCategory(value) {
  fnRender(partMovie.filter((item)=> item.Categories == value));
}

function  fnCategory(value){
  fnRender(partMovie.filter((item)=>item.Categories == value));
 }


 function fnSearch(value){
    value.preventDefault()
    var val = value.target.inpSearch.value
    fnRender(partMovie.filter((item)=>item.Title.toString().toLowerCase().includes(val.toLowerCase()) == true));
 }



 var faoArr = []
 
 function setId(id){
  if(window.localStorage.getItem('localData')){
   faoArr = JSON.parse(window.localStorage.getItem('localData'))
  }
  if (faoArr.find((item)=> item.ytid == id)) {
    console.log();
    window.localStorage.setItem('localData', JSON.stringify(faoArr.filter((i) => i.ytid != id)))
  }else{
    faoArr.push(locArr.find((item)=> item.ytid == id))
    window.localStorage.setItem('localData', JSON.stringify(faoArr))
  }
  fnRender(partMovie) 
}
fnLocDataRender()

function fnLocDataRender() {
  if(window.localStorage.getItem('localData')){
    faoArr = JSON.parse(window.localStorage.getItem('localData'))
   }
  elOffBody.innerHTML = ''
    faoArr.forEach((item)=>{
      var newH2 = document.createElement('div')
      console.log(item.Title);
      newH2.innerHTML = `
      <div class="card" style="width: 18rem;">
      <img src="	https://i.ytimg.com/vi/${item.ytid}/hq720.jpg?" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${item.Title}</h5>
      <p class="card-text">${item.fulltitle}</p>
      <p class="card-text">${item.movie_year}</p>
      <p class="card-text">${item.imdb_rating}</p>
      <div class="d-flex align-items-center justify-content-between">
      <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" class="btn btn-primary">Go somewhere</a>
    
      </div>
      </div>
      </div>
      `
      elOffBody.appendChild(newH2) 
    })
}

// var arr = [5,4,3,2,2,5,7]
// window.localStorage.setItem('a',JSON.stringify(arr));
// console.log(arr);
// console.log(JSON.parse(window.localStorage.getItem('a')));
