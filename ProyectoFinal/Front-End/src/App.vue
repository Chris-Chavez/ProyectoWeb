<template>
  <b-card no-body>
    <b-card-header header-tag="nav" style="padding: 0px">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item to="/" exact exact-active-class="active"
            >Inicio</b-nav-item
          >
          <b-nav-item to="/Categorias" exact exact-active-class="active"
            >Categorías</b-nav-item
          >
          <b-nav-item to="/Personal" exact exact-active-class="active"
            >Personal</b-nav-item
          >
          <b-nav-item to="/Tickets" exact exact-active-class="active"
            >Tickets</b-nav-item
          >
        </b-navbar-nav>
      </b-navbar>
    </b-card-header>

    <b-card-body>
      <router-view></router-view>
    </b-card-body>
  </b-card>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
