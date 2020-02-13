import dataManager from './data.js';
import moduleName from './eventManager.js'
const DOMManager = {
    runIt(){
        this.renderPlacesOptions()
    },
    renderPlaces(htmlText, id){
        document.getElementById("card-container").innerHTML += htmlText;
        

    },
    renderPlacesOptions(){ 
        const optionsHTML = document.getElementById("where-options");
        optionsHTML.innerHTML = `<option>Place</option>`;

        dataManager.getPlaces().then(data => {
            data.forEach(element => {
                optionsHTML.innerHTML += `<option value="${element.id}">${element.name}</option>`
            });
        })
        
        console.log(optionsHTML)
    }


}

export default DOMManager;
