import axios from 'axios'

const URL = 'http://localhost:3000/contacts'

window.onload = function () {
    let tbody = document.getElementById('tbody')

    // get data from json server
    axios.get(URL)
        .then(res => {
            res.data.forEach(contact => {
                creatTDElement(contact, tbody)
            });
        })
        .catch(err => {
            console.log(err);
        })

    let saveContactBtn = document.getElementById('save-contact')
    saveContactBtn.addEventListener('click', function () {
        creatNewContactList()
    })

}

function creatNewContactList() {
    let name = document.getElementById('name')
    let phone = document.getElementById('phone')
    let email = document.getElementById('email')

    let tbody = document.getElementById('tbody')
    let newContact = {
        name: name.value,
        phone: phone.value,
        email: email.value
    }

    axios.post(URL, newContact)
        .then(res => {
            creatTDElement(res.data, tbody)

            name.value = ''
            phone.value = ''
            email.value = ''
        })
        .catch(err => console.log(err))

}




function creatTDElement(contact, parentElement) {
    let tr = document.createElement('tr');

    let tdName = document.createElement('td');
    tdName.innerHTML = contact.name
    tr.appendChild(tdName)

    let tdPhone = document.createElement('td');
    tdPhone.innerHTML = contact.phone || 'N/A';
    tr.appendChild(tdPhone)

    let tdEmail = document.createElement('td');
    tdEmail.innerHTML = contact.email || 'N/A'
    tr.appendChild(tdEmail)

    let tdAction = document.createElement('td')

    let editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'
    editBtn.className = 'btn btn-warning'
    editBtn.addEventListener('click', function () {
        let mainModal = $('#editContactModal')
        mainModal.modal('toggle')

        let editName = document.getElementById('edit-name')
        let editPhone = document.getElementById('edit-phone')
        let editEmail = document.getElementById('edit-email')

        editName.value = contact.name
        editPhone.value = contact.phone || ''
        editEmail.value = contact.email || ''

        // let updateContactOBJ = {
        //     name: editName.value,
        //     phone: editPhone.value,
        //     email: editEmail.value
        // }

        let updateBtn = document.getElementById('update-contact')
        updateBtn.addEventListener('click', function () {
            axios.put(`${URL}/${contact.id}`, {
                name: editName.value,
                phone: editPhone.value,
                email: editEmail.value
            })
                .then(res => {
                    // console.log(res.data);
                    tdName.innerHTML = res.data.name
                    tdPhone.innerHTML = res.data.phone
                    tdEmail.innerHTML = res.data.email

                    mainModal.modal('hide')
                })
                .catch(err => console.log(err))
        })
    })
    tdAction.appendChild(editBtn)

    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.className = 'btn btn-danger mx-1'
    deleteBtn.addEventListener('click', function () {
        axios.delete(`${URL}/${contact.id}`)
            .then(res => {
                parentElement.removeChild(tr)
            })
            .catch(err => console.log(err))
    })
    tdAction.appendChild(deleteBtn)

    tr.appendChild(tdAction)

    parentElement.appendChild(tr);
}