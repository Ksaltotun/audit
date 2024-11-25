import { useNavigate } from 'react-router-dom'
import './IssuesFilter.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { Button } from 'antd'

export const IssuesFilter: React.FC = () => {

    const { filters } = useAppSelector((state) => state.filterIssuesReducer)
    const dispatch = useAppDispatch()

    return (
        <div className='IssuesFilter'>

            <div className="filterHead"> FILTER</div>
            <div className="addBlock">
                <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    onClick={() => alert('filter')}

                >
                    <title>{"filter"}</title>
                    <desc>{"Created with Sketch."}</desc>
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
                </svg> </div>
            <div className="filtersList">
                {
                    filters.map(item => <>
                        <div className='filterItem'>
                            <span>{item.field}</span>

                            <span>{item.rule}</span>
                            <span>{item.sample}</span>

                            <Button color="danger" variant="solid">
                                Удалить
                            </Button>
                        </div>

                    </>)
                }
            </div>
        </div>
    )
}

