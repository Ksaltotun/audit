import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'

import { Input } from '../../components/Input/Input'

import './ReportsTable.scss'
import { useState } from 'react'

import { IReportMessage } from '../../type'
import { GetProp, Table, TableProps, Tag } from 'antd'
import { SorterResult } from 'antd/es/table/interface'
import { reportsApi } from '../../service/ReportService'


export const ReportsTable: React.FC = () => {
    type ColumnsType<T extends object = object> = TableProps<T>['columns'];
    type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

    const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)

    interface TableParams {
        pagination?: TablePaginationConfig;
        sortField?: SorterResult<any>['field'];
        sortOrder?: SorterResult<any>['order'];
    }

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const columns: ColumnsType<IReportMessage> = [
        {
            title: 'Id в КИС "Аудит"',
            dataIndex: 'idKIS',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Дата (в системе)',
            dataIndex: 'dateApp',
            render: (date) => {
                const timeFormat: Intl.DateTimeFormatOptions = { month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short', timeZone: 'UTC' }
                return (new Date(date)).toLocaleString("ru", timeFormat)
            },
            sorter: true,
            width: '20%',
        },
        {
            title: 'Система',
            dataIndex: ['appInfo', 'appName'],
            sorter: true,
            width: '20%',
        },
        {
            title: 'Теги',
            dataIndex: 'event',
            sorter: true,
            render: (_, {event}) => (
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
            sorter: true,
            width: '20%',
        },
    ];

    const handleTableChange: TableProps<IReportMessage>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {

        }
    };


    return (
        <div className='ReportsTable' >
            <Table<IReportMessage>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={reports}
                pagination={tableParams.pagination}
                loading={isLoading}
                onChange={handleTableChange}
            />
        </div>
    )
}

