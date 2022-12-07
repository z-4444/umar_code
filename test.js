const express = require('express');
const AppError = require("./middlewares/AppError");
const ejs = require('ejs');
const path = require("path");

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    if (res.headerSent) {
      return next(err);
    }
    res
      .status(err.code || 500)
      .json({ message: err.message || "Internal server error ):" });
  });

app.get("/i/want/title/", (req, res, next) => {
    const address = req.query.address;
    let type = typeof(address);
    try {
        if(type !== "string" && address.length >= 2){
            const [address1, address2] = address;
            return res.render("address", {address, address1: address1, address2: address2, type: type})
        }
        return res.render("address", {address: address, type: type})
    } catch (error) {

        return res.render("error", {error: error});
    }
    
})

app.all("*", (req, res, next) =>{
    return next(new AppError(404, "page not found"));
})
app.listen(3001, () => {
    console.log("running on port 3001");
})