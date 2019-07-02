const sgMail = require('@sendgrid/mail');
const config = require('./_config');
sgMail.setApiKey(config.SENDGRID_APIKEY);
function enviar(msg) {
    msg["from"] = config.sender_email;

    console.log("intentando enviar");
    console.log(msg);

    sgMail.send(msg)
        .then(
            (data) => {
                console.log("Éxito");
                // console.log(data);
            }
        )
        .catch(
            (err) => {
                console.log("Falla");
                console.log(err);
            }
        );
}
module.exports.send = enviar;