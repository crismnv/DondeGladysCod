<template>
  <div id="app" class="bg-light">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <router-link 
      class="navbar-brand"
      to="/"
      >
      Donde Gladys
      </router-link>
			<a class="" href="#"></a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse  navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto"  v-if="logueado">
					<li class="nav-item">
            <router-link 
            to="/productos" 
            active-class="active" 
            class="nav-link" 
            exact
            >
            Productos
            </router-link>
						<!-- <a class="nav-link" href="#">Productos</a> -->
					</li>
					<li class="nav-item">
            <router-link 
            to="/ventas"
             active-class="active" 
            class="nav-link" 
            exact
            >
            Ventas
            </router-link>
						<!-- <a class="nav-link" href="#">Ventas</a> -->
					</li>
				</ul>
        <ul class="navbar-nav">
          <li class="nav-item mr-sm-2" v-if="!nombreUsuario">
              <button class="nav-link" @click="login">
                Loguearse con Google
              </button>
            </li>
            <li class="nav-item dropdown my-2 my-sm-0" v-if="nombreUsuario">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{this.nombreUsuario}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <!-- <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a> -->
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" @click="logout">logout</a>
              </div>
            </li>
        </ul>
			</div>
		</nav>
    
    <!-- <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <label for="">IMG</label>
        <input  type="file" name="foto" id="foto" accept="image/*" >
        <button 
        @click="cambioImagen"
        class="btn btn-block">Subir</button>
      </div>
    </div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import  Productos  from "./components/Productos";
import  loginIncorrecto  from "./components/loginIncorrecto";
import  Ventas  from "./components/Ventas";
import firebase from 'firebase'

Vue.use(VueRouter)

let todoCorrecto = false




function login(to, from, next)
{
  // console.log(todoCorrecto)
  if(todoCorrecto)
  {
    next()
  }else{
    next(false)
  }
}

const routes = [
  {path: '/'},
  {path: '/productos', component: Productos, beforeEnter: login},
  {path: '/ventas', component: Ventas, beforeEnter: login},
  {path: '/loginIncorrecto', component: loginIncorrecto},
  {path: '*'}
]
const router = new VueRouter({
  routes,
  mode: 'history',
  base: './'
  })


export default {
  name: 'app',
  router,
  // firebase:
  // {
  //   usuario: firebase.auth().currentUser
  // },
  components:
  {
    'productos': Productos,
    'ventas': Ventas,
    'loginIncorrecto': loginIncorrecto
  },
  data()
  {
    return {
      idUsuario: false,
      logueado: false,
      nombreUsuario: false,
      imagen: ''
    }
  },
  mounted()
  {

      firebase.auth()
      .onAuthStateChanged((user) =>  {
      if (user) {
        // User is signed in.

        // console.log('user is loged in')
        // console.log(user)
        this.idUsuario = user.uid
        this.nombreUsuario = user.displayName
        if (this.idUsuario === 'BzJUlIYvflZ5bviyI3SOE9zSRw32') 
        {
          // console.log('>>USUARIO ES CRISMNV Y TODO BIEN')
          this.logueado = true
          todoCorrecto = true
          // this.$router.push('/ventas')
            
        }else{
          // console.log('>>USUARIO NO ES CRISMNV')
          this.logueado = false
          todoCorrecto = false  
        }
      } else {
        // No user is signed in.
        console.log('user is not loged in')
      }
    });
  },
  methods:
  {
    login()
    {

      var provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      firebase.auth().signInWithPopup(provider).then( (result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        // // The signed-in user info.
        // console.log('>>EL RESULT ES:')
        // console.log(result)
        var user = result.user
        // console.log('>>EL USUARIO ES:')
        // console.log(user)
        
        this.idUsuario = user.uid
        this.nombreUsuario = user.displayName
        if (this.idUsuario === 'BzJUlIYvflZ5bviyI3SOE9zSRw32') 
        {
          console.log('>>USUARIO ES CRISMNV Y TODO BIEN')
          this.logueado = true
          todoCorrecto = true  
        }else{
          console.log('>>USUARIO NO ES CRISMNV')
          this.logueado = false
          todoCorrecto = false  
        }
        this.$router.push('/ventas')
        
      }).catch( (error) =>  {
        console.log('>>ERROR AL LOGUEAR')
        console.log(error)
        this.logueado = false
        this.idUsuario = false
        todoCorrecto = false  
        // ...
      });

      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        console.log('logrado')
        })
      .catch(function(error) {
        // Handle Errors here.
        
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('NO SE PUDO ESTABLECER LA PERSISTENCIA, EL ERROR ES:')
        console.log(errorMessage)
      });



      // var provider = new firebase.auth.GoogleAuthProvider();
      // firebase.auth().signInWithPopup(provider)
      // .then( (result) => {
      //   // // This gives you a Google Access Token. You can use it to access the Google API.
      //   // var token = result.credential.accessToken;
      //   // // The signed-in user info.
      //   var user = result.user;

      //   this.idUsuario = user.uid
      //   this.nombreUsuario = user.displayName

      //   if (this.idUsuario === 'BzJUlIYvflZ5bviyI3SOE9zSRw32') 
      //   {
      //     this.logueado = true
      //     todoCorrecto = true  
      //   }else{
      //     this.logueado = false
      //     todoCorrecto = false  
      //   }
      //   this.$router.push('/ventas')
        
      // })
      // .catch( (error) =>  {
      //   this.logueado = false
      //   this.idUsuario = false
      //   todoCorrecto = false  
      //   // ...
      // });


    },
    logout()
    {
      firebase.auth().signOut().then( () => {
  // Sign-out successful.
        // console.log(">>>>>>>>>LOGOUT CORRECTO<<<<<<<<<<<")
        this.$router.push('/')
        this.idUsuario = false
        this.logueado = false
        this.nombreUsuario = false
      }).catch(function(error) {
        // console.log(">>>>>>>>>LOGOUT IN-CORRECTO<<<<<<<<<<<")
        // An error happened.
      });
    }
  }
}
</script>
