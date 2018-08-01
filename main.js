(function() {
var form = document.querySelector('.coffeeorderform');
var serverURL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';

var serverPush = function(server, object) {
    $.post(server, object, function(resp) {
        console.log(resp);
    });
}

var serverGet = function(server) {
    $.get(server, function(data) {
        console.log(data);
        for(order of Object.values(data)) {
            createDOM(order);
        }
    });  
}

var serverRemove = function(server, post) {
    $.ajax(server + "/" + post.emailAddress, {
        method: "DELETE",
        success: function(orderDone) {
                    console.log(orderDone)
                    }});
}

var createDOM = function(order) {
    var serverURL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';
    var orderList = document.querySelector('.order_list');
    var completeButton = document.querySelector('[name="complete"]');
    var newDiv = document.createElement('div');
    var unorderedlist = document.createElement('ul');

    var headOrder = document.createElement('h3');
    if (order._id != undefined) {
        headOrder.textContent = "Order Number: " + order['_id'];
    } else {
        headOrder.textContent = "New Local Order";
    }
    
    newDiv.appendChild(headOrder);

    var orderStyle = document.createElement('li')
    orderStyle.textContent = order['coffee'];
    unorderedlist.appendChild(orderStyle);

    var orderStr = document.createElement('li');
    orderStr.textContent = order['strength'];
    unorderedlist.appendChild(orderStr);

    var orderFlavor = document.createElement('li');
    orderFlavor.textContent = order['flavor'];
    unorderedlist.appendChild(orderFlavor);

    var orderEmail = document.createElement('li');
    orderEmail.textContent = order['emailAddress'];
    unorderedlist.appendChild(orderEmail);

    var completeButton = document.createElement('button');
    completeButton.classList.add('completebutton');
    completeButton.textContent = 'Complete this order!';
    unorderedlist.appendChild(completeButton);

    completeButton.addEventListener('click', function(event) {
        orderList.removeChild(newDiv);
        serverRemove(serverURL, order);
    });

    newDiv.appendChild(unorderedlist);
    orderList.appendChild(newDiv);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var coffeeInput = document.querySelector('[name="coffee_order"]');
    var contactemail = document.querySelector('[name="email"]');
    var coffeeflavor = document.querySelector('[name="flavor"]');
    var caffcontent = document.querySelector('[name="caffeine"]');
  
    var orderObject = { name: "Order",
                        coffee: coffeeInput.value,
                        strength: caffcontent.value,
                        flavor: coffeeflavor.value,
                        emailAddress: contactemail.value
    };

    createDOM(orderObject);
    serverPush(serverURL, orderObject);    
});
serverGet(serverURL)})();
