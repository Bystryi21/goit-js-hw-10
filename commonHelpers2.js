import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as n}from"./assets/vendor-77e16229.js";const i=document.querySelector(".form"),c=document.querySelector('input[name="delay"]'),m=document.querySelectorAll('input[name="state"]');i.addEventListener("submit",function(t){t.preventDefault();const s=parseInt(c.value),o=[...m].find(e=>e.checked).value;u(s,o)});function u(t,s){new Promise((e,r)=>{setTimeout(()=>{s==="fulfilled"?e(t):r(t)},t)}).then(e=>{n.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{n.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})}
//# sourceMappingURL=commonHelpers2.js.map