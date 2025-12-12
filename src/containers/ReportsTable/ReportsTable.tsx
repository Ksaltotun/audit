import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

import { Input } from '../../components/Input/Input'

import './ReportsTable.scss'
import { useEffect, useState } from 'react'

import { EventTagType, IReportMessage } from '../../type'
import { Divider, GetProp, Modal, Steps, Table, TableProps, Tag, Timeline } from 'antd'
import { SorterResult } from 'antd/es/table/interface'
import { reportsApi } from '../../service/ReportService'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Spinner } from '../../components/Spinner/Spinner'
import { setLoading } from '../../redux/reducers/ActionCreators'
import { eventType, systemNames } from '../../utils'


export const ReportsTable: React.FC<any> = (props) => {
    
    type ColumnsType<T extends object = object> = TableProps<T>['columns'];
    type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
    const { systemsFilter, dateFilter, eventFilter, idKISFilter, idUserFilter, messageFilter, applied } = useAppSelector((state) => state.filterIssuesReducer)
    const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)

    const navigate = useNavigate();
    const timeFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Minsk' }
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 6,
        },
    });
    useEffect(() => {
        if (error && 'status' in error) {
            switch (error.status) {
                case 401:
                    navigate('/401', { state: { error: error.data } });
                    break;
                case 403:
                    navigate('/403', { state: { error: error.data } });
                    break;
                case 404:
                    navigate('/404', { state: { error: error.data } });
                    break;
                case 500:
                    navigate('/500', { state: { error: error.data } });
                    break;
                default:
                    navigate('/error', { state: { error: error.data } });
            }
        }
    }, [error, navigate]);
    const [modal1Open, setModal1Open] = useState<any>(false);
    if (isLoading) return <Spinner />

    interface TableParams {
        pagination?: TablePaginationConfig;
        sortField?: SorterResult<any>['field'];
        sortOrder?: SorterResult<any>['order'];
    }
    type TSystemNames = "KIS" | "GSZ" | "ASU" | "BDN";

    const columns: ColumnsType<IReportMessage> = [
   
        {
            title: 'Дата (в системе)',
            dataIndex: 'dateApp',
            render: (date) => {

                return (new Date(date)).toLocaleString("ru", timeFormat)
            },
            sorter: (a, b) => {
                return (new Date(a.dateApp)).getTime() - (new Date(b.dateApp)).getTime()
            },
            defaultSortOrder: 'descend',
            width: '15%',
        },
        {
            title: 'Система',
            dataIndex: ['appInfo', 'appName'],
            sorter: (a, b) => (a.appInfo.appName >= b.appInfo.appName ? 1 : -1),
            render: (name: TSystemNames) => {
                return systemNames[name]
            },
            width: '15%',
        },
        {
            title: 'Тип события',
            dataIndex: 'event',
            sorter: false,
            render: (_, { event }) => {
                return <>
                    <Tag color={'red'} >
                        {eventType[event].toUpperCase()}
                    </Tag>
                </>
            },
            width: '15%',
        },
        {
            title: 'Сообщение',
            dataIndex: 'message',
            sorter: false,
        },
    ];

    const handleTableChange: TableProps<IReportMessage>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
    };
   
    return <div className='ReportsTable' >
        <Modal
            title={modal1Open?.appInfo?.appName}
            centered
            open={Boolean(modal1Open)}
            onOk={() => {
                setModal1Open(false)
            }}
            onCancel={() => {
                setModal1Open(false)
            }}
            okText="Ок"
            footer={(_, { OkBtn }) => (
                <>
                    <OkBtn />
                </>
            )}
        >
            <div className='reportDetail'>
                <dl>
                    <dt>Дата в системе</dt>
                    <dd>{(new Date(modal1Open.dateApp)).toLocaleString("ru", timeFormat)}</dd>
                    <dt>Дата в Аудите систем</dt>
                    <dd>{(new Date(modal1Open.dateKIS)).toLocaleString("ru", timeFormat)}</dd>
                    <dt>Id в системе</dt>
                    <dd>{modal1Open.idEvent}</dd>
                    <dt>Id в Аудите систем</dt>
                    <dd>{modal1Open.id}</dd>
                    <dt>Тип события</dt>
                    <dd>{eventType[modal1Open.event as EventTagType]}</dd>
                    {modal1Open.user?.name ? <>
                      <dt>Данные о пользователе</dt>
                    <dd>
                        <dl>
                            <dt>Имя пользователя</dt>
                            <dd>{modal1Open.user?.userName}</dd>
                            {
                                modal1Open.user?.userRole && 
                                    <> <dt>Роль пользователя</dt>
                                    <dd>{modal1Open.user?.userRole}</dd></>
                            }
                        </dl>
                    </dd>      
                    </> : null}
                    <dt>Сообщение от системы</dt>
                    <dd>{modal1Open.message}</dd>
                    {
                        modal1Open.event === 'userAction' ?
                            <> <dt>Пользователь</dt>
                                <dd>{modal1Open.user.userName}</dd>
                                <dd>{modal1Open.user.userID}</dd></>
                            : null
                    }
                </dl>
                <Divider />
                <h3>Детали и подсистемы</h3>
                <div className='systemTree'>
                    <Steps
                        progressDot
                        current={(modal1Open.appInfo?.systemDetail || '').split(".").length}
                        direction="vertical"

                        items={[...
                            (modal1Open.appInfo?.systemDetail || '').split(".").map((item: string) => {
                                return { 'title': item }
                            })
                        ]}
                    />

                </div>
            </div>


        </Modal>
        <Table<IReportMessage>
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => {
                        setModal1Open(record)
                    },
                };
            }}
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={
                applied ?
                    reports?.
                        filter((report) => {
                            if (systemsFilter.length) {
                                console.log(report.appInfo.systemDetail)
                                console.dir(systemsFilter)
                                const searchRow = systemsFilter.join('.')
                                return report.appInfo.systemDetail.indexOf(systemsFilter[0] === 'KIS' ? 'КИС' : systemsFilter[0] ) > -1
                            }
                            return true
                        })
                        .filter((report) => {
                            if (dateFilter.startDate || dateFilter.endDate) {
                                const start = (new Date(dateFilter.startDate || '1988-03-28')).getTime()
                                const end = (new Date(dateFilter.endDate || '2999-03-01')).getTime()
                                const date = (new Date(report.dateApp)).getTime()
                                return (start <= date && date <= end)
                            }
                            return true
                        })
                        .filter((report) => {
                            if (eventFilter.length) {

                                return eventFilter.indexOf(report.event) > -1
                            }
                            return true
                        })
                        .filter((report) => {
                            if (idKISFilter.length) {

                                return idKISFilter.indexOf(report.id) > -1
                            }
                            return true
                        })
                        .filter((report) => {
                            if (idUserFilter.length) {

                                return idUserFilter.indexOf((report.user.userId).toString()) > -1
                            }
                            return true
                        })
                        .filter((report) => {
                            if (messageFilter) {

                                return report.message.indexOf(messageFilter) > -1
                            }
                            return true
                        })
                    : reports}
            pagination={tableParams.pagination}
            loading={false}
            onChange={handleTableChange}
        />
    </div>
}

