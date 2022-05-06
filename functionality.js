let myLeads = [];
let oldLeads = []
// console.log(typeof myLeads);

// myLeads = JSON.parse(myLeads);
// myLeads.push("aaa")

// console.log(typeof myLeads);
//! const cannot be reassigned
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let errMsg = document.getElementById("err-msg");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
// console.log(leadsFromLocalStorage);


//! Set key with the value value, get it, to see that
//! it successfully set storage the data and then,
//! clear the object
// localStorage.setItem("key", "value");
// localStorage.getItem("key");
// localStorage.clear()

// console.log(localStorage.getItem("myLeads", "Andreea is running on background:))"));
// localStorage.clear()
// localStorage.clear()

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads)
    })


})

// const tabs = [
//     { url: "google.com" }
// ]

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        //! Display items from unordered list using innerHTML
        //! ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";

        // const li = document.createElement("li");
        // li.textContent = myLeads[i];
        // ulEl.appendChild(li);
        errMsg.textContent = "";
        if (myLeads[i] === "") {
            errMsg.textContent = "Paste an url, to save it!";
        } else {
            // listItems += "<li><a target='_blank' href ='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
            // console.log(listItems);

            //! Tamplate strings
            listItems += `
            <li>
                <a target='_blank' href ='${leads[i]}'>
                ${leads[i]}</a>
            </li>`;

        }
    }

    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myLeads = [];
    // ulEl.innerHTML = "" or readderLeads()
    render(myLeads)
})

//! Event Listener
inputBtn.addEventListener("click", function () {
    //! Get the value of the input element
    myLeads.push(inputEl.value);
    // console.log(myLeads);
    inputEl.value = "";

    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads)
    // console.log(localStorage.getItem("myLeads"));

})



