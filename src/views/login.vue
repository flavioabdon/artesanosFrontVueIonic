<template>
    <ion-page>
        <ion-header>
            <ion-title>Iniciar Sesión</ion-title>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="8">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>Iniciar Sesión</ion-card-title>
                            </ion-card-header>

                            <ion-card-content>
                                <form @submit.prevent="login">
                                    <ion-item>
                                        <ion-input
                                            label="Email"
                                            label-placement="floating"
                                            fill="solid"
                                            v-model="email"
                                            placeholder="Ingresa tu email"
                                            required
                                        ></ion-input>
                                    </ion-item><br>

                                    <ion-item>
                                        <ion-input
                                            type="password"
                                            label="Contraseña"
                                            label-placement="floating"
                                            fill="solid"
                                            v-model="password"
                                            placeholder="Ingresa tu contraseña"
                                            required
                                        ></ion-input>
                                    </ion-item>

                                    <ion-button expand="full" type="submit" class="ion-margin-top">
                                        <ion-icon slot="start" name="log-in"></ion-icon>
                                        Iniciar Sesión
                                    </ion-button>

                                    <ion-button expand="full" color="light" class="ion-margin-top" @click="clearFields">
                                        <ion-icon slot="start" name="trash"></ion-icon>
                                        Limpiar
                                    </ion-button>
                                </form>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- Toast de Ionic -->
            <ion-toast
                :is-open="showToast"
                :message="toastMessage"
                duration="2000"
                @did-close="showToast = false"
                color="success"
            ></ion-toast>
            <!-- Toast de error -->
            <ion-toast
                :is-open="showErrorToast"
                :message="errorMessage"
                duration="2000"
                @did-close="showErrorToast = false"
                color="danger"
            ></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
    IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle
} from '@ionic/vue';

export default {
    name: 'loginComponent',
    components: {
        IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
        IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle
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
                    // Guarda el objeto usuario en sessionStorage
                    sessionStorage.setItem('usuario', JSON.stringify(data.usuario));

                    //Recupera el objeto usuario
                    const usuario_nombre = JSON.parse(sessionStorage.getItem('usuario')).nombre;

                    // Configurar el mensaje del toast
                    this.toastMessage = `Bienvenido,`+usuario_nombre+`.`;
                    this.showToast = true;
                    this.positicon = "top"
                    // Determina la ruta según el rol del usuario
                    let redirectRoute = '/';
                    if (data.usuario.rol === "Cliente") {
                        redirectRoute = '/bienvenidaCliente';
                    } else if (data.usuario.rol === "Delivery") {
                        redirectRoute = '/bienvenidaDelivery';
                    }

                    // Redirecciona a la ruta correspondiente
                    this.$router.push(redirectRoute);
                } else {
                    // Muestra el mensaje de error en el toast
                    this.toastMessage = data.message || 'Error al iniciar sesión';
                    this.errorMessage = 'Error al iniciar sesión';
                    this.showErrorToast= true;
                }
            } catch (error) {
                // Manejo de errores de solicitud
                this.toastMessage = 'Error en la solicitud: ' + error.message;
                this.errorMessage = 'Error al la solicitud';
                this.showErrorToast = true;
            }
        },
        clearFields() {
            this.email = '';
            this.password = '';
        }
    }
};
</script>

<style scoped>
/* Aquí puedes agregar estilos personalizados para el Toast si lo necesitas */
</style>
