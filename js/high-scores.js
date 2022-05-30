if (localStorage.getItem("high-scores") == null) {
    let scores = []
    for (let i = 10; i > 0; i--) {
        scores.push(["HuMito", 10000*i])
    }

    // console.log(scores)
    localStorage.setItem("high-scores")
    // console.log(scores)
} else {
    // console.log("no")
}

scores = localStorage.getItem("high-scores")
scores = scores.split(",")
console.log(scores)

var container = document.getElementById("high-scores")
for (let i = 0; i < 20; i+=2) {
    var div = document.createElement("h2")
    div.innerHTML = scores[i] + " " + scores[i+1]
    console.log(scores[i] + scores[i+1])
    container.appendChild(div)
}