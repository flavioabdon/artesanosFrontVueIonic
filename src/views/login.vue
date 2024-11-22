<template>
    <ion-header>
    
    </ion-header>
    <ion-content>
        <div class="background-pic">
            <div class="background-filter">
                <div class="shape">
                    <!--<img src="../assets/shape.svg" />-->
                </div>
                <ion-card>
                    <ion-card-header>
                        <ion-card-title>
                            Bienvenido
                        </ion-card-title>
                        <ion-card-subtitle>
                            Ingrese su usuario
                        </ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <form @submit.prevent="login">
                            <ion-item>
                                <ion-input label="Email" label-placement="floating" :clear-input="true" v-model="email"></ion-input>
                            </ion-item>
                            <ion-item>
                                <ion-input type="password" label="Contraseña" label-placement="floating" v-model="password"></ion-input>
                            </ion-item>
                            <div class="bottom-section">
                                <ion-button type="submit">
                                    Iniciar Sesión
                                </ion-button>
                            </div>
                        </form>
                    
                    </ion-card-content>
                </ion-card>
            </div>
        </div>
    </ion-content>
    </template>
    <script>
    import {IonHeader, IonContent, IonCard, IonCardContent, IonCardHeader, 
        IonCardTitle, IonCardSubtitle, IonItem, IonInput
    
    } from '@ionic/vue';
    export default {
        name: 'login2Component',
        components: {
            IonHeader, IonContent, IonCard, IonCardContent, IonCardHeader, 
            IonCardTitle, IonCardSubtitle, IonItem, IonInput
        },
        data(){
            return {
                email: '',
                password: '',
                showToast: false,
                toastMessage: ''
            };
        },
        methods: {
            async login() {
                try {
                    const response = await fetch('http://localhost:3000/auth/formIniciarSesion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            emailUsuario: this.email,
                            password: this.password
                        })
                    });
    
                    const data = await response.json();
    
                    if (response.ok && data.message === "Inicio de sesión exitoso") {
                        // Guarda el objeto usuario en sessionStorage
                        sessionStorage.setItem('usuario', JSON.stringify(data.usuario));
    
                        //Recupera el objeto usuario
                        const usuario_nombre = JSON.parse(sessionStorage.getItem('usuario')).nombre;
    
                        // Configurar el mensaje del toast
                        this.toastMessage = `Bienvenido,`+usuario_nombre+`.`;
                        this.showToast = true;
                        this.position = "top"
                        // Determina la ruta según el rol del usuario
                        let redirectRoute = '/';
                        if (data.usuario.rol === "Cliente") {
                            redirectRoute = '/bienvenidaCliente';
                        } else if (data.usuario.rol === "Delivery") {
                            redirectRoute = '/bienvenidaDelivery';
                        } else {
                            alert('Usuario no valido');
                            this.toastMessage = 'Usuario no admitido';
                            this.errorMessage = 'Usuario no admitido';
                            this.showErrorToast = true;
                        }
    
                        // Redirecciona a la ruta correspondiente
                        this.$router.push(redirectRoute);
                        
                    } else {
                        // Muestra el mensaje de error en el toast
                        this.toastMessage = data.message || 'Error al iniciar sesión';
                        this.errorMessage = 'Error al iniciar sesión';
                        this.showErrorToast= true;
                        this.position = "top"
                    }
                } catch (error) {
                    // Manejo de errores de solicitud
                    this.toastMessage = 'Error en la solicitud: ' + error.message;
                    this.errorMessage = 'Error al la solicitud';
                    this.showErrorToast = true;
                    this.position = "top"
                }
            },
            clearFields() {
                this.email = '';
                this.password = '';
            }
        }
    }
    </script>
    <style>
    ion-content{
        --ion-background-color:#fff;
        font-family: Arial, Helvetica, sans-serif;
    
    }
    .background-pic{
        height: 100vh;
        width: 100%;
        background: url('/public/banner1.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50%;
        flex-direction: column;
        justify-content: center;
    }
    .background-filter{
        height: 100%;
        width: 100%;
        background: rgba(255, 255, 255, 0.377);
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .shape{
        position: fixed;
        top:0;
        right: 0;
    
        img{
            opacity: 0.9;
        }
    }
    ion-card{
        margin-top: 130px;
        background: transparent;
        box-shadow: none;
        text-align: center;
    
        ion-card-title{
            color:#242020;
            font-size: 30px;
        }
    
        ion-card-subtitle{
            color:#BBBBBB;
            font-size: 14px;
            font-weight: 400; 
    
            a{
                text-decoration: none;
                font-weight: bold;
                color: #198645;
                font-size: 15;
            }
        }
    
        ion-card-content{
            margin-top: 30px;
    
            ion-item{
                --ion-item-background:transparent;
                --border-width:0;
                --inner-border-width:0;
                --highlight-color-focused:none;
                margin-bottom: 15px;
    
                ion-input{
                    width:257px;
                    height: 42px;
                    border-radius: 15px;
                    border:  1px solid #198645;
                    font-size: 14px;
                    font-weight: 300;
                    color:#555B5B;
                    --padding-start:30px;
                }
    
            }
    
            a{
                text-decoration: none;
                color:#589B3F;
                font-weight: 300;
                font-size: 13px;
            }
        }
      
        .bottom-section{
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        ion-button{
        height: 53px;
        width: 247px;
        font-size: 14px;
        text-transform: none;
        --background:#198645;
          font-weight: 400;
        --border-radius: 15px !important;
          color:#fff;
        }
    
        span{
            margin-top: 10px;
            font-weight: 330;
            a{
                font-weight: 400;
            }
        }
        }
    
    }
    </style>