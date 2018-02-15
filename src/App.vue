<template>
  <div id="app" class="bg-light">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
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
			</div>
		</nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import  Productos  from "./components/Productos";
import  Ventas  from "./components/Ventas";

Vue.use(VueRouter)
const routes = [
  {path: '/', component: Productos},
  {path: '/productos', component: Productos},
  {path: '/ventas', component: Ventas},
  {path: '*', component: Productos}
]
const router = new VueRouter({
  routes,
  mode: 'history',
  base: 'DondeGladys/'
  })


export default {
  name: 'app',
  router,
  components:
  {
    'productos': Productos,
    'ventas': Ventas
  }
}
</script>
