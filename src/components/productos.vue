<template>
   <div>
     <div class="container">
     <div class="row" id="cabecera">
      <div class="col-sm-4">
        <img src="http://www.freepngimg.com/download/coke/1-2-coca-cola-png-clipart.png" class="img-fluid" width="200" height="200" alt="Donde">
      </div>
      <div class="col-sm-4 text-center">
        <div class="card bg-light " style="">
          <div class="card-header">Ventas</div>
          <div class="card-body">
            <h5 class="card-title">CrismnV</h5>
            <p class="card-text ">Apunta lo que consumas</p>
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <img src="http://www.freepngimg.com/download/coke/1-2-coca-cola-png-clipart.png" class="img-fluid" width="200" height="200" alt="Donde">
        
      </div>
    </div>
      <br>
      <!-- <br> -->
      <hr>
      <!-- <button 
      class="btn col-sm-6 offset-sm-3 btn-block" 
      @click="probarBusqueda">
      Buscar?</button> -->
      <div id="alertas" class="row">
        <div v-if="mensajeExito" class="alert text-center font-weight-bold col-sm-12 alert-danger" role="alert">
          {{mensajeExito}}
        </div>
        <div v-if="mensajeError" class="alert text-center font-weight-bold col-sm-12 alert-success" role="alert">
          {{mensajeError}}
        </div>
      </div>
      <div class="row" id="contenido">
        <div class="col-sm-8 offset-sm-2">
          <h2 class=" align-middle">
            Lista de Productos
          </h2>
        </div>
        <div class="col-sm-2">
          <button data-toggle="modal" data-target="#agregarModal" class=" bg-light btn" ><i class="fas fa-plus-circle fa-3x"></i></button>
          <button ref="botonMostrarModalEditar" style="display: none;" data-toggle="modal" data-target="#editarModal" class=" bg-light btn" ><i class="fas fa-plus-circle fa-3x"></i></button>
          <button ref="botonMostrarModalBorrar" style="display: none;" data-toggle="modal" data-target="#borrarModal" class=" bg-light btn" ><i class="fas fa-plus-circle fa-3x"></i></button>
          <button ref="botonMostrarModalComprar" style="display: none;" data-toggle="modal" data-target="#comprarModal" class=" bg-light btn" ><i class="fas fa-plus-circle fa-3x"></i></button>
        </div>
        
      </div>
      <br>
       <div class="col-md-8 offset-md-2 table-responsive">
         <table class="table table-striped table-secondary  text-center">
          <thead class="thead-default">
            <tr class="">
              <th class="align-middle">Nombre</th>
              <th class="align-middle">Cantidad</th>
              <th class="align-middle">Precio</th>
              <th class="align-middle">Acciones</th>
            </tr>
            </thead>
            <tbody>
              <tr class="" v-for="producto in productos" :key="producto.id">
                <td>{{producto.nombre}}</td>
                <td>{{producto.tamaño + ' ' + producto.umed}}</td>
                <td>S./ {{producto.precio}}</td>
                <td>
                  <a class="btn" @click="seleccionarProducto('comprar', producto)">
                    <span class="fa-layers fa-fw">
                      <i class="fas fa-2x fa-circle" ></i>
                      <i class="fa-inverse fas fa-2x fa-shopping-cart" data-fa-transform="shrink-8"></i>
                    </span>
                </a>
                  <a class="btn" @click="seleccionarProducto('editar', producto)"><i class="fas fa-2x fa-edit fa-1x"></i></a>
                  <a class="btn" @click="seleccionarProducto('borrar', producto)"><i class="fas fa-2x fa-minus-circle fa-1x"></i></a>
                  
                </td>
              </tr>
              
            </tbody>
        </table>
       </div>
    </div>

    <!-- MODAL DE AGREGAR -->
    <div class="modal fade" id="agregarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <form @submit.prevent="agregarProducto">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Añadir Producto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Nombre</label>
                  <input  type="text" name="nombre" class="form-control" id="exampleInputEmail1" aria-describedby="Nombre" placeholder="Nombre del Producto">
                  <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Tamaño</label>
                  <input  type="number" name="tamaño" class="form-control" id="exampleInputEmail1" aria-describedby="Tamaño" placeholder="Tamaño del Producto" step="0.01" min="0">
                  <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Unidad De Medida</label>
                  <!-- <input  type="number" name="tamaño" class="form-control" id="exampleInputEmail1" aria-describedby="Tamaño" placeholder="Tamaño del Producto" step="0.01" min="0"> -->
                  <select class="form-control" name="umed" id="umed">
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                  </select>
                  <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
                <!-- <div class="form-group">
                    <label  for="">Imagen</label>
                    <input class="form-control"  type="file" name="foto" id="foto" accept="image/*" >
                </div> -->
                <div class="form-group">
                  <label for="exampleInputEmail1">Precio</label>
                  <input  type="number" name="precio" class="form-control" id="exampleInputEmail1" aria-describedby="Precio" placeholder="Precio del Producto" step="0.01" min="0">
                  <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="botonCancelarAgregar">Cancelar</button>
              <button type="submit" class="btn btn-primary" >Añadir</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- FIN MODAL AGREGAR -->

    <!-- MODAL DE editar -->
    <div class="modal fade" id="editarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <form @submit.prevent="editarProducto">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputEmail1">Nombre</label>
                  <input v-model="productoSeleccionado.nombre" type="text" name="nombre" class="form-control" id="exampleInputEmail1" aria-describedby="Nombre" placeholder="Nombre del Producto">
                  <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Tamaño</label>
                  <input v-model="productoSeleccionado.tamaño" type="number" name="tamaño" class="form-control" id="exampleInputEmail1" aria-describedby="Tamaño" placeholder="Tamaño del Producto" step="0.001" min="0">
                  <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Precio</label>
                  <input v-model="productoSeleccionado.precio" type="number" name="precio" class="form-control" id="exampleInputEmail1" aria-describedby="Precio" placeholder="Precio del Producto" step="0.1" min="0">
                  <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Unidad De Medida</label>
                  <!-- <input  type="number" name="tamaño" class="form-control" id="exampleInputEmail1" aria-describedby="Tamaño" placeholder="Tamaño del Producto" step="0.01" min="0"> -->
                  <select v-model="productoSeleccionado.umed" class="form-control" name="umedEditar" id="umedEditar">
                    <option value="mg">mg</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                  </select>
                  <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" ref="botonCancelareditar">Cancelar</button>
              <button type="submit" class="btn btn-primary" >Editar</button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- FIN MODAL editar -->

    <!-- MODAL DE BORRAR -->
    <div class="modal fade" id="borrarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <form @submit.prevent="eliminarProducto">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Borrar Producto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h2>¿Estas seguro que quieres borrar el producto {{productoSeleccionado.nombre}} de <span v-if="productoSeleccionado.tamaño"> {{productoSeleccionado.tamaño}}LT</span></h2>
              <div class="col-sm-7 offset-sm-3">
                <button type="button" class="btn btn-danger" data-dismiss="modal" ref="botonCancelarBorrar">NO</button>
                <button type="submit" class="btn btn-success" >SI</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- FIN MODAL BORRAR -->

    <!-- MODAL DE COMPRAR -->
    <div class="modal fade" id="comprarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <form @submit.prevent="comprarProducto">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Comprar Producto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h2>¿Estas seguro que quieres comprar el producto {{productoSeleccionado.nombre}} de <span v-if="productoSeleccionado.tamaño"> {{productoSeleccionado.tamaño}}LT</span></h2>
              <div class="col-sm-7 offset-sm-3">
                <button type="button" class="btn btn-danger" data-dismiss="modal" ref="botonCancelarComprar">NO</button>
                <button type="submit" class="btn btn-success" >SI</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- FIN MODAL COMPRAR -->
   </div>

