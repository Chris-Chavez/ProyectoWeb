<template>
  <div class="Contenedor">
    <h1>ABC Personal</h1>
    <b-tabs>
      <b-tab title="Consulta">
        <br />
        <h3>Consulta de Personal</h3>
        <br />
        <Table :fields="campos" :items="allPersonal" :busy="getLoading">
          <template slot="actions" slot-scope="{ item }">
            <b-button
              v-b-modal.modal-prevent-closing
              size="sm"
              variant="outline-primary"
              @click="onEditar(item)"
            >
              Editar
            </b-button>
            <b-button
              size="sm"
              class="ml-2"
              variant="outline-danger"
              @click="onEliminar(item)"
            >
              Eliminar
            </b-button>
          </template>
        </Table></b-tab
      >
      <b-tab title="Insercion">
        <br />
        <h3>Agregar Personal</h3>
        <br />
        <b-form @submit.prevent="AgregarPersonal">
          <Input
            v-model="Personal.Nombre"
            id="Modelo"
            placeholder="Ingrese el nombre del Personal"
            mensajeError="Este dato es obligatorio"
            maxlength="50"
            pattern="^[a-zA-Z0-9\s]+$"
            :error="erroresValidacion && !validacionNombre"
            class="mb-2"
          />
          <Input
            v-model="Personal.Apellidos"
            id="Modelo"
            placeholder="Ingrese los Apellidos del Personal"
            mensajeError="Este dato es obligatorio"
            maxlength="80"
            pattern="^[a-zA-Z0-9\s]+$"
            :error="erroresValidacion && !validacionAP"
            class="mb-2"
          />
          <Input
            v-model="Personal.Telefono"
            id="Modelo"
            placeholder="Ingrese el Telefono del Personal"
            maxlength="10"
            mensajeError="Este dato es incorrecto"
            pattern="(^$|^[0-9]{10}$)"
            :error="erroresValidacionTel"
            class="mb-2"
          />
          <Input
            v-model="Personal.Direccion"
            id="Modelo"
            placeholder="Ingrese la Direccion del Personal"
            maxlength="150"
            pattern="^[a-zA-Z0-9\s]+$"
            class="mb-2"
          />
          <b-button
            type="submit"
            variant="outline-success"
            class="float-right mt-3"
            style="margin-bottom: 15px"
            >Guardar</b-button
          >
        </b-form></b-tab
      >
    </b-tabs>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      okTitle="Aceptar"
      buttonSize="sm"
      :centered="true"
      cancelTitle="Cancelar"
      title="Editar Nombre del Personal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <h3>ID: {{ AuxID }}</h3>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Nuevo Nombre"
          label-for="Nombre-input"
          invalid-feedback="El Nombre es requerido"
          :state="StateNombre.b1"
        >
          <b-form-input
            id="Nombre-input"
            v-model="EditFields.Nombre"
            :state="StateNombre.b1"
            maxlength="50"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Nuevos Apellidos"
          label-for="Apellidos-input"
          invalid-feedback="El Apellido es requerido"
          :state="StateNombre.b2"
        >
          <b-form-input
            id="Apellidos-input"
            v-model="EditFields.Apellidos"
            :state="StateNombre.b2"
            maxlength="80"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Nuevo Telefono"
          label-for="Telefono-input"
          :state="StateNombre.b3"
        >
          <b-form-input
            id="Telefono-input"
            v-model="EditFields.Telefono"
            :state="StateNombre.b3"
            maxlength="10"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Nueva Direccion" label-for="Direccion-input">
          <b-form-input
            id="Direccion-input"
            v-model="EditFields.Direccion"
            maxlength="150"
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Input from "../components/Input";
import Table from "../components/Table";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Personal",
  components: {
    Input,
    Table,
  },
  data() {
    return {
      EditFields: { Nombre: "", Apellidos: "", Telefono: "", Direccion: "" },
      AuxEditar: { Nombre: "", Apellidos: "", Telefono: "", Direccion: "" },
      StateNombre: { b1: null, b2: null, b3: null },
      AuxID: 0,
      campos: [
        {
          key: "ID",
          label: "ID",
        },
        {
          key: "Nombre",
          label: "Nombre",
        },
        {
          key: "Apellidos",
          label: "Apellidos",
        },
        {
          key: "Telefono",
          label: "Telefono",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        {
          key: "Direccion",
          label: "Direccion",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        {
          key: "actions",
          label: "Acciones",
        },
      ],
      Personal: {
        Nombre: "",
        Apellidos: "",
        Telefono: "",
        Direccion: "",
      },
      erroresValidacion: false,
      erroresValidacionTel: false,
    };
  },
  mounted() {
    this.setPersonal();
  },
  created() {},
  computed: {
    ...mapGetters(["allPersonal", "getLoading"]),
    validacionNombre() {
      return this.Personal.Nombre.trim() != "";
    },
    validacionAP() {
      return this.Personal.Apellidos.trim() != "";
    },
    validacionTelefono() {
      var re = new RegExp("(^$|^[0-9]{10}$)");
      return re.test(this.Personal.Telefono);
    },
    EditTel() {
      var re = new RegExp("(^$|^[0-9]{10}$)");
      return re.test(this.EditFields.Telefono);
    },
  },
  methods: {
    ...mapActions([
      "setPersonal",
      "insertPersonal",
      "updatePersonal",
      "deletePersonal",
    ]),
    checkFormValidity() {
      this.StateNombre.b1 =
        this.EditFields.Nombre != "" && this.EditFields.Nombre.length <= 50;
      this.StateNombre.b2 =
        this.EditFields.Apellidos != "" && this.EditFields.Nombre.length <= 80;
      this.StateNombre.b3 = this.EditTel;
      return this.StateNombre.b1 && this.StateNombre.b2 && this.StateNombre.b3;
    },
    resetModal() {
      this.EditFields = this.AuxEditar;
      this.StateNombre.b1 = null;
      this.StateNombre.b2 = null;
      this.StateNombre.b3 = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.updatePersonal({
        id: this.AuxID,
        params: this.EditFields,
        onComplete: (response) => {
          console.log(response);
          this.setPersonal();
          this.SuccessResponse(response.data.mensaje);
        },
        onError: (error) => {
          this.ErrorResponse(error.response.data.mensaje);
        },
      });
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    onEditar(item) {
      this.AuxID = item.item.ID;
      this.EditFields = JSON.parse(JSON.stringify(item.item));
      this.AuxEditar = JSON.parse(JSON.stringify(item.item));
    },
    onEliminar(item) {
      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer", {
          title: "¿Esta seguro que desea eliminar?",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.deletePersonal({
              id: item.item.ID,
              onComplete: (response) => {
                console.log(response);
                this.setPersonal();
                this.SuccessResponse(response.data.mensaje);
              },
              onError: (error) => {
                this.ErrorResponse(error.response.data.mensaje);
              },
            });
          }
        });
    },
    AgregarPersonal() {
      if (this.validacionNombre) {
        if (this.validacionAP) {
          if (this.validacionTelefono) {
            this.erroresValidacion = false;
            this.erroresValidacionTel = false;
            this.insertPersonal({
              params: this.Personal,
              onComplete: (response) => {
                console.log(response);
                this.setPersonal();
                this.Personal = {
                  Nombre: "",
                  Apellidos: "",
                  Telefono: "",
                  Direccion: "",
                };
                this.SuccessResponse(response.data.mensaje);
              },
              onError: (error) => {
                this.ErrorResponse(error.response.data.mensaje);
              },
            });
          } else this.erroresValidacionTel = true;
        } else this.erroresValidacion = true;
      } else this.erroresValidacion = true;
    },
    ErrorResponse(mensaje) {
      this.$bvModal.msgBoxOk(mensaje, {
        title: "Error",
        size: "sm",
        buttonSize: "sm",
        okVariant: "danger",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true,
      });
    },
    SuccessResponse(mensaje) {
      this.$bvModal.msgBoxOk(mensaje, {
        title: "Accion Completada",
        size: "sm",
        buttonSize: "sm",
        okVariant: "success",
        headerClass: "p-2 border-bottom-0",
        footerClass: "p-2 border-top-0",
        centered: true,
      });
    },
  },
};
</script>

<style>
.Contenedor {
  height: 100%;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
