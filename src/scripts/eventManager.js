import convert from './convert.js';
import dataManager from './data.js';
import validate from './validate.js';

const eventManager = {
	runIt() {
        this.submitEvt();
        this.addReviewEvt();
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
                dataManager.addInterest(interestObj)
                .then(() => convert.runIt());
				
			} else {
				alert('there are empty inputs!');
			}
		});
    },
    addReviewEvt(cardIdd){
        document.getElementById(cardId).querySelector("review").addEventListener("click", () => {
            console.log("clicked", cardId);
        })
    }
};

export default eventManager;
