<template>
  <div >
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Gesti&oacute;n Stock</span>{{ sapUser }}
        <button v-if="step > 0" type="submit" class="btn btn-primary" @click.prevent="logout">Salir</button>
      </div>
    </nav>

    <div class="container ">

        <div v-if="step === 0">
          <label for="user" class="form-label">Usuario:</label>
          <input  v-model="sapUser" type="text" class="form-control" 
                  id="user" >
          <label for="password" class="form-label">Contraseña:</label>
          <input  v-model="sapPass" type="password" class="form-control" 
                  id="password" >
          <br/>
          <button class="btn btn-primary btn-rounded prevBtn float-left" type="button" @click="login">Ingresar</button>
        </div> 
        
        <div v-if="step === 1" class="row setup-content"   >
          <div class="col-xs-6 col-md-offset-3">
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col-4">
                  <label for="almacen" class="form-group md-form">Almacen: </label> <!-- {{almacen}} -->
                </div>
                <div class="col-auto">
                  <select id="inputState" class="form-control validate" v-model="almacen" data-live-search="true">
                    <option value="0" selected>Choose...</option>
                    <option v-for="alma in almacenes" :key="alma.LGORT" :value="alma.LGORT">
                      {{alma.LGORT}} - {{alma.LGOBE}}
                    </option>
                  </select>
                  <!-- <v-select label="LGOBE" :options="almacenes"></v-select> -->
                </div>
                <!-- <input v-model="almacen" type="text" class="form-control form-control-sm" id="almacen" aria-describedby="almacenHelp"> -->
              </div>
              </div>
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col-4">
                  <label for="destinatario" class="form-label">Destinatario</label>
                </div>
                <div class="col-auto">
                  <input v-model="destinatario" type="text" class="form-control" id="destinatario" aria-describedby="destinatarioHelp">
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col-4">
                  <label for="ceco" class="form-label">CeCo: </label>  <!-- {{ceco}} -->
                </div>
                <div class="col-auto">
                  <input v-model="ceco" type="text" class="form-control" id="ceco" aria-describedby="cecoHelp">
                  <!-- <select id="inputState" class="form-control validate" v-model="ceco">
                    <option value="0" selected>Choose...</option>
                    <option v-for="cecosto in cecos" :key="cecosto.KOSTL" :value="cecosto.KOSTL">
                      {{cecosto.KOSTL}} - {{cecosto.KTEXT}}
                    </option>
                  </select> -->
                </div>
                <!-- <input v-model="ceco" type="text" class="form-control form-control-sm" id="ceco" aria-describedby="cecoHelp"> -->
              </div>
            </div>
            <div class="mb-3">
              <div class="row g-3 align-items-center">
                <div class="col-4">
                  <label for="orden" class="form-label">Orden</label>
                </div>
                <div class="col-auto">
                  <input v-model="orden" type="text" class="form-control" id="orden" aria-describedby="ordenHelp">
                </div>
              </div>
            </div>
            <div class="mb-3">
              <div class="form-check form-check-inline">
                <input v-model="consumo" v-bind:value="'C'" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" checked>
                <label class="form-check-label" for="inlineRadio1">Consumo</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="consumo" v-bind:value="'A'" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" >
                <label class="form-check-label" for="inlineRadio2">Anulación</label>
              </div>
              
            </div>

          </div>

        </div>

        <div v-if="step === 2" class="" >
          <!-- <Lista-mat /> -->
          <label for="material" class="form-label">Scan:</label>
          <input  v-model="newMat" type="text" class="form-control" 
                  ref="nuevoMat"
                  id="material" @keyup.enter.prevent="addNewMat">
          <ul class="list-group mt-2 mb-5">
            <li class="list-group-item" 
                v-for="(mat, index) in materiales" :key="mat.cod">
              <div class="d-flex w-100 justify-content-between">
                {{ mat.id }} - {{ mat.name }}
                <span class="badge bg-primary rounded-pill" @click="stepCant(index)">{{ mat.cant }} {{ mat.um }}</span>
              </div>
                
              <i @click="removeMat(index)" class="far fa-trash-alt"></i>
              <!-- <button @click="removeMat(index)" type="button" class="btn btn-outline-danger btn-sm">X</button> -->

            </li>
          </ul>
          
        </div>

        <div v-if="step === 3"  class="signature-pad" >
          <label for="signature-body" class="form-label">Firma:</label>
          <div ref="divSignature" id="signature-body" class="signature-body">
            <VueSignature ref="signaturePad" :h="'400px'" :w="'359px'" class="border"/>
          </div>
          <div class="signature-footer">
            <div class="d-grid gap-2 col-2 d-md-block mx-auto">
              <button class="btn btn-secondary center" @click="clear">Clear</button>
            </div>
            <!-- <button class="btn btn-primary" @click="savePng">save png</button> -->
            <!-- <button class="btn btn-primary" @click="cancel">Cancelar</button> -->
            <!-- <button type="submit" class="btn btn-primary" @click.prevent="createMovement">Aceptar</button> -->
          </div>

        </div>

        <!-- modificar Cantidad -->
        <div v-if="step === 4" class="" >
          <h4>Modificar Cantidad </h4>
          <label for="cantidad" class="form-label">{{ selectedMat.value.name }}</label>
          <input  v-model="selectedMat.value.cant" type="text" class="form-control" 
                  id="cantidad" >
          
          <div v-if="selectedMat.value.requiere_lote == 'X'">
            <label for="lote" class="form-label">Lote</label>
            <input  v-model="selectedMat.value.lote" type="text" class="form-control" id="lote" >
          </div>

          <button class="btn btn-primary btn-rounded" type="button" @click.prevent="updateCantMat">Aceptar</button>
        </div>

    </div>

    <div class="footer fixed-bottom p-1 bg-light" v-if="step > 0">
      <div class="d-flex w-100 justify-content-between">
        <button v-if="step === 1" class="btn btn-primary btn-rounded prevBtn float-left" disabled type="button" >Volver</button>
        <button v-if="step > 1 && step <= 3" class="btn btn-primary btn-rounded prevBtn float-left" type="button" @click="prevStep" >Volver</button>
        <button v-if="step < 3" class="btn btn-primary btn-rounded nextBtn float-right" type="button" @click="nextStep">Siguiente</button>
        <button v-if="step === 3" class="btn btn-success btn-rounded nextBtn float-right" type="button" @click="createMovement">Grabar</button>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'; 
