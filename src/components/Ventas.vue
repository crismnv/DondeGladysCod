<template>
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
            <p class="card-text " >Tu deuda es: S./{{this.deuda[0]['.value']}}</p>
            <!-- <p class="card-text " v-else>Tu deuda es: S./ 0.00</p> -->
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <img src="http://www.freepngimg.com/download/coke/1-2-coca-cola-png-clipart.png" class="img-fluid" width="200" height="200" alt="Donde">
      </div>
    </div>
    <br>
    <div class="row" v-if="this.deuda[0]['.value'] > 0">
      <div class="col-sm-6 offset-sm-3">
        <button ref="botonMostrarModalPagar"  data-toggle="modal" data-target="#pagarModal" class="btn btn-block btn-danger">Pagar Deuda</button>
      </div>
    </div>

    <div id="botonesOcultos" style="display: none;">
          <button ref="botonBorrarModal"  data-toggle="modal" data-target="#borrarModal" class=" bg-light btn" ><i class="fas fa-plus-circle fa-3x"></i></button>
      
    </div>
    <br>
      <!-- <br> -->
      <hr>
    <div id="alertas" class="row">
        <div v-if="mensajeExito" class="alert text-center font-weight-bold col-sm-12 alert-danger" role="alert">
          {{mensajeExito}}
        </div>
        <div v-if="mensajeError" class="alert text-center font-weight-bold col-sm-12 alert-success" role="alert">
          {{mensajeError}}
        </div>
      </div>
    <div class="col-md-10 offset-md-1 table-responsive">
         <table class="table table-striped table-secondary  text-center">
          <thead class="thead-default">
            <tr class="">
              <th class="align-middle">Nombre</th>
              <th class="align-middle">Cantidad</th>
              <th class="align-middle">Precio</th>
              <th class="align-middle">Fecha</th>
              <th class="align-middle">Hora</th>
              <th class="align-middle">Acciones</th>
            </tr>
            </thead>
            <tbody>
              <tr class="" v-for="venta in ventas" :key="venta.id">
                <td>{{venta.nombre}}</td>
                <td>{{venta.tamaño}} Lt</td>
                <td>S./ {{venta.precio}}</td>
                <td>{{venta.fecha}}</td>
                <td>{{venta.hora}}</td>
                <td>
                  <a class="btn" @click="seleccionarVenta('borrar', venta)"><i class="fas fa-2x fa-minus-circle fa-1x"></i></a>
                </td>
              </tr>
              
            </tbody>
        </table>
       </div>
       <!-- MODAL DE BORRAR -->
      <div class="modal fade" id="borrarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <form @submit.prevent="eliminarVenta">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Borrar Producto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h2>¿Estas seguro que quieres borrar la venta {{ventaSeleccionada.nombre}} de <span v-if="ventaSeleccionada.tamaño"> {{ventaSeleccionada.tamaño}}LT</span></h2>
                <div class="col-sm-7 offset-sm-3">
                  <button type="button" class="btn btn-danger" data-dismiss="modal" ref="botonCancelarBorrar">NO</button>
                  <button type="submit" class="btn btn-success">SI</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- FIN MODAL BORRAR -->

       <!-- MODAL DE DEUDA -->
      <div class="modal fade" id="pagarModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <form @submit.prevent="cancelarDeuda">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Pagar Deuda</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h2>¿Cuánto pagarás?</h2>
                <input v-model="pago" type="number" step="0.1" class="form-control" min="0.1" :max="this.deuda[0]['.value']">
                <div class="col-sm-7 offset-sm-3">
                  <button type="button" class="btn btn-danger" data-dismiss="modal" ref="borrar">REGRESAR</button>
                  <button type="submit" class="btn btn-success" >PAGAR</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- FIN MODAL DE DEUDA -->
  </div>
</template>

<script>
import {dbRefVentas, dbRefDeuda} from '../helpers/firebase';
export default {
  name: 'ventas',
  firebase:
  {
    ventas: dbRefVentas,
    deuda: dbRefDeuda
  },
  data()
  {
    return {
       mensajeExito: '',
      mensajeError: '',
      ventaSeleccionada: {},
      pago: 0
    }
  },
  // computed:
  // {
  //   deudaMostrar()
  //   {
  //     return
  //   }
  // },
  beforeMount()
  {
    console.log("--deuda--")
    console.log(this.deuda)
    
  },
  methods: 
  {
    cancelarDeuda()
    {
      dbRefDeuda.update({
        value: this.deuda[0]['.value'] - this.pago
      })
      .then( ()=> this.setMensajes(true, "¡Se realizó el pago con exito!"))
      .catch( ()=> this.setMensajes(false, "¡No se pudo realizar el pago correctamente!"));
      this.$refs.borrar.click()
    },
    seleccionarVenta(accion, venta)
    {
      if (accion === 'borrar') 
      {
        this.ventaSeleccionada = venta
        this.$refs.botonBorrarModal.click()
        // this.eliminarVenta()
      }
    },
    eliminarVenta()
    {
      dbRefVentas
      .child(this.ventaSeleccionada['.key'])
      .remove()
      .then( ()=> this.setMensajes(true, "¡Venta eliminada con exito!"))
      .catch( ()=> this.setMensajes(false, "¡No se pudo eliminar la venta correctamente!"));


      this.$refs.botonCancelarBorrar.click()
      // this.$refs.botonOcultarModalBorrar.click()
    },
    setMensajes(error, mensaje)
    {
      if (error)
      {
        this.mensajeError = mensaje
      }else{
        this.mensajeExito = mensaje
      }

      setTimeout(() => {
        this.mensajeExito = false;
        this.mensajeError = false;
      }, 2500);
    }
    
  }
}
</script>
