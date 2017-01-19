import './index.css';
import {getUsers, deleteUser} from './api/userApi';

// populate table of users via API call
getUsers().then(result => {
    let usersBody = "";

    result.forEach(user => {
        usersBody+= `<tr>
            <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.email}</td>
        </tr>`
    });

    console.log(usersBody);       //eslint-disable-line no-console
    global.document.getElementById('users').innerHTML = usersBody;

    const deleteLinks = global.document.getElementsByClassName('deleteUser');
    console.log(`Number of deleteLinks: ${deleteLinks.length}`);   //eslint-disable-line no-console

    // must use array.from to create a real array from a DOM collection
    // getElementByClassName only returns and "array like" object
    Array.from(deleteLinks, link => {
        link.onclick = function(event) {
            const element = event.target;
            event.preventDefault();
            console.log(element.attributes["data-id"].value);   //eslint-disable-line no-console
            deleteUser(element.attributes["data-id"].value);
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
        };
    });
});
