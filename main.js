 var ordernumber = 1;
 
 var coffeeInput = document.querySelector('[name="coffee_order"]');
 var email = document.querySelector('[name="email"]');
 var size = document.querySelector('[name="size"]:checked');
 var flavor = document.querySelector('[name="flavor"]');
 var content = document.querySelector('[name="caffeine"]');
 var consent = document.querySelector('[name="waiver"]');
 

 var submitButton = document.querySelector('[name="submission"]');
 var form = document.querySelector('.coffeeorderform');
 var resetButton = document.querySelector('[name="reset"]');

 var orderList = document.querySelector('.order_list');

 var orders = [];
 var prevorders = JSON.parse(localStorage.getItem('coffee-orders'));

 console.log(prevorders);

 
//  var previous = function() {
//     orderList.appendChild(prevorders);
//  }

//  previous();
 

 form.addEventListener('submit', function(event) {
    event.preventDefault();
    var coffeestyle = document.createElement('li');
    var emailcontact = document.createElement('li');
    // var coffeesize = document.createElement('li');
    var coffeeflavor = document.createElement('li');
    var coffestr = document.createElement('li');
    var header = document.createElement('h3');
    var newDiv = document.createElement('div');


    var unorderedlist = document.createElement('ul');
 
    coffeestyle.textContent = coffeeInput.value;
    emailcontact.textContent = email.value;
    coffeeflavor.textContent = flavor.value;
    coffestr.textContent = content.value;
     
     header.textContent = "Order Number: " + ordernumber;
     unorderedlist.appendChild(header);
     unorderedlist.appendChild(coffeestyle);
     unorderedlist.appendChild(emailcontact);
     unorderedlist.appendChild(coffeeflavor);
     unorderedlist.appendChild(coffestr);

     newDiv.appendChild(header);
     newDiv.appendChild(unorderedlist);

     orderList.appendChild(newDiv);

     orders.push(newDiv);

    ordernumber++;
    localStorage.setItem('coffee-orders', JSON.stringify(orders));

    
 });
 
 localStorage.setItem('coffee-orders', JSON.stringify(orders));

 console.log(coffeeInput.value);