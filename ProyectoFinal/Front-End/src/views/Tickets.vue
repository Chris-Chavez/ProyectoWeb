<template>
  <div class="Contenedor">
    <h1>ABC Tickets</h1>
    <b-tabs>
      <b-tab title="Consulta">
        <br />
        <h3>Consulta de Tickets</h3>
        <br />
        <Table :fields="campos" :items="allTickets" :busy="getLoading">
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
            <b-button
              v-b-modal.modal-2
              size="sm"
              class="ml-2"
              variant="outline-success"
              @click="onEditar(item)"
            >
              Cambiar Estatus
            </b-button>
          </template>
        </Table>
      </b-tab>
      <b-tab title="Inserción">
        <br />
        <h3>Agregat Tickets</h3>
        <b-form @submit.prevent="AgregarTicket">
          <Input
            v-model="Tickets.Nombre"
            id="Modelo"
            placeholder="Ingrese el nombre del Ticket"
            mensajeError="Este dato es obligatorio"
            maxlength="50"
            pattern="^[a-zA-Z0-9\s]+$"
            :error="erroresValidacion && !validacionNombre"
            class="mb-2"
          />
          <Input
            v-model="Tickets.Descripcion"
            id="Modelo"
            placeholder="Ingrese la Descripción del Ticket"
            maxlength="150"
            pattern="^[a-zA-Z0-9\s]+$"
            class="mb-2"
          />
          <div class="mt-4 mb-2">
            Prioridad:
            <b-form-select
              v-model="Tickets.Prioridad"
              :options="Prioridades"
              style="margin-right:8px"
            ></b-form-select>
            <label v-show="!validacionPrioridad">Este Campo es obligatorio</label>
          </div>
          <div class="mb-2">
            Personal:
            <b-form-select
              v-model="Tickets.Personal"
              :options="allPersonal"
              text-field="Nombre"
              value-field="ID"
              style="margin-right:5px"
            ></b-form-select>
            <label v-show="!validacionPersonal">Este Campo es obligatorio</label>
          </div>
          <div class="mb-4">
            Categoría:
            <b-form-select
              v-model="Tickets.Categoria"
              :options="allCategorias"
              text-field="Nombre"
              value-field="ID"
              style="margin-right:5px"
            ></b-form-select>
            <label v-show="!validacionCategoria">Este Campo es obligatorio</label>
          </div>
          <b-button
            type="submit"
            variant="outline-success"
            class="float-right"
            >Guardar</b-button
          >
        </b-form>
      </b-tab>
    </b-tabs>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      okTitle="Aceptar"
      buttonSize="sm"
      :centered="true"
      cancelTitle="Cancelar"
      title="Editar Ticket"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <h3>ID: {{ AuxID }}</h3>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Nueva Descripción"
          label-for="Descripcion-input"
          invalid-feedback="La Descripción es requerida"
          :state="StateNombre.b1"
        >
          <b-form-input
            id="Descripcion-input"
            v-model="EditFields.Descripcion"
            :state="StateNombre.b1"
            maxlength="50"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Nueva Prioridad"
          label-for="Prioridad-input"
          invalid-feedback="La Prioridad es requerido"
          :state="StateNombre.b2"
        >
          <b-form-select
            v-model="EditFields.Prioridad"
            :options="Prioridades"
            style="margin-bottom: 15px"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label="Nueva Categoría"
          label-for="Categoria-input"
          invalid-feedback="La Categoría es requerida"
          :state="StateNombre.b2"
        >
          <b-form-select
            v-model="EditFields.Categoria"
            :options="allCategorias"
            text-field="Nombre"
            value-field="ID"
            style="margin-bottom: 15px"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label="Nuevo Personal"
          label-for="Personal-input"
          invalid-feedback="El Personal es requerido"
          :state="StateNombre.b2"
        >
          <b-form-select
            v-model="EditFields.Personal"
            :options="allPersonal"
            text-field="Nombre"
            value-field="ID"
            style="margin-bottom: 15px"
          ></b-form-select>
        </b-form-group>
      </form>
    </b-modal>
    <b-modal
      id="modal-2"
      ref="modal-2"
      okTitle="Aceptar"
      buttonSize="sm"
      :centered="true"
      cancelTitle="Cancelar"
      title="Cambiar Estatus"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk2"
      ><form ref="form-2" @submit.stop.prevent="handleSubmit2">
        <b-form-select
          v-model="EditEstatus.Estatus"
          :options="allEstatus"
          style="margin-bottom: 15px"
        ></b-form-select>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Input from "../components/Input";
