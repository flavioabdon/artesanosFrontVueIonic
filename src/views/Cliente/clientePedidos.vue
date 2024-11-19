<template>
    <ion-menu content-id="main-content">
        <ion-header>
        <ion-toolbar color="tertiary">
            <ion-title>Menu</ion-title>
        </ion-toolbar>
        </ion-header>
        <!--Contenido menu lateral-->
        <ion-content class="ion-padding" tyle="display: flex; flex-direction: column; justify-content: space-between;">
            <!-- Sección de Perfil -->
            <div class="profile-section">
                <!-- Imagen de Perfil -->
                <img 
                :src="'http://localhost:3001/' + usuario.fotoperf_url" 
                alt="Foto de Perfil" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #ddd;">
                
                <!-- Nombre del Usuario -->
                <h2 class="ion-margin-top">{{ usuario.nombre }}</h2>
                <p class="ion-margin-bottom">{{ usuario.email }}</p>
            </div>

              <!-- Otro contenido -->
            <div>
                This is the menu content.
            </div>

            <!-- Botón Cerrar Sesión -->
            <div style="display: flex; align-items: center; justify-content: center; margin-top: auto; padding-top: 16px;">
                <ion-icon name="log-out-outline" style="font-size: 24px; margin-right: 8px; color: var(--ion-color-danger);"></ion-icon>
                <span style="font-size: 16px; font-weight: bold; color: var(--ion-color-danger);">
                    Cerrar Sesión
                </span>
            </div>
        </ion-content>
        
    </ion-menu>
  <!--Pagina-->
    <ion-page id="main-content">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Pedidos del usuario</ion-title>
            </ion-toolbar>
            
        </ion-header>
        <ion-content class="ion-padding">
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
    IonButtons, IonContent, IonMenu, IonMenuButton, IonToolbar,
    IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
    IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle, IonButton, IonIcon
} from '@ionic/vue';

import { defineComponent } from 'vue';


export default {
    name: 'clientePedidosComponent',
    components: {
        IonButtons, IonContent, IonMenu, IonMenuButton, IonToolbar,
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

            console.log("Cerrando sesion");

            // Redirige a la página de inicio de sesión
            this.$router.push('/login'); // O ajusta la ruta a la de inicio de sesión según tu configuración
        }
    }
};
</script>
<style>
  ion-menu::part(backdrop) {
    background-color: rgba(0, 0, 0, 0.144);
  }

  ion-menu::part(container) {
    border-radius: 0 20px 20px 0;

    box-shadow: 4px 0px 16px rgba(2, 43, 90, 0.18);
  }
  .profile-section {
  text-align: center;
  background: linear-gradient(135deg, #2868a4,  #084279); /* O usa una imagen con url('/ruta-al-fondo.jpg') */
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 15px;
  color: white; 
}
</style>