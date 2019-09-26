const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading...';

    const location = search.value;
    if (!location) {
        return console.log('Invalid address');
    }
    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.summary + "It is "+ data.temperature + " degrees out there. There is " +data.precipProbability + "% possibility of rain. ";
            }
        })
    }).catch((err) => {
        console.log(err);
    });
})