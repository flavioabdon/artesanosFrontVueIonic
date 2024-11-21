<template>
    <ion-page>
        <ion-header>
            <ion-title>Pedidos del delivery</ion-title>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-center" style="height: 100vh;">
                    <ion-col size="4">
                        <ion-card>
                            <ion-card-content>
                                <p>Mostrar Pedidos</p>
                                <h1>Detalles del Delivery</h1>
                                <p>ID del pedido: {{ idPedido }}</p>
                                <p>ID del pedido: {{ pedidos.nombre_prod }}</p>
                                    <!-- Iterar sobre los pedidos y mostrar los  productos -->
                                <div>
                                    <h3>Nombre de productos</h3>
                                </div>
                                <div 
                                    v-for="(producto, index) in pedidos" :key="index">
                                        <p>{{ producto.nombre_prod }}</p>
                                        <p>{{ producto.descripcion }}</p>
                                </div>

                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-toast
                :is-open="showToast"
                :message="toastMessage"
                duration="2000"
                @did-close="showToast = false"
            ></ion-toast>
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
        idPedido: {
        type: String, // Puede ser String o Number, dependiendo de cómo lo pases.
        required: true, // Es obligatorio porque el router siempre debe enviar este parámetro.
        },
    },
    components: {
        IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
        IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle
    },
    methods:{
        async cargarDatos() {
            try {
                const response = await fetch(`http://localhost:3001/listarDetalleComprasCliente/${this.usuario.id_usuario}/${this.idPedido}`);
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
<style>
</style>