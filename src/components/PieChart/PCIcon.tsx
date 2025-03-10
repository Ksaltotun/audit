import { NodeComponent } from '@nivo/network';
import './PCIcon.scss'
interface IProps{nodes: ({
        id: string;
        height: number;
        size: number;
        color: string;
        data: string;
    } | {
        id: string;
        height: number;
        size: number;
        color: string;
        data?: undefined;
    })[];
    links: {
        source: string;
        target: string;
        distance: number;
    }[];
} 

export const PCIcon: React.FC<IProps> = (props: IProps) => {

console.log(props)
    return (
        <div>
            HH
        </div>
    )
}

