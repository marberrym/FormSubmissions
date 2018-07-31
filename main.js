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



 var orders = [];
 var prevorders = JSON.parse(localStorage.getItem('coffee-orders'));

 console.log(prevorders);

 var createDOM = function(order) {
    var newDiv = document.createElement('div');
    var unorderedlist = document.createElement('ul');

    var headOrder = document.createElement('h3');
    headOrder.textContent = order['orderNumber'];
    newDiv.appendChild(headOrder);

    var orderStyle = document.createElement('li')
    orderStyle.textContent = order['coffeeStyle'];
    unorderedlist.appendChild(orderStyle);

    var orderEmail = document.createElement('li');
    orderEmail.textContent = order['contactEmail'];
    unorderedlist.appendChild(orderEmail);

    var orderFlavor = document.createElement('li');
    orderFlavor.textContent = order['coffeeFlavor'];
    unorderedlist.appendChild(orderFlavor);

    var orderStr = document.createElement('li');
    orderStr.textContent = order['caffeineStr'];
    unorderedlist.appendChild(orderStr);

    var completeButton = document.createElement('button');
    completeButton.textContent = 'Complete this order!';
    unorderedlist.appendChild(completeButton);

    completeButton.addEventListener('click', function(event) {
        orderList.removeChild(newDiv);
    });

    newDiv.appendChild(unorderedlist);

    orderList.appendChild(newDiv);
}

if (prevorders != null) {
    for (var order of prevorders) {
        createDOM(order);
    }
};

 form.addEventListener('submit', function(event) {
    event.preventDefault();

    var style = coffeeInput.value;
    var email = contactemail.value;
    var flavor = coffeeflavor.value;
    var str = caffcontent.value;
    var header = "Order Number: " + ordernumber;
    
    var orderObject = { orderNumber: header,
                        coffeeStyle: style,
                        contactEmail: email,
                        coffeeFlavor: flavor,
                        caffeineStr: str
    };

    orders.push(orderObject);
    createDOM(orderObject);

    ordernumber++;
    localStorage.setItem('coffee-orders', JSON.stringify(orders));

 });
 