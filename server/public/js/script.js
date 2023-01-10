const today = document.getElementById('today');
const rating = document.getElementById('rating');
const submitBtn = document.getElementsByTagName('button')[0];


function printDate(elem) {
    const d = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
    elem.innerHTML = d;
}

printDate(today);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(today.innerText, rating.value);
    fetch('http://localhost:3000/', {
        method: 'POST',
        body: JSON.stringify({
            date: today.innerText,
            rating: rating.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then((res) => {
        console.log(res);
    });
})
console.log(rating, submitBtn);
