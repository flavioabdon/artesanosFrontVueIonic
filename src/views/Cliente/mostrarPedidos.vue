<template>

    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Detalles de Compras</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <!-- Mostrar productos en tarjetas -->
                        <ion-card v-for="(producto, index) in pedidos" :key="index" class="pedido-card">
                            <ion-card-header>
                                <ion-card-title style="font-size: 1.5rem; margin-top: 1rem;">
                                    Pedido # {{ producto.num_fila }}
                                </ion-card-title>
                            </ion-card-header>

                            <ion-card-content>
                                <ion-grid>
                                    <ion-row>
                                        <!-- Información por filas -->
                                        <ion-col size="12">
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Nombre:</ion-col>
                                                <ion-col size="7" class="text-left break-word">{{ producto.nombre_prod
                                                    }}</ion-col>
                                            </ion-row>
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Descripción:</ion-col>
                                                <ion-col size="7" class="text-left break-word">{{
                                                    producto.descripcion_prod }}</ion-col>
                                            </ion-row>
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Color:</ion-col>
                                                <ion-col size="7" class="text-left break-word">
                                                    <span class="color-box"
                                                        :style="{ backgroundColor: producto.informacion_adicional }">
                                                    </span>
                                                </ion-col>
                                            </ion-row>

                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Imagen:</ion-col>
                                                <ion-col size="7" class="text-left">
                                                    <img :src="'http://localhost:3000/' + producto.ruta_imagen"
                                                        alt="Imagen del producto" class="product-image">
                                                </ion-col>
                                            </ion-row>
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Precio:</ion-col>
                                                <ion-col size="7" class="text-left">Bs. {{ producto.precio }}</ion-col>
                                            </ion-row>
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Cantidad:</ion-col>
                                                <ion-col size="7" class="text-left">{{ producto.cantidad }}</ion-col>
                                            </ion-row>
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Sub-Total:</ion-col>
                                                <ion-col size="7" class="text-left">Bs. {{ producto.subtotal
                                                    }}</ion-col>
                                            </ion-row>
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Artesano:</ion-col>
                                                <ion-col size="7" class="text-left break-word">{{
                                                    producto.nombre_completo_artesano }}</ion-col>
                                            </ion-row>
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Email:</ion-col>
                                                <ion-col size="7" class="text-left break-word">{{
                                                    producto.email_artesano }}</ion-col>
                                            </ion-row>
                                            <ion-row>
                                                <ion-col size="5" class="text-left bold-text">Número:</ion-col>
                                                <ion-col size="7" class="text-left">{{ producto.numero_artesano
                                                    }}</ion-col>
                                            </ion-row>
                                        </ion-col>
                                    </ion-row>
                                </ion-grid>
                            </ion-card-content>

                        </ion-card>
                    </ion-col>
                </ion-row>

                <!-- Mostrar el total de los productos -->
                <ion-row>
                    <ion-col size="12">
                        <h3 style="font-size: 1.2rem; color: black; text-align: center;">
                            Total: Bs.
                            {{
                                pedidos.reduce((total, producto) => total + parseFloat(producto.subtotal), 0)
                            }}
                        </h3>
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
import Swal from 'sweetalert2';
import {
    IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
    IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle
} from '@ionic/vue';

export default {
    name: 'mostrarPedidosIdComponent', //nombre de componente
    props: {
        id_pedido: {
            type: String,
            required: true
        },
        id_usuario_cliente: {
            type: String,
            required: true
        }
    },
    components: {
        IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
        IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle
    },
    methods: {
        async cargarDatos() {
            try {
                const response = await fetch(`http://localhost:3000/listarDetalleComprasCliente/${this.id_usuario_cliente}/${this.id_pedido}`);
                if (!response.ok) throw new Error('Error al cargar datos');
                const data = await response.json();
                this.pedidos = data;
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        },
    },
    data() {
        return {
            // Recuperamos el objeto usuario desde sessionStorage
            usuario: JSON.parse(sessionStorage.getItem('usuario')) || {},

            pedidos: [] // Aquí se almacenarán los datos de la API
        };
    },
    mounted() {
        this.cargarDatos(); // Cargar datos al montar el componente
    }
};
</script>
<style scoped>
.bold-text {
    font-weight: bold;
}

.break-word {
    word-wrap: break-word;
    white-space: pre-wrap;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 2px solid #ddd;
    border-radius: 8px;
}

.color-box {
    display: inline-block;
    width: 50%;
    height: 20px;
    margin-left: 8px;
    border: 1px solid #ccc;
    vertical-align: middle;
    margin: 0
}
</style>