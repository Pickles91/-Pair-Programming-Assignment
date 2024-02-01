<!-- The todo list management stuff -->
<script lang="ts">
  import { onMount } from "svelte";

  let taskInput: string = '';
  let tasks: string[] = [];

  let db;
  let points = 0;
  let difficulty;

  onMount(async () => {
    let dbReq = window.indexedDB.open("tasks", 3);
    db = await new Promise(async (resolve) => {
      dbReq.onupgradeneeded = async (event) => {
        const store = event.target.result.createObjectStore("taskLog", {autoIncrement: true});

        store.createIndex("status", "status");
        return resolve(event.target.result);
      };
      dbReq.onsuccess = (event) => {
        return resolve(event.target.result);
      };
    });

    const rx = db.transaction(["taskLog"], "readwrite")
      .objectStore("taskLog");

    rx.index("status").openCursor().onsuccess = (e) => {
      const dbg = (i) => {console.log(i); return i};
      if(e.target.result && e.target.result.key == "pending") {
        tasks = [...tasks, {...e.target.result.value, ...{key: e.target.result.primaryKey}}];
      }
      else if(e.target.result && e.target.result.key == "completed") {
        points += e.target.result.value.value;
      } else if (e.target.result && e.target.result.key == "failed") {
        points -= 2 * e.target.result.value.value;
      }
      if(e.target.result)
        e.target.result.continue();
    };
  })
  
  // race condition where we call this before use.
  function addTask(task: string, value: number) {
    console.log(value);
    taskInput = '';
    const tx = db.transaction("taskLog", "readwrite");
    const store = tx.objectStore("taskLog");
    new Promise(resolve => {
      const newTask = { task, status: "pending", value };
      store.add(newTask).onsuccess = (e) => {
        tasks = [...tasks, {...newTask, ...{key: e.target.result}}];
        return resolve(e.target);
      };
    });
  }
  function deleteTask(i: number) {
    const tx = db.transaction("taskLog", "readwrite");
    const store = tx.objectStore("taskLog");

    store.delete(i);
    tx.oncomplete = (e) => {
      $: tasks = tasks.filter(item => item.key != i);
    };

    tx.commit();
  }
  function completeTask(i: number) {
    // add the task to the db as completed.
    const tx = db.transaction("taskLog", "readwrite");
    const store = tx.objectStore("taskLog");
    const newTask = { ...tasks.find(item => item.key == i), status: "completed", };
    store.put(newTask, i)
    
    tx.oncomplete = (e) => {
      // get rid of the task.
      tasks = tasks.filter(item => item.key != i);
    }
    points += newTask.value;

    tx.commit();
  }
  function failTask(i: number) {
    // add the task to the db as completed.
    const tx = db.transaction("taskLog", "readwrite");
    const store = tx.objectStore("taskLog");
    const newTask = { ...tasks.find(item => item.key == i), status: "failed", };
    store.put(newTask, i);

    points -= 2 * newTask.value;
    
    tx.oncomplete = (e) => {
     tasks = tasks.filter(item => item.key != i);
    };

    tx.commit();
  }
</script>

<p> points: {points} </p>

<section id="todo-list">
  <ul id="tasks">
    {#each tasks as task}
      <li> 
        <p> {task.task} </p>
        <button on:click = { () => deleteTask(task.key) }> Delete </button>
        <button on:click = { () => completeTask(task.key) }> Complete </button>
        <button on:click = { () => failTask(task.key) }> Fail </button>
      </li>
    {/each}
  </ul>
</section>

<select bind:value={difficulty} name="difficulty">
  <option value=4> Hard </option>
  <option value=2> Medium </option>
  <option value=1> Easy </option>
</select>

<input 
  type="text" 
  id="task-input" 
  placeholder="Add a task..." 
  bind:value={taskInput}
  on:keydown={(e) => {
    if (e.keyCode === 13 && taskInput) addTask(taskInput, parseInt(difficulty));
  }}
>
<button 
  id="add-btn" 
  on:click={() => addTask(taskInput, parseInt(difficulty))}
>Add</button>


<style>
  li > p {
    flex-grow: 1;
  }
</style>
