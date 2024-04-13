import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { usePermissions } from '../../context/PermissionsContext'
import {
  CBadge,
  CCard,
  CButton,
  CButtonGroup,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CFormSelect,
  CCallout,
  CPagination,
  CPaginationItem,
  CTableCaption,
  CPlaceholder,
  CCardText,
  CAlert,
  CPopover,
} from '@coreui/react'

const Clients = () => {
//   const { permissions } = usePermissions()
  const [submitClicked, setSubmitClicked] = useState(false)
  const [combinedData, setCombinedData] = useState([])
  const [lastTickets, setLastTickets] = useState([])
  const [modalData, setModalData] = useState(null)
  const [modalDataLogs, setModalDataLogs] = useState(null)
  const [visible, setVisible] = useState(false)
  const [visibleLogs, setVisibleLogs] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    egn: '',
    email: '',
    bsc: '',
    status: '',
  })

  const handleSubmit = () => {
    setSubmitClicked(true)
  }

  useEffect(() => {
    if (submitClicked) {
      setLastTickets([])
      const fetchData = async () => {
        // If the search query is empty, clear the results
        if (
          searchQuery.firstName === '' &&
          searchQuery.secondName === '' &&
          searchQuery.lastName === '' &&
          searchQuery.egn === '' &&
          searchQuery.email === '' &&
          searchQuery.bsc === '' &&
          searchQuery.status === ''
        ) {
          setCombinedData([])
          toast.error('Моля, въведете критерии за търсене!')
          return
        }

        setIsLoading(true)

        try {
          // Make the first API call
          const firstApiResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchQuery),
          }).then((response) => response.json())
          if (firstApiResponse) {
            // Extract relevant data from the first API response
            const macAddressFromFirstApi = firstApiResponse.map((item) => item.mac_address)
            // const contractFromFirstApi = firstApiResponse.map((item) => item.contract_number)

            // Use Promise.all to make multiple API calls with mapped params
            const secondApiPromises = macAddressFromFirstApi.map((mac) =>
            // TEST FETCH
            
              fetch(
                `${process.env.REACT_APP_LOOKUP_API_URL}/getData.php?key=${process.env.REACT_APP_NCS_API_KEY}&mac=${mac}`,
              ).then((response) => response.json()),
            )
            if (secondApiPromises) {
              // Wait for all API calls to complete
              const secondApiResponses = await Promise.all(secondApiPromises)
              // Combine data from both API calls
              const combinedData = firstApiResponse.map((item, index) => ({
                firstApiResponse: item,
                secondApiResponse: secondApiResponses[index],
                // thirdApiResponse: thirdApiResponses[index],
              }))
              console.log(combinedData)
              // Update the state with the combined results
              setCombinedData(combinedData)
              setCurrentPage(1)
              setIsLoading(false)
              toast.success('Данните са заредени успешно!')
            } else {
              toast.error('Няма връзка с базата данни!')
            }
          }
        } catch (error) {
          // console.error('Error:', error)
          setIsLoading(false)
          toast.error('Няма връзка с базата данни!')
        }
      }

      fetchData()
      setSubmitClicked(false)
    }
  }, [searchQuery, submitClicked])
  
  const getStatus = (status) => {
    switch (status) {
      case 'Active':
        return 'success'
      case '0':
        return 'success'
      case 'Expired':
        return 'danger'
      case '1':
        return 'danger'
      case null:
        return 'danger'
      default:
        return 'warning'
    }
  }

  const rowIsMarked = (mac, contract) => {
    if (mac == searchQuery.mac || contract == searchQuery.contract) {
        return 'warning'
    } else {
      return 'default'
    }
  }

  const getBadgeCurStatus = (curStatus) => {
    switch (curStatus) {
      case 'ОТВОРЕН':
        return 'success'
      case 'ЧАКА ЗА ДАТА':
        return 'primary'
      case 'В ИЗПЪЛНЕНИЕ':
        return 'secondary'
      case 'В ПРОЦЕС':
        return 'warning'
      case 'ИЗПЪЛНЕН':
        return 'info'
      case 'ЗАТВОРЕН':
        return 'danger'
      case 'ОТКАЗАН':
        return 'danger'
      default:
        return 'light'
    }
  }

  const getBadgeRxPower = (rxPower) => {
    switch (rxPower) {
      case null:
        return 'danger'
      case -27:
        return 'warning'
      case -28:
        return 'warning'
      case -29:
        return 'danger'
      case -30:
        return 'danger'
      case -31:
        return 'danger'
      case -32:
        return 'danger'
      case -33:
        return 'danger'
      case -34:
        return 'danger'
      case -35:
        return 'danger'
      case -40:
        return 'danger'
      default:
        return 'success'
    }
  }

  const getBadgeServiceName = (serviceName) => {
    switch (serviceName) {
      case 'Интернет - 15 mbps':
        return 'success'
      case 'Интернет - 20 mbps':
        return 'success'
      case 'Интернет - 25 mbps':
        return 'success'
      case 'Интернет - 30 mbps':
        return 'info'
      case 'Интернет - 50 mbps':
        return 'info'
      case 'Интернет - 75 mbps':
        return 'info'
      case 'Powernet - 75 mbps':
        return 'info'
      case 'Powernet - 50 mbps':
        return 'info'
      case 'Интернет - 100 mbps':
        return 'danger'
      case 'Интернет Бизнес - 50 mbps':
        return 'danger'
      case 'Интернет - 200 mbps':
        return 'danger'
      case 'Интернет b.Премиум':
        return 'danger'
      case 'Интернет b.Старт':
        return 'info'
      case 'Интернет b.Супер':
        return 'info'
      default:
        return 'warning'
    }
  }

  const getServiceName = (serviceName) => {
    switch (serviceName) {
      case 'Интернет - 15 mbps':
        return '15 mbps'
      case 'Интернет - 20 mbps':
        return '20 mbps'
      case 'Интернет - 25 mbps':
        return '25 mbps'
      case 'Интернет - 30 mbps':
        return '30 mbps'
      case 'Интернет - 50 mbps':
        return '50 mbps'
      case 'Интернет - 75 mbps':
        return '75 mbps'
      case 'Powernet - 75 mbps':
        return '75 mbps'
      case 'Powernet - 50 mbps':
        return '50 mbps'
      case 'Интернет - 100 mbps':
        return '100 mbps'
      case 'Интернет - 200 mbps':
        return '200 mbps'
      case 'Интернет b.Премиум':
        return 'b.Премиум (100mbps)'
      case 'Интернет b.Старт':
        return 'b.Старт (30mbps)'
      case 'Интернет b.Супер':
        return 'b.Супер (75mbps)'
      default:
        return 'N/A'
    }
  }
