/*
* Parses the date and time and updates it above the header.
*/
function timeAndDate(){

	const today = new Date();
	const options = { 
	  weekday: 'long', 
	  month: 'long', 
	  day: 'numeric' 
	};

	formatted = today.toLocaleDateString('en-CA', options)

	// Get the suffix for the date as it is not provided by default
	const getSuffix = (() =>{
		if (formatted.at(-1) >= 4 || formatted.at(-1) == 0){
			return "th"
		} else if (formatted.at(-1) == 1){
			return "st"
		} else if (formatted.at(-1) == 2){
			return "nd"
		} else if (formatted.at(-1) == 3){
			return "rd"
		}
	})

	//Build the phrase, date + suffix
	document.getElementById("date").innerText = `${formatted}${getSuffix()} `

	//Get the current time in HH:MM:SS PM
	const getTimeString = (()=>{
		const timeString = new Date().toLocaleTimeString();
		document.getElementById("hour").innerText = ` ${timeString}`	
	})

	//Run it so there is no delay
	getTimeString()

	// Update every half second to be precise.
	setInterval(()=>{
		getTimeString()
	}, 500)

	
}

/*
* Checks the response status of my web projects and updates the status indicator
*/
async function getStatus(){
	//Key: url, Value: id
	sites = {
		"https://jmi06.github.io": "ibsendev",
		"https://quantussports.vercel.app": "quantussports"
	}

	for (const [url, id] of Object.entries(sites)){

		// Get the status of the home site
		let target = document.querySelector(`#${id} > span`) //The element we need to change
		try{
		
			// no-cors prevents browser blocking
			const response = await fetch(url, { mode: "no-cors" });
			target.innerText = "Online"
			target.style.color = "#97ff8e"

		} catch (error){
			
			// if it cant reach the site, it is down.
			target.innerText = "Offline"
			target.style.color = "#ff8e8e"
		}
	}
}


/*
* Displays the count of GitHub commits in the month.
*/
async function commitsThisMonth(){

	const today = new Intl.DateTimeFormat().format(new Date());
	const year = new Date().getFullYear()
	const month = new Date().getMonth() + 1
	console.log("year", year, "month", month, "today", today)
	const request = await fetch(`https://api.github.com/search/commits?q=author:jmi06+author-date:${year}-${String(month).padStart(2, '0')}-01..${today}`)
	const response = await request.json()

	document.getElementById("commits-num").innerText = response['total_count']

}


timeAndDate()
