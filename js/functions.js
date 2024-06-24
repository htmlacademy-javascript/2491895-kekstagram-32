const checkString = function(str , maxLength) {
  const length = str.length;
  return length <= maxLength;
};

console.log(checkString('hello', 5));
console.log(checkString('hello', 3));
console.log(checkString('проверяемая строка', 20));

const palindrome = function(str) {
  const normalizeStr = str.replaceAll().toLowerCase();
  let string = '';

  for (let i = normalizeStr.length - 1; i >= 0; i--) {
    string += normalizeStr[i];
  }

  return string === normalizeStr;
};


console.log(palindrome('топот'));
console.log(palindrome('ДовОд'));
console.log(palindrome('Кекс'));
