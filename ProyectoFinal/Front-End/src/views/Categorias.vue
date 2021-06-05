<template>
  <div class="Contenedor">
    <h1>ABC Categorias</h1>
    <b-form @submit.prevent="AgregarCategoria">
      <Input
        v-model="Categoria.Nombre"
        id="Modelo"
        placeholder="Ingrese nombre de la Categoria"
        mensajeError="Este dato es obligatorio"
        maxlength="50"
        :error="erroresValidacion && !validacionNombre"
        class="mb-2"
      />
      <b-button type="submit" variant="outline-success" class="float-right mt-3" style="margin-bottom: 15px;">Guardar</b-button>
    </b-form>

    <Table :fields="campos" :items="allCategorias" :busy="getLoading" >
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
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      okTitle="Aceptar"
      buttonSize="sm"
      :centered='true'
      cancelTitle="Cancelar"
      title="Editar Nombre de la Categoria"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Nuevo Nombre"
          label-for="name-input"
          invalid-feedback="El Nombre es requerido"
          :state="StateNombre"
        >
          <b-form-input
            id="name-input"
            v-model="EditNombre"
            :state="StateNombre"
            required
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
  name: "Agregar",
  components: {
    Input,
    Table,
  },
  data() {
    return {
      EditNombre: "",
      StateNombre: null,
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
    ...mapActions([
      "setCategorias",
      "insertCategoria",
      "deleteCategoria",
    ]),
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.StateNombre = valid;
      return valid;
    },
    resetModal() {
      this.EditNombre = "";
      this.StateNombre = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.updateCategoria({
        id: this.AuxID,
        params: {
          Nombre: this.EditNombre,
        },
        onComplete: (response) => {
          console.log(response);
          this.setCategorias();
        },
        onError: (error) => {
          console.log(error);
          this.$notify({
            type: "error",
            title: error.response.data.mensaje,
          });
        },
      });
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
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
            this.deleteCategoria({
              id: item.item.ID,
              onComplete: (response) => {
                console.log(response);
                this.setCategorias();
              },
              onError: (error) => {
                console.log(error);
                this.$notify({
                  type: "error",
                  title: error.response.data.mensaje,
                });
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
          },
          onError: (error) => {
            this.$notify({
              type: "error",
              title: error.response.data.mensaje,
            });
          },
        });
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
</style>
