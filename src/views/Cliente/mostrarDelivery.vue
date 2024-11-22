<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Información/Delivery</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-align-items-cente">
                    <ion-col size="12" size-md="8" size-lg="6">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title class="ion-text-center">
                                    <ion-icon name="person-circle" size="large" slot="start"></ion-icon>
                                    DATOS DEL DELIVERY
                                </ion-card-title>
                            </ion-card-header>

                            <ion-card-content>
                                <ion-list lines="full">
                                    <!-- Nombres -->
                                    <ion-item>
                                        <ion-label position="stacked" class="ion-text-bold">Nombres:</ion-label>
                                        <ion-text>{{ deliveryData.nombre }} {{ deliveryData.apellido }}</ion-text>
                                    </ion-item>

                                    <!-- C.I. -->
                                    <ion-item>
                                        <ion-label position="stacked" class="ion-text-bold">C.I.:</ion-label>
                                        <ion-text>{{ deliveryData.ci }}</ion-text>
                                    </ion-item>

                                    <!-- Email -->
                                    <ion-item>
                                        <ion-label position="stacked" class="ion-text-bold">Email:</ion-label>
                                        <ion-text>{{ deliveryData.email }}</ion-text>
                                    </ion-item>

                                    <!-- Tipo de Vehículo -->
                                    <ion-item>
                                        <ion-label position="stacked" class="ion-text-bold">Tipo Vehiculo:</ion-label>
                                        <ion-text>{{ deliveryData.tipo_vehiculo }}</ion-text>
                                    </ion-item>

                                    <!-- Matrícula -->
                                    <ion-item>
                                        <ion-label position="stacked" class="ion-text-bold">Matricula:</ion-label>
                                        <ion-text>{{ deliveryData.matricula_vehiculo }}</ion-text>
                                    </ion-item>
                                </ion-list>
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
                const response = await fetch(`http://192.168.134.20:3000/obtenerDatosDelivery/${this.idDelivery}`);
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


/* Estilo para los labels en negrita */
ion-label {
    font-weight: bold;
}

/* Espaciado adicional y bordes en la tarjeta */
ion-card {
    margin-top: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
}

/* Asegura que los íconos y el título estén alineados correctamente */
ion-card-title {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Aumentar el tamaño de texto */
ion-text {
    font-size: 1rem;
}

/* Mejorar el espaciado entre los elementos */
ion-item {
    margin-bottom: 10px;
}
</style>