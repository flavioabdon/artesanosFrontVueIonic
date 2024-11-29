<template>

    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title class="ion-text-center">Datos del Cliente</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                       
                        <ion-card class="pedido-card">

                            <ion-card-content>
                           
                                <ion-grid>
                                    <ion-row>
                                        <!-- Columna 1: Etiquetas -->
                                        <ion-col size="4" class="text-left padding-paragraphs">
                                            <p class="bold-text">Nombres:</p>
                                            <p class="bold-text">C.I.:</p>
                                            <p class="bold-text">Email:</p>
                                            <p class="bold-text">numero:</p>
                                          
                                        </ion-col>

                                        <!-- Columna 2: Valores -->
                                        <ion-col size="8" class="text-left padding-paragraphs">
                                            <p>{{ clienteData.nombre }} {{ clienteData.apellido }}</p>
                                            <p>{{ clienteData.ci }}</p>
                                            <p>{{ clienteData.email }}</p>
                                            <p>{{ clienteData.numero_contacto }}</p>
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
    name: 'mostrarClienteIdComponent', //nombre de componente
    props: {
        idCliente: {
            type: [String, Number], // Permitimos que sea un String o Number
            required: true // La prop es obligatoria
        }
    },
    components: {
        IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonText, IonIcon, IonPage, IonHeader, IonToolbar
    },
    data() {
        return {
            clienteData: {} // Aquí almacenamos los datos del cliente
        };
    },
    methods: {
        // Método para cargar los datos del cliente
        async cargarDatosCliente() {
            try {
                // Usamos la prop 'idcliente' para hacer la solicitud
                const response = await fetch(`http://localhost:3000/obtenerDatosCliente/${this.idCliente}`);
                if (!response.ok) throw new Error('Error al cargar los datos del cliente');
                const data = await response.json();
                this.clienteData = data[0];
            } catch (error) {
                console.error('Error al cargar los datos del cliente:', error);
                // Puedes mostrar un mensaje de error si lo deseas
            }
        }
    },
    mounted() {
        this.cargarDatosCliente(); 
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