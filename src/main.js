import './main.css';

let calc = {
  old: '',
  new: '0',
};

const set = (obj) => {
  calc = { ...calc, ...obj };
  if (Object.prototype.hasOwnProperty.call(obj, 'old')) {
    document.getElementById('output-sm').innerHTML = calc.old;
  }
  if (Object.prototype.hasOwnProperty.call(obj, 'new')) {
    document.getElementById('output-lg').innerHTML = calc.new;
  }
};

const round = (x) => parseFloat(x).toFixed(6).replace(/\.?0*$/, '').replace(/\.$/, '');

const result = (obj) => {
  const [x, y] = [obj.old.slice(0, -1), obj.new].map((n) => parseFloat(n, 10));
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
  return round(ans);
};

const handler = (evt) => {
  const { target } = evt;
  if (target.type !== 'button') {
    return;
  }
  const value = target.innerHTML;
  if (value === 'AC') {
    set({ old: '', new: '0' });
    return;
  }
  if (value === 'C') {
    set({ new: '0' });
    return;
  }
  if (value === '.') {
    if (/\./.test(calc.new)) {
      return;
    }
    set({ new: `${calc.new}.` });
    return;
  }
  if (/^[0-9]$/.test(value)) {
    set({
      old: calc.old,
      new: calc.new === '0' ? value : `${calc.new}${value}`,
    });
    return;
  }
  if (value === '=') {
    if (calc.old) {
      const ans = result(calc);
      set({ old: '', new: `${ans}` });
    }
    return;
  } /* else handle operators */
  const ans = calc.old ? result(calc) : calc.new;
  set({ old: `${ans}${value}`, new: '0' });
};

document.querySelector('#calc .grid').addEventListener('click', handler);
