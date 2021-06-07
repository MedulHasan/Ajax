import axios from 'axios'
const URL = 'https://jsonplaceholder.typicode.com/users';

let btn = document.getElementById('loadData');
let p = document.getElementById('output');

btn.addEventListener('click', function () {
    let count = 1;
    axios.get(URL)
        .then(res => {
            res.data.forEach(element => {
                p.innerHTML = `${p.innerHTML} <br> Name-${count++} : ${element.name}`
            })
        })
        .catch(err => {
            console.log(err);
        })
})