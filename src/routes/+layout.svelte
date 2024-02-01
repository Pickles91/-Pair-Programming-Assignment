<script>
  import "./styles.css";
</script>

<header>
  <h1>Quest To-Do List</h1>
  <nav>
    <a href="/"> Home! </a>
    <a href="/shop"> Shop! </a>
  </nav>
</header>

<main>
  <div class="container">
    <slot />
  </div>
</main>

<style>
  main {
    margin: auto;
    min-width: 20rem;
    max-width: 80rem;
    width: 80%;
  }
  li > p {
    flex-grow: 1;
  }
  header > h1 {
    margin: 0;
  }
  nav > a {
    padding: 0.5rem 1rem;
  }
</style>

