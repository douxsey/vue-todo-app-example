<template>
  <div class="center-block row col-sm-12" >
    <div class="col-sm-6">
      <h2>Liste de nos taches</h2> 
      <div class="col-sm-6">
        <h4>Filtrez</h4>
        <div class="col-sm-12">
          <div class="form-group">
          <label for="">Fait: </label> 
            <select v-model="statut" class="form-control" name="" id="">
              <option value="all">Tout</option>
              <option value="yes">Fait</option>
              <option value="no">Pas fait</option>
            </select>
          </div>
        </div>
      </div>
      <table class="table" >
        <thead>
          <tr>
            <th>Tache à faire</th>
            <th>Fait</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(todo, index) in filteredTodos"  >
            <td>{{todo.title}}</td> 
            <td>{{todo.done ? 'Oui' : 'Non'}}</td> 
            <td>
              <button v-if="!todo.done" @click="accomplishTask(todo)"  class="btn btn-success" >Accomplir</button>
            </td> 
            
          </tr>
        </tbody>
      </table>
    </div>

    <div class="col-sm-6 mt-5">
      <h4>Résumé</h4>
      <div class="col-sm-12">
        <div>
          <label for="">Total taches</label> : {{todos.length}}
        </div>
        <div>
          <label for="">Total taches Faites</label>: {{longueurTabDone}}
        </div>
        <div>
          <label for="">Total taches non Faites</label>: {{longueurTabnotDone}}
        </div>
        <div>
          <label for="">Résultats filtre:</label>: {{filteredTodos.length}}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import todoService from '../services/todos'
export default {
  name: 'TodoList',
  data: () => {
    return {
      todos: [],
      statut: 'all',
    }
  },
  computed: {
    filteredTodos: function () {
      let {todos, statut} = this;
      return todos.filter(todo => {
        return statut == 'all' || (statut == 'yes' && todo.done ) || (statut == 'no' && !todo.done )
      })
    },
    longueurTabDone : function (){
      let {todos , statut } = this ;

      let todos2 = todos.filter(todo => {
        return todo.done
      })
      return todos2.length
    },
    longueurTabnotDone : function (){
      let {todos , statut } = this ;

      let todos2 = todos.filter(todo => {
        return(todo.done ==false)
      })
      return todos2.length
    },
    
  },
  methods: {
    accomplishTask: function (todo) {
      todo.done = true;
    }
  },
  created: function () {
    todoService.getTodos()
      .then(todos => {
        this.todos = todos
      })
  }
}
</script>

<style>

</style>
