import dataManager from './data.js';
import convert from './convert.js';
import eventManager from './eventManager.js';
const DOMManager = {
	runIt() {
		this.renderPlacesOptions('where-options');
	},
	renderPlaces(htmlText) {
		document.getElementById('card-container').innerHTML += htmlText;
	},
	renderPlacesOptions(string) {
		const optionsHTML = document.getElementById(string);
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
	editElement(elementId, inputType, elementName) {

		const inputIdCheck = [
			'#cost-text',
			'#review-text',
			'#description-text',
			'#name-text',
			'#place-text'
		];

		const state = {isOnlyInput: true};
		inputIdCheck.forEach(element => {
			const inputName = element.split("-")[0].split("#")[1];
			if (
				document
				.getElementById('card-container')
				.querySelector(element) != null
				) {
				state.isOnlyInput = false;
				document.getElementById(
					'alert-header'
				).innerHTML = `Please save or discard ${inputName} first`;
				$('.ui.tiny.modal')
					.modal('setting', {
						onApprove: function() {
							return true;
						}
					})
					.modal('show');
			}
		});

		if (state.isOnlyInput == true) {
			if (elementName == 'Cost') {
				const elementNode = document.getElementById(elementId);
				const element = elementNode.innerText.split('$').join('');
				const lowerCaseElm = elementName.toLowerCase();

				elementNode.innerHTML = `
			<div class="ui right labeled input">
				<input type="text" id="${lowerCaseElm}-text" value="${element}">
				<div class="ui basic label button positive" id="save-${lowerCaseElm}"><i class="check icon"></i></div>
				<div class="ui basic label button negative" id="discard-${lowerCaseElm}"><i class="x icon"></i></div>
			</div>
			`;
				eventManager.saveCostEvt(elementId.split('--')[1]);
				eventManager.discardCostEvt(elementNode, element, elementId);
			} else {
				const elementNode = document.getElementById(elementId);
				const element = elementNode.innerText;
				const lowerCaseElm = elementName.toLowerCase();
				if (inputType == 'textarea') {
					elementNode.innerHTML = `
					<textarea name="" id="${lowerCaseElm}-text" cols="30" rows="10">${element}</textarea>
					<button class="ui primary button" id="save-${lowerCaseElm}">Save ${lowerCaseElm}</button>
					<button class="ui button" id="discard-${lowerCaseElm}">Discard ${lowerCaseElm}</button>
					`;
				} else if (inputType == 'text') {
					elementNode.innerHTML = `<div class="ui right labeled input">
					<input type="text" id="${lowerCaseElm}-text"  value="${element}">
					<div class="ui basic label button positive" id="save-${lowerCaseElm}"><i class="check icon"></i></div>
					<div class="ui basic label button negative" id="discard-${lowerCaseElm}"><i class="x icon"></i></div>
				</div>`;
				} else if (inputType == 'dropdown') {
					elementNode.innerHTML = `<select class="ui search dropdown" id="${lowerCaseElm}-text">

					</select>
					<div class="ui basic label button positive" id="save-${lowerCaseElm}"><i class="check icon"></i></div>
					<div class="ui basic label button negative" id="discard-${lowerCaseElm}"><i class="x icon"></i></div>
            		`;
					this.renderPlacesOptions(`${lowerCaseElm}-text`);

					eventManager.saveEvt(
						elementId.split('--')[1],
						lowerCaseElm
					);

					eventManager.discardEvt(
						elementNode,
						lowerCaseElm,
						`${element}`
					);
				}

				eventManager.saveEvt(elementId.split('--')[1], lowerCaseElm);

				eventManager.discardEvt(
					elementNode,
					lowerCaseElm,
					`${element}`
				);
			}
		}
	}
};

export default DOMManager;
