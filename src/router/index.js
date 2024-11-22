import { createRouter, createWebHistory } from '@ionic/vue-router';
import clientePedidosComponent from '../views/Cliente/clientePedidos.vue'
import deliveryPedidosComponent from '../views/Delivery/deliveryPedidos.vue'
import mostrarDeliveryIdComponent from '../views/Cliente/mostrarDelivery.vue'
import mostrarPedidosIdComponent from '../views/Cliente/mostrarPedidos.vue'
import login from '../views/login.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/bienvenidaCliente',
    name: 'bienvenidaCliente',
    component: clientePedidosComponent
  },  
  {
    path: '/bienvenidaDelivery',
    name: 'bienvenidoDelivery',
    component: deliveryPedidosComponent
  },
  {
    path: '/mostrarDelivery/:idDelivery',
    name: 'mostrarDelivery',
    component: mostrarDeliveryIdComponent,
    props: true, //pasa el parámetro como una prop al componente
  }, 
  {
    path: '/mostrarPedidos/:idPedido',
    name: 'mostrarPedidos',
    component: mostrarPedidosIdComponent,
    props: true, //pasa el parámetro como una prop al componente
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router