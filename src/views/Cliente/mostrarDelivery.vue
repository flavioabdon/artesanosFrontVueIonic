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
                                <p>ID del Delivery: {{ idDelivery }}</p>
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
    name: 'mostrarDeliveryIdComponent', //nombre de componente
    props: {
        idDelivery: {
        type: String, // Puede ser String o Number, dependiendo de cómo lo pases.
        required: true, // Es obligatorio porque el router siempre debe enviar este parámetro.
        },
    },
    components: {
        IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
        IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle
    }
};
</script>