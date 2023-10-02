import { React, useState, useEffect } from "react";
import Die from "../components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		const allSameValue = dice.every((die) => die.value === dice[0].value);
		const allHeld = dice.every((die) => die.isHeld);
		if (allSameValue && allHeld) {
			setTenzies(true);
			console.log("You won!");
		}
	}, [dice]);

	const diceComponents = dice.map((obj) => {
		return (
			<Die
				value={obj.value}
				key={obj.id}
				isHeld={obj.isHeld}
				holdDice={() => holdDice(obj.id)}
			/>
		);
	});

	function displayConfetti() {
		const width = window.innerWidth
		const height = window.innerHeight
		return <Confetti width={width} height={height} />;
	}

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}

	function getNewDice() {
		if(!tenzies){
			setDice((oldDice) =>
			oldDice.map((die) => {
				return !die.isHeld ? generateNewDie() : die;
			})
			);
		}
		else{
			setDice(allNewDice())
			setTenzies(false)
		}
	}

	function holdDice(id) {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	}

	return (
		<main>
			{tenzies && displayConfetti()}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at
				its current value between rolls.
			</p>
			<div id="grid--container">{diceComponents}</div>
			<button id="roll--btn" onClick={getNewDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	);
}
