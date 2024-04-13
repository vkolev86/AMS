import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://www.bulsatcom.bg" target="_blank" rel="noopener noreferrer">
          Bulsatcom.bg
        </a>
        <span className="ms-1">&copy; {new Date().getFullYear()}</span>
      </div>
      {/* <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.bulsatcom.bg" target="_blank" rel="noopener noreferrer">
          Bulsatcom Development Team
        </a>
      </div> */}
    </CFooter>
  )
}

export default React.memo(AppFooter)
