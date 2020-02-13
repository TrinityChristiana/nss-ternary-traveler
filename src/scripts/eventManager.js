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
					const deleteButton =
						event.target.classList.contains('delete') ||
						event.target.classList.contains('x');
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

					if (event.target.classList.contains('description')) {
						DOMManager.editDescription(`description--${cardId}`);
					}

					if (event.target.classList.contains('name')) {
						DOMManager.editName(`name--${cardId}`);
					}

					if (event.target.classList.contains('place')) {
						DOMManager.editPlace(`place--${cardId}`);
					}
				}
			});
	},
	saveEvt(cardId, string) {
		document
			.getElementById(`save-${string}`)
			.addEventListener('click', () => {
				const inputText = document.getElementById(`${string}-text`)
					.value;

				if (string == 'place') {
					dataManager
						.getPlaces()
						.then(data => {
							const placeObj = data.filter(element => {
								if (inputText == element.id) {
									return element;
								}
							});
							// console.log()
							return placeObj[0].id;
						})
						.then(placeId => {
							// console.log(placeId)
							dataManager
								.patchInterest(
									`{"placeId": ${placeId}}`,
									cardId
								)
								.then(() => {
									convert.runIt();
									eventManager.runIt();
								});
						});
				} else {
					dataManager
						.patchInterest(`{"${string}": "${inputText}"}`, cardId)
						.then(() => {
							convert.runIt();
							eventManager.runIt();
						});
				}
			});
	},
	discardEvt(node, string, htmlText) {
		document
			.getElementById(`discard-${string}`)
			.addEventListener('click', () => {
				node.innerHTML = htmlText;
			});
	},
	saveCostEvt(cardId) {
		document.getElementById('save-cost').addEventListener('click', () => {
			const inputText = document.getElementById(`cost-text`).value;
			dataManager
				.patchInterest({cost: Number(inputText)}, cardId)
				.then(() => {
					convert.runIt();
					eventManager.runIt();
				});
		});
	}
};

export default eventManager;
