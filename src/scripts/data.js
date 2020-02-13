const dataManager = {
    getAllData(){
        return fetch("http://localhost:8088/interests?_expand=place")
        .then(response => response.json());
    },
    getPlaces(){
        return fetch("http://localhost:8088/places")
        .then(resp => resp.json());
    },
    addInterest(interestsObj){
        return fetch('http://localhost:8088/interests', {
			// Replace "url" with your API's URL
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(interestsObj)
		});
    }
}

export default dataManager;