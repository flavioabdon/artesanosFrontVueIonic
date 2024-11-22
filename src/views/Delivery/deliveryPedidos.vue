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
                :src="'http://192.168.134.20:3000/' + usuario.fotoperf_url" 
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
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">#</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">ID Pedido</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">ID Cliente</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">Estado</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">Dirección</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">Costo de Envio</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="pedido in pedidosDelivery" :key="pedido.id_pedido">
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ pedido.num_fila  }}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ pedido.id_pedido }}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ pedido.id_usuario_cliente }}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                <!-- Mostrar el botón solo si el estado es 'En almacen' o 'En Almacen' -->
                                <template v-if="pedido.estado === 'En almacen' || pedido.estado === 'En Almacen'">
                                    <ion-button 
                                    color="primary" 
                                    @click="tomarPedido(pedido.id_pedido)" 
                                    expand="block"
                                    >
                                    Tomar Pedido
                                    </ion-button>
                                </template>
                                
                                <!-- Mostrar el estado del pedido en caso contrario -->
                                <template v-else>
                                    {{ pedido.estado }}
                                </template>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                            <div>
                                {{ pedido.direccion_envio }}
                                <ion-button 
                                size="small" 
                                color="primary" 
                                @click="mostrarMapa(pedido.direccion_envio)"
                                >
                                Ver Mapa
                                </ion-button>
                            </div>

                            <!-- Componente del Mapa -->
                            <Mapa 
                                v-if="direccionSeleccionada === pedido.direccion_envio" 
                                :direccion="pedido.direccion_envio" 
                            />
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ pedido.costo_envio }}</td>
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
import Mapa from './mapa.vue'; // Componente del mapa
import {
    IonButtons, IonContent, IonMenu, IonMenuButton, IonToolbar,
    IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
    IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle, IonButton, IonIcon
} from '@ionic/vue';

import { defineComponent } from 'vue';


export default {
    name: 'clientePedidosComponent',
    components: {
        Mapa,
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

            pedidosDelivery: [], // Aquí se almacenarán los datos de la API
            sumaTotal: 0,
            direccionSeleccionada: null, // Dirección actualmente seleccionada para mostrar el mapa
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

        async cargarPedidosDelivery() {
            try {
            const response = await fetch('http://192.168.134.20:3000/listarTodosLosPedidosDelivery', {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Error al cargar los pedidos');

            const data = await response.json();

            // Guardamos los pedidos en una variable
            this.pedidosDelivery = data;

            console.log('Pedidos cargados:', this.pedidosDelivery);
            } catch (error) {
            console.error('Error al cargar los pedidos:', error);
            alert('No se pudo cargar la lista de pedidos. Intente nuevamente.');
            }
        },
        async tomarPedido(idPedido) {
            try {
            const response = await fetch('http://192.168.134.20:3000/tomar_pedido_delivery', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                id_pedido: idPedido,
                id_usuario: this.usuario.id_usuario, 
                }),
            });

            if (!response.ok) throw new Error('Error al tomar el pedido');

            const data = await response.json();

            // Actualiza el estado del pedido en la lista si es necesario
            this.actualizarEstadoPedido(idPedido, 'Tomado');
            alert('Pedido tomado con éxito.');
            } catch (error) {
            console.error('Error al tomar  el pedido:', error);
            alert('No se pudo tomar el pedido. Intente nuevamente.');
            }
        },

        // Método para actualizar el estado del pedido localmente (opcional)
        actualizarEstadoPedido(idPedido, nuevoEstado) {
            const pedido = this.pedidosDelivery.find((p) => p.id_pedido === idPedido);
            if (pedido) pedido.estado = nuevoEstado;
            window.location.reload();
        },
        irAPedidosTomados() {
        this.$router.push(`/pedidosTomadosDelDelivery`);
        },
        irATomarPedidos() {
        this.$router.push(`/bienvenidaDelivery`);
        },
        mostrarMapa(direccion) {
            this.direccionSeleccionada = direccion; // Actualiza la dirección seleccionada
        },  
        },
    mounted() {
        // Si el objeto usuario tiene nombre, muestra un toast de bienvenida
        if (this.usuario && this.usuario.nombre) {
            this.showToastMessage(`Bienvenido, ${this.usuario.nombre}`);
        } else {
            this.showErrorMessage('No se encontró información del usuario.');
        }
        this.cargarPedidosDelivery(); // Cargar datos al montar el componente
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