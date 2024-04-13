import React from 'react'
import { useState } from 'react'
import { CAlert } from '@coreui/react'
// import { usePermissions } from '../../context/PermissionsContext'
import CIcon from '@coreui/icons-react'
import { cilCommentBubble } from '@coreui/icons'

const Home = () => {
  const [visible, setVisible] = useState(true)
//   const user = JSON.parse(localStorage.getItem('user'))
//   const { permissions } = usePermissions()

//   return permissions.some((i) => i.role_name.includes('user')) ? (
//     <CAlert color="success" dismissible visible={visible} onClose={() => setVisible(false)}>
//       <CIcon icon={cilCommentBubble} className="flex-shrink-0 me-2" width={24} height={24} />
//       Здравей!
//     </CAlert>
//   ) : (
//     <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
//       Нямате права за достъп до тази страница!
//     </CAlert>
//   )

return <CAlert color="success" dismissible visible={visible} onClose={() => setVisible(false)}>
      <CIcon icon={cilCommentBubble} className="flex-shrink-0 me-2" width={24} height={24} />
      Здравей!
    </CAlert>
}

export default Home