</template>

<script>
import {dbRefProductos, dbRefVentas, dbRefDeuda, storageRef} from "../helpers/firebase"

export default {
  name: "productos",
  firebase: 
  {
    productos: dbRefProductos,
    deuda: dbRefDeuda
  },
  mounted()
  {
    // console.log(">>>>>>>>>>>>>>>>>>>")
    // console.log(this.deuda)
  },
  data() {
    return {
      mensajeExito: '',
      mensajeError: '',
      productoSeleccionado: {}
    };
  },
  methods: {
    // probarBusqueda()
    // {
    //     // alert()
    //     console.log(this.productos)
    //     console.log('despues de recuperar')
        
    //     dbRefProductos.limitToLast(3).on('value', (snapshot) =>{
    //         console.log(snapshot.val())
    //         this.$firebaseRefs.productos = snapshot.val()
    //         // console.log(this.productos)
    //       })

    // },
    cadenaAleatoria() 
    {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
    subirImagen(file, nombre, tamaño)
    {
      // console.log('llega');
      // let file = document.querySelector('input[type=file]').files[0];
      let urlImg = 'productos/' + this.cadenaAleatoria() + '-' + nombre + '-' + tamaño
      let src
      console.log('subiendo!');
      // console.log(file)
      storageRef.child('productos/').put(file)
      .then( (snapshot) => {
          console.log(snapshot)
          src = snapshot.downloadURL
          console.log('Uploaded!');
        })
      .catch( (error) => {
        console.log('error:')
        console.log(error)
      });
      return src
    },
    aumentarDeuda(precio)
    {
      dbRefDeuda.update({
        'value': this.deuda[0]['.value'] + precio
      }).then( () => {
        console.log('update successfull')
      })
      .catch( () => {
        console.log('wrong update')
      })
    },
    seleccionarProducto(accion, producto)
    {
      this.productoSeleccionado = producto
      if(accion === 'borrar')
      {
        // console.log(this.productoSeleccionado)
        this.$refs.botonMostrarModalBorrar.click()
      }else if(accion === 'editar')
      {
        // console.log(this.productoSeleccionado)
        document.getElementById("umedEditar").value = this.productoSeleccionado.umed
        
        this.$refs.botonMostrarModalEditar.click()
      }else if(accion === 'comprar')
      {
        this.$refs.botonMostrarModalComprar.click()
      }
    },
    setMensajes(error, mensaje)
    {
      if (error)
      {
        this.mensajeError = mensaje
      }else{
        this.mensajeExito = mensaje
      }

      this.productoSeleccionado = false
      setTimeout(() => {
        this.mensajeExito = false;
        this.mensajeError = false;
      }, 2500);
    },
    agregarProducto(e) 
    {
      // console.log("---------llega")
      let formData = new FormData(e.target);
      // let file = formData.get("foto")
      // console.log(file)
      //  let imagen = this.subirImagen(file, formData.get("nombre"), formData.get("tamaño"))
      dbRefProductos
      .push({
          nombre: formData.get("nombre"),
          tamaño: formData.get("tamaño"),
          umed: formData.get("umed"),
          precio: formData.get("precio")
          // imagen
      })
      .then( ()=> this.setMensajes(true, "¡Producto agregado con exito!"))
      .catch( ()=> this.setMensajes(false, "¡No se pudo agregar el producto correctamente!"));
      document.getElementsByName("nombre")[0].value = ''
      document.getElementsByName("precio")[0].value = 0
      document.getElementsByName("tamaño")[0].value = 0
      this.$refs.botonCancelarAgregar.click()
      
    },
    comprarProducto(e) 
    {
      // alert("Esto se implementará pronto, sea paciente")
      // let formData = new FormData(e.target);
      let f =  new Date();
      let fecha = (f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
      let hora = f.getHours()+":"+f.getMinutes()+":"+ f.getSeconds();  
      // alert (fecha)
      let deudaActual = parseFloat(this.deuda);
      console.log("--------------")
      console.log(deudaActual)
      let precio =  parseFloat(this.productoSeleccionado.precio);
      // let deuda = deudaActual + precio

      dbRefVentas
      .push({
        nombre: this.productoSeleccionado.nombre,
        tamaño: this.productoSeleccionado.tamaño,
        precio,
        fecha,
        hora
      })
      .then( ()=> this.setMensajes(true, "¡Comprado exitosamente!"))
      .catch( ()=> this.setMensajes(false, "¡No se pudo comprar el producto !"));

      this.aumentarDeuda(precio)
      // dbRefDeuda
      // .update({deuda})

      this.$refs.botonCancelarComprar.click()
    },
    editarProducto() 
    {
      // alert()
      // umedEditar
      dbRefProductos
      .child(this.productoSeleccionado['.key'])
      .update({
        nombre: this.productoSeleccionado.nombre,
        tamaño: this.productoSeleccionado.tamaño,
        precio: this.productoSeleccionado.precio,
        umed: this.productoSeleccionado.umed
      })
      this.$refs.botonCancelareditar.click()
      
    },
    eliminarProducto() 
    {
      // alert()
      dbRefProductos
      .child(this.productoSeleccionado['.key'])
      .remove()
      .then( ()=> this.setMensajes(true, "¡Producto eliminado con exito!"))
      .catch( ()=> this.setMensajes(false, "¡No se pudo eliminar el producto correctamente!"));
      this.$refs.botonCancelarBorrar.click()
      
    }
  }
};
</script>
