import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

const CourseCard = ({ title, description, image, onMoreDetails, isLoggedIn }) => {
    return (
        <Card
            sx={{
                '&:hover': {
                    transform: 'scale(1.03)',
                    transition: 'transform 0.3s ease',
                },
            }}
        >
            <CardContent>
                <CardMedia sx={{ height: 200, }}
                    component="img"
                    image={image}
                    alt={title}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        objectPosition: 'center'
                    }}
                />
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        fontWeight: 700,
                        fontSize: '1.4rem',
                        marginTop: '1rem',
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontSize: '1.2rem',
                        marginTop: '1rem',
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    disableRipple
                    variant="text"
                    sx={{
                        cursor: 'pointer',
                        opacity: 1,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-3px)',
                            backgroundColor: 'transparent',
                            opacity: '1',
                        },
                        '&:active': {
                            backgroundColor: 'transparent',
                            opacity: '1',
                            transform: 'scale(1.1)',
                        },
                        textAlign: 'center',
                        padding: '1rem',
                        color: '#eac862',
                        fontSize: '1rem',
                        fontWeight: 600,
                    }}
                    onClick={onMoreDetails}
                >
                    Ver mais
                </Button>
            </CardActions>
        </Card>
    )
}

export default CourseCard;
