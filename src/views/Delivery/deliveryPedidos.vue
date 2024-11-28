<template>
    <ion-menu content-id="main-content">
        <ion-header>
            <ion-toolbar class="ion-text-center" color="medium">
                <ion-title>Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <!--Contenido menu lateral-->
        <ion-content class="ion-padding" tyle="display: flex; flex-direction: column; justify-content: space-between;">
            <!-- Sección de Perfil -->
            <div class="profile-section">
                <!-- Imagen de Perfil -->
                <img :src="'http://localhost:3000/' + usuario.fotoperf_url" alt="Foto de Perfil"
                    style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #ddd;">

                <!-- Nombre del Usuario -->
                <h3 class="ion-margin-top">{{ usuario.nombre }} {{ usuario.apellido }} </h3>
                <p class="ion-margin-bottom">{{ usuario.email }}</p>
            </div>

            <!-- Otro contenido -->
            <div @click="irATomarPedidos"
                style="display: flex; align-items: center; justify-content: center; margin-top: auto; padding-top: 16px; cursor: pointer;">
                <ion-icon name="checkbox"
                    style="font-size: 24px; margin-right: 8px; color: var(--ion-color-medium);"></ion-icon>
                <span style="font-size: 16px; margin-top: 1rem; font-weight: bold; color: var(--ion-color-medium);">
                    Tomar Pedidos
                </span>
            </div>
            <div @click="irAPedidosTomados"
                style="display: flex; align-items: center; justify-content: center; margin-top: auto; padding-top: 16px; cursor: pointer;">
                <ion-icon name="checkbox"
                    style="font-size: 24px; margin-right: 8px; color: var(--ion-color-medium);"></ion-icon>
                <span style="font-size: 16px; font-weight: bold; color: var(--ion-color-medium);">
                    Mis Pedidos
                </span>
            </div>
            <!-- Botón Cerrar Sesión -->
            <div @click="logout"
                style="display: flex; align-items: center; justify-content: center; margin-top: auto; padding-top: 16px; cursor: pointer;">
                <ion-icon name="log-out-outline"
                    style="font-size: 24px; margin-right: 8px; color: var(--ion-color-medium);"></ion-icon>
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
                <ion-title class="ion-text-center">Pedidos</ion-title>
            </ion-toolbar>

        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <!-- Mostrar pedidos en tarjetas -->
                        <ion-card v-for="pedido in pedidosDelivery" :key="pedido.id_pedido" class="pedido-card">
                            <ion-card-header>
                                <ion-card-title style="font-size: 1.5rem;margin-top:1rem;">Pedido # {{ pedido.num_fila
                                    }}</ion-card-title>
                            </ion-card-header>

                            <ion-card-content>
                                <!-- Información del pedido en dos columnas -->
                                <ion-grid>
                                    <ion-row>
                                        <!-- Columna 1: Etiquetas (alineadas a la izquierda) -->
                                        <ion-col size="6" class="text-left">
                                            <p class="bold-text">ID Pedido:</p>
                                            <p class="bold-text">ID Cliente:</p>
                                            <p class="bold-text">Estado:</p>
                                            <p class="bold-text">Costo Envío:</p>
                                            <p class="bold-text">Direcciones:</p>

                                        </ion-col>

                                        <!-- Columna 2: Respuestas (alineadas a la izquierda) -->
                                        <ion-col size="6" class="text-left">
                                            <p>{{ pedido.id_pedido }}</p>
                                            <p>{{ pedido.id_usuario_cliente }}</p>
                                            <p>{{ pedido.estado }}</p>
                                            <p>Bs. {{ pedido.costo_envio }}</p>
                                        </ion-col>
                                    </ion-row>
                                </ion-grid>

                                <!-- Botones en la misma fila -->
                                <ion-row>
                                    <ion-col size="6">
                                        <!-- Botón para Dirección Almacén -->
                                        <ion-button size="small" color="primary"
                                            @click="mostrarMapaAlmacen(pedido.id_pedido)">
                                            Mapa Almacén
                                        </ion-button>
                                    </ion-col>

                                    <ion-col size="6">
                                        <!-- Botón para Dirección Envío -->
                                        <ion-button size="small" color="primary"
                                            @click="mostrarMapa(pedido.direccion_envio)">
                                            Mapa Envío
                                        </ion-button>
                                    </ion-col>
                                </ion-row>

                                <ion-row>
                                    <ion-col size="6">
                                        <ion-button size="small" color="medium"
                                            @click="detalleProductos(pedido.id_pedido, pedido.id_usuario_cliente)">
                                            Ver Detalles
                                        </ion-button>
                                    </ion-col>
                                    <ion-col size="6">
                                        <ion-button size="small" color="success" @click="tomarPedido(pedido.id_pedido)">
                                            Tomar Pedido
                                        </ion-button>
                                    </ion-col>
                                </ion-row>

                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <!-- Toasts para notificaciones -->
            <ion-toast :is-open="showToast" :message="toastMessage" duration="2000" @did-close="showToast = false"
                color="success"></ion-toast>
            <ion-toast :is-open="showErrorToast" :message="errorMessage" duration="2000"
                @did-close="showErrorToast = false" color="danger"></ion-toast>
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
                const response = await fetch('http://localhost:3000/listarTodosLosPedidosDelivery', {
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
                const response = await fetch('http://localhost:3000/tomar_pedido_delivery', {
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
.bold-text {
    font-weight: bold;
    color: black;
}

.pedido-card {
    border: 1px solid #ddd;
    /* Borde de las tarjetas */
    margin-bottom: 1rem;
}

.text-left {
    text-align: left;
    /* Alinear texto a la izquierda */
}

.text-center {
    text-align: center;
    /* Centrar los botones */
    margin-top: 1rem;
}

ion-card-content {
    margin-top: 0 !important;
}

ion-menu::part(backdrop) {
    background-color: rgba(0, 0, 0, 0.144);
}

ion-menu::part(container) {
    border-radius: 0 20px 20px 0;

    box-shadow: 4px 0px 16px rgba(2, 43, 90, 0.18);
}

.profile-section {
    text-align: center;
    background: linear-gradient(135deg, #2868a4, #084279);
    /* O usa una imagen con url('/ruta-al-fondo.jpg') */
    background-size: cover;
    background-position: center;
    padding: 20px;
    border-radius: 15px;
    color: white;
}

.cerrar-sesion {
    background-color: black;
}

table th,
table td {
    text-align: center;
    font-size: 14px;
}

table tr:nth-child(even) {
    background-color: #f9f9f9;
}

table tr:hover {
    background-color: #f1f1f1;
}

table th,
table td {
    text-align: center;
    font-size: 14px;
    color: black;
    /* Esto asegura que el texto sea negro */
}

table tr:nth-child(even) {
    background-color: #f9f9f9;
}

table tr:hover {
    background-color: #f1f1f1;
}
</style>