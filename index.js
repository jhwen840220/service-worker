fetch('http://localhost:3000/dog')
    .then(res => res.json())
    .then(data => {
        document.getElementById("name").innerHTML = data.name;
        document.getElementById("age").innerHTML = data.age;
        document.getElementById("gender").innerHTML = data.gender;
    });