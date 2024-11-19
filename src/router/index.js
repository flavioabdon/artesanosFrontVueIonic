import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import loginComponent from '../views/login.vue'
import clientePedidosComponent from '../views/Cliente/clientePedidos.vue'
import deliveryPedidosComponent from '../views/Delivery/deliveryPedidos.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/login',
    name: 'Login',
    component: loginComponent
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
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
