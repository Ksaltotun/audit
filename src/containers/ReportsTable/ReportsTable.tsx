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
    //const {reports, isLoading} = props
    type ColumnsType<T extends object = object> = TableProps<T>['columns'];
    type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
    const { systemsFilter, dateFilter, eventFilter, idKISFilter, idUserFilter, messageFilter, applied } = useAppSelector((state) => state.filterIssuesReducer)
    // const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)
    const { reports, isLoading } = useAppSelector((state) => state.reportsReducer)
    const [modal1Open, setModal1Open] = useState<any>(false);
    const dispatch = useAppDispatch()

    interface TableParams {
        pagination?: TablePaginationConfig;
        sortField?: SorterResult<any>['field'];
        sortOrder?: SorterResult<any>['order'];
    }
    type TSystemNames = "KIS" | "GSZ" | "ASU" | "BDN";

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 6,
        },
    });

    const columns: ColumnsType<IReportMessage> = [
        {
            title: 'Id в системе',
            dataIndex: 'idEvent',
            sorter: false,
            width: '20%',
        },
        {
            title: 'Дата (в системе)',
            dataIndex: 'dateApp',
            render: (date) => {
                const timeFormat: Intl.DateTimeFormatOptions = { year: 'numeric' ,month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,timeZone: 'UTC' }
                return (new Date(date)).toLocaleString("ru", timeFormat)
            },
            sorter: (a, b) => {
                return (new Date(a.dateApp)).getTime() - (new Date(b.dateApp)).getTime()
            },
            width: '20%',
        },
        {
            title: 'Система',
            dataIndex: ['appInfo', 'appName'],
            sorter: (a, b) => (a.appInfo.appName >= b.appInfo.appName ? 1 : -1),
            render: (name: TSystemNames) => {
                return systemNames[name]
            },
            width: '20%',
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
            width: '20%',
        },
        {
            title: 'Сообщение',
            dataIndex: 'message',
            sorter: false,
            width: '20%',
        },
    ];

    const handleTableChange: TableProps<IReportMessage>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });
    };

    return isLoading ? <Spinner /> : <div className='ReportsTable' >
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
        >
            <div className='reportDetail'>
                <dl>
                    <dt>Дата в системе</dt>
                    <dd>{modal1Open.dateApp}</dd>
                    <dt>Дата в КИС "Аудит"</dt>
                    <dd>{modal1Open.dateKis}</dd>
                    <dt>Id в системе</dt>
                    <dd>{modal1Open.idEvent}</dd>
                    <dt>Id в КИС "Аудит"</dt>
                    <dd>{modal1Open.idKIS}</dd>
                    <dt>Тип события</dt>
                    <dd>{eventType[modal1Open.event as EventTagType]}</dd>
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
                                console.log(systemsFilter)
                                return report.appInfo.systemDetail.indexOf(systemsFilter) > -1
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
                                
                                return idKISFilter.indexOf(report.idKIS) > -1
                            }
                            return true
                        })
                        .filter((report) => {
                            if (idUserFilter.length) {
                                
                                return idUserFilter.indexOf(report.user.userID) > -1
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

