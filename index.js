const usuarioController = require("./user.controller");

var usuario = {
    curp: "AOVI840917HNTRZS09",
    name: "Israel",
    email: "iarjona@ittepic.edu.mx",
    password: "12345"
};

// usuarioController.register(usuario);
// usuarioController.login("iarjona@ittepic.edu.mx","12345");
usuarioController.recoveryPassword("iarjona@ittepic.edu.mx","1984/09/17");




