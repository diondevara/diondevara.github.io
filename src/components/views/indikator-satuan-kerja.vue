<template>
  <div>
    <div>
        <input type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
    </div>
    <div id="spreadsheet" ref="spreadsheet"></div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'
var host = 'http://localhost:8015/'
// var host = 'http://127.0.0.1:8009/'
export default {
  // name: 'App',
  data() {
    return {
      selected: '',
      dataIndikator: [],
      filterSatker: [],
      fkSatker: [],
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
      axios.get(host + 'api/SatuanKerja/nama').then(res => {
        console.log(res.data)
        this.fkSatker = Object.values(res.data)
      })
      axios.get(host + 'api/Indikator_SatuanKerja/').then(res => {
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
            { type: 'text', title: 'id_indikator_periode', width: '120px' },
            { type: 'text', title: 'id_satker', width: '120px' },
            { type: 'text', title: 'bobot', width: '120px' },
            { type: 'text', title: 'target_', width: '120px' },
            { type: 'text', title: 'capaian', width: '120px' },
            { type: 'text', title: 'last_update', width: '120px' },
            { type: 'text', title: 'id_master', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(document.getElementById('spreadsheet'), jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    onChange(event) {
      console.log(event.target_.value)
      document.getElementById('spreadsheet').innerHTML = ''
      axios.get(host + 'api/Indikator_SatuanKerja_selective/' + event.target_.value).then(res => {
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
            { type: 'text', title: 'id_indikator_periode', width: '120px' },
            { type: 'text', title: 'id_satker', width: '120px' },
            { type: 'text', title: 'bobot', width: '120px' },
            { type: 'text', title: 'target_', width: '120px' },
            { type: 'text', title: 'capaian', width: '120px' },
            { type: 'text', title: 'last_update', width: '120px' },
            { type: 'text', title: 'id_master', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(document.getElementById('spreadsheet'), jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    getsatker() {
      axios.get(host + 'api/Indikator_SatuanKerja/' + this.filterSatker).then(res => {
        console.log(res.data)
        this.dataIndikator = Object.values(res.data)
        var jexcelOptions = {
          data: res.data,
          allowToolbar: true,
          onchange: this.updateRow,
          oninsertrow: this.newRow,
          ondeleterow: this.deleteRow,
          responsive: true,
          columns: [
            { type: 'hidden', title: 'id', width: '10px' },
            { type: 'text', title: 'id_indikator_periode', width: '120px' },
            { type: 'text', title: 'id_satker', width: '120px' },
            { type: 'text', title: 'bobot', width: '120px' },
            { type: 'text', title: 'target_', width: '120px' },
            { type: 'text', title: 'capaian', width: '120px' },
            { type: 'text', title: 'last_update', width: '120px' },
            { type: 'text', title: 'id_master', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(document.getElementById('spreadsheet'), jexcelOptions)
        Object.assign(this, { spreadsheet })
      })
    },
    newRow() {
      axios.post(host + 'api/Indikator_SatuanKerja/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get(host + 'api/Indikator_SatuanKerja/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put(host + 'api/Indikator_SatuanKerja/' + index[0], {
          id: index[0],
          id_indikator_periode: index[1],
          id_satker: index[2],
          bobot: index[3],
          target_: index[4],
          capaian: index[5],
          id_master: index[7]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get(host + 'api/Indikator_SatuanKerja/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete(host + 'api/Indikator_SatuanKerja/' + index[0])
      })
    }
  }
}
</script>
