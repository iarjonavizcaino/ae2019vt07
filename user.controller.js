var mongoose = require("mongoose");
var schema = require("./user.model");
const sendmail = require("./sendmail");

mongoose.connect('mongodb://localhost:27017/ae2010vt07', { useNewUrlParser: true });
var Usuario = mongoose.model('Usuario', schema, 'usuarios');

function register(usuario) {
    Usuario.create(usuario)
        .then((data) => {
            const env = {
                to: usuario.email,
                subject: "Registro exitoso",
                text: `Este es un mensaje que se "envio" a ${usuario.name}`,
                html: `<strong>Estimado ${usuario.name}:</strong>
                <p>Su registro fue exitoso. <br> 
                    Su contraseña es ${usuario.password}
                </p>`
            };

            console.log(env);
            sendmail.send(env);
            console.log("Saved!!");
            console.log(data);
            //process.exit(0);
        })
        .catch((error) => {
            console.log("Error!!!");
            console.log(error);
            //process.exit(1);
        });
}

function login(email, password) {

    const userToFind = new Usuario({email, password});
    userToFind.encryptFieldsSync();
    
    const params = {
        email: userToFind.email,
        password: userToFind.password
    };

    // console.log(params);
    Usuario.findOne(params, "-password")
        .then((data) => {
            console.log("Por aquí")
            console.log(data);
        })
        .catch((err) => {
            console.log("Not found");
        });
}

function recoveryPassword(email, birthdate) {
    const userToFind = new Usuario({email});
    userToFind.encryptFieldsSync();
    
    const params = {
        email: userToFind.email,
        birthdate: birthdate
    };

    // console.log(params);
    Usuario.findOne(params)
        .then((data) => {
            console.log("Por aquí")
            console.log(data);

            const env = {
                to: data.email,
                subject: "Recuperación de email",
                text: `Este es un mensaje que se "envio" a ${data.name}`,
                html: `<strong>Estimado ${data.name}:</strong>
                <p>Su contraseña es ${data.password}
                </p>`
            };

            console.log(env);
            sendmail.send(env);

        })
        .catch((err) => {
            console.log("Not found");
        });
}

module.exports.register = register;
module.exports.login = login;
module.exports.recoveryPassword = recoveryPassword;
