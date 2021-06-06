<template>
  <div class="Contenedor">
    <h1>ABC Categorias</h1>
    <b-tabs>
      <b-tab title="Consulta">
        <br />
        <h3>Consulta de Categorias</h3>
        <br />
        <Table :fields="campos" :items="allCategorias" :busy="getLoading">
          <template slot="actions" slot-scope="{ item }">
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
      </b-tab>
      <b-tab title="Insercion">
        <br />
        <h3>Agregar Categorias</h3>
        <br />
        <b-form @submit.prevent="AgregarCategoria">
          <Input
            v-model="Categoria.Nombre"
            id="Modelo"
            placeholder="Ingrese nombre de la Categoria"
            mensajeError="Este dato es obligatorio"
            maxlength="50"
            pattern="^[a-zA-Z0-9\s]+$"
            :error="erroresValidacion && !validacionNombre"
            class="mb-2"
          />
          <b-button
            type="submit"
            variant="outline-success"
            class="float-right mt-3"
            style="margin-bottom: 15px"
            >Guardar</b-button
          >
        </b-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Input from "../components/Input";
import Table from "../components/Table";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Agregar",
  components: {
    Input,
    Table,
  },
  data() {
    return {
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
          key: "actions",
          label: "Acciones",
        },
      ],
      Categoria: {
        Nombre: "",
      },
      erroresValidacion: false,
    };
  },
  mounted() {
    this.setCategorias();
  },
  created() {},
  computed: {
    ...mapGetters(["allCategorias", "getLoading"]),
    validacionNombre() {
      return this.Categoria.Nombre.trim() != "";
    },
  },
  methods: {
    ...mapActions(["setCategorias", "insertCategoria", "deleteCategoria"]),
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
            this.deleteCategoria({
              id: item.item.ID,
              onComplete: (response) => {
                console.log(response);
                this.setCategorias();
                this.SuccessResponse(response.data.mensaje);
              },
              onError: (error) => {
                this.ErrorResponse(error.response.data.mensaje);
              },
            });
          }
        });
    },
    AgregarCategoria() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        console.log(this.Auto);
        this.insertCategoria({
          params: this.Categoria,
          onComplete: (response) => {
            console.log(response);
            this.setCategorias();
            this.Categoria.Nombre = "";
            this.SuccessResponse(response.data.mensaje);
          },
          onError: (error) => {
            this.ErrorResponse(error.response.data.mensaje);
          },
        });
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
  margin-left: 20%;
  margin-right: 20%;
}
</style>
