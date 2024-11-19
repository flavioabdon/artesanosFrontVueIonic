<template>
    <ion-page>
        <ion-header>
            <ion-title>Pedidos del usuario</ion-title>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="4">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title>Bienvenido, {{ usuario.nombre }}</ion-card-title>
                            </ion-card-header>

                            <ion-card-content>
                                <p>Mostrar Clientes</p>
                                
                                <!-- Botón de Cerrar Sesión -->
                                <ion-button expand="full" color="danger" @click="logout">
                                    <ion-icon slot="start" name="log-out"></ion-icon>
                                    Cerrar sesión
                                </ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- Toast de éxito -->
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
    IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle, IonButton, IonIcon
} from '@ionic/vue';
import { addIcons } from 'ionicons';

export default {
    name: 'clientePedidosComponent',
    components: {
        IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
        IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle, IonButton, IonIcon
    },
    data() {
        return {
            // Recuperamos el objeto usuario desde sessionStorage
            usuario: JSON.parse(sessionStorage.getItem('usuario')) || {},

            // Controla el estado del toast de éxito
            showToast: false,
            toastMessage: '',

            // Controla el estado del toast de error
            showErrorToast: false,
            errorMessage: ''
        };
    },
    mounted() {
        // Si el objeto usuario tiene nombre, muestra un toast de bienvenida
        if (this.usuario && this.usuario.nombre) {
            this.showToastMessage(`Bienvenido, ${this.usuario.nombre}`);
        } else {
            this.showErrorMessage('No se encontró información del usuario.');
        }
    },
    methods: {
        // Muestra el toast de éxito
        showToastMessage(message) {
            this.toastMessage = message;
            this.showToast = true;
        },

        // Muestra el toast de error
        showErrorMessage(message) {
            this.errorMessage = message;
            this.showErrorToast = true;
        },

        // Método para cerrar sesión
        logout() {
            // Borra las variables de sesión
            sessionStorage.removeItem('usuario');

            // Muestra un mensaje de éxito al cerrar sesión
            this.showToastMessage('Has cerrado sesión exitosamente.');

            // Redirige a la página de inicio de sesión
            this.$router.push('/login'); // O ajusta la ruta a la de inicio de sesión según tu configuración
        }
    }
};
</script>
