async function put(url, data)
{
	console.log("attempting POST at "+url);
    // Awaiting fetch which contains method,
    // headers and content-type and body
	const response = await fetch(url, {
		method: 'POST',
		headers:
		{
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(data)
    }).then(res => res.json())
	  .then(res => console.log(res));
	  
	console.log(response);
      
    // Awaiting response.json()
    const resData = await response.json();
  
    // Return response data 
    return resData;
}