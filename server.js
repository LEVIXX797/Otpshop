const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let orders = [];

/* CREATE ORDER */
app.post("/order", (req, res) => {
  const { user, product, amount } = req.body;

  const order = {
    id: Date.now(),
    user,
    product,
    amount,
    status: "pending"
  };

  orders.push(order);
  res.json(order);
});

/* GET ORDERS */
app.get("/orders", (req, res) => {
  res.json(orders);
});

/* APPROVE ORDER */
app.post("/approve", (req, res) => {
  const { id, result } = req.body;

  let order = orders.find(o => o.id == id);

  if(order){
    order.status = "approved";
    order.result = result;
  }

  res.json({ msg: "Approved" });
});

app.listen(5000, () => console.log("Server running"));
