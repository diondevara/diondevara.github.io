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
var host = 'http://localhost:8015/'
// var host = 'http://127.0.0.1:8015/'
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
      axios.get(host + 'api/Indikator_SatuanKerja_Log/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'text', title: 'id_periode', width: '120px' },
            { type: 'text', title: 'capaian', width: '120px' },
            { type: 'text', title: 'create_date', width: '120px' },
            { type: 'text', title: 'id_master', width: '120px' },
            { type: 'text', title: 'id_satker', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/Indikator_SatuanKerja_Log/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/Indikator_SatuanKerja_Log/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/Indikator_SatuanKerja_Log/' + index[0], {
          id_periode: index[0],
          capaian: index[1],
          id_master: index[3],
          id_satker: index[4]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/Indikator_SatuanKerja_Log/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/Indikator_SatuanKerja/' + index[0])
      })
    }
  }
}
</script>
