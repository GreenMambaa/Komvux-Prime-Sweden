$(() => {
    const products = [
        { name: 'OldPhone', price: 200, id: 9, description: 'Samsung Galaxy S10 Plus en ny generation av smartphones. Med en 6,4” Infinity-O skärm, bakre trippelkamera och 4K-videouppspelning.', picture: 'Images/OldPhone.png', category: 'Antics' },
        { name: 'WoodPhone', price: 500, id: 10, description: 'Samsung Galaxy S10 Plus en ny generation av smartphones. Med en 6,4” Infinity-O skärm, bakre trippelkamera och 4K-videouppspelning.', picture: 'Images/OldWoodPhone.png', category: 'Antics' },  
    ];

    let cart = [];
    const appendList = (array, location) => {
        const template = array.map((item, id) => {
            return `
                <li class="product col-3">
                    <img src="${item.picture}" alt="${item.description}">
                    <div class="product-content">
                        <h4>${item.name} - <span class="category">${item.category}</span> <small>${item.price}kr</small></h4>
                        <p>${item.description}</p>
                    </div>
                    <button type="button" id="${item.id}" class="btn btn-primary shop-button">Köp Nu!</button>
                </li>
            `;
        });
        $(location).html(template);
    }

    appendList(products, $(".product-list"));
    $(".product").on("click", "button", (e) => {
        let id = e.currentTarget.id;
        addToCart(products, +id, $(".cart-items"));
    });

    updateCartTotal()
    
    const addToCart = (array, id, location) => {
        let a = array.find(i => i.id === id);
        cart.push(a);
        const item = `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${a.picture}" width="100" height="100">
                    <span class="cart-item-title">${a.name}</span>
                </div>
                <div class="cart-price cart-column">${a.price}</div>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>
        `;
        $("span.amount").text(cart.length);
        $(location).append(item);
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i]
            button.addEventListener('click', removeCartItems)
             
            function removeCartItems(event) {
                var buttonClicked = event.target
                buttonClicked.parentElement.parentElement.remove()
            }
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
                
            updateCartTotal()
        }

        var cartRow = getElementsByClassName('cart-row')
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeFromCart)
        updateCartTotal()
    }

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
                
        updateCartTotal()
    }
        
    function quantityChanged(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }


    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('kr', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = total + 'kr'
    }

});