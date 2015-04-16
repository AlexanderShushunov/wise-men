"use strict";
(function () {
	var allVariants = (function allVariants() {
		var numbers = [];
		for (var first = 2; first < 100; first++) {
			for (var second = 2; second < 100; second++) {
				numbers.push({
					first: first,
					second: second,
					mult: first * second,
					sum: first + second
				});
			}
		}
		return numbers;
	})();

	var allPrimesSum = (function allPrimesSum() {
		var ret = [];
		for (var first = 2; first < 100; first++) {
			for (var second = 2; second < 100; second++) {
				if (isPrime(first) && isPrime(second)) {
					ret.push(first + second);
				}
			}
		}
		return ret;
	})();

	var oneNotPrimeVariants = (function oneNotPrime() {
		return allVariants.filter(function (item) {
			return !(isPrime(item.first) && isPrime(item.second));
		});
	})();

	var sumDoesNotLookLikePrimesSum = (function sumDoesNotLookLikePrimesSum() {
		return allVariants.filter(function (item) {
			return allPrimesSum.indexOf(item.sum) == -1;
		});
	})();

	var valiVariants = (function valiVariants() {
		return _.uniq(sumDoesNotLookLikePrimesSum.map(function (item) {
			return item.sum;
		}));
	})();

	var aliVariants = (function aliVariants() {
		return _.uniq(oneNotPrimeVariants.map(function (item) {
			return item.mult;
		}));
	})();

	var aliVariantsAfterValiAnswer = (function aliVariantsAfterValiAnswer() {
		var aliVariantsPartsSum = aliVariants.map(function (mult) {
			return {mult: mult, partSum: getPartsSum(mult)};
		});

		return aliVariantsPartsSum.filter(function (item) {
			return _.intersection(item.partSum, valiVariants).length == 1;
		}).map(function (item) {
			return item.mult;
		});
	})();

	var valiVariantsAfterSecondAliAnswer = (function valiVariantsAfterSecondValiAnswer() {
		var valiVariantsPartsMult = valiVariants.map(function (sum) {
			return {sum: sum, partMult: getPartsMult(sum)};
		});
		return valiVariantsPartsMult.filter(function (item) {
			return _.intersection(item.partMult, aliVariantsAfterValiAnswer).length == 1;
		}).map(function (item) {
			return item.sum;
		});
	})();

	var answer = (function answer() {
		var sum = valiVariantsAfterSecondAliAnswer[0];
		var mult = _.intersection(aliVariantsAfterValiAnswer, getPartsMult(sum))[0];
		return oneNotPrimeVariants.filter(function (item) {
			return item.sum == sum && item.mult == mult;
		})[0];
	})();

	window.onload = function() {
		var answerSpan  = document.getElementById("answer");
		answerSpan.innerText = answer.first +  ", " + answer.second;
	};

	function isPrime(number) {
		for (var i = 2; i < number; i++) {
			if (number % i == 0) {
				return false;
			}
		}
		return true;
	}

	// ���� item - ������������ ���� �����,
	// �� ������� ������ �� �����.
	function getPartsSum(item) {
		var ret = [];
		var lim = Math.sqrt(item);
		for (var cou = 2; cou <= lim; cou++) {
			if (item % cou == 0) {
				ret.push(cou + item / cou);
			}
		}
		return ret;
	}

	// ���� item - ����� ���� �����,
	// �� ������� ������ �� ������������.
	function getPartsMult(item) {
		var ret = [];
		var lim = item / 2;
		for (var cou = 2; cou <= lim; cou++) {
			ret.push(cou * (item - cou));
		}
		return _.uniq(ret);
	}
})();