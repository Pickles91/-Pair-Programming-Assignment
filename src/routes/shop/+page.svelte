<script>
let items = [
  {name: "baseball cap", price: 10},
  {name: "sharp card", price: 15},
  {name: "bat", price: 30},
  {name: "rusty sword", price: 70},
];
</script>

<ul>
  {#each items as item}
    <li> <p> {item.name}: ${item.price} </p> <button> Buy! </button> </li>
  {/each}
</ul>

<style>
li {
  display: flex;
}
li > p {
  flex-grow: 1;
}
</style>
