axios.get('/api/tables')
  .then(({ data }) => {
    data.forEach((table, i) => {
      let elem = document.createElement('li')
      elem.className = 'list-group-item'
      elem.innerHTML = `
        <h2>Table #${i}</h2>
        <hr>
        <h2>ID: ${table.id}</h2>
        <h2>Name: ${table.name}</h2>
        <h2>Phone Number: ${table.phoneNumber}</h2>
        <h2>Email: ${table.email}</h2>
      `
      document.getElementById('tableList').append(elem)
    })
  })
  .catch(err => console.log(err))

axios.get('/api/waitlist')
  .then(({ data }) => {
    data.forEach((table, i) => {
      let elem = document.createElement('li')
      elem.className = 'list-group-item'
      elem.innerHTML = `
        <h2>Table #${i + 1}</h2>
        <hr>
        <h2>ID: ${table.id}</h2>
        <h2>Name: ${table.name}</h2>
        <h2>Phone Number: ${table.phoneNumber}</h2>
        <h2>Email: ${table.email}</h2>
      `
      document.getElementById('waitList').append(elem)
    })
  })
  .catch(err => console.log(err))


document.getElementById('submit').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/tables', {
    name: document.getElementById('nameInput').value,
    phoneNumber: document.getElementById('numberInput').value,
    email: document.getElementById('emailInput').value,
    id: document.getElementById('idInput').value
  })
  .then(({ data }) => {
    document.getElementById('nameInput').value = ''
    document.getElementById('numberInput').value = ''
    document.getElementById('emailInput').value = ''
    document.getElementById('idInput').value = ''

    let elem = document.createElement('li')
    elem.className = 'list-group-item'
    elem.innerHTML = `
      <h2>Table</h2>
      <hr>
      <h2>ID: ${data.id}</h2>
      <h2>Name: ${data.name}</h2>
      <h2>Phone Number: ${data.phoneNumber}</h2>
      <h2>Email: ${data.email}</h2>
    `
    if (document.getElementById('tableList').childElementCount < 5) {
      document.getElementById('tableList').append(elem)
      alert('Yay! You are officially booked!')
      console.log('booked')
    } else {
      document.getElementById('waitList').append(elem)
      alert('Sorry you are on the wait list')
    }
  })
})

document.getElementById('clear').addEventListener('click', event => {
  console.log('clear')
  axios.delete('/api/clear')
    .then(() => {
      document.getElementById('tableList').innerHTML = ''
      document.getElementById('waitList').innerHTML = ''
    })
    .catch(err => console.log(err))
})