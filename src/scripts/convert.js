import dataManager from './data.js';
import DOMManager from './DOMManager.js';
const convert = {
	runIt() {
        document.getElementById("card-container").innerHTML = "";
		dataManager.getAllData().then(data => {
            console.log(data)
			data.forEach(element => {
				const condObj = this.smallerObj(element);
				const HTMLText = this.objToHtml(condObj);
				DOMManager.renderPlaces(HTMLText, condObj.id);
			});
			DOMManager.renderPlacesOptions();
		});
	},
	objToHtml(obj) {
		const reviewHTML = obj.review !== '' ? `${obj.review}` : `Add Review`;
		let htmlText = `
        <div class="card" id="card--${obj.id}">
                    <div class="content">
                      <div class="header">
                      ${obj.name} - ${obj.place}
                      </div>
                      <div class="meta">
                      $${obj.cost}
                      </div>
                      <div class="description">
                      ${obj.description}
                      </div>
                    </div>
                    <div class="extra content review">
                      ${reviewHTML}
                    </div>
                  </div>
              </div>

        `;

		return htmlText;
	},
	smallerObj(data) {
        const {id, name, description, cost, review} = data;
		return {
			id: id,
			name: name,
			description: description,
			cost: cost,
			review: review,
			place: data.place.name,
			visaRequired: data.place.visa_required
		};
	},
	inputToObj(name, description, cost, where) {
        let placeId = "";
        console.log(where)
        if(where !== "Place"){
            placeId = Number(where);
        }
		return {
            "placeId": placeId,
            "name": name,
            "description": description,
            "cost": Number(cost),
            "review": ""
		};
	}
};

export default convert;
