

import { useEffect, useState } from 'react'
import { Observation } from '../../containers/Observation/Observation'
import { ReportsTable } from '../../containers/ReportsTable/ReportsTable'
import './Observ.scss'


export const Observ: React.FC = () => {

    useEffect(() => {
        setTimeout(() => {
            const rects = document.querySelectorAll('g rect')
            function makeText(x: string, y: string, width: string, height: string, text: string) {
                const SVG_NS = "http://www.w3.org/2000/svg"
                const textNode = document.createElementNS(SVG_NS, "text")
                textNode.setAttributeNS(null, 'x', '' + (+x + (+width / 3)))
                textNode.setAttributeNS(null, 'y', '' + (+y + (+height / 1.5)))
                textNode.setAttributeNS(null, 'font-size', '12')
                textNode.textContent = text

                return textNode
            }

            const getDatesArray = (start: Date, end: Date) => {
                const arr = [];
                while (start <= end) {
                    arr.push((new Date(start)).getDate());
                    start.setDate(start.getDate() + 1);
                }
                return arr;
            };

            const datas = getDatesArray(new Date('2024-01-01'), new Date('2024-12-31'))
            const gElement = document.querySelector('.Observation g')

            rects.forEach((item: any, ind: number) => {
                let x: string = item['x']['animVal']['value']
                let y: string = item['y']['animVal']['value']
                let width: string = item['width']['animVal']['value']
                let height: string = item['height']['animVal']['value']
               
                gElement?.appendChild(makeText(x, y, width, height, datas[ind] + ''))
            })

        }, 100)
    }, [])

    return (
        <section className='Observ'>
            <h2>Обзор поступления рапортов от систем</h2>
            <Observation />
        </section>
    )
}

