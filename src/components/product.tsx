
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

export interface ProductProps {
    name: string;
    price: number;
    context: string;
    image: string;
    id: string;
}

export default function Product(props: ProductProps) {
    const router = useRouter();

    const handleGoDetails = () => {
        router.push(`/shopItem/${props.id}`);
    }
    return (
        <Card sx={{ maxWidth: 365 }} className='w-[232px]' onClick={() => handleGoDetails()} >
            <CardActionArea className='p-[16px]'>
                <CardMedia
                    component="img"
                    height="150"
                    image="https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg"
                    alt="green iguana"
                    className='w-[200px] h-[150px]'
                />
                <CardContent className='p-0'>
                    <Typography gutterBottom className='text-[14px] font-bold h-[24px] mb-[3px]' align='center' component="div">
                        1.3寸树莓派LCD游戏机
                    </Typography>
                    <Typography variant="body2" className='text-[12px] mb-[8px] h-[24px]' align='center' sx={{ color: 'text.secondary' }}>
                        240×240，65K彩色，带喇叭
                    </Typography>
                    <Typography align='center' className='text-[14px] h-[24px]' sx={{ color: 'red' }}>
                        ￥ 99.00
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

