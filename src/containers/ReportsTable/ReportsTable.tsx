import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

import { Input } from '../../components/Input/Input'

import './ReportsTable.scss'
import { useEffect, useState } from 'react'

import { IReportMessage } from '../../type'
import { Divider, GetProp, Modal, Table, TableProps, Tag, Timeline } from 'antd'
import { SorterResult } from 'antd/es/table/interface'
import { reportsApi } from '../../service/ReportService'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Spinner } from '../../components/Spinner/Spinner'
import { setLoading } from '../../redux/reducers/ActionCreators'


export const ReportsTable: React.FC = () => {
    type ColumnsType<T extends object = object> = TableProps<T>['columns'];
    type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
    const { systemsFilter, dateFilter, applied } = useAppSelector((state) => state.filterIssuesReducer)
    // const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)
    const {reports, isLoading} = useAppSelector((state) => state.reportsReducer)
    const [modal1Open, setModal1Open] = useState<any>(false);
    const dispatch = useAppDispatch()
    
    useEffect(()=>{
        setTimeout(()=>{
            
            dispatch(setLoading(false))
            
        }, 1200)

        setTimeout(()=>{dispatch(setLoading(true))}, 10)
    }, [])

    interface TableParams {
        pagination?: TablePaginationConfig;
        sortField?: SorterResult<any>['field'];
        sortOrder?: SorterResult<any>['order'];
    }

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 5,
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
                const timeFormat: Intl.DateTimeFormatOptions = { month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short', timeZone: 'UTC' }
                return (new Date(date)).toLocaleString("ru", timeFormat)
            },
            sorter: (a, b) => {
                console.log((new Date(a.dateApp)).getTime() - (new Date(b.dateApp)).getTime())
                return (new Date(a.dateApp)).getTime() - (new Date(b.dateApp)).getTime()
            },
            width: '20%',
        },
        {
            title: 'Система',
            dataIndex: ['appInfo', 'appName'],
            sorter: (a, b) => (a.appInfo.appName >= b.appInfo.appName ? 1 : -1),
            width: '20%',
        },
        {
            title: 'Тип события',
            dataIndex: 'event',
            sorter: false,
            render: (_, { event }) => (
                <>
                    <Tag color={'red'} >
                        {event.toUpperCase()}
                    </Tag>
                </>
            ),
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

        // // `dataSource` is useless since `pageSize` changed
        // if (pagination.pageSize !== tableParams.pagination?.pageSize) {

        // }
    };

    return isLoading ? <Spinner/> : <div className='ReportsTable' >
    <Modal
        title={modal1Open?.appInfo?.appName}
        centered
        open={Boolean(modal1Open)}
        onOk={() => {
            setModal1Open(false)
        }}
        onCancel={() => {
            console.log(modal1Open)
            setModal1Open(false)
        }}
    >
        <div className='reportDetail'>
            <dl>
                <dt>Дата в системе</dt>
                <dd>{modal1Open.dateApp}</dd>

                <dt>Дата в КИС "Аудит"</dt>
                <dd>{modal1Open.dateKis}</dd>

                <dt>Тип события</dt>
                <dd>{modal1Open.event}</dd>
                <dt>Сообщение от системы</dt>
                <dd>{modal1Open.message}</dd>
            </dl>
            <Divider />
            <h3>Детали и подсистемы</h3>
            <div className='systemTree'>
                <Timeline
                    items={[...
                        (modal1Open.appInfo?.systemDetail || '').split(".").map((item: string) => {
                            return { 'children': item }
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
                }, // click row
            };
        }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={
            applied ?
                reports?.
                    filter((report) => {
                        if (systemsFilter.length) {
                            return (systemsFilter.includes(report.appInfo.appName))
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
                : reports}
        pagination={tableParams.pagination}
        loading={false}
        onChange={handleTableChange}

    />
</div>
}

