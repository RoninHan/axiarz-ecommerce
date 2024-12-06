
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

export interface ProductProps {
    name: string;
    price: number;
    context: string;
    image: string;
    id: string;
}

export default function Product(props: ProductProps) {
    return (
        <Card sx={{ maxWidth: 465 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="130"
                    image="https://www.waveshare.net/thumb/middle/photo/accBoard/GamePi13/GamePi13-1.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" align='center' component="div">
                        1.3寸树莓派LCD游戏机
                    </Typography>
                    <Typography variant="body2" align='center' sx={{ color: 'text.secondary' }}>
                        240×240，65K彩色，带喇叭
                    </Typography>
                    <Typography align='center' sx={{ color: 'red' }}>
                        ￥ 99.00
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

