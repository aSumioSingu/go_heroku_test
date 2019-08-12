import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import css from '../css/console.css';

var x = 'X';

function sleep(waitMsec) {
  var startMsec = new Date();

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while (new Date() - startMsec < waitMsec);
}

console.log('start sleep');
sleep(100);
console.log('stop sleep');
