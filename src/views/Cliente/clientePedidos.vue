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
                                <ion-card-title>Iniciar Sesión</ion-card-title>
                            </ion-card-header>

                            <ion-card-content>
                                <p>Mostrar Clientes</p>
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
    name: 'clientePedidosComponent', //nombre de componente
    components: {
        IonToast, IonItem, IonInput, IonCardContent, IonCardHeader,
        IonCardTitle, IonGrid, IonRow, IonCol, IonCard, IonPage, IonHeader, IonTitle
    }
};
</script>