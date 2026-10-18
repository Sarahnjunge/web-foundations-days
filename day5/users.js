const loadButton = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const status = document.querySelector("#status");
const usersList = document.querySelector("#users-list");


let users = [];


function renderUsers(list) {
    usersList.replaceChildren();

    list.forEach(function (user) {
        const listItem = document.createElement("li");

        const name = document.createElement("h2");
        name.textContent = user.name;

        const email = document.createElement("p");
        email.textContent = `Email: ${user.email}`;

        const city = document.createElement("p");
        city.textContent = `City: ${user.address.city}`;

        const company = document.createElement("p");
        company.textContent = `Company: ${user.company.name}`;

        listItem.appendChild(name);
        listItem.appendChild(email);
        listItem.appendChild(city);
        listItem.appendChild(company);

        usersList.appendChild(listItem);
    });

    if (list.length === 0) {
        status.textContent = "No users match your filter.";
    } else {
        status.textContent = `Showing ${list.length} user(s).`;
    }
}


async function loadUsers() {
    loadButton.disabled = true;
    status.textContent = "Loading users...";

    try {
        const response = await fetch(
           "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        users = await response.json();

        renderUsers(users);

    } catch (error) {
        status.textContent = "Error loading users. Please try again.";
        console.error(error);

    } finally {
        loadButton.disabled = false;
    }
}


loadButton.addEventListener("click", loadUsers);


filterInput.addEventListener("input", function () {
    const searchText = filterInput.value.toLowerCase();

    const filteredUsers = users.filter(function (user) {
        return user.name.toLowerCase().includes(searchText);
    });

    renderUsers(filteredUsers);
});



