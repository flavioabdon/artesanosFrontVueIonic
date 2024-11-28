<template>
    <ion-header>

    </ion-header>
    <ion-content>
        <div class="background-pic">
            <div class="background-filter">
                <div class="shape">
                    <!--<img src="../assets/shape.svg" />-->
                </div>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>
                            Bienvenido
                        </ion-card-title>
                        <ion-card-subtitle>
                            Ingrese su usuario
                        </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <form @submit.prevent="login">
                            <ion-item>
                                <ion-input label="Email" label-placement="floating" :clear-input="true"
                                    v-model="email"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input type="password" label="Contraseña" label-placement="floating"
                                    v-model="password"></ion-input>
                            </ion-item>

                            <div class="bottom-section">
                                <ion-button type="submit">
                                    Iniciar Sesión
                                </ion-button>
                            </div>
                        </form>

                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </ion-content>
</template>

<script>
import {
    IonHeader, IonContent, IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonItem, IonInput

} from '@ionic/vue';
export default {
    name: 'login2Component',
    components: {
        IonHeader, IonContent, IonCard, IonCardContent, IonCardHeader,
        IonCardTitle, IonCardSubtitle, IonItem, IonInput
    },
    data() {
        return {
            email: '',
            password: '',
            showToast: false,
            toastMessage: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await fetch('http://localhost:3000/auth/formIniciarSesion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emailUsuario: this.email,
                        password: this.password
                    })
                });

                const data = await response.json();

                if (response.ok && data.message === "Inicio de sesión exitoso") {
                    sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
                    const usuario_nombre = JSON.parse(sessionStorage.getItem('usuario')).nombre;
                    this.toastMessage = `Bienvenido,` + usuario_nombre + `.`;
                    this.showToast = true;
                    this.position = "top"
                    let redirectRoute = '/';
                    if (data.usuario.rol === "Cliente") {
                        redirectRoute = '/bienvenidaCliente';
                    } else if (data.usuario.rol === "Delivery") {
                        redirectRoute = '/bienvenidaDelivery';
                    } else {
                        alert('Usuario no valido');
                        this.toastMessage = 'Usuario no admitido';
                        this.errorMessage = 'Usuario no admitido';
                        this.showErrorToast = true;
                    }
                    this.$router.push(redirectRoute);
                } else {
                    this.toastMessage = data.message || 'Error al iniciar sesión';
                    this.errorMessage = 'Error al iniciar sesión';
                    this.showErrorToast = true;
                    this.position = "top"
                }
            } catch (error) {
                this.toastMessage = 'Error en la solicitud: ' + error.message;
                this.errorMessage = 'Error al la solicitud';
                this.showErrorToast = true;
                this.position = "top"
            }
        },
        clearFields() {
            this.email = '';
            this.password = '';
        }
    }
}
</script>

<style>
ion-content {
    --ion-background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
}

ion-item {
    --ion-item-background: rgba(169, 169, 169, 0.5);
    /* Fondo medio plomo */
    --border-width: 0;
}

ion-input {
    color: #000 !important;
    /* Color del texto */
    --placeholder-color: #aaa !important;
    /* Color del placeholder */
    --focus-color: #000 !important;
    /* Color del texto al hacer focus */
    --highlight-color-focused: #000 !important;
    /* Desactivar el resaltado del borde */
}





.background-pic {
    height: 100vh;
    width: 100%;
    background: url('/public/banner1.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.background-filter {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}



ion-card-header {
    padding-bottom: 10px;
}

ion-card-title {
    font-size: 24px;
    color: #333;
    font-weight: bold;
}

ion-card-subtitle {
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
}

ion-card-content {
    padding: 20px;
}


ion-item {
    margin-bottom: 30px;
}

ion-card {
    margin-top: 1rem;
    background: transparent;
    box-shadow: none;
    text-align: center;
    width: 90%;
    /* Esto hace que la tarjeta ocupe el 90% del ancho de la pantalla */
    max-width: 500px;
    /* Opcional: Establece un ancho máximo para la tarjeta */
    margin-left: auto;
    margin-right: auto;
    /* Centra la tarjeta en la pantalla */
}

.bottom-section {
    margin-top: 20px;
}
</style>
