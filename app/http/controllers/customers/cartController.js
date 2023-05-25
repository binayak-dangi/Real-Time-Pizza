  const { json } = require("express")

  function cartController() {
      return {
          index(req, res) {
              res.render('customers/cart');
          },
          update(req, res) {
              // let cart = {
              //     items: {
              //         pizzaId: { item: pizzaObject, qty:0 },
              //         pizzaId: { item: pizzaObject, qty:0 },
              //         pizzaId: { item: pizzaObject, qty:0 },
              //     },
              //     totalQty: 0,
              //     totalPrice: 0
              // }

              // for the first time  creating cart and adding basic object structure
              if (!req.session.cart) {
                  req.session.cart = {
                      items: {},
                      totalQty: 0,
                      totalPrice: 0
                  }
              }
              let cart = req.session.cart
                  //   console.log(req.body)

              // check if item does not exist in cart
              if (!cart.items[req.body._id]) {
                  cart.items[req.body._id] = {
                      item: req.body,
                      qty: 1
                  }
                  cart.totalQty += 1
                  cart.totalPrice += req.body.price
              } else {
                  cart.items[req.body._id].qty += 1;
                  cart.totalQty += 1
                  cart.totalPrice += req.body.price
              }

              return res.json({ totalQty: req.session.cart.totalQty })
                  //   return res.json({ data: 'All Ok' })
          }
      }
  }
  module.exports = cartController;
