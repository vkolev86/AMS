import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilGroup,
  cilColumns,
  cilControl,
  cilCompass,
  cilPaperPlane,
  cilContact,
  cilSettings,
  cilReload,
  cilHome,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Начало',
    to: '/home',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'danger',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Служители',
    to: '/employees',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Конфигурация',
  },
  {
    component: CNavItem,
    name: 'Групи',
    to: '/groups',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Системи',
    to: '/systems',
    icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Роли (системи)',
    to: '/roles',
    icon: <CIcon icon={cilControl} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Системи в групи',
    to: '/sys_to_groups',
    icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Статус (процес)',
    to: '/proccess_statuses',
    icon: <CIcon icon={cilCompass} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Статус (служ.)',
    to: '/proccess_employee',
    icon: <CIcon icon={cilCompass} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Администрация',
  },
  {
    component: CNavItem,
    name: 'Потребители',
    to: '/users',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Изпр. имейли',
    to: '/send_emails',
    icon: <CIcon icon={cilPaperPlane} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Права',
    to: '/permissions',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Роли',
    to: '/permissions_roles',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Права в роли',
    to: '/permissions_in_roles',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Сис. конфиг.',
    to: '/sys_config',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ъпдейт от Guru',
    to: '/guru_update',
    icon: <CIcon icon={cilReload} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Логове - права',
    to: '/logs',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Профил',
  },
  {
    component: CNavItem,
    name: 'Профил',
    to: '/profile',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: 'Помощ',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Ръководство',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
