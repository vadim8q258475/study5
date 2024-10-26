
def recalc_cart(cart):
    cart_products = cart.products.all()
    total = 0
    for cart_product in cart_products:
        cart_product_qty = cart_product.qty
        cart_product_price = cart_product.product.price
        total += cart_product_qty * cart_product_price
    cart.total = total 
    cart.save()
