const calc = {
  old: '',
  new: '0',
};

const update = () => {
  document.getElementById('output-sm').innerHTML = calc.old;
  document.getElementById('output-lg').innerHTML = calc.new;
};

const result = (obj) => {
  const [x, y] = [obj.old.slice(0, -1), obj.new].map((n) => parseInt(n, 10));
  const op = obj.old.slice(-1);
  let ans = null;
  switch (op) {
    case '+':
      ans = x + y;
      break;
    case '-':
      ans = x - y;
      break;
    case '*':
      ans = x * y;
      break;
    case '/':
      ans = x / y;
      break;
    default:
      console.log('Error!! Malformed calc object', obj);
  }
  return ans;
};

const handler = (evt) => {
  const { target } = evt;
  if (target.type !== 'button') {
    return;
  }
  const value = target.innerHTML;
  if (value === 'AC') {
    calc.old = '';
    calc.new = '0';
    update();
    return;
  }
  if (value === 'C') {
    calc.new = '0';
    update();
    return;
  }
  if (/^[0-9]$/.test(value)) {
    const old = calc.new;
    calc.new = old === '0' ? value : `${old}${value}`;
    update();
    return;
  }
  if (value === '=') {
    if (calc.old) {
      const ans = result(calc);
      calc.old = '';
      calc.new = `${ans}`;
      update();
    }
    return;
  } /* else handle operators */
  const ans = calc.old ? result(calc) : calc.new;
  calc.old = `${ans}${value}`;
  calc.new = '0';
  update();
};

document.querySelector('#calc .grid').addEventListener('click', handler);