import VueSignature from 'vue-signature';
import { useToast } from "vue-toastification";
import axios from 'axios';
// import vSelect from 'vue-select';


export default {
  name: 'App',
  // components: { Campos, ListaMat },
  components: { VueSignature  },

  setup() {
    const almacen = ref(); 
    const almacenes = ref([]); 
    const destinatario = ref(""); 
    const ceco = ref(""); 
    const cecos = ref([]); 
    const orden = ref(""); 
    const consumo = ref(""); 
    const materiales = ref([]);
    const newMat = ref('');
    const nuevoMat = ref(null);
    const selectedMat = {};
    const signaturePad = ref(null);
    const divSignature = ref(null);
    const toast = useToast();
    // const host = ref("http://172.16.0.8:8000");  // des 300
    // const host = ref("http://172.16.0.9:8000");  // qas 
    const host = ref("http://172.16.0.10:8000");  // prd 
    const client = ref("300"); 
    const step = ref(); 
    const sapUser = ref();
    const sapPass = ref();
    // const name = ref();


    const fetchAllAlmacenes = () => {
      // completar lista almacenes 
      const options = {
        params: {
          'sap-user' : sapUser.value,
          'sap-password' : sapPass.value
        }
      };
      return axios.get( host.value + '/test/lgort?sap-client=' + client.value, options )
        .then(response => {
          almacenes.value = response.data;
        })
        .catch(function (error) {
          console.log(error); 
        });

    }


    const fetchAllCecos = () => {
      // completar lista CeCos
      const options = { 
        params: {
          'sap-user' : sapUser.value,
          'sap-password' : sapPass.value
        }
      };
      return axios.get( host.value + '/test/kostl?sap-client=' + client.value, options )
        .then(response => {
          cecos.value = response.data;
        })
        .catch(function (error) {
          console.log(error); 
        });
    }

    function fetchOrden() {
      const options = {
        params: {
          aufnr : orden.value,
          'sap-user' : sapUser.value,
          'sap-password' : sapPass.value
        }
      };

      axios.get( host.value + '/test/aufnr?sap-client=' + client.value, options )
        .then(response => {
          let matOrden = response.data; 

          matOrden.forEach(producto => {
            const prodIndex = materiales.value.findIndex(item => item.id === producto.MATNR);
            if (prodIndex >= 0) {
              materiales.value[prodIndex].cant += producto.ERFMG; 
            } else {
              materiales.value.push({
                id: producto.MATNR, 
                name: producto.MAKTX, 
                cant: producto.ERFMG,
                um: producto.ERFME
              });
            }
          });

          // let materiales = response.data;
          // if (material.MATNR) {
          //   materiales.value.push({
          //     id: material.MATNR, 
          //     name: material.MAKTX, 
          //     cant: 1,
          //     um: material.MEINS
          //   });
          // } else {
          //   toast.error("Material no encontrado");
          // }
        })
        .catch(function (error) {
          console.log(error); 
          toast.error("error al buscar material");
        }); 
    }

    function login() {
      // validar que completen algo

      // deberia validar que user y pass sean correctos antes de continuar. 

      // en lugar de usar esta API podriamos llamar al get para obtener Token y validar si obtuvo uno. 
      const options = {
        params: {
          'sap-user' : sapUser.value,
          'sap-password' : sapPass.value
        }
      };
      // let url = host.value + '/test/user?sap-client=' + client.value + '&sap-user=' + sapUser.value + '&sap-password=' + sapPass.value
      // axios.get( url , options )
      axios.get( host.value + '/test/user?sap-client=' + client.value, options )
        .then(response => {
          let usuario = response.data;

          if (usuario.TYPE==='S') {
            localStorage.sapUser = sapUser.value; 
            localStorage.sapPass = sapPass.value; 
            step.value = 1; 
            this.fetchAllAlmacenes();
            this.fetchAllCecos();

          } else {
            toast.error(usuario.MESSAGE);
          }
           
        })
        .catch(function (error) {
          console.log(error); 
          toast.error("error al validar usuario");
        }); 
      
    }

    function logout() {
      localStorage.removeItem('sapUser');
      localStorage.removeItem('sapPass');
      sapUser.value = '';
      sapPass.value = '';
      step.value = 0; 
    }

    function nextStep() {
      if (step.value < 3) {
        if ( validateForm() ) {
          step.value += 1; 
        } 
      }
    }

    function prevStep() {
      if (step.value > 1) {
       step.value -= 1; 
      }
    }

    function resizeCanvas() {
      // var wrapper = document.getElementById("signature-pad");
      var canvas = document.getElementById("canvas"); // wrapper.querySelector("canvas");
      var ratio =  Math.max(window.devicePixelRatio || 1, 1);
      
      if (canvas) {
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        console.log(canvas);
      }

      // if (signaturePad.value) {
      //   signaturePad.value.width = signaturePad.value.offsetWidth * ratio;
      //   signaturePad.value.height = signaturePad.value.offsetHeight * ratio;
      //   signaturePad.value.getContext("2d").scale(ratio, ratio);
      //   clear();
      // }

      clear();
    }
    window.onresize = resizeCanvas();

    function clear() {
      if (signaturePad.value) {
        signaturePad.value.clear();
      }
    }

    function savePng() {
      let nuevoContenido = signaturePad.value.save('image/jpeg'); 
      //     console.log(nuevoContenido);
      // data_uri = "data:image/png;base64,iVBORw0K..."
      let encoded_image = nuevoContenido.split(",")[1];
      // console.log(encoded_image);
      // let decoded_image = atob(encoded_image);
      // let decoded_image = Base64.decode64(encoded_image);
      // console.log(decoded_image);
      download("hello.jpeg", encoded_image);
    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:image/png;base64,' + encodeURIComponent(text));
        // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function validateForm() {
      // validaciones 
      let isValid = false; 
        // campos completos, al menos 1 material
      if (step.value === 1) {
        if( !almacen.value || almacen.value == 0 || !destinatario.value || (!ceco.value && !orden.value) ) {
          // error campos incompletos 
          toast.error("Completar campos");
        } else {
          materiales.value = []; 
          if (ceco.value) {
            // si ingresaron Ceco: validar que ceco ingresado corresponda a uno de la lista cecos 
            const cecoIndex = cecos.value.findIndex(item => item.KOSTL === ceco.value);
            if (cecoIndex >= 0) {
              isValid = true;
            } else {
              toast.error("CeCo no existe");
            }
          } else {
            fetchOrden() ;
            // validar? 
            isValid = true;
          }
        }

      } else if (step.value === 2) {
        if (materiales.value.length == 0) {
          toast.error("Completar Materiales");
          nuevoMat.value.focus();
        } else {
          isValid = true;
        }
      }
      
      return isValid; 
      // // resizeCanvas();
    }

    function createMovement() {
      // isSignActive.value = !isSignActive.value; // invierte valor 
      
      if (!signaturePad.value.isEmpty()) {

        let token = ''; 
        var jpeg = signaturePad.value.save('image/jpeg');
        let codMovimiento = 0;

        // hacer un GET para recuperar token y asi poder llamar a POST 
        // se envía 'Fetch' para que responda con el Token
        const options = {
          headers: {'X-CSRF-Token': 'Fetch'} 
          , withCredentials: true
          , auth: {
            username: sapUser.value,
            password: sapPass.value
          }
          ,params: {
            'sap-user' : sapUser.value,
            'sap-password' : sapPass.value
          }
        };
      
        axios.get( host.value + '/test/mover?sap-client=' + client.value, options)
        .then(getResponse => {
          // obtener token 
          token = getResponse.headers['x-csrf-token'];
          // console.log('token: ' + token);
          console.log(getResponse); // response del GET 

          if (ceco.value) {
            if (consumo.value == 'A') {
              codMovimiento = 202;
            } else {
              codMovimiento = 201;
            }
          } else if (orden.value) {
            if (consumo.value == 'A') {
              codMovimiento = 262;
            } else {
              codMovimiento = 261;
            }
          }

          const data = {
            "almacen": almacen.value, 
            "destinatario": destinatario.value, 
            "ceco": ceco.value,
            "orden": orden.value, 
            "movimiento": codMovimiento, 
            "productos" : materiales.value,
            "firma" : jpeg
          }; 
          const headPost = {
            headers: { 
              'x-csrf-token': token
            } 
            , withCredentials: true
            , params: {
              'sap-user' : sapUser.value,
              'sap-password' : sapPass.value
            }
            // NO es obligatorio user y pass, porque ya tenemos token
            // , auth: {
            //   username: '...',
            //   password: '...'
            // }
          };

          axios.post( host.value + '/test/mover?sap-client=' + client.value, data, headPost )
            .then(postResponse => {
              console.log("--- Post Response ---"); 
              console.log(postResponse); 
              console.log(postResponse.data.MESSAGE); 

              if (postResponse.data.TYPE == 'E') {
                toast.error(postResponse.data.MESSAGE);
              } else {
                step.value = 1; // vuelve a pantalla inicial       
                toast.success("Movimiento creado: "+postResponse.data.MBLNR);  
              }
              

            })
            .catch(function (error) {
              console.log('POST error: '); 
              console.log(error); 
              console.log(error.response); 
              console.log(error.request); 
              console.log(error.message); 

            }); 

        })
        .catch(function (error) {
              console.log('error get: ' + error); 
        });



      } else {
        toast.error("Por favor Firmar");  
      }

      // var png = signaturePad.value.save();
      // 
      // var svg = signaturePad.value.save('image/svg+xml');
      // console.log(png);
      // console.log(jpeg);
      // console.log(svg);
    }

    function cancel() {
      step.value = 2;
    }

    function addNewMat() {
      // llamar a API para obtener datos del material 

      // si el material ya existe en la lista => sumamos 1 
      const itemIndex = materiales.value.findIndex(item => item.id === newMat.value);
      // const mat = materiales.value.find(item => item.id === newMat.value); 
      // const itemIndex = materiales.value.indexOf(mat);

      if (itemIndex >= 0) {
        materiales.value[itemIndex].cant += 1; 
      } else {

        const options = {
          params: {
            matnr : newMat.value,
            'sap-user' : sapUser.value,
            'sap-password' : sapPass.value
          }
        };
        axios.get( host.value + '/test/matnr?sap-client=' + client.value, options )
          .then(response => {
            let material = response.data;

            if (material.MATNR) {
              materiales.value.push({
                id: material.MATNR, 
                name: material.MAKTX, 
                cant: 1,
                um: material.MEINS,
                requiere_lote: material.XCHPF,
                lote: ''
              });
            } else {
              toast.error("Material no encontrado");
            }
          })
          .catch(function (error) {
            console.log(error); 
            toast.error("error al buscar material");
          });        
        
      }

      newMat.value = '';
    }

    function removeMat(index) {
      materiales.value.splice(index, 1);
      // newMat.value.focus();
      // nuevoMat.value.focus();
    }

    function stepCant(index) {
      step.value = 4; 
      selectedMat.value = materiales.value[index];
      // name = selectedMat.name ; 
      // console.log(materiales.value[index]); 
      // console.log(selectedMat); 
      // console.log(materiales.value[index].cant ); 
      // console.log(selectedMat.value.name ); 
    }
    function updateCantMat() {
      // buscar indice del material a modificar 
      const itemIndex = materiales.value.findIndex(item => item.id === selectedMat.value.id);

      if (itemIndex >= 0) {
        materiales.value[itemIndex].cant = parseInt(selectedMat.value.cant); 
        materiales.value[itemIndex].lote = selectedMat.value.lote; 
      } 

      step.value = 2; 
    }

    if ( step.value === 2 )
    {
      newMat.value.focus();
      nuevoMat.value.focus();
    }

    return { 
      almacen, almacenes, destinatario, ceco, orden, consumo, createMovement,
      materiales, newMat, addNewMat, removeMat, stepCant, updateCantMat, nuevoMat, selectedMat,
      clear, signaturePad, savePng, cancel, divSignature, toast,
      fetchAllAlmacenes, step, nextStep, prevStep, fetchAllCecos, cecos,
      sapUser, sapPass, login, logout
    }
  },
   
  created() {
    this.step = 0; // login
    if (localStorage.sapUser) { 
      this.sapUser = localStorage.sapUser; 
    }
    if (localStorage.sapPass) { 
      this.sapPass = localStorage.sapPass; 
    }
    if (this.sapUser && this.sapPass) {
      this.step = 1;
    } 
    this.fetchAllAlmacenes();
    this.fetchAllCecos();

  }

  /*
  localStorage.getItem('user');
  localStorage.setItem('user', ...); 
  localStorage.removeItem('user');

  JSON.parse(localStorage.getItem("checked"))
  localStorage.setItem("checked", JSON.stringify(newValue)); 
  */
  
}
</script>

