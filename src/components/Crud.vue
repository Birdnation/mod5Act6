<template>
    <div>
        <div>
            <ul id="lista" v-for="user in users" :key="user['.key']">
                <li >Nombre: {{user.nombre}}  -- Email: {{user.email}} </li> 
                <button @click="delUser(user)">X</button>
            </ul>
        </div>
        <div>
            <input type="text" v-model="nombre" placeholder="Nombre">
            <input type="text" v-model="email" placeholder="Email">
            <input type="submit" @click="addUser">
        </div>
        <ul class="error">
            <li v-show="!validation.nombre">El campo no puede estar vacío.</li>
            <li v-show="!validation.email">Por favor ingrese un email válido.</li>
        </ul>
          
    </div>
</template>

<script>
import {db} from '../plugins/db'
export default {
    data(){
        return {
            users:[],
            nombre:'',
            email:'',
            validation:{
                nombre:true,
                email:true
            }
        }
    },

    firebase:{
        users: db.ref('users'),
    },
    computed:{
        validarNombre(){
            return this.nombre.length > 0;
        },
        validarEmail(){
            const emailRegExp = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
            return emailRegExp.test(this.email);
        }
    },
    methods:{
        addUser(){
            this.validation.nombre = this.validarNombre;
            this.validation.email = this.validarEmail;
            if (this.validation.nombre && this.validation.email) {
                let newUser = {nombre: this.nombre, email: this.email};
                db.ref('users').push(newUser);
            }
            this.nombre = '';
            this.email = ''
        },
        delUser(delUsers){
            db.ref('users').child(delUsers['.key']).remove();
        }
    }
}
</script>

<style scoped>
body {
    font-family: Helvetica, Arial, sans-serif;
}
ul {
padding: 0;
}
.user {
height: 30px;
line-height: 30px;
padding: 10px;
border-top: 1px solid #eee;
overflow: hidden;
transition: all .25s ease;
}
.user:last-child {
border-bottom: 1px solid #eee;
}
.v-enter, .v-leave-to {
height: 0;
padding-top: 0;
padding-bottom: 0;
border-top-width: 0;
border-bottom-width: 0;
}
.errors {
color: #f00;
}
</style>