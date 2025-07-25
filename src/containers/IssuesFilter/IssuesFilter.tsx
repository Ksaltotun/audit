import './IssuesFilter.scss'
import locale from 'antd/locale/ru_RU';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Button, ConfigProvider, DatePicker, Dropdown, Input, MenuProps, Modal, Select, SelectProps, Space, Tag, TreeSelect } from 'antd'
import { addDateFilter, addEventFilter, addIdKISFilter, addIdUserFilter, addMessageFilter, addSystemFilter, applyFilter } from '../../redux/reducers/ActionCreators'
import { useState } from 'react'
import dayjs from 'dayjs'
import { IDateFilter, IReportMessage } from '../../type'
import { reportsApi } from '../../service/ReportService'

import 'dayjs/locale/ru';
import { eventType, flatToHierarchy, KeysOfEvent } from '../../utils';
const { SHOW_PARENT } = TreeSelect;

dayjs.locale('ru');

const { RangePicker } = DatePicker;

export const IssuesFilter: React.FC = () => {

    const dispatch = useAppDispatch()
    const { systemsFilter, dateFilter, eventFilter, idKISFilter, idUserFilter, messageFilter } = useAppSelector((state) => state.filterIssuesReducer)
    const { data: reports, error, isLoading, refetch } = reportsApi.useFetchAllReportsQuery(0)
    const [eventF, setEventF] = useState<KeysOfEvent[]>([]);
    const [idKISF, setIdKISF] = useState<string[]>([])
    const [idUserF, setIdUserF] = useState<string[]>([])
    const [messageF, setMessageF] = useState('')

    const [modal1Open, setModal1Open] = useState(false);
    const [mode, setMode] = useState('')
    const [chosenDates, setChosenDates] = useState<IDateFilter>({
        startDate: '',
        endDate: ''
    })

    type TagRender = SelectProps['tagRender'];

    const eventOptions: SelectProps['options'] = [
        { label: eventType.systemError, value: 'systemError' },
        { label: eventType.security, value: 'security' },
        { label: eventType.systemAction, value: 'systemAction' },
        { label: eventType.userAction, value: 'userAction' }
    ]

    const tagRender: TagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={'red'}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginInlineEnd: 4 }}
            >
                {label}
            </Tag>
        );
    };

    const [choosenSystemsFilter, setSystemsFilter] = useState<string[]>([]);

    const [value, setValue] = useState([]);

    const onChange = (newValue: any, title: any) => {
        setValue(newValue);
        setSystemsFilter(title)
    };

    const perSystems: any = []
    const mapCode: string[] = []
    let buff: string[] = []
    let ind = 0;
    (reports || []).forEach((rep: IReportMessage) => {
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

    const resultFilter = flatToHierarchy(perSystems).map((el: any) => ({ ...el, children: [...buildTree(el.children, el.value)] }))
    console.log(resultFilter)
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

    function buildTree(t: any, k: any): any {
        t.forEach((el: any, ind: number) => {
            el.value = k + '-' + ind
            el.key = k + '-' + ind
            if (el.children && el.children.length > 0) {
                buildTree(el.children, el.value)
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
                    setMode('eventFilter')
                    setModal1Open(true)
                }}> По типу события
                </div>
            ),
            key: '2',
        },
        {
            label: (
                <div onClick={() => {
                    setMode('idUser')
                    setModal1Open(true)
                }}> По Id пользователя
                </div>
            ),
            key: '3',
        },
        {
            label: (
                <div onClick={() => {
                    setMode('message')
                    setModal1Open(true)
                }}> По подстроке в сообщении
                </div>
            ),
            key: '4',
        },
        {
            label: (
                <div onClick={() => {
                    setMode('idKIS')
                    setModal1Open(true)
                }}> По Id в КИС "Аудит"
                </div>
            ),
            key: '5',
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
        ["eventFilter", <Modal
            title="Показывать по типам события"
            style={{ top: 20 }}
            open={modal1Open}
            onOk={() => {
                dispatch(addEventFilter(eventF))
                setEventF([])
                setModal1Open(false)
            }}
            onCancel={() => {
                setSystemsFilter([])
                setModal1Open(false)
            }}
        >
            <Select
                mode="multiple"
                tagRender={tagRender}
                defaultValue={eventF}
                style={{ width: '100%' }}
                onChange={(value) => {
                    setEventF([...value])
                }}
                options={eventOptions}
            />
        </Modal>],
        ['idKIS', <Modal
            title="Показывать по ID в КИС 'Аудит'"
            style={{ top: 20 }}
            open={modal1Open}
            footer={[]}
            onOk={() => {
                dispatch(addIdKISFilter(idKISF))
                setIdKISF([])
                setModal1Open(false)
            }}
            onCancel={() => {
                setIdKISF([])
                setModal1Open(false)
            }}
        >
            <Space.Compact style={{ width: '100%' }}>
                <Input defaultValue="" placeholder='Id в КИС "Аудит"' value={idKISF[0]} onChange={({target})=>{
                    setIdKISF([target.value])

                }}/>
                <Button type="primary" onClick={() => {
                    dispatch(addIdKISFilter(idKISF))
                    setIdKISF([])
                    setModal1Open(false)
                }}>Добавить</Button>
            </Space.Compact>
        </Modal>],
        ['idUser', <Modal
            title="Показывать по ID пользователя"
            style={{ top: 20 }}
            open={modal1Open}
            footer={[]}
            onOk={() => {
                dispatch(addIdKISFilter(idKISF))
                setIdUserF([])
                setModal1Open(false)
            }}
            onCancel={() => {
                setIdUserF([])
                setModal1Open(false)
            }}
        >
            <Space.Compact style={{ width: '100%' }}>
                <Input defaultValue="" placeholder='Id пользователя' value={idUserF[0]} onChange={({target})=>{
                    setIdUserF([target.value])
                }}/>
                <Button type="primary" onClick={() => {
                    dispatch(addIdUserFilter(idUserF))
                    setIdUserF([])
                    setModal1Open(false)
                }}>Добавить</Button>
            </Space.Compact>
        </Modal>],
        ['message', <Modal
            title="Показывать по подстроке в ссобщении"
            style={{ top: 20 }}
            open={modal1Open}
            footer={[]}
            onOk={() => {
                dispatch(addMessageFilter(messageF))
                setMessageF('')
                setModal1Open(false)
            }}
            onCancel={() => {
                setMessageF('')
                setModal1Open(false)
            }}
        >
            <Space.Compact style={{ width: '100%' }}>
                <Input defaultValue="" placeholder='Сообщение или его часть' value={messageF} onChange={({target})=>{
                    setMessageF(target.value)
                }}/>
                <Button type="primary" onClick={() => {
                    dispatch(addMessageFilter(messageF))
                    setMessageF('')
                    setModal1Open(false)
                }}>Добавить</Button>
            </Space.Compact>
        </Modal>]
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
                {
                    eventFilter.map((item: KeysOfEvent) => <>
                        <div className='filterItem'>
                            <span className='filterName'>{eventType[item]}</span>
                            <Button color="danger" variant="solid" onClick={() => {
                                const result = eventFilter.filter(i => i !== item)
                                setEventF(result)
                                dispatch(addEventFilter(result))
                            }}>
                                Удалить
                            </Button>
                        </div>
                    </>)
                }
                {
                    idKISFilter.map(item => <>
                        <div className='filterItem'>
                            <span className='filterName'>{item}</span>
                            <Button color="danger" variant="solid" onClick={() => {
                                const result = idKISF.filter(i => i !== item)
                                setIdKISF(result)
                                dispatch(addIdKISFilter(result))
                            }}>
                                Удалить
                            </Button>
                        </div>
                    </>)
                }
                {
                    idUserFilter.map(item => <>
                        <div className='filterItem'>
                            <span className='filterName'>{item}</span>
                            <Button color="danger" variant="solid" onClick={() => {
                                const result = idUserF.filter(i => i !== item)
                                setIdUserF(result)
                                dispatch(addIdUserFilter(result))
                            }}>
                                Удалить
                            </Button>
                        </div>
                    </>)
                }
                {
                    messageFilter ? 
                    <div className='filterItem'>
                        <span className='filterName'>{messageFilter}</span>
                        <Button color="danger" variant="solid" onClick={() => {
                            setMessageF('')
                            dispatch(addMessageFilter(''))
                        }}>
                            Удалить
                        </Button>
                    </div>
                    : null
               
                }
            </div>
            <div className="controllBox">
                {
                    messageFilter || idUserFilter.length || idKISFilter.length || systemsFilter.length || dateFilter.endDate || dateFilter.startDate || eventFilter.length ?
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
                                    dispatch(addEventFilter([]))
                                    dispatch(addIdKISFilter([]))
                                    dispatch(addIdUserFilter([]))
                                    dispatch(addMessageFilter(''))
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