//   return permissions.some((i) => i.role_name.includes('inet')) ? (
  return true ? (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4 border-top-danger border-top-3">
            <CCardHeader>
              <strong>Търсене</strong> <small>на служители</small>
            </CCardHeader>
            <CCardBody>
              <CForm className="row gx-3 gy-2 align-items-center">
                <CRow className="g-2">
                  <CCol sm={2}>
                    <CFormLabel className="visually-hidden" htmlFor="firstName">
                      Име
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      name="firstName"
                      value={searchQuery.firstName}
                      onChange={(e) =>
                        setSearchQuery((prevData) => ({
                          ...prevData,
                          firstName: e.target.value.trim().toUpperCase(),
                        }))
                      }
                      id="firstName"
                      placeholder="Име"
                    />
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel className="visually-hidden" htmlFor="secondName">
                      Презиме
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        type="text"
                        name="secondName"
                        value={searchQuery.secondName}
                        onChange={(e) =>
                          setSearchQuery((prevData) => ({
                            ...prevData,
                            secondName: e.target.value.trim().toUpperCase(),
                          }))
                        }
                        id="secondName"
                        placeholder="Презиме"
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel className="visually-hidden" htmlFor="lastName">
                      Фамилия
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        type="text"
                        name="lastName"
                        value={searchQuery.lastName}
                        onChange={(e) =>
                          setSearchQuery((prevData) => ({
                            ...prevData,
                            lastName: e.target.value.trim().toUpperCase(),
                          }))
                        }
                        id="lastName"
                        placeholder="Фамилия"
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel className="visually-hidden" htmlFor="egn">
                      ЕГН
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        id="egn"
                        placeholder="ЕГН"
                        type="text"
                        name="egn"
                        value={searchQuery.egn}
                        onChange={(e) =>
                          setSearchQuery((prevData) => ({
                            ...prevData,
                            egn: e.target.value.trim().toUpperCase(),
                          }))
                        }
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel className="visually-hidden" htmlFor="email">
                      Имейл
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        id="email"
                        placeholder="Имейл"
                        type="text"
                        name="email"
                        value={searchQuery.email}
                        onChange={(e) =>
                          setSearchQuery((prevData) => ({
                            ...prevData,
                            email: e.target.value.trim().toUpperCase(),
                          }))
                        }
                      />
                    </CInputGroup>
                  </CCol>
                  <CCol sm={2}>
                    <CFormLabel className="visually-hidden" htmlFor="bsc">
                      Работен номер
                    </CFormLabel>
                    <CInputGroup>
                      <CFormInput
                        id="bsc"
                        placeholder="Работен номер"
                        type="text"
                        name="bsc"
                        value={searchQuery.bsc}
                        onChange={(e) =>
                          setSearchQuery((prevData) => ({
                            ...prevData,
                            bsc: e.target.value.trim(),
                          }))
                        }
                      />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="g-2">
                  <CCol sm={2}>
                    <CFormSelect
                      name="status"
                      onChange={(e) =>
                        setSearchQuery((prevData) => ({
                          ...prevData,
                          status: e.target.value,
                        }))
                      }
                    >
                      <option value="">Изберете статус (всички)</option>
                      <option value="Active">Активни</option>
                      <option value="Expired">Неактивни</option>
                    </CFormSelect>
                    {/* <CFormCheck
                      button={{ color: 'success', variant: 'ghost' }}
                      type="radio"
                      name="options-outlined"
                      id="success-outlined"
                      autoComplete="off"
                      label="Платен"
                      value="Active"
                      onChange={onChangeStatus}
                    />
                    <CFormCheck
                      button={{ color: 'danger', variant: 'ghost' }}
                      type="radio"
                      name="options-outlined"
                      id="danger-outlined"
                      autoComplete="off"
                      label="Неплатен"
                      value="Expired"
                      onChange={onChangeStatus}
                    />
                    <CFormCheck
                      button={{ color: 'primary', variant: 'ghost' }}
                      type="radio"
                      name="options-outlined"
                      id="primary-outlined"
                      autoComplete="off"
                      label="Всички"
                      value=""
                      onChange={onChangeStatus}
                      defaultChecked
                    /> */}
                  </CCol>
                </CRow>
              </CForm>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="danger" className="me-md-2" type="submit" onClick={handleSubmit}>
                  Търси
                </CButton>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="mb-4 border-top-danger border-top-3">
            <CCardBody>
              {isLoading ? (
                <CCard style={{ width: '100%' }}>
                  <CButton color="dark" disabled>
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Зареждане на данните...
                  </CButton>
                  <CCardBody>
                    <CPlaceholder component={CCardText} animation="glow">
                      <CPlaceholder xs={11} />
                      <CPlaceholder xs={10} />
                      <CPlaceholder xs={9} />
                      <CPlaceholder xs={8} />
                    </CPlaceholder>
                  </CCardBody>
                </CCard>
              ) : (
                <CTable bordered hover align="middle" responsive>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell colSpan={12}>
                        <CBadge color="danger">Резултати: {combinedData.length}</CBadge>
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Име
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        BSC
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Имейл
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Информация
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Статус
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Процес (права)
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Системи
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Редактиране
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Процес
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" style={{ textAlign: 'center' }}>
                        Логове
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {combinedData?.map((item, index) => (
                      <>
                      {item.firstApiResponse.contract_number === searchQuery.contract ?
                        (<CTableRow color="warning">
                          <CTableHeaderCell colSpan={11} style={{ textAlign: 'center' }}>
                            Търсеният от Вас клиент:
                          </CTableHeaderCell>
                        </CTableRow>) : null}
                        <CTableRow key={index} color={rowIsMarked(item.firstApiResponse.mac_address, item.firstApiResponse.contract_number)}>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            {item.firstApiResponse.contract_number}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CTableRow>
                              {item.firstApiResponse.city != null && 'гр.'}
                              {item.firstApiResponse.city}
                              {item.firstApiResponse.neighborhood != null && ' кв.'}
                              {item.firstApiResponse.neighborhood}
                              {item.firstApiResponse.street != null && ' ул.'}
                              {item.firstApiResponse.street}
                              {item.firstApiResponse.street_number != null && ' ном.'}
                              {item.firstApiResponse.street_number}
                              {item.firstApiResponse.entrance != null && ' вх.'}
                              {item.firstApiResponse.entrance}
                              {item.firstApiResponse.floor != null && ' ет.'}
                              {item.firstApiResponse.floor}
                              {item.firstApiResponse.apartment_number != null && ' ап.'}
                              {item.firstApiResponse.apartment_number}
                            </CTableRow>
                            <CTableRow>
                              {/* <i>тикет: </i> {item.thirdApiResponse[0].address} */}
                            </CTableRow>
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            <CBadge color={getBadgeServiceName(item.firstApiResponse.service_name)}>
                              {getServiceName(item.firstApiResponse.service_name)}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            <CBadge color={getStatus(item.firstApiResponse.contract_status)}>
                              {item.firstApiResponse.paid_until}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            {item.firstApiResponse.mac_address}
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            {item.firstApiResponse.vlan_id}
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            {/* {item.secondApiResponse.currentNas.replace(/&nbsp/g, '/')} */}
                            {item.secondApiResponse.currentNas}
                          </CTableDataCell>
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            {item.secondApiResponse.ip}
                          </CTableDataCell>
                          {item.secondApiResponse.ontSN ? (
                            <CTableDataCell style={{ textAlign: 'center' }}>
                              <CTableRow>
                                <i>sn: </i>
                                {item.secondApiResponse.ontSN}
                              </CTableRow>
                              {/* <CTableRow>Model: {item.secondApiResponse.onuModel}</CTableRow> */}
                              <CTableRow>
                                <i>mac:</i>
                                {item.secondApiResponse.ontMAC}
                              </CTableRow>
                              <CTableRow>
                                <i>olt: </i>
                                {item.secondApiResponse.ponOLT}
                              </CTableRow>
                              <CTableRow>
                                <i>interface: </i>
                                {item.secondApiResponse.interface}
                              </CTableRow>
                              <CTableRow>
                                <i>distance: </i>
                                {item.secondApiResponse.distance} метра
                              </CTableRow>
                              <CTableRow>
                                <CBadge color={getBadgeRxPower(item.secondApiResponse.RxPower)}>
                                  <i>RxPower: </i>
                                  {item.secondApiResponse.RxPower}
                                </CBadge>
                              </CTableRow>
                            </CTableDataCell>
                          ) : (
                            <CTableDataCell></CTableDataCell>
                          )}
                          <CTableDataCell style={{ textAlign: 'center' }}>
                            {item.secondApiResponse.lastActive}
                          </CTableDataCell>
                          <CTableDataCell>
                            <CButtonGroup role="group" aria-label="Basic example">
                              <CButton
                                onClick={() => {
                                  setVisible(!visible)
                                  setModalData(item.secondApiResponse.ping)
                                }}
                                color="success"
                                size="sm"
                                variant="outline"
                              >
                                PING
                              </CButton>
                              <CButton
                                onClick={() => {
                                  setVisibleLogs(!visible)
                                  setModalDataLogs(item.secondApiResponse.logs)
                                }}
                                color="info"
                                size="sm"
                                variant="outline"
                                // shape="rounded-pill"
                              >
                                LOGS
                              </CButton>
                              <CButton
                                type="submit"
                                // onClick={handleViewTickets}
                                onClick={() =>
                                  handleViewTickets(item.firstApiResponse.abonat_id, index)
                                }
                                color="success"
                                size="sm"
                                variant="outline"
                              >
                                Tickets
                              </CButton>
                            </CButtonGroup>
                          </CTableDataCell>
                        </CTableRow>
                        {isLoadingTickets ? (
                          <CTableHeaderCell colSpan={11}>
                            <CCard style={{ width: '100%' }}>
                              <CButton color="dark" disabled>
                                <CSpinner component="span" size="sm" aria-hidden="true" />
                                Зареждане на последни пет тикета...
                              </CButton>
                              <CCardBody>
                                <CPlaceholder component={CCardText} animation="glow">
                                  <CPlaceholder xs={10} />
                                </CPlaceholder>
                              </CCardBody>
                            </CCard>
                          </CTableHeaderCell>
                        ) : (
                          rowIndex === index && (
                            <>
                              <CTableRow color="warning">
                                <CTableHeaderCell colSpan={11} style={{ textAlign: 'center' }}>
                                  последни 5 (пет) тикета
                                </CTableHeaderCell>
                              </CTableRow>
                              {lastTickets.length > 0 ? (
                                <CTableRow>
                                  <CTableDataCell colSpan={11}>
                                    {lastTickets?.map((ticket, tindex) => (
                                      <CTableDataCell key={tindex}>
                                        <CCallout color="danger">
                                          {/* <i>Номер на тикет: </i> */}
                                          <a
                                            href={`https://ts.bulsat.com/m/tts/view_ticket.php?id=${ticket.ticket}`}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            {ticket.ticket}
                                          </a>
                                          {' - '}
                                          <CBadge color={getBadgeCurStatus(ticket.current_status)}>
                                            {ticket.current_status}
                                          </CBadge>
                                        </CCallout>
                                        <CCallout color="primary">
                                          {/* <i>проблем: </i> */}
                                          {ticket.trouble_type}
                                        </CCallout>
                                        {/* <CCallout>
                                          <i>текущ статус: </i>
                                          <CBadge color={getBadgeCurStatus(ticket.current_status)}>
                                            {ticket.current_status}
                                          </CBadge>
                                        </CCallout> */}
                                        <CCallout color="warning">
                                          {/* <i>адрес: </i>  */}
                                          {ticket.city} {ticket.address}
                                        </CCallout>
                                      </CTableDataCell>
                                    ))}
                                  </CTableDataCell>
                                </CTableRow>
                              ) : (
                                <CTableRow>
                                  <CTableHeaderCell colSpan={11} style={{ textAlign: 'center' }}>
                                    няма намерени тикети
                                  </CTableHeaderCell>
                                </CTableRow>
                              )}
                            </>
                          )
                        )}
                      </>
                    ))}
                    <CModal
                      size="xl"
                      alignment="center"
                      visible={visible}
                      onClose={() => setVisible(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample">PING</CModalTitle>
                      </CModalHeader>
                      <CModalBody dangerouslySetInnerHTML={{ __html: modalData }}></CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                          Затвори
                        </CButton>
                      </CModalFooter>
                    </CModal>
                    <CModal
                      size="xl"
                      alignment="center"
                      visible={visibleLogs}
                      onClose={() => setVisibleLogs(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample">LOGS</CModalTitle>
                      </CModalHeader>
                      <CModalBody dangerouslySetInnerHTML={{ __html: modalDataLogs }}></CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleLogs(false)}>
                          Затвори
                        </CButton>
                      </CModalFooter>
                    </CModal>
                  </CTableBody>
                </CTable>
              )}
              {/* Pagination controls */}
              {/* <CPagination align="center">
                <CPaginationItem
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Назад
                </CPaginationItem>
                <CPaginationItem>
                  страница {currentPage} от {totalPages}
                </CPaginationItem>
                <CPaginationItem
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Напред
                </CPaginationItem>
              </CPagination> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </>
  ) : (
    <CAlert color="danger" dismissible>
      Нямате права за достъп до тази страница!
    </CAlert>
  )
}

export default Clients
