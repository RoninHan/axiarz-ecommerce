
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export interface ProductProps {
    name: string;
    price: number;
    context: string;
    image_url: string;
    id: string;
}

export default function Product(props: ProductProps) {
    const router = useRouter();

    const handleGoDetails = () => {
        router.push(`/shopItem?id=` + props.id);
    }

    const imageurl = useMemo(() => {
        return process.env.NEXT_PUBLIC_API_BASE_URL + props.image_url;
    }, [props.image_url])

    return (
        <Card sx={{ maxWidth: 365 }} className='w-[232px]' onClick={() => handleGoDetails()} >
            <CardActionArea className='p-[16px]'>
                <CardMedia
                    component="img"
                    height="150"
                    image={imageurl}
                    alt="green iguana"
                    className='w-[200px] h-[150px]'
                />
                <CardContent className='p-0'>
                    <Typography gutterBottom className='text-[14px] font-bold h-[24px] mb-[3px]' align='center' component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" className='text-[12px] mb-[8px] h-[24px]' align='center' sx={{ color: 'text.secondary' }}>
                        {props.context}
                    </Typography>
                    <Typography align='center' className='text-[14px] h-[24px]' sx={{ color: 'red' }}>
                        ￥ {props.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

