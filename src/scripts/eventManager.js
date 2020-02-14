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
			const inputIdCheck = [
				'#cost-text',
				'#review-text',
				'#description-text',
				'#name-text',
				'#place-text'
			];
			const state = {isOnlyInput: true};
			const isNotOkay = validated[0] || validated[1];

			inputIdCheck.forEach(element => {
				if (
					document
						.getElementById('card-container')
						.querySelector(element) != null
				) {
					state.isOnlyInput = false;
					const elementName = element.split("-")[0].split("#")[1];
					if (!isNotOkay) {
						document.getElementById(
							'alert-header'
						).innerHTML = `Please save or discard ${elementName} first`;
						$('.ui.tiny.modal')
							.modal('setting', {
								onApprove: function() {
									return true;
								}
							})
							.modal('show');
					} else {
						document.getElementById(
							'alert-header'
						).innerHTML = `<div>There are empty fields</div><div>Please save or discard ${elementName} first</div>`;
						$('.ui.tiny.modal')
							.modal('setting', {
								onApprove: function() {
									return true;
								}
							})
							.modal('show');
					}
				}
			});

			if (!validated[0] && !validated[1] && state.isOnlyInput == true) {
				dataManager
					.addInterest(interestObj)
					.then(() => convert.runIt());
			} 
			else if (state.isOnlyInput == true && validated[0] && validated[1])  {
				document.getElementById('alert-header').innerHTML =
					'There are empty inputs!';
				$('.ui.tiny.modal')
					.modal('setting', {
						onApprove: function() {
							return true;
						}
					})
					.modal('show');
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
						$('.ui.mini.modal')
							.modal('setting', {
								onApprove: function() {
									DOMManager.deleteInterest(parentId);
								}
							})
							.modal('show');
					}

					if (event.target.classList.contains('review')) {
						DOMManager.editElement(
							`review--${cardId}`,
							'textarea',
							'review'
						);
					}

					if (event.target.classList.contains('cost')) {
						DOMManager.editElement(
							`cost--${cardId}`,
							'text',
							'Cost'
						);
					}

					if (event.target.classList.contains('description')) {
						DOMManager.editElement(
							`description--${cardId}`,
							'textarea',
							'Description'
						);
					}

					if (event.target.classList.contains('name')) {
						DOMManager.editElement(
							`name--${cardId}`,
							'text',
							'Name'
						);
					}

					if (event.target.classList.contains('place')) {
						DOMManager.editElement(
							`place--${cardId}`,
							'dropdown',
							'Place'
						);
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
							return placeObj[0].id;
						})
						.then(placeId => {
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
	},
	discardCostEvt(costNode, cost, costId) {
		document
			.getElementById('discard-cost')
			.addEventListener('click', () => {
				costNode.innerHTML = `<div class="meta cost" id="${costId}">$${cost}</div>`;
			});
	}
};

export default eventManager;
