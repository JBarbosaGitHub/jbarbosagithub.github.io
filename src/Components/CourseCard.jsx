import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

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
                    alt="logo"
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
                <Tooltip title={!isLoggedIn ? "Faça login para acessar" : ""}>
                    <span>
                        <Button
                            disableRipple
                            variant="text"
                            disabled={!isLoggedIn}
                            sx={{
                                cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                                opacity: isLoggedIn ? 1 : 0.5,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: isLoggedIn ? 'translateY(-3px)' : 'none',
                                    backgroundColor: 'transparent',
                                    opacity: '1',
                                },
                                '&:active': {
                                    backgroundColor: 'transparent',
                                    opacity: '1',
                                    transform: isLoggedIn ? 'scale(1.1)' : 'none',
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
                    </span>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default CourseCard;
