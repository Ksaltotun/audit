import { ResponsiveNetwork } from '@nivo/network'
import './ShchemaGraph.scss'
import { useState } from 'react'
import { Modal } from 'antd';




export const ShchemaGraph: React.FC = () => {
    const [modal1Open, setModal1Open] = useState(false);
    const data = {
        "nodes": [
            {
                "id": "ГСЗ",
                "height": 1,
                "size": 24,
                "color": "rgb(97, 205, 187)",
                "data": 'asghjfgjd sdsdhfg zxjvkc'
            },
            {
                "id": "КИС Управление",
                "height": 1,
                "size": 24,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": "АСУ Занятость",
                "height": 1,
                "size": 24,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": "БДН",
                "height": 1,
                "size": 24,
                "color": "rgb(97, 205, 187)"
            },
            {
                "id": "КИС Аудит",
                "height": 2,
                "size": 32,
                "color": "rgb(244, 117, 96)"
            }, //БДН.Списки граждан.Оплата ПСМ239.Отправка в ЕРИП
            {
                "id": "Списки граждан",
                "height": 2,
                "size": 16,
                "color": "rgb(210, 240, 14)"
            },
            {
                "id": "Списки поставщиков",
                "height": 2,
                "size": 16,
                "color": "rgb(210, 240, 14)"
            },
            {
                "id": "ОплатаПСМ239",
                "height": 2,
                "size": 8,
                "color": "rgb(240, 135, 14)"
            },
            {
                "id": "Подписание списка",
                "height": 2,
                "size": 4,
                "color": "rgb(240, 67, 146)"
            },
            {
                "id": "Отправка в ЕРИП",
                "height": 2,
                "size": 4,
                "color": "rgb(240, 67, 14)"
            }

        ],
        "links": [
            {
                "source": "КИС Аудит",
                "target": "ГСЗ",
                "distance": 80
            },
            {
                "source": "КИС Аудит",
                "target": "КИС Управление",
                "distance": 80
            },
            {
                "source": "КИС Аудит",
                "target": "АСУ Занятость",
                "distance": 80
            },
            {
                "source": "КИС Аудит",
                "target": "БДН",
                "distance": 80
            },
            {
                "source": "БДН",
                "target": "Списки граждан",
                "distance": 40
            },
            {
                "source": "БДН",
                "target": "Списки поставщиков",
                "distance": 40
            },
            {
                "source": "Списки граждан",
                "target": "ОплатаПСМ239",
                "distance": 80
            },
            {
                "source": "ОплатаПСМ239",
                "target": "Подписание списка",
                "distance": 80
            },
            {
                "source": "ОплатаПСМ239",
                "target": "Отправка в ЕРИП",
                "distance": 80
            },

        ]
    }

    return (
        <div className='ShchemaGraph' >
            <Modal
                title="Информация о системе"
                style={{ top: 20 }}
                open={modal1Open}
                onOk={() => {
                    setModal1Open(false)
                }}
                onCancel={() => {
                    setModal1Open(false)
                }}
            >
                <div className='filterForm'>
                    <dl>
                        <dt>Адрес:</dt>
                        <dd>192.168.0.1</dd>

                        <dt>Последний репорт получен</dt>
                        <dd>26.11.2024</dd>

                        <dt>Последний инцидент:</dt>
                        <dd>Ошибка авторизации пользователя</dd>
                    </dl>
                </div>
            </Modal>
            <ResponsiveNetwork
                data={data}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                linkDistance={e => e.distance * 2}
                centeringStrength={0.3}
                repulsivity={50}
                nodeSize={n => n.size * 2}
                activeNodeSize={n => 1.5 * n.size}
                nodeColor={e => e.color}
                nodeBorderWidth={1}
                nodeBorderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.8
                        ]
                    ]
                }}
                linkThickness={n => 2 + n.target.data.height}
                linkBlendMode="multiply"
                motionConfig="wobbly"
                onClick={(node): void =>
                    setModal1Open(true)
                }

            />
        </div>
    )
}

