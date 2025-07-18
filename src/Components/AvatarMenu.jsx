import React, { useState, useRef, useEffect } from 'react';
import '../styles/AvatarMenu.css';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Função utilitária para obter iniciais do nome
function getInitials(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AvatarMenu = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // Avatar: foto, senão iniciais, senão ícone
  let avatarContent;
  if (user && user.photoURL) {
    avatarContent = <img src={user.photoURL} alt="avatar" className="avatar-img" />;
  } else if (user && user.displayName) {
    avatarContent = <div className="avatar-initials">{getInitials(user.displayName)}</div>;
  } else {
    avatarContent = <AccountCircleIcon style={{ fontSize: 36, color: '#576d43' }} />;
  }

  return (
    <div className="avatar-menu-container" ref={menuRef}>
      <div className="avatar-btn" onClick={() => setOpen((v) => !v)}>
        {avatarContent}
      </div>
      {open && (
        <div className={"avatar-dropdown open"}>
          <div className="avatar-dropdown-item nav-title-1" onClick={() => { setOpen(false); navigate('/perfil'); }}>Perfil</div>
          <div className="avatar-dropdown-item nav-title-2" onClick={() => { setOpen(false); navigate('/agenda'); }}>Agenda</div>
          <div className="avatar-dropdown-item nav-title-3" onClick={() => { setOpen(false); navigate('/jogos'); }}>Jogos</div>
          <div className="avatar-dropdown-item nav-title-4" onClick={() => { setOpen(false); navigate('/simuladores'); }}>Simuladores</div>
          <div className="avatar-dropdown-item nav-title-5" onClick={() => { setOpen(false); window.open('https://moodlecloud.com/app/en/portal/remotelogin/contacontando', '_blank'); }}>Moodle</div>
          <div className="avatar-dropdown-item logout" onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu; 