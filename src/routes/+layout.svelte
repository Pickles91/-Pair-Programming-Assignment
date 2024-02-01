<script>
  import "./styles.css";
</script>
<main>
  <header>
    <h1>Quest To-Do List</h1>
  </header>
  <slot />
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
</style>

