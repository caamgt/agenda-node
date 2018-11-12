function buscarUsuarios() {
    $.ajax({
        url: '/crearUsuario',
        method: 'GET',
        data: {},
        success: function(res) {
            console.log(res);
            mensaje = "";
            for (var i = 0; i < res.length; i++) {
                mensaje += '<small>Usuario: ' + res[i].email + ' - Password: ' + res[i].password + '</small><br>';
            }
            $('#mensajeUsuarios').html(mensaje);
        }
    })
}

//Funcion para validar inicio de sesión
function validarUsuario() {
    var emailDeUsuario = $('#user');
    var claveDeUsuario = $('#pass');
    if (emailDeUsuario.val() != "" && claveDeUsuario.val() != "") {
        $.ajax({
            url: '/login',
            method: 'POST',
            data: {
                email: emailDeUsuario.val(),
                password: claveDeUsuario.val()
            },
            success: function(res) {
                mostrarMensaje(res);
                if (res == "Validado") {
                    window.location.href = "http://localhost:3000/main.html";
                }
            }
        })
    } else {
        alert("Complete todos los campos");
    }
}

function mostrarMensaje(msj) {
    $('#mensajeSesion').html(msj);
}