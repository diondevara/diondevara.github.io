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
      axios.get(host + 'api/MasterIndikator/').then(res => {
        console.log(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'hidden', title: 'id', width: '10px' },
            { type: 'text', title: 'id_aspek', width: '120px' },
            { type: 'text', title: 'id_pembilang', width: '120px' },
            { type: 'text', title: 'id_penyebut', width: '120px' },
            { type: 'text', title: 'nama', width: '120px' },
            { type: 'text', title: 'deskripsi', width: '120px' },
            { type: 'text', title: 'default_bobot', width: '120px' },
            { type: 'text', title: 'create_date', width: '120px' },
            { type: 'text', title: 'last_update', width: '120px' },
            { type: 'text', title: 'expired_date', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/MasterIndikator/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/MasterIndikator/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/MasterIndikator/' + index[0], {
          id: index[0],
          id_aspek: index[1],
          id_pembilang: index[2],
          id_penyebut: index[3],
          nama: index[4],
          deskripsi: index[5],
          default_bobot: index[6]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/MasterIndikator/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/MasterIndikator/' + index[0])
      })
    }
  }
}
</script>
