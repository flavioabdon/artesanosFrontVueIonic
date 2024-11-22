<template>
    <ion-menu content-id="main-content">
        <ion-header>
        <ion-toolbar color="secondary">
            <ion-title>Menu</ion-title>
        </ion-toolbar>
        </ion-header>
        <!--Contenido menu lateral-->
        <ion-content class="ion-padding" tyle="display: flex; flex-direction: column; justify-content: space-between;">
            <!-- Sección de Perfil -->
            <div class="profile-section">
                <!-- Imagen de Perfil -->
                <img 
                :src="'http://localhost:3000/' + usuario.fotoperf_url" 
                alt="Foto de Perfil" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #ddd;">
                
                <!-- Nombre del Usuario -->
                <h2 class="ion-margin-top">{{ usuario.nombre }}</h2>
                <p class="ion-margin-bottom">{{ usuario.email }}</p>
            </div>

              <!-- Otro contenido -->
              <div 
                @click="irATomarPedidos"
                style="display: flex; align-items: center; justify-content: center; margin-top: auto; padding-top: 16px; cursor: pointer;">
                <ion-icon name="checkbox" style="font-size: 24px; margin-right: 8px; color: var(--ion-color-medium);"></ion-icon>
                <span style="font-size: 16px; font-weight: bold; color: var(--ion-color-medium);">
                    Tomar Pedidos
                </span>
            </div>
              <div 
                @click="irAPedidosTomados"
                style="display: flex; align-items: center; justify-content: center; margin-top: auto; padding-top: 16px; cursor: pointer;">
                <ion-icon name="checkbox" style="font-size: 24px; margin-right: 8px; color: var(--ion-color-medium);"></ion-icon>
                <span style="font-size: 16px; font-weight: bold; color: var(--ion-color-medium);">
                    Mis Pedidos
                </span>
            </div>
            <!-- Botón Cerrar Sesión -->
            <div 
                @click="logout"
                style="display: flex; align-items: center; justify-content: center; margin-top: auto; padding-top: 16px; cursor: pointer;">
                <ion-icon name="log-out-outline" style="font-size: 24px; margin-right: 8px; color: var(--ion-color-medium);"></ion-icon>
                <span style="font-size: 16px; font-weight: bold; color: var(--ion-color-medium);">
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
                <ion-title class="ion-text-center">Tomar Pedidos</ion-title>
            </ion-toolbar>
            
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row class="ion-justify-content-center" style="height: 100vh;">
                    <ion-col size="10">
                        <!-- Tabla -->
                        <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">ID Pedido</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Cliente</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Estado</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Costo Envío</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pedido in pedidos" :key="pedido.id_pedido">
                            <td style="border: 1px solid #ddd; padding: 8px;">{{ pedido.id_pedido }}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">{{ pedido.id_usuario_cliente }}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">
                            <div v-if="pedido.estado === 'En Camino' || pedido.estado === 'En camino'">
                                <ion-button color="success" @click="marcarEnCasa(pedido.id_pedido)">En Casa</ion-button>
                            </div>
                            <div v-else-if="pedido.estado === 'Finalizado' || pedido.estado === 'finalizado'">
                                <ion-button color="light" disabled>Finalizado</ion-button>
                            </div>
                            <div v-else>
                                {{ pedido.estado }}
                            </div>
                            </td>
                            <td style="border: 1px solid #ddd; padding: 8px;">{{ pedido.costo_envio }}</td>
                            </tr>
                        </tbody>
                        </table>
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
            errorMessage: '',

            pedidos: [], // Aquí se almacenarán los datos de la API
            sumaTotal: 0
        };
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
        },

        async cargarPedidosDeliveryPorId() {
            try {
            const response = await fetch(`http://localhost:3000/listarPedidosDeliveryPorId/${this.usuario.id_usuario}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Error al obtener los pedidos');

            const data = await response.json();

            // Guardar los datos en una variable reactiva
            this.pedidos = data;
            } catch (error) {
            console.error('Error al cargar los pedidos del delivery:', error);
            }
        },
        async marcarEnCasa(idPedido) {
            try {
            const response = await fetch('http://localhost:3000/delivery_en_casa', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_pedido: idPedido }),
            });

            if (!response.ok) throw new Error('Error al marcar como "En Casa"');

            // Opcional: Actualizar el estado localmente
            const pedido = this.pedidos.find((p) => p.id_pedido === idPedido);
            if (pedido) {
                pedido.estado = 'En Casa';
            }
            } catch (error) {
            console.error('Error al marcar como "En Casa":', error);
            }
        },
        irAPedidosTomados() {
        this.$router.push(`/pedidosTomadosDelDelivery`);
        },
        irATomarPedidos() {
        this.$router.push(`/bienvenidaDelivery`);
        },  
        },
    mounted() {
        // Si el objeto usuario tiene nombre, muestra un toast de bienvenida
        if (this.usuario && this.usuario.nombre) {
            this.showToastMessage(`Bienvenido, ${this.usuario.nombre}`);
        } else {
            this.showErrorMessage('No se encontró información del usuario.');
        } // Cargar datos al montar el componente
        this.cargarPedidosDeliveryPorId();
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
.cerrar-sesion{
    background-color: black;
}
table th, table td {
  text-align: center;
  font-size: 14px;
}
table tr:nth-child(even) {
  background-color: #f9f9f9;
}
table tr:hover {
  background-color: #f1f1f1;
}

</style>