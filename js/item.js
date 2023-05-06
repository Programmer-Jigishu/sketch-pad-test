var str = '{"names":[' +                    // crate JSON object
'{"first":"Hakuna","lastN":"Matata" },' +
'{"first":"Jane","lastN":"Doe" },' +
'{"first":"Air","last":"Jordan" }]}';
console.log(str);
console.log("\n===============================\n");
let q = JSON.parse(str);
console.log(q);
console.log("\n===============================\n");
console.log(JSON.stringify(q));