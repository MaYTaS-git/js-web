// hi-lo game

const deck = {
	1: "A",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
	6: "6",
	7: "7",
	8: "8",
	9: "9",
	10: "10",
	11: "J",
	12: "Q",
	13: "K",
};

let match_history = [];
let streak = 0;

let session = -1;
let match_sessions = {};
// { 0 : [[0],[1],[2]]}

const card_generator = () => {
	let card_num = Math.round(Math.random() * 13);
	let card = deck[card_num];

	while (!card) {
		card_num = Math.round(Math.random() * 13);
		card = deck[card_num];
	}

	return [card_num, card];
};

const make_entry = (disp_card, system_card, opt, result) => {
	// match_sessions[session][streak] = [disp_card, system_card, opt, result];

	let record = document.getElementById("history-record");
    if (streak >= 20){
        record.firstChild.remove()
    }
	let div = document.createElement("div");

	if (result) {
		div.classList.add("win-history");
	} else {
		div.classList.add("lose-history");
	}

	if (opt == "hi") {
		opt = "↑";
	} else {
		opt = "↓";
	}

	let text = `<p>${deck[disp_card]} <b class="bold">${opt}</b> ${deck[system_card]}</p>`;
	div.innerHTML += text;
	record.appendChild(div);
};

// display card
let [display_card_num, display_card] = card_generator();

// sys card
let [sys_card_num, sys_card] = card_generator();

// hi-lo btns
let hi_btn = document.getElementById("high-button");
let lo_btn = document.getElementById("low-button");

// start and stop btns
let start_btn = document.getElementById("start-button");
let stop_btn = document.getElementById("stop-button");

// streak container value
let streak_container = document.getElementById("streak-container-value");
streak_container.innerText = streak;

// card value text ...displayed card's value
let card_container = document.getElementById("card-value-text");
card_container.innerText = display_card;

// events listeners - start and stop
start_btn.addEventListener("click", () => {
	hi_btn.toggleAttribute("disabled");
	hi_btn.classList.toggle("dim-col");

	lo_btn.toggleAttribute("disabled");
	lo_btn.classList.toggle("dim-col");

	start_btn.toggleAttribute("disabled");
	start_btn.classList.toggle("dim-col");

	stop_btn.toggleAttribute("disabled");
	stop_btn.classList.toggle("dim-col");

	streak = 0;
	session += 1;
	match_sessions[session] = [];

	streak_container.innerText = streak;
	let record = document.getElementById("history-record");
	record.innerHTML = "";

	console.log("game started.");
});

stop_btn.addEventListener("click", () => {
	hi_btn.toggleAttribute("disabled");
	hi_btn.classList.toggle("dim-col");

	lo_btn.toggleAttribute("disabled");
	lo_btn.classList.toggle("dim-col");

	start_btn.toggleAttribute("disabled");
	start_btn.classList.toggle("dim-col");

	stop_btn.toggleAttribute("disabled");
	stop_btn.classList.toggle("dim-col");

	console.log("game stoped.");
});

// events listeners - hi and lo
hi_btn.addEventListener("click", () => {
	if (sys_card_num >= display_card_num) {
		// display new card
		make_entry(display_card_num, sys_card_num, "hi", true);
		streak += 1;
		streak_container.innerText = streak;

		display_card = sys_card;
		display_card_num = sys_card_num;
		card_container.innerText = display_card;

		[sys_card_num, sys_card] = card_generator();
	} else {
		make_entry(display_card_num, sys_card_num, "hi", false);
		console.log(match_sessions[session]);

		display_card = sys_card;
		display_card_num = sys_card_num;
		card_container.innerText = display_card;

		[sys_card_num, sys_card] = card_generator();

		stop_btn.click();
	}
});

lo_btn.addEventListener("click", () => {
	if (sys_card_num <= display_card_num) {
		// display new card
		make_entry(display_card_num, sys_card_num, "lo", true);
		streak += 1;
		streak_container.innerText = streak;

		display_card = sys_card;
		display_card_num = sys_card_num;
		card_container.innerText = display_card;

		[sys_card_num, sys_card] = card_generator();
	} else {
		make_entry(display_card_num, sys_card_num, "hi", false);
		console.log(match_sessions[session]);

		display_card = sys_card;
		display_card_num = sys_card_num;
		card_container.innerText = display_card;

		[sys_card_num, sys_card] = card_generator();

		stop_btn.click();
	}
});