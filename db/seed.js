  let Promise = require('bluebird');


  const db = require('./index');

  let User = require('./models/index').User;
  let Order = require('./models/index').Order;
  let Comment = require('./models/index').Comment;
  let ShoeInventory = require('./models/index').ShoeInventory;
  let ShoeModel = require('./models/index').ShoeModel;



  let data = {

    user: [{
        firstname: "Andy",
        lastname: "North",
        address: "123 N. Clark St, Chicago, IL 60622",
        email: "anorth@email.com",
        admin: true
    }, {
        firstname: "Tom",
        lastname: "Redus",
        address: "434 W. State St, Chicago, IL 60645",
        email: "tredus@email.com",
        admin: false
    }, {
        firstname: "Joe",
        lastname: "Stephens",
        address: "5632 W. Division St, Chicago, IL 60813",
        email: "jstephens@email.com",
        admin: false
    }, {
        firstname: "Mike",
        lastname: "Purgatori",
        address: "6164 W. Addison St, Chicago, IL 60669",
        email: "mpurgatori@email.com",
        admin: true
    }],

      comment: [{
          product_rating: 4,
          body: "Amazing shoe",
          upvotes: 32,
          downvotes: 5
      }, {
          product_rating: 1,
          body: "Pretty much the worst shoe ever!",
          upvotes: 11,
          downvotes: 8
      },{
          product_rating: 3,
          body: "Meh...It's a shoe",
          upvotes: 3,
          downvotes: 100
      },{
          product_rating: 5,
          body: "It's like walking on a football field of jello shots and wookies",
          upvotes: 400,
          downvotes: 1
      }],

      order: [{
        date: 2017-01-03,
        tracking: "1779298016",
        address: "123 N. Clark St, Chicago, IL 60622",
        payment: "Credit Card",
        status: "shipped"
      },{
        date: 2017-01-11,
        tracking: "90083HKWGO09",
        address: "434 W. State St, Chicago, IL 60645",
        payment: "Credit Card",
        status: "pending"
      },{
        date: 2016-22-12,
        tracking: "33344532112",
        address: "5632 W. Division St, Chicago, IL 60813",
        payment: "Credit Card",
        status: "shipped"
      },{
        date: 2016-02-10,
        tracking: "773669973-9820",
        address: "6164 W. Addison St, Chicago, IL 60669",
        payment: "Credit Card",
        status: "pending"
      }],

      shoe_model: [{
          brand: "Nike",
          name: "Air Bud II's",
          style: "Athletic",
          image_url: "http://thethings3.imgix.net/wp-content/uploads/2016/04/26complex.jpg?auto=format&lossless=1&q=90&w=612&h=612&fit=crop",
          description: "This sneak will give rover the boost and pep to take down them bastards accross town for the city title.",
          country_of_origin: "USA",
          rating: 5,
          gender: 'Men',
          price: 59.99
      }, {
          brand: "Uggz",
          name: "The Basic",
          style: "Casual",
          image_url: "http://demandware.edgesuite.net/sits_pod37/dw/image/v2/ABCR_PRD/on/demandware.static/-/Sites-masterCatalogUgg/default/dw39382d47/images/amazon/large/1016224-CHE_2.jpg?sw=375&sh=418&sm=fit",
          description: "Perfect for a fall afternoon. Just you and your vanilla chai coffee thing.",
          country_of_origin: "Australia",
          rating: 2,
          gender: 'Women',
          price: 39.99
      }, {
          brand: "Timberlands",
          name: "The Trekker",
          style: "Boot",
          image_url: "http://cdn.planetshoes.com/images/7100/7100_184_zoom.jpg",
          description: "Go ahead, scale Kilimanjaro in em. We dare you.",
          country_of_origin: "Canada",
          rating: 4,
          gender: 'Men',
          price: 89.99
      },{
          brand: "Brunswick",
          name: "The Lebowskis",
          style: "Athletic",
          image_url: "https://img1.etsystatic.com/000/0/5120282/il_570xN.266946931.jpg",
          description: "You gotta use so many cuss words?",
          country_of_origin: "USA",
          rating: 1,
          gender: 'Men',
          price: 129.99
      }],

      shoe_inventory: [{
        size: 12,
        color: "White",
        quantity: 23
      },{
        size: 11,
        color: "White",
        quantity: 3
      },{
        size: 10,
        color: "White",
        quantity: 11
      },{
        size: 12,
        color: "Red",
        quantity: 40
      },{
        size: 8,
        color: "Brown",
        quantity: 12
      },{
        size: 7,
        color: "Brown",
        quantity: 90
      },{
        size: 7.5,
        color: "Brown",
        quantity: 2
      },{
        size: 8,
        color: "Black",
        quantity: 20
      },{
        size: 9.5,
        color: "Grey",
        quantity: 11
      },{
        size: 10,
        color: "Green",
        quantity: 111
      },{
        size: 10.5,
        color: "Green",
        quantity: 2
      },{
        size: 11.5,
        color: "Black",
        quantity: 20
      },{
        size: 13,
        color: "Blue",
        quantity: 12
      },{
        size: 8,
        color: "Blue",
        quantity: 90
      },{
        size: 12,
        color: "Brown",
        quantity: 2
      },{
        size: 11,
        color: "Black",
        quantity: 20
      }]
  };

  const oldFunction = function() {
      console.log("Currently seeding file -> seed.js");
      return Promise.map(Object.keys(data), function(name) {
          return Promise.map(data[name], function(item) {
              return db.model(name)
                  .create(item);
          });
      });
  }

  db.didSync
      //.then(() => db.sync({force: true}))
      .then(oldFunction)

      .then(function() {
          return Order.findAll()
      })
      .then(function(orderMap) {
          return User.findAll()
              .then(function(userMap) {
                  return Promise.all([
                      orderMap[0].setUser(userMap[0]),
                      orderMap[1].setUser(userMap[1]),
                      orderMap[2].setUser(userMap[1]),
                      orderMap[3].setUser(userMap[2])
                  ])
              })
      })

      .then(function() {

          return ShoeInventory.findAll()
      })
      .then(function(invMap) {

          return ShoeModel.findAll()
              .then(function(shoeMap) {
                  return Promise.all([
                      invMap[0].setShoe_model(shoeMap[0]),
                      invMap[1].setShoe_model(shoeMap[0]),
                      invMap[2].setShoe_model(shoeMap[0]),
                      invMap[3].setShoe_model(shoeMap[0]),
                      invMap[4].setShoe_model(shoeMap[1]),
                      invMap[5].setShoe_model(shoeMap[1]),
                      invMap[6].setShoe_model(shoeMap[1]),
                      invMap[7].setShoe_model(shoeMap[1]),
                      invMap[8].setShoe_model(shoeMap[2]),
                      invMap[9].setShoe_model(shoeMap[2]),
                      invMap[10].setShoe_model(shoeMap[2]),
                      invMap[11].setShoe_model(shoeMap[2]),
                      invMap[12].setShoe_model(shoeMap[3]),
                      invMap[13].setShoe_model(shoeMap[3]),
                      invMap[14].setShoe_model(shoeMap[3]),
                      invMap[15].setShoe_model(shoeMap[3]),
                  ])
              })
      })

      .then(function() {

          return Comment.findAll()
      })
      .then(function(commentMap) {
          return ShoeModel.findAll()
              .then(function(shoeMap) {
                  return Promise.all([
                      commentMap[0].setShoe_model(shoeMap[0]),
                      commentMap[1].setShoe_model(shoeMap[1]),
                      commentMap[2].setShoe_model(shoeMap[2]),
                      commentMap[3].setShoe_model(shoeMap[3])
                  ])
              })
      })
      .then(function() {
          return Comment.findAll()
      })
      .then(function(commentMap) {
          return User.findAll()
              .then(function(userMap) {
                  return Promise.all([
                      commentMap[0].setUser(userMap[0]),
                      commentMap[1].setUser(userMap[1]),
                      commentMap[2].setUser(userMap[2]),
                      commentMap[3].setUser(userMap[3])
                  ])
              })
      })
      .then(function() {
          return Promise.all([
              Order.findOne({
                  where: {
                      id: 1
                  }
              }),
              ShoeInventory.findOne({
                  where: {
                      id: 4
                  }
              })
          ]);
      })
      .spread(function(order, shoe_inventory) {
          return shoe_inventory.addOrder(order);
      })
      .then(function() {
          return Promise.all([
              Order.findOne({
                  where: {
                      id: 1
                  }
              }),
              ShoeInventory.findOne({
                  where: {
                      id: 8
                  }
              })
          ]);
      })
      .spread(function(order, shoe_inventory) {
          return shoe_inventory.addOrder(order);
      })
      .then(function() {
          return Promise.all([
              Order.findOne({
                  where: {
                      id: 2
                  }
              }),
              ShoeInventory.findOne({
                  where: {
                      id: 1
                  }
              })
          ]);
      })
      .spread(function(order, shoe_inventory) {
          return shoe_inventory.addOrder(order);
      })
      .then(function() {
          return Promise.all([
              Order.findOne({
                  where: {
                      id: 2
                  }
              }),
              ShoeInventory.findOne({
                  where: {
                      id: 16
                  }
              })
          ]);
      })
      .spread(function(order, shoe_inventory) {
          return shoe_inventory.addOrder(order);
      })
      .then(function() {
          return Promise.all([
              Order.findOne({
                  where: {
                      id: 3
                  }
              }),
              ShoeInventory.findOne({
                  where: {
                      id: 2
                  }
              })
          ]);
      })
      .spread(function(order, shoe_inventory) {
          return shoe_inventory.addOrder(order);
      })
      .then(function() {
          return Promise.all([
              Order.findOne({
                  where: {
                      id: 4
                  }
              }),
              ShoeInventory.findOne({
                  where: {
                      id: 16
                  }
              })
          ]);
      })
      .spread(function(order, shoe_inventory) {
          return shoe_inventory.addOrder(order);
      })
      .then(function() {
          return Promise.all([
              Order.findOne({
                  where: {
                      id: 4
                  }
              }),
              ShoeInventory.findOne({
                  where: {
                      id: 12
                  }
              })
          ]);
      })
      .spread(function(order, shoe_inventory) {
          return shoe_inventory.addOrder(order);
      })
      .catch(function(err) {
          console.error('There was totally a problem', err, err.stack);
      });