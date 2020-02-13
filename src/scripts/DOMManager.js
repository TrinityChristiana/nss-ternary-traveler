import dataManager from './data.js';
import convert from './convert.js';
import eventManager from './eventManager.js';
const DOMManager = {
	runIt() {
		this.renderPlacesOptions();
	},
	renderPlaces(htmlText, id) {
		document.getElementById('card-container').innerHTML += htmlText;
	},
	renderPlacesOptions() {
		const optionsHTML = document.getElementById('where-options');
		optionsHTML.innerHTML = `<option>Place</option>`;

		dataManager.getPlaces().then(data => {
			data.forEach(element => {
				optionsHTML.innerHTML += `<option value="${element.id}">${element.name}</option>`;
			});
		});
	},
	deleteInterest(id) {
		dataManager.deleteInterest(Number(id)).then(() => {
			convert.runIt();
			eventManager.runIt();
		});
	},
	editReview(reviewId) {
		if (
			document
				.getElementById('card-container')
				.querySelector('#cost-text') != null
		) {
			alert('Please save or discard cost first');
		} else if (
			document
				.getElementById('card-container')
				.querySelector('#review-text') != null
		) {
			alert('Please save or discard Review');
		} else {
			const reviewNode = document.getElementById(reviewId);
			const review = reviewNode.innerText;
			reviewNode.innerHTML = `
            <textarea name="" id="review-text" cols="30" rows="10" placeholder="Description">${review}</textarea>
            <button class="ui primary button" id="save-review">Save</button>
            <button class="ui button" id="discard-review">Discard</button>
            `;

			eventManager.saveReviewEvt(reviewId.split('--')[1]);
			eventManager.discardReviewEvt(reviewNode, review, reviewId);
			console.log(review);
		}
	},
	editCost(costId) {
		if (
			document
				.getElementById('card-container')
				.querySelector('#cost-text') != null
		) {
			alert('Please save or discard cost first');
		} else if (
			document
				.getElementById('card-container')
				.querySelector('#review-text') != null
		) {
			alert('Please save or discard review first');
		} else {
			console.log(costId);
			const costNode = document.getElementById(costId);
			const cost = costNode.innerText.split('$').join('');

			costNode.innerHTML = `
        <div class="ui right labeled input">
            <input type="text" id="cost-text" placeholder="" value="${cost}">
            <div class="ui basic label button" id="save-cost"><i class="check icon"></i></div>
            <div class="ui basic label button" id="discard-cost"><i class="x icon"></i></div>
        </div>
        `;
			eventManager.saveCostEvt(costId.split('--')[1]);
			eventManager.discardCostEvt(costNode, cost, costId);
			// console.log(review);
		}
	}
};

export default DOMManager;
