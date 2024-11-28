<template>

    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Datos del Delivery</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <!-- Mostrar datos del Delivery en tarjeta -->
                        <ion-card class="pedido-card">

                            <ion-card-content>
                                <!-- Información del delivery en dos columnas -->
                                <ion-grid>
                                    <ion-row>
                                        <!-- Columna 1: Etiquetas -->
                                        <ion-col size="4" class="text-left padding-paragraphs">
                                            <p class="bold-text">Nombres:</p>
                                            <p class="bold-text">C.I.:</p>
                                            <p class="bold-text">Email:</p>
                                            <p class="bold-text">Vehículo:</p>
                                            <p class="bold-text">Matrícula:</p>
                                        </ion-col>

                                        <!-- Columna 2: Valores -->
                                        <ion-col size="8" class="text-left padding-paragraphs">
                                            <p>{{ deliveryData.nombre }} {{ deliveryData.apellido }}</p>
                                            <p>{{ deliveryData.ci }}</p>
                                            <p>{{ deliveryData.email }}</p>
                                            <p>{{ deliveryData.tipo_vehiculo }}</p>
                                            <p>{{ deliveryData.matricula_vehiculo }}</p>
                                        </ion-col>

                                    </ion-row>
                                </ion-grid>

                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

    </ion-page>
</template>


<script>
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonText, IonIcon, IonPage, IonHeader, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default {
    name: 'mostrarDeliveryIdComponent', //nombre de componente
    props: {
        idDelivery: {
            type: [String, Number], // Permitimos que sea un String o Number
            required: true // La prop es obligatoria
        }
    },
    components: {
        IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonText, IonIcon, IonPage, IonHeader, IonToolbar
    },
    data() {
        return {
            deliveryData: {} // Aquí almacenamos los datos del delivery
        };
    },
    methods: {
        // Método para cargar los datos del Delivery
        async cargarDatosDelivery() {
            try {
                // Usamos la prop 'idDelivery' para hacer la solicitud
                const response = await fetch(`http://localhost:3000/obtenerDatosDelivery/${this.idDelivery}`);
                if (!response.ok) throw new Error('Error al cargar los datos del Delivery');
                const data = await response.json();
                this.deliveryData = data[0];
            } catch (error) {
                console.error('Error al cargar los datos del Delivery:', error);
                // Puedes mostrar un mensaje de error si lo deseas
            }
        }
    },
    mounted() {
        this.cargarDatosDelivery(); // Cargar los datos del Delivery al montar el componente
    }
};
</script>

<style scoped>
/* Estilos para agregar padding a los párrafos */
.padding-paragraphs p {
    padding: 0.4rem 0;
}

.bold-text {
    font-weight: bold;
    color: black;
}

</style>