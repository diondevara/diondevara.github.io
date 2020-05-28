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
      axios.get(host + 'api/SatuanKerja/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'text', title: 'id', width: '120px' },
            { type: 'text', title: 'id_ins_satker', width: '120px' },
            { type: 'text', title: 'id_induk_satker', width: '120px' },
            { type: 'text', title: 'nama', width: '120px' },
            { type: 'text', title: 'email', width: '120px' },
            { type: 'text', title: 'create_date', width: '120px' },
            { type: 'text', title: 'last_update', width: '120px' },
            { type: 'text', title: 'expired_date', width: '120px' },
            { type: 'text', title: 'level_unit', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/SatuanKerja/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/SatuanKerja/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/SatuanKerja/' + index[0], {
          id: index[0],
          id_ins_satker: index[1],
          id_induk_satker: index[2],
          nama: index[3],
          email: index[4],
          level_unit: index[8]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/SatuanKerja/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/SatuanKerja/' + index[0])
      })
    }
  }
}
</script>
