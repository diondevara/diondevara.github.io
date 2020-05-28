<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div>
        <input type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'
// var host = 'http://localhost:8015/'
var host = 'http://localhost:8015/'
export default {
  // name: 'App',
  data() {
    return {
      dataDasar: [],
      form: {
        nama: 'New Data'
      }
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/Capaian_Unit/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'text', title: 'id_satker', width: '120px' },
            { type: 'text', title: 'id_datadasar', width: '120px' },
            { type: 'text', title: 'waktu', width: '120px' },
            { type: 'text', title: 'capaian', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/Capaian_Unit/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/Capaian_Unit/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/Capaian_Unit/' + index[0], {
          id_satker: index[0],
          id_datadasar: index[1],
          capaian: index[3]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/Capaian_Unit/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/Capaian_Unit/' + index[0])
      })
    }
  }
}
</script>
