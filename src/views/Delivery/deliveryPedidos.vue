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
                :src="'http://localhost:3001/' + usuario.fotoperf_url" 
                alt="Foto de Perfil" 
                style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 2px solid #ddd;">
                
                <!-- Nombre del Usuario -->
                <h2 class="ion-margin-top">{{ usuario.nombre }}</h2>
                <p class="ion-margin-bottom">{{ usuario.email }}</p>
            </div>

              <!-- Otro contenido -->
            <div>
                This is the menu content.
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
                <ion-title class="ion-text-center">Pedidos del usuario</ion-title>
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
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">ID Artesano</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">ID Delivery</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">Estado</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">Costo Productos</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">Costo Envío</th>
                            <th style="padding: 8px; border: 1px solid #ddd; background-color: #f4f4f4;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="compra in compras" :key="compra.id_pedido">
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ compra.num_fila }}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                <ion-button 
                                    :disabled="!compra.id_pedido" 
                                    @click="irAPedido(compra.id_pedido)" 
                                    :color="compra.id_pedido ? 'primary' : 'light'"
                                    fill="solid"
                                    size="small">
                                    {{ compra.id_pedido ? 'Ver Pedido' : 'Sin asignar' }}
                                </ion-button>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ compra.id_usuario_artesano }}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                <ion-button 
                                    :disabled="!compra.id_usuario_delivery" 
                                    @click="irADelivery(compra.id_usuario_delivery)" 
                                    :color="compra.id_usuario_delivery ? 'primary' : 'light'"
                                    fill="solid"
                                    size="small">
                                    {{ compra.id_usuario_delivery ? 'Ver Delivery' : 'Sin asignar' }}
                                </ion-button>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">
                                <template v-if="['En Casa', 'En casa'].includes(compra.estado)">
                                    <ion-button 
                                    color="primary" 
                                    @click="confirmarEntrega(compra.id_pedido)"
                                    >
                                    Confirmar Entrega
                                    </ion-button>
                                </template>
                                <template v-else>
                                    <span style="font-size: 16px; color: var(--ion-color-medium);">
                                    {{ compra.estado }}
                                    </span>
                                </template>
                            </td>
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ compra.suma_total_productos }}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ compra.costo_envio }}</td>
                            <td style="padding: 8px; border: 1px solid #ddd;">{{ compra.suma_total }}</td>
                            </tr>
                        </tbody>
                        </table>
                        <div justify="end">
                            <h1>
                                Total de compras:
                                    {{
                                        compras.reduce((total, compra) => {
                                        //console.log("Iterando sobre compra:", compra.id_pedido); // Debug
                                        return total + parseFloat(compra.suma_total);
                                        }, 0)
                                   }}
                            </h1>
                            </div> 
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

            compras: [], // Aquí se almacenarán los datos de la API
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

        async cargarDatos() {
            try {
                const response = await fetch(`http:///listarComprasCliente/${this.usuario.id_usuario}`);
                if (!response.ok) throw new Error('Error al cargar datos');
                const data = await response.json();
                this.compras = data;
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        },
        calcularSumaTotal() {
            let total = 0;
            console.log("hola");
            for (let compra of this.compras) {
                console.log("_aaaaaaaaaaaaaa"+compra.id_pedido);
                total += parseFloat(compra.suma_total); // Convertir a número y sumar
            }
            this.sumaTotal = total;
        },
        irADelivery(idDelivery) {
        this.$router.push(`/mostrarDelivery/${idDelivery}`);
        },
        irAPedido(idPedido) {
        this.$router.push(`/mostrarPedidos/${idPedido}`);
        },
        async confirmarEntrega(idPedido) {
            try {
            const response = await fetch('http://localhost:3000/confirmar_entrega', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_pedido: idPedido })
            });

            if (!response.ok) throw new Error('Error al confirmar entrega');

            const data = await response.json();

            // Mostrar mensaje de éxito o actualizar la interfaz
            alert(`Entrega confirmada para el pedido ${idPedido}`);
            console.log('Respuesta del servidor:', data);

            // Opcional: Actualizar el estado de la entrega en la interfaz
            const compra = this.compras.find(c => c.id_pedido === idPedido);
            if (compra) {
                compra.estado = 'Entregado'; // Cambiar a un estado actualizado, si aplica
            }
            } catch (error) {
            console.error('Error al confirmar entrega:', error);
            alert('No se pudo confirmar la entrega. Intente nuevamente.');
            }
        }
            
        },
    mounted() {
        // Si el objeto usuario tiene nombre, muestra un toast de bienvenida
        if (this.usuario && this.usuario.nombre) {
            this.showToastMessage(`Bienvenido, ${this.usuario.nombre}`);
        } else {
            this.showErrorMessage('No se encontró información del usuario.');
        }
        this.cargarDatos(); // Cargar datos al montar el componente
        this.calcularSumaTotal();
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