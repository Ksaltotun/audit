import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleModal } from '../../redux/reducers/ActionCreators';
import './ServiceStatus.scss'


export const ServiceStatus = (props) => {
    const dispatch = useAppDispatch()

    return (
        <div key={props.dataStatus.id} 
        className={'ServiceStatus ' + props.dataStatus?.className} 
        onClick={()=>dispatch(toggleModal(true))}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    width: "100%",
                    height: "100%",
                    transform: "translate3d(0,0,0)",
                    contentVisibility: "visible",
                }}
                viewBox="0 0 430 430">
                <defs>
                    <clipPath id="c">
                        <path d="M0 0h430v430H0z" />
                    </clipPath>
                    <clipPath id="f">
                        <path d="M0 0h430v430H0z" />
                    </clipPath>
                    <clipPath id="d">
                        <path d="M0 0h430v430H0z" />
                    </clipPath>
                    <path
                        id="a"
                        style={{
                            display: "none",
                        }}
                    />
                    <path
                        id="b"
                        fill="red"
                        d="m-150-140 .5 190H151l-1-189.75z"
                        style={{
                            display: "block",
                        }}
                        transform="translate(215 215)"
                    />
                    <mask id="g" mask-type="alpha">
                        <use xmlnsNs1="http://www.w3.org/1999/xlink" ns1Href="#a" />
                    </mask>
                    <mask id="e" mask-type="alpha">
                        <use xmlnsNs2="http://www.w3.org/1999/xlink" ns2Href="#b" />
                    </mask>
                </defs>
                <g clipPath="url(#c)">
                    <g
                        clipPath="url(#d)"
                        style={{
                            display: "block",
                        }}
                    >
                        <g
                            style={{
                                display: "block",
                            }}
                        >
                            <path
                                id="pcScreen"
                                data-status={props.dataStatus?.status}
                                style={{
                                    mixBlendMode: "multiply",

                                }}
                                d="M370 70H60v200h310z"
                                className="tertiary"
                            />
                            <path
                                fill="#15C62D"
                                d="M10-95h-20V95h20z"
                                className="tertiary"
                                opacity={0.5}
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                                transform="translate(75 170)"
                            />
                            <path
                                fill="#535353"
                                d="M365 75v190H65V75zM45 265h340V75c0-11.046-8.954-20-20-20H65c-11.046 0-20 8.954-20 20z"
                                className="secondary"
                            />
                            <path
                                fill="#535353"
                                d="M-20-85v190H0V-85c0-11.046 8.954-20 20-20H0c-11.046 0-20 8.954-20 20"
                                className="secondary"
                                opacity={0.5}
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                                transform="translate(65 160)"
                            />
                            <path
                                fill="#535353"
                                d="M45 295v-30h340v30c0 11.046-8.954 20-20 20H65c-11.046 0-20-8.954-20-20"
                                className="quaternary"
                            />
                            <path
                                fill="#535353"
                                d="M-20-25V5c0 11.046 8.954 20 20 20h20C8.954 25 0 16.046 0 5v-30z"
                                className="quaternary"
                                opacity={0.5}
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                                transform="translate(65 290)"
                            />
                        </g>
                        <g
                            fill="#535353"
                            style={{
                                display: "block",
                            }}
                        >
                            <path d="m250 375-5-60h-60l-5 60z" className="quaternary" />
                            <path
                                d="m-18.125 30 3.75-45h47.5l-1.25-15h-60l-5 60z"
                                className="quaternary"
                                opacity={0.5}
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                                transform="translate(213.125 345)"
                            />
                        </g>
                        <g
                            mask="url(#e)"
                            opacity={0.5}
                            style={{
                                display: "block",
                            }}
                        >
                            <g opacity={0}>
                                <path
                                    fill="none"
                                    stroke="#FFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={24}
                                    d="M428 24h-17.5L666 291.5l25 .5z"
                                    className="quaternary"
                                />
                                <path
                                    fill="#FFF"
                                    d="M428 24h-17.5L666 291.5l25 .5z"
                                    className="quaternary"
                                />
                            </g>
                            <g opacity={0}>
                                <path
                                    fill="none"
                                    stroke="#FFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={24}
                                    d="M-104 24h-17.5L134 291.5l25 .5z"
                                    className="quaternary"
                                />
                                <path
                                    fill="#FFF"
                                    d="M-104 24h-17.5L134 291.5l25 .5z"
                                    className="quaternary"
                                />
                            </g>
                            <g opacity={0}>
                                <path
                                    fill="none"
                                    stroke="#FFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={24}
                                    d="M-104 24h-17.5L134 291.5l25 .5z"
                                    className="quaternary"
                                />
                                <path
                                    fill="#FFF"
                                    d="M-104 24h-17.5L134 291.5l25 .5z"
                                    className="quaternary"
                                />
                            </g>
                        </g>
                        <g
                            fill="none"
                            stroke="#535353"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                display: "block",
                            }}
                        >
                            <path
                                strokeWidth={7}
                                d="M45 265.031h340M145 375h140m-100-60-5 60m70 0-5-60M65 55c-11.046 0-20 8.954-20 20v220c0 11.046 8.954 20 20 20h300c11.046 0 20-8.954 20-20V75c0-11.046-8.954-20-20-20z"
                                className="primary"
                            />
                            <path
                                strokeWidth={20}
                                d="m215.029 290.179-.154-.094"
                                className="primary"
                            />
                        </g>
                    </g>
                    <g
                        clipPath="url(#f)"
                        style={{
                            display: "none",
                        }}
                    >
                        <g
                            style={{
                                display: "none",
                            }}
                        >
                            <path className="tertiary" />
                            <path
                                className="tertiary"
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                            />
                            <path className="secondary" />
                            <path
                                className="secondary"
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                            />
                            <path className="quaternary" />
                            <path
                                className="quaternary"
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                            />
                        </g>
                        <g
                            style={{
                                display: "none",
                            }}
                        >
                            <path className="quaternary" />
                            <path
                                className="quaternary"
                                style={{
                                    mixBlendMode: "multiply",
                                }}
                            />
                        </g>
                        <g
                            mask="url(#g)"
                            style={{
                                display: "none",
                            }}
                        >
                            <path fill="none" />
                            <path />
                        </g>
                        <g
                            fill="none"
                            style={{
                                display: "none",
                            }}
                        >
                            <path className="primary" />
                            <path className="primary" />
                            <path className="primary" />
                        </g>
                        <path
                            fill="none"
                            className="primary"
                            style={{
                                display: "none",
                            }}
                        />
                    </g>
                </g>
            </svg>
        </div>
    )
}
