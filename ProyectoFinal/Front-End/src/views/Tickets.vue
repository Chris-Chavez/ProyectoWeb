<template>
  <div class="Contenedor">
    <h1>ABC Tickets</h1>
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
        placeholder="Ingrese la Descripcion del Ticket"
        maxlength="150"
        pattern="^[a-zA-Z0-9\s]+$"
        class="mb-2"
      />
      <b-form-select
        v-model="Tickets.Prioridad"
        :options="Prioridades"
        style="margin-bottom: 15px"
      ></b-form-select>
      <label v-show="!validacionPrioridad">Este Campo es obligatorio</label>
      <b-form-select
        v-model="Tickets.Personal"
        :options="allPersonal"
        text-field="Nombre"
        value-field="ID"
        style="margin-bottom: 15px"
      ></b-form-select>
      <label v-show="!validacionPersonal">Este Campo es obligatorio</label>
      <b-form-select
        v-model="Tickets.Categoria"
        :options="allCategorias"
        text-field="Nombre"
        value-field="ID"
        style="margin-bottom: 15px"
      ></b-form-select>
      <label v-show="!validacionCategoria">Este Campo es obligatorio</label>
      <br />
      <b-button
        type="submit"
        variant="outline-success"
        class="float-right mt-2"
        style="margin: 0px 0px 15px 0px"
        >Guardar</b-button
      >
    </b-form>

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
      </template>
    </Table>
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
          key: "Descripcion",
          label: "Descripcion",
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
              case '1':
                aux = "BAJA";
                break;
              case '2':
                aux = "BAJA";
                break;
              case '3':
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
          label: "Categoria",
          formatter: (value) => {
            return value || "Sin información";
          },
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
      "updatePersonal",
      "deletePersonal",
    ]),
    AgregarTicket() {
      if (this.validacionNombre) {
        if (this.validacionPrioridad) {
          if (this.validacionPersonal) {
            if (this.validacionCategoria) {
              this.erroresValidacion = false;
              console.log(this.Auto);
              this.insertTicket({
                params: this.Tickets,
                onComplete: (response) => {
                  console.log(response);
                  this.setCategorias();
                },
                onError: (error) => {
                  this.$notify({
                    type: "error",
                    title: error.response.data.mensaje,
                  });
                },
              });
            }
          }
        }
      } else this.erroresValidacion = true;
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
