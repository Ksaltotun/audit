import './IssuesFilter.scss'
import locale from 'antd/locale/ru_RU';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Button, ConfigProvider, DatePicker, Dropdown, MenuProps, Modal, Space, TreeSelect } from 'antd'
import { addDateFilter, addSystemFilter, applyFilter } from '../../redux/reducers/ActionCreators'
import { useState } from 'react'
import dayjs from 'dayjs'
import { IDateFilter } from '../../type'

import 'dayjs/locale/ru';
import { flatToHierarchy } from '../../utils';
const { SHOW_PARENT } = TreeSelect;

dayjs.locale('ru');

const { RangePicker } = DatePicker;

export const IssuesFilter: React.FC = () => {
    
    const dispatch = useAppDispatch()
    const { systemsFilter, dateFilter } = useAppSelector((state) => state.filterIssuesReducer)
    const { reports, isLoading } = useAppSelector((state) => state.reportsReducer)
    const [modal1Open, setModal1Open] = useState(false);
    const [mode, setMode] = useState('')
    const [chosenDates, setChosenDates] = useState<IDateFilter>({
        startDate: '',
        endDate: ''
    })
    const [choosenSystemsFilter, setSystemsFilter] = useState<string[]>([]);

    const [value, setValue] = useState([]);

    const onChange = (newValue: any, title: any) => {
        console.log('onChange ', newValue, title);
        setValue(newValue);
        setSystemsFilter(title)
    };

    const perSystems: any = []
    const mapCode:string[] = []
    let buff: string[] = []
    let ind = 0
    reports.forEach((rep) => {
        const name = rep.appInfo.appName
        const sysArray = rep.appInfo.systemDetail.split('.').slice(1)

        if (buff.indexOf(name) === -1) {
            perSystems.push({
                'title': name,
                'parentName': null,
                'value': `0-${ind}`,
                'key': `0-${ind}`
            })
            ind++
        }
        buff.push(name)
        sysArray.forEach((e: string, i: number, arr: string[]) => {
            if (buff.indexOf(e) === -1) {
                let prev = name
                if (i > 0) {
                    prev = arr[i - 1]
                }
                perSystems.push({
                    'title': e,
                    'parentName': prev,
                })
                buff.push(e)
            }
        });
    })
    const resultFilter = flatToHierarchy(perSystems).map((el: any) => ({ ...el, children: [...dd(el.children, el.value)] }))

const tProps = {
    treeData: [...resultFilter],
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Выберите систему(подсистему)',
    style: {
        width: '100%',
    },
};
    function dd(t: any, k:any): any {
        t.forEach((el:any, ind: number) => {
            el.value = k + '-' + ind
            el.key = k + '-' + ind
            if (el.children && el.children.length > 0){
                dd(el.children, el.value)
            }
        });
        return t
    }


    const handleChange = (value: string[]) => {
        setSystemsFilter(value)
    };

    const items: MenuProps['items'] = [
        {
            label: (
                <div onClick={() => {
                    setMode('systemsFilter')
                    setModal1Open(true)
                }} >По системам
                </div>
            ),
            key: '0',
        },
        {
            label: (
                <div onClick={() => {
                    setMode('dateFilter')
                    setModal1Open(true)
                }}> По дате
                </div>
            ),
            key: '1',
        },
        {
            label: (
                <div onClick={() => {
                    setMode('dateFilter')
                    setModal1Open(true)
                }}> По типу события
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
        {
            label: 'BDN',
            value: 'BDN',
            desc: 'БДН',
        },
    ];

    const filtersOption = new Map<string, JSX.Element>([
        ["systemsFilter", <Modal
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
            <TreeSelect {...tProps} />
        </Modal>],
        ["dateFilter", <Modal
            title="Показывать по датам"
            style={{ top: 20 }}
            open={modal1Open}
            onOk={() => {
                dispatch(addDateFilter({ ...chosenDates }))
                setModal1Open(false)
            }}
            onCancel={() => {

                setModal1Open(false)
            }}
        >
            <div className='filterForm'>
                <Space direction="vertical" size={12}>
                    <ConfigProvider locale={locale}>
                        <RangePicker
                            onChange={(_, dateString) => {
                                const res = {
                                    startDate: dateString[0],
                                    endDate: dateString[1]
                                }
                                setChosenDates({ ...res })
                            }}
                            showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [dayjs('00:00:00', 'HH:mm'), dayjs('11:59:59', 'HH:mm')],
                            }}
                            format="YYYY-MM-DD HH:mm"
                        />
                    </ConfigProvider>
                </Space>
            </div>
        </Modal>],
        ["eventFilter", <></>]
        ])

    return (
        <div className='IssuesFilter'>
            {
                filtersOption.has(mode) ? filtersOption.get(mode) : null

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
                                onClick={() => {
                                    dispatch(applyFilter(true))
                                }}
                            >
                                Применить
                            </Button>
                            <Button color="primary" variant="solid"
                                onClick={() => {
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

