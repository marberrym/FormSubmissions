var ordernumber = 1;
var coffeeInput = document.querySelector('[name="coffee_order"]');
var contactemail = document.querySelector('[name="email"]');
var coffeesize = document.querySelector('[name="size"]:checked');
var coffeeflavor = document.querySelector('[name="flavor"]');
var caffcontent = document.querySelector('[name="caffeine"]');
var consent = document.querySelector('[name="waiver"]');
var submitButton = document.querySelector('[name="submission"]');
var form = document.querySelector('.coffeeorderform');
var completeButton = document.querySelector('[name="complete"]');
var orderList = document.querySelector('.order_list');
var serverURL = 'https://dc-coffeerun.herokuapp.com/api/coffeeorders';
var orders = [];

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
                    }})
        
}

var createDOM = function(order) {
    var newDiv = document.createElement('div');
    var unorderedlist = document.createElement('ul');

    var headOrder = document.createElement('h3');
    headOrder.textContent = "Order Number: " + order['_id'];
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

    var style = coffeeInput.value;
    var email = contactemail.value;
    var flavor = coffeeflavor.value;
    var str = caffcontent.value;
    var header = "Order Number: " + ordernumber;
    
    var orderObject = { name: header,
                        coffee: style,
                        strength: str,
                        flavor: flavor,
                        emailAddress: email
    };

    orders.push(orderObject);
    createDOM(orderObject);
    serverPush(serverURL, orderObject);

    ordernumber++;
    
});

serverGet(serverURL);
