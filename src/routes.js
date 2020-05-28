import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import AspekView from './components/views/Aspek.vue'
import capaianUnitView from './components/views/capaian-unit.vue'
import dataDasarView from './components/views/datadasar.vue'
import jenisSatkerView from './components/views/jenis-satker.vue'
import periodeView from './components/views/periode.vue'
import indikatorPeriodeView from './components/views/indikator-periode.vue'
import masterIndikatorView from './components/views/master-indikator.vue'
import satuanKerjaView from './components/views/satuan-kerja.vue'
import indikatorSatuanKerjaView from './components/views/indikator-satuan-kerja.vue'
import indikatorSatuanKerjaLogView from './components/views/indikator-satuan-kerja-log.vue'
import abmasView from './components/views/abmas.vue'
import dosenView from './components/views/dosen.vue'
import penelitianView from './components/views/penelitian.vue'
import publikasiView from './components/views/publikasi.vue'
import konkinView from './components/views/konkin.vue'

// Routes
const routes = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/user',
    component: DashView,
    children: [
      {
        path: 'Aspek',
        alias: '',
        component: AspekView,
        name: 'Aspek',
        meta: {description: 'Aspek'}
      }, {
        path: 'konkin',
        alias: '',
        component: konkinView,
        name: 'konkin',
        meta: {description: 'konkin'}
      }, {
        path: 'abmas',
        alias: '',
        component: abmasView,
        name: 'abmas',
        meta: {description: 'abmas'}
      }, {
        path: 'dosen',
        alias: '',
        component: dosenView,
        name: 'dosen',
        meta: {description: 'dosen'}
      }, {
        path: 'publikasi',
        alias: '',
        component: publikasiView,
        name: 'publikasi',
        meta: {description: 'publikasi'}
      }, {
        path: 'penelitian',
        alias: '',
        component: penelitianView,
        name: 'penelitian',
        meta: {description: 'penelitian'}
      }, {
        path: 'periode',
        component: periodeView,
        name: 'periode',
        meta: {description: 'periode'}
      }, {
        path: 'satuan-kerja',
        component: satuanKerjaView,
        name: 'satuan-kerja',
        meta: {description: 'satuan-kerja'}
      }, {
        path: 'indikator-satuan-kerja',
        component: indikatorSatuanKerjaView,
        name: 'indikator-satuan-kerja',
        meta: {description: 'indikator-satuan-kerja'}
      }, {
        path: 'indikator-satuan-kerja-log',
        component: indikatorSatuanKerjaLogView,
        name: 'indikator-satuan-kerja-log',
        meta: {description: 'indikator-satuan-kerja-log'}
      }, {
        path: 'indikator-periode',
        component: indikatorPeriodeView,
        name: 'indikator-periode',
        meta: {description: 'indikator periode'}
      }, {
        path: 'master-indikator',
        component: masterIndikatorView,
        name: 'master-indikator',
        meta: {description: 'master-indikator'}
      }, {
        path: 'capaian-unit',
        component: capaianUnitView,
        name: 'capaian-unit',
        meta: {description: 'capaian-unit'}
      }, {
        path: 'jenis-satker',
        component: jenisSatkerView,
        name: 'jenis-satker',
        meta: {description: 'jenis-satker'}
      }, {
        path: 'data-dasar',
        component: dataDasarView,
        name: 'data-dasar',
        meta: {description: 'data-dasar unit'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
