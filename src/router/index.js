import { createRouter, createWebHashHistory } from 'vue-router'
import { publicPath } from '../../vue.config';

const routes = [
  {
    path: '/',
    name: 'loginHome',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/user/LoginView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/UsuarioView.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/ListUsersView.vue'),
  },
  {
    path: '/editUser/:id',
    name: 'editUser',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/EditUsuarioView.vue'),
  },
  {
    path: '/mycad',
    name: 'cadastro',
    component: () => import(/* webpackChunkName: "home" */ '../views/user/MyCadastroView.vue'), 
  },
  {
    path: '/projeto',
    name: 'projeto',
    component: () => import( '../views/projeto/ProjetoView.vue'),
  },
  {
    path: '/projetos',
    name: 'projetos',
    component: () => import('../views/projeto/ListProjetoView.vue'),
  },
  {
    path: '/editProjeto/:id',
    name: 'editProjeto',
    component: () => import( '../views/projeto/EditProjetoView.vue'),
  },
  {
    path: '/cronograma/:proj',
    name: 'cronograma',
    component: () => import( '../views/projeto/CronogramaView.vue'),
  },
  {
    path: '/atividade',
    name: 'atividade',
    component: () => import('../views/educacao/EducacaoView.vue'),
  },
  {
    path: '/atividades',
    name: 'atividades',
    component: () => import('../views/educacao/ListEducacaoView.vue'),
  },
  {
    path: '/editAtividade/:id',
    name: 'editAtividade',
    component: () => import( '../views/educacao/EditEducacaoView.vue'),
  },
  {
    path: '/educacao_det/:educ',
    name: 'educacao_det',
    component: () => import('../views/educacao/DetalhesView.vue'),
  },
  {
    path: '/verAtividade/:id',
    name: 'verAtividade',
    component: () => import( '../views/educacao/VerEducacaoView.vue'),
  },
  {
    path: '/reports/:id',
    name: 'reports',
    component: () => import( '../views/report/MainReportView.vue'),
  },
  {
    path: '/report/:id',
    name: 'report',
    component: () => import( '../views/report/ReportView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component:  () => import(/* webpackChunkName: "about" */ '../views/general/HomeView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  base: publicPath
})

export default router


