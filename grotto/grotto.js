var modal = document.getElementById("modal");
var contentModal = modal.children.item(0).children.item(1);

var inModal = false;

//this makes posts expand into a modal
document.addEventListener("click",function(e)
{
    if(e.target.className == "post" || e.target.className == "posttext")
	{
		var item = null;
		switch(e.target.className)
		{
			case "post":
				item = e.target.children.item(2);
				break;
			case "posttext":
				item = e.target;
				break;
		}
		
		print("post clicked");
		switch(inModal)
		{
			case false:
				print("post modal display");
				contentModal.textContent = item.textContent;
				modal.style.display = "block";
				inModal = true;
				break;
			case true:
				print("post modal hide");
				modal.style.display = "none";
				inModal = false;
				break;
		}
	}		
});

//this closes/hides the modal
var shut = document.getElementById("close");
shut.onclick = function()
{
	print("x-button");
	if (inModal && modal.style.display == "block")
	{
		print("modal x'ed");
		modal.style.display = "none";
		modal.innerHTML = "";
		inModal = false;
	}
}

//this brings up the modal to make a new post
var start = document.getElementById("start");
start.onclick = async function()
{
	if(!inModal)
	{
		inModal = true;
		var result = await fetch("makepost.html");
		contentModal.innerHTML = await result.text();
		modal.style.display = "block";
		
		document.getElementById("submit").onclick = function()
		{
			print("submitting");
			var newPost = document.getElementById("post").value;
			//send this to POST request
			var data =
			{
				content: newPost,
				username: "izzy@frizzy.lol",
			}
			
			put("http://localhost:3000/posts", data);
			
			modal.style.display = "none";
			contentModal.innerHTML = "";
			inModal = false;
	  
			// Resolving promise for response data
			console.log(data);
		}
	}
}

//this brings up the modal to make a new timeline/feed
var feed = document.getElementById("feed");
feed.onclick = async function()
{
	if(!inModal)
	{
		inModal = true;
		var result = await fetch("makefeed.html");
		contentModal.innerHTML = await result.text();
		modal.style.display = "block";
		
		document.getElementById("feednamesubmit").onclick = function()
		{
			var feedname = document.getElementById("feedname").value;
			modal.style.display = "none";
			inModal = false;
			//create new timeline/feed with this name
			var feedstruct = document.createElement("div");
			feedstruct.className = "timeline";
			var feedstructInner =
			`<div class=\"header\">${feedname}</div>`+
			"<button class=\"settings\">Settings</button>";
			
			feedstruct.innerHTML = feedstructInner;
			document.body.appendChild(feedstruct);
			
			modal.style.display = "none";
			inModal = false;
		}
	}
}

//this brings up the modal to make an account or login to one
var login = document.getElementById("login");
login.onclick = async function()
{
	if(!inModal)
	{
		inModal = true;
		var result = await fetch("makeaccount.html");
		contentModal.innerHTML = await result.text();
		modal.style.display = "block";
		
		document.getElementById("submit").onclick = function()
		{
			var userName_ = document.getElementById("userName").value;
			var email_ = document.getElementById("email").value;
			var password_ = document.getElementById("password").value;
			
			var data =
			{
				userName: userName_,
				email: email_,
				password: password_
			}
			
			put("http://localhost:3000/users", data);
			modal.style.display = "none";
			contentModal.innerHTML = "";
			inModal = false;
		}
	}
}

function print(text) { console.log(text); }

async function getpage(url)
{
	var result = await fetch(url);
	return await result.text();
}

//TODO: condense modal open and close into their own functions
