import { Card, CardContent, Button, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const SpecialistLessonCard = ({ onBook }) => (
  <Card
    sx={{
      background: '#fffbe6',
      border: '2px solid #eac862',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      minHeight: 370,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
      },
      cursor: 'pointer',
      margin: '0 auto',
      width: '100%',
      maxWidth: 350
    }}
  >
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <CalendarMonthIcon sx={{ fontSize: 60, color: '#eac862', mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
        Aula com um Especialista
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
        Marca uma explicação individual com um dos nossos especialistas.<br />
        Escolhe o dia e hora, paga antecipadamente e recebe o link Teams no teu email!
      </Typography>
      <Typography variant="h6" sx={{ color: '#65774a', mb: 2 }}>
        29,90€
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#eac862',
          color: '#444',
          fontWeight: 700,
          boxShadow: 'none',
          '&:hover': { backgroundColor: '#ffe08a', boxShadow: 'none' }
        }}
        onClick={onBook}
      >
        Marcar Aula
      </Button>
    </CardContent>
  </Card>
);

export default SpecialistLessonCard; 