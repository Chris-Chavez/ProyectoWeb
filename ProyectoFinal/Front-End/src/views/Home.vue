<template>
  <div class="Contenedor">
    <h1>Inicio</h1>
    <b-table :fields="campos" :items="allTickets" :busy="getLoading" :tbody-tr-class="rowClass"></b-table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  components: {
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
          label: "Categoria",
          formatter: (value) => {
            return value || "Sin información";
          },
          sortable: true,
        },
        {
          key: "Estatus",
          label: "Estatus",
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
    this.setTickets();
  },
  computed: {
    ...mapGetters(["allTickets", "getLoading"]),

  },
  methods: {
    ...mapActions(["setTickets"]),
    rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.Estatus === 'ABT') return 'table-danger'
        if (item.Estatus === 'ESP') return 'table-success'
        if (item.Estatus === 'FIN') return 'table-dark'
      }
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