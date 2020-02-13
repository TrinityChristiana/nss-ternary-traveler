import convert from './convert.js';
import dataManager from './data.js';
import validate from './validate.js';
import DOMManager from './DOMManager.js';

const eventManager = {
	runIt() {
		this.submitEvt();
	},
	submitEvt() {
		document.getElementById('submit-btn').addEventListener('click', () => {
			const name = document.getElementById('name').value;
			const description = document.getElementById('description').value;
			const cost = document.getElementById('cost').value;
			const where = document.getElementById('where-options').value;
			const interestObj = convert.inputToObj(
				name,
				description,
				cost,
				where
			);
			const validated = validate.createFormChecker(interestObj);
			if (!validated[0] && !validated[1]) {
				dataManager
					.addInterest(interestObj)
					.then(() => convert.runIt());
			} else {
				alert('there are empty inputs!');
			}
		});
	},
	addReviewEvt(cardId) {
		document
			.getElementById(`card--${cardId}`)
			.addEventListener('click', () => {
                if (event.target.offsetParent !== null) {

					const parentId = event.target.offsetParent.id.split(
						'--'
                    )[1];
                    const deleteButton = event.target.classList.contains('delete') || event.target.classList.contains('x')
					if (deleteButton) {
						const interestName = document.getElementById(
							`header--${cardId}`
						).innerText;
						document.getElementById('modal-content').innerHTML = `
                        <p>Are you sure you want to delete inteset <b>"${interestName}"</b></p>
                        `;
						$('.ui.basic.modal')
							.modal('setting', {
								onApprove: function() {
									DOMManager.deleteInterest(parentId);
								}
							})
							.modal('show');
					}

					if (event.target.classList.contains('review')) {
						DOMManager.editReview(`review--${cardId}`);
                    }
                    
                    if (event.target.classList.contains('cost')) {

						DOMManager.editCost(`cost--${cardId}`);
                    }

				}
			});
	},
	saveReviewEvt(cardId) {
		document.getElementById('save-review').addEventListener('click', () => {
			const inputText = document.getElementById(`review-text`).value;
			dataManager.patchInterest({review: inputText}, cardId).then(() => {
				convert.runIt();
				eventManager.runIt();
			});
		});
	},
	discardReviewEvt(reviewNode, review, reviewId) {
		document
			.getElementById('discard-review')
			.addEventListener('click', () => {
				reviewNode.innerHTML = `<div class="review" id="${reviewId}">${review}</div>`;
			});
    },
    saveCostEvt(cardId) {
		document.getElementById('save-cost').addEventListener('click', () => {
			const inputText = document.getElementById(`cost-text`).value;
			dataManager.patchInterest({cost: Number(inputText)}, cardId).then(() => {
				convert.runIt();
				eventManager.runIt();
			});
		});
	},
	discardCostEvt(costNode, review, costId) {
		document
			.getElementById('discard-cost')
			.addEventListener('click', () => {
				costNode.innerHTML = `<div class="meta cost" id="${costId}">$${obj.cost}</div>`;
			});
    }
};

export default eventManager;
