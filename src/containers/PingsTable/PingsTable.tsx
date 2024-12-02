import { useNavigate } from 'react-router-dom'
import './PingsTable.scss'
import locale from 'antd/locale/ru_RU';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useState } from 'react';
import { ConfigProvider, Table, TableColumnsType, TableProps } from 'antd';

export const PingsTable: React.FC = () => {
    const { pings, isLoading } = useAppSelector((state) => state.reportsReducer)
    const [modal1Open, setModal1Open] = useState<any>(false);
    const dispatch = useAppDispatch()

    interface DataType {
        key: React.Key;
        system: string;
        status: number;
        error?: string;
        id?: string
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Система',
            dataIndex: 'system',
            filters: [
                {
                    text: 'КИС "Управление"',
                    value: 'KIS',
                },
                {
                    text: 'АСУ "Занятость"',
                    value: 'ASU',
                },

            ],
            onFilter: (value: any, record: any) => record.system.indexOf(value as string) === 0,
            sorter: (a: any, b: any) => a.system > b.system ? 1 : -1,

        },
        {
            title: 'Статус',
            dataIndex: 'status',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: '2xx',
                    value: '200',
                },
                {
                    text: '4xx',
                    value: '400',
                },
            ],
            onFilter: (value, record) => record.error?.indexOf(value as string) === 0,
            sorter: (a, b) => a.status - b.status,
        },
        {
            title: 'Текст ошибки (необязательно)',
            dataIndex: 'error',

        },
    ];

    const data = [
        {
            key: '1',
            system: 'John Brown',
            status: 32,
            error: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            system: 'Jim Green',
            status: 42,
            error: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            system: 'Joe Black',
            status: 32,
            error: 'Sydney No. 1 Lake Park',
        },
        {
            key: '4',
            system: 'Jim Red',
            status: 32,
            error: 'London No. 2 Lake Park',
        },
    ];

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div className='PingsTable'>
            <ConfigProvider locale={locale}>
                <Table<DataType>
                    columns={columns}
                    dataSource={data}
                    onChange={onChange}
                    showSorterTooltip={{ target: 'sorter-icon' }}
                />
            </ConfigProvider>

        </div>
    )
}

