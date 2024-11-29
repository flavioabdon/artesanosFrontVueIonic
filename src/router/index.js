import { createRouter, createWebHistory } from '@ionic/vue-router';

import deliveryPedidosComponent from '../views/Delivery/deliveryPedidos.vue'
import mostrarPedidosDeliveryComponent from '../views/Delivery/mostrarPedidos.vue'
import pedidosTomadosDeliveryComponent from '../views/Delivery/mostrarPedidosTomados.vue'
import mostrarClienteIdComponent from '../views/Delivery/mostrarCliente.vue'


import clientePedidosComponent from '../views/Cliente/clientePedidos.vue'
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
    path: '/pedidosTomadosDelDelivery',
    name: 'pedidosTomadosDelDelivery',
    component: pedidosTomadosDeliveryComponent,
  },
  {
    path: '/mostrarDelivery/:idDelivery',
    name: 'mostrarDelivery',
    component: mostrarDeliveryIdComponent,
    props: true, //pasa el parámetro como una prop al componente
  },
  {
    path: '/mostrarCliente/:idCliente',
    name: 'mostrarCliente',
    component: mostrarClienteIdComponent,
    props: true, //pasa el parámetro como una prop al componente
  },
  {
    path: '/mostrarPedidosCliente/:id_usuario_cliente/:id_pedido',
    name: 'mostrarPedidosCliente',
    component: mostrarPedidosIdComponent,
    props: true, //pasa el parámetro como una prop al componente
  },

  {
    path: '/mostrarPedidos/:id_usuario_cliente/:id_pedido',
    name: 'mostrarPedidos',
    component: mostrarPedidosDeliveryComponent,
    props: true, //pasa el parámetro como una prop al componente
  },


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router