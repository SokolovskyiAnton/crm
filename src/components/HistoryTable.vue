<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{'Sum' | localize}}</th>
      <th>{{'Date' | localize}}</th>
      <th>{{'Category' | localize}}</th>
      <th>{{'Type' | localize}}</th>
      <th>{{'Open' | localize}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id" draggable>
      <td>{{idx + 1}}</td>
      <td>{{record.amount | currency}}</td>
      <td>{{record.date | date}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span class="white-text badge" :class="record.typeClass">{{record.typeText}}</span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push('/detail/' + record.id)"> <!--страница с динамическим id параметром-->
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: ['records']
  }
</script>

<style scoped>
</style>