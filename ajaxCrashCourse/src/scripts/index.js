import '../styles/index.scss'

const URL = 'https://jsonplaceholder.typicode.com/users';

let btn = document.getElementById('loadData');
let p = document.getElementById('output');

// ---------XML Request--------
// btn.addEventListener('click', function () {
//     const xhr = new XMLHttpRequest()

//     xhr.onreadystatechange = () => {
//         p.innerHTML = xhr.response
//     }

//     xhr.open('GET, URL)
//     xhr.send()
// })

// ------------using fetch----------
// get request
btn.addEventListener('click', function () {
    let count = 0;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                p.innerHTML = `${p.innerHTML} <br> Name-${count++} : ${element.name}`
            });
        })
        .catch(err => {
            console.log(err);
        })
})