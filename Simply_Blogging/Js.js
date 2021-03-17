// function addBlog(){
//     var title = document.getElementById("title").value;
//     var desc = document.getElementById("desc").value;
//     var imageInfo = document.getElementById("imageId").files[0].name;
//     console.log(title)
//     console.log(desc);
//     console.log(imageInfo);
//     document.getElementById("titleInfo").innerHTML=title;
//     document.getElementById("descInfo").innerHTML=desc;
//     document.getElementById("imageInfo").src=imageInfo;
// }

var blogListing = [];

function addBlog() {
    alert("hello")
	insertSession();
	clearData();
	displayBlogListing();
}

function readData() {
	var obj = {};
	obj.title = document.getElementById('title').value;
	obj.article = document.getElementById('desc').value;
	obj.articleImg = document.getElementById('imageId').files[0].name;
   
	console.log(obj);
	return obj;
}

function retrieveDataFromSession() {
	var str = sessionStorage.getItem('blogListing');
	console.log(str);
	if (str !== null) {
		blogListing = JSON.parse(str);
	}
}

function insertSession() {
	retrieveDataFromSession();
	var newEntry = readData();
	blogListing.push(newEntry);
    sessionStorage.setItem('blogListing', JSON.stringify(blogListing));
}

function displayBlogListing() {
	retrieveDataFromSession();
	var container = document.getElementById('cardContainer');
	var content = '';
			for (let i = 0; i < blogListing.length; i++) 
			{
			content += `<div class="card" style="min-width:40rem;">
			<img src="${blogListing[i].articleImg}" class="card-img-top imgHolder">
			<div class="card-body">
			<h5 class="card-title">${blogListing[i].title}</h5>
			<p class="card-text">${blogListing[i].article}</p>
			</div>
			</div>`;		
	        }
	container.innerHTML = content;
}

function clearData() {
	document.getElementById('title').value = '';
	document.getElementById('desc').value = '';
	document.getElementById('imageId').value = '';
}