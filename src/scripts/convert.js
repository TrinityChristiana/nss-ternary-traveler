import dataManager from './data.js';
import DOMManager from './DOMManager.js';
import eventManager from './eventManager.js';
const convert = {
	runIt() {
        document.getElementById('card-container').innerHTML = '';
		dataManager.getAllData().then(data => {
			data.forEach(element => {
				const condObj = this.smallerObj(element);
				const HTMLText = this.objToHtml(condObj);
				DOMManager.renderPlaces(HTMLText, condObj.id);
			});

			DOMManager.renderPlacesOptions("where-options");
			data.forEach(element => {
				eventManager.addReviewEvt(element.id);
            });
            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
            document.getElementById("cost").value = "";
		});
	},
	objToHtml(obj) {
		const reviewHTML = obj.review !== '' ? `${obj.review}` : `Add Review`;
		let htmlText = `
        <div class="card" id="card--${obj.id}">
                    <div class="content">
                      <div class="header card-header" id="header--${obj.id}">
                      <div class="header-text"><div class="name" id="name--${obj.id}">${obj.name}</div><div class="place" id="place--${obj.id}">${obj.place}</div></div>
                      <div class="header-icon ui circular icon inverted red delete button"><i class="x icon"></i></div>
                      
                      
                      </div>
                      <div class="meta cost" id="cost--${obj.id}">
                      $${obj.cost}
                      </div>
                      <div class="description" id="description--${obj.id}">
                      ${obj.description}
                      </div>
                    </div>
                    <div class="extra content">
                      <div class="review" id="review--${obj.id}">${reviewHTML}</div>
                      
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
		let placeId = '';
		if (where !== 'Place') {
			placeId = Number(where);
		}
		return {
			placeId: placeId,
			name: name,
			description: description,
			cost: Number(cost),
			review: ''
		};
	}
};

export default convert;
