import { useNavigate } from 'react-router-dom'
import './PingsTable.scss'
import locale from 'antd/locale/ru_RU';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useState } from 'react';
import { ConfigProvider, Table, TableColumnsType, TableProps } from 'antd';
import { KeysOfSystems, systemNames } from '../../utils';

export const PingsTable: React.FC = () => {
    const { pings, isLoading } = useAppSelector((state) => state.reportsReducer)
    const [modal1Open, setModal1Open] = useState<any>(false);
    const dispatch = useAppDispatch()

    interface DataType {
        key: React.Key;
        system: {};
        status: number;
        dateTime: string;
        error?: string;
        id?: string
    }
    const timeFormat: Intl.DateTimeFormatOptions = { year: 'numeric' ,month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,timeZone: 'UTC' }
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
                {
                    text: 'ГСЗ',
                    value: 'GSZ',
                },
                {
                    text: 'БДН',
                    value: 'BDN',
                }

            ],
            render: (value)=>value.label,
            onFilter: (value: any, record: any) => record.system.value.indexOf(value as string) === 0,
            sorter: (a: any, b: any) => a.system.label > b.system.label ? 1 : -1,

        },
        {
            title: 'Статус',
            dataIndex: 'status',
            defaultSortOrder: 'descend',
            filters: [
                {
                    text: '2xx',
                    value: '2',
                },
                {
                    text: '4xx',
                    value: '4',
                },
                {
                    text: '5xx',
                    value: '5',
                },
              
            ],
            onFilter: (value, record) => {
                console.log(record, value)
                return  (record.status + '' || '').indexOf(value as string) === 0
            },
            sorter: (a, b) => a.status - b.status,
        },
        {
            title: 'Текст ошибки (необязательно)',
            dataIndex: 'error',

        },
    ];

    const data:DataType[] = [];
   // const timeFormat: Intl.DateTimeFormatOptions = { year: 'numeric' ,month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,timeZone: 'UTC' }
    //return (new Date(date)).toLocaleString("ru", timeFormat)
    pings.forEach((item, ind)=> {
        data.push({
            key: ind + '',
            system: {
                value: item.system as string,
                label: systemNames[item.system as KeysOfSystems]
            },
            dateTime: (new Date(item.dateTime)).toLocaleString("ru", timeFormat),
            status: item.status,
            error: item.error ?? '',
            id: item.id
        })
    })

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