import Table from "../components/Table";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Tickets",
  components: {
    Input,
    Table,
  },
  data() {
    return {
      EditFields: {
        Descripcion: "",
        Prioridad: 0,
        Personal: 0,
        Categoria: 0,
      },
      EditEstatus: { Estatus: "" },
      AuxEditar: {
        Descripcion: "",
        Prioridad: 0,
        Personal: 0,
        Categoria: 0,
      },
      StateNombre: { b1: null, b2: null, b3: null, b4: null },
      StateEstatus: null,
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
          key: "Descripcion",
          label: "Descripción",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        {
          key: "Prioridad",
          label: "Prioridad",
          formatter: (value) => {
            let aux = "";
            switch (value) {
              case "1":
                aux = "BAJA";
                break;
              case "2":
                aux = "BAJA";
                break;
              case "3":
                aux = "BAJA";
                break;
            }
            return aux || "Sin información";
          },
        },
        {
          key: "Personal",
          label: "Personal",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        {
          key: "Categoria",
          label: "Categoría",
          formatter: (value) => {
            return value || "Sin información";
          },
        },
        {
          key: "Estatus",
          label: "Estatus",
        },
        {
          key: "actions",
          label: "Acciones",
        },
      ],
      Tickets: {
        Nombre: "",
        Descripcion: "",
        Prioridad: 0,
        Personal: 0,
        Categoria: 0,
        Estatus: "ABT",
      },
      Prioridades: [
        { value: 1, text: "BAJA" },
        { value: 2, text: "MEDIA" },
        { value: 3, text: "ALTA" },
      ],
      allEstatus: [
        { value: "ABT", text: "Abierto" },
        { value: "ESP", text: "En espera" },
        { value: "FIN", text: "Finalizado" },
      ],
      erroresValidacion: false,
      erroresValidacionTel: false,
    };
  },
  mounted() {
    this.setPersonal();
    this.setCategorias();
    this.setTickets();
  },
  created() {},
  computed: {
    ...mapGetters(["allPersonal", "allCategorias", "allTickets", "getLoading"]),
    validacionNombre() {
      return this.Tickets.Nombre.trim() != "";
    },
    validacionPrioridad() {
      return this.Tickets.Prioridad != 0;
    },
    validacionCategoria() {
      return this.Tickets.Categoria != 0;
    },
    validacionPersonal() {
      return this.Tickets.Personal != 0;
    },
  },
  methods: {
    ...mapActions([
      "setPersonal",
      "setCategorias",
      "setTickets",
      "insertTicket",
      "updateTicket",
      "deleteTicket",
      "updateEstatus"
    ]),
    checkFormValidity() {
      this.StateNombre.b1 = this.EditFields.Descripcion.length <= 100;
      this.StateNombre.b2 = this.EditFields.Prioridad != 0;
      this.StateNombre.b3 = this.EditFields.Categoria != 0;
      this.StateNombre.b4 = this.EditFields.Personal != 0;
      return (
        this.StateNombre.b1 &&
        this.StateNombre.b2 &&
        this.StateNombre.b3 &&
        this.StateNombre.b4
      );
    },
    checkFormValidity2() {
      this.StateEstatus = this.EditEstatus.Estatus != null;
      return this.StateEstatus;
    },
    resetModal() {
      this.EditFields = this.AuxEditar;
      this.StateNombre.b1 = null;
      this.StateNombre.b2 = null;
      this.StateNombre.b3 = null;
      this.StateNombre.b4 = null;
      this.StateEstatus = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleOk2(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit2();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.updateTicket({
        id: this.AuxID,
        params: this.EditFields,
        onComplete: (response) => {
          console.log(response);
          this.setTickets();
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
    handleSubmit2() {
      if (!this.checkFormValidity2()) {
        return;
      }
      this.updateEstatus({
        id: this.AuxID,
        params: this.EditEstatus,
        onComplete: (response) => {
          console.log(response);
          this.setTickets();
          this.SuccessResponse(response.data.mensaje);
        },
        onError: (error) => {
          this.ErrorResponse(error.response.data.mensaje);
        },
      });
      this.$nextTick(() => {
        this.$bvModal.hide("modal-2");
      });
    },
    onEditar(item) {
      this.AuxID = item.item.ID;
      this.EditFields = JSON.parse(JSON.stringify(item.item));
      this.AuxEditar = JSON.parse(JSON.stringify(item.item));
      this.EditEstatus.Estatus = JSON.parse(JSON.stringify(item.item.Estatus));
    },
    onEliminar(item) {
      this.$bvModal
        .msgBoxConfirm("Esta acción no se puede deshacer", {
          title: "¿Esta seguro que desea eliminar?",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Aceptar",
          cancelTitle: "Cancelar",
          centered: true,
        })
        .then((value) => {
          if (value) {
            this.deleteTicket({
              id: item.item.ID,
              onComplete: (response) => {
                console.log(response);
                this.setTickets();
                this.SuccessResponse(response.data.mensaje);
              },
              onError: (error) => {
                this.ErrorResponse(error.response.data.mensaje);
              },
            });
          }
        });
    },
    AgregarTicket() {
      if (this.validacionNombre) {
        if (this.validacionPrioridad) {
          if (this.validacionPersonal) {
            if (this.validacionCategoria) {
              this.erroresValidacion = false;
              this.insertTicket({
                params: this.Tickets,
                onComplete: (response) => {
                  console.log(response);
                  this.setTickets();
                  this.Tickets = {
                    Nombre: "",
                    Descripcion: "",
                    Prioridad: 0,
                    Personal: 0,
                    Categoria: 0,
                    Estatus: "ABT",
                  };
                  this.SuccessResponse(response.data.mensaje);
                },
                onError: (error) => {
                  this.ErrorResponse(error.response.data.mensaje);
                },
              });
            }
          }
        }
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
        title: "Acción Completada",
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
  margin-left: 20%;
  margin-right: 20%;
}
label {
  color: red;
}
</style>
