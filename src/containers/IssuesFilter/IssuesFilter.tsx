import { useNavigate } from 'react-router-dom'
import './IssuesFilter.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Button, DatePicker, Dropdown, GetProps, MenuProps, Modal, Select, Space } from 'antd'
import { addDateFilter, addSystemFilter, applyFilter } from '../../redux/reducers/ActionCreators'
import { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { IDateFilter } from '../../type'

const { RangePicker } = DatePicker;

export const IssuesFilter: React.FC = () => {

    const { systemsFilter, dateFilter } = useAppSelector((state) => state.filterIssuesReducer)
    const dispatch = useAppDispatch()

    const [modal1Open, setModal1Open] = useState(false);
    const [mode, setMode] = useState('')
    const [chosenDates, setChosenDates] = useState<IDateFilter>({
        startDate: '',
        endDate: ''
    })
    const [modal2Open, setModal2Open] = useState(false);
    const [choosenSystemsFilter, setSystemsFilter] = useState<string[]>([]);



    const handleChange = (value: string[]) => {
        setSystemsFilter(value)
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <div onClick={() => {
                    setMode('system')
                    setModal1Open(true)
                }} >По системам
                </div>
            ),
            key: '0',
        },
        {
            label: (
                <div onClick={() => {
                    setMode('date')
                    setModal1Open(true)
                }}> По дате
                </div>
            ),
            key: '1',
        }
    ];

    const options = [
        {
            label: 'ASU',
            value: 'ASU',
            desc: 'АСУ"Занятость"',
        },
        {
            label: 'GSZ',
            value: 'GSZ',
            desc: 'ГСЗ',
        },
        {
            label: 'KIS',
            value: 'KIS',
            desc: 'КИС"Управление"',
        },
    ];

    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    return (
        <div className='IssuesFilter'>
            {
                mode === 'system'
                    ? <Modal
                        title="Показывать по системам"
                        style={{ top: 20 }}
                        open={modal1Open}
                        onOk={() => {
                            dispatch(addSystemFilter(choosenSystemsFilter))
                            setSystemsFilter([])
                            setModal1Open(false)
                        }}
                        onCancel={() => {
                            setSystemsFilter([])
                            setModal1Open(false)
                        }}
                    >
                        <div className='filterForm'>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="выберите системы"
                                defaultValue={['KIS']}
                                value={choosenSystemsFilter}
                                onChange={handleChange}
                                options={options}
                                optionRender={(option: any) => {
                                    return <Space>{option.data.desc}</Space>
                                }}
                            />
                        </div>
                    </Modal>
                    : <Modal
                        title="Показывать по датам"
                        style={{ top: 20 }}
                        open={modal1Open}
                        onOk={() => {
                            dispatch(addDateFilter({...chosenDates}))
                            setModal1Open(false)
                        }}
                        onCancel={() => {

                            setModal1Open(false)
                        }}
                    >
                        <div className='filterForm'>
                            <Space direction="vertical" size={12}>

                                <RangePicker
                                    onChange={(_, dateString) => {
                                        const res = {
                                            startDate: dateString[0],
                                            endDate: dateString[1]
                                        }
                                        setChosenDates({...res})

                                        
                                    }}
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </Space>
                        </div>
                    </Modal>
            }
            <div className="filterHead">Блок фильтра</div>
            <div className="addBlock">

                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <title>{"filter"}</title>
                            <g id="filter" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <g id="\u7F16\u7EC4">
                                    <rect
                                        id="\u77E9\u5F62"
                                        fillOpacity={0.01}
                                        fill="#FFFFFF"
                                        x={0}
                                        y={0}
                                        width={48}
                                        height={48}
                                    />
                                    <polygon
                                        id="Path"
                                        stroke="#000000"
                                        strokeWidth={4}
                                        fill="#2F88FF"
                                        fillRule="nonzero"
                                        strokeLinejoin="round"
                                        points="6 9 20.4 25.8177778 20.4 38.4444444 27.6 42 27.6 25.8177778 42 9"
                                    />
                                </g>
                            </g>
                        </svg>
                    </a>
                </Dropdown>
            </div>
            <div className="filtersList">
                {
                    systemsFilter.map(item => <>
                        <div className='filterItem'>
                            <span className='filterName'>{item}</span>
                            <Button color="danger" variant="solid" onClick={() => {
                                const result = systemsFilter.filter(i => i !== item)
                                setSystemsFilter(result)
                                dispatch(addSystemFilter(result))
                            }}>
                                Удалить
                            </Button>
                        </div>
                    </>)
                }
                {
                    dateFilter.startDate || dateFilter.endDate ? <div className='filterItem'>
                        <span className='filterName'>{dateFilter.startDate + " - " + dateFilter.endDate}</span>
                        <Button color="danger" variant="solid" onClick={() => {
                            setChosenDates({
                                startDate: '',
                                endDate: ''
                            })
                            dispatch(addDateFilter({
                                startDate: '',
                                endDate: ''
                            }))
                        }}>
                            Удалить
                        </Button>
                    </div> : null
                }

            </div>
            <div className="controllBox">
                {
                    systemsFilter.length || dateFilter.endDate || dateFilter.startDate ?
                    <>
                    <Button color="primary" variant="solid"
                        onClick={()=>{
                            dispatch(applyFilter(true))
                        }}
                        >
                            Применить
                        </Button>
                        <Button color="primary" variant="solid"
                        onClick={()=>{
                            dispatch(addDateFilter({
                                startDate: '',
                                endDate: ''
                            }))
                            dispatch(addSystemFilter([]))
                            dispatch(applyFilter(false))
                        }}
                        >
                           Сбросить
                        </Button>
                    </>
                        
                        : null
                }
            </div>
        </div>
    )
}

