import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, ClickAwayListener, Grid, Paper } from '@mui/material';

export default function AvatarSelector(props: { showAvatars: boolean; setShowAvatars: (newValue: boolean) => void; avatarUrl: string; setAvatarUrl: (newValue: string) => void }) {
  const avatars: { alt: string; src: string }[] = initAvatars();

  function initAvatars() {
    const result = [];
    for (let i = 1; i <= 20; i++) {
      result.push({
        alt: i.toString(),
        src: `/images/avatars/avatar${i}.png`,
      });
    }
    return result;
  }

  function renderAvatarOptions(avatars: any[]) {
    const rows = [];
    let fast = 0;
    let slow = 0;
    for (let i = 1; i <= avatars.length; i++) {
      fast = i;
      if (fast % 5 === 0 || fast === avatars.length) {
        rows.push(
          <AvatarOptionRow
            avatars={avatars.slice(slow, fast)}
            handleAvatarChange={handleAvatarChange}
            key={Math.floor(fast / 5)}
          />
        );
        slow = i;
      }
    }
    return rows;
  }

  function handleShowAvatarsChange() {
    props.setShowAvatars(!props.showAvatars);
  }

  function handleAvatarChange(newAvatarUrl: string) {
    props.setAvatarUrl(newAvatarUrl);
    props.setShowAvatars(false);
  }
  return (
    <Box
      sx={{
        p: 0,
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: 4,
        width: '100px',
        height: '107px',
        background: '#fff',
        cursor: 'pointer',
      }}
    >
      {props.avatarUrl ? (
        <img
          src={props.avatarUrl}
          width="100%"
          onClick={handleShowAvatarsChange}
          alt={props.avatarUrl}
        ></img>
      ) : (
        <PersonIcon
          sx={{ width: '100%', height: '100%' }}
          onClick={handleShowAvatarsChange}
        />
      )}

      {props.showAvatars && (
        <ClickAwayListener onClickAway={handleShowAvatarsChange}>
          <Paper
            sx={{
              position: 'absolute',
              display: 'inline-block',
              ml: 1,
              p: 2,
              maxHeight: '107px',
              overflow: 'scroll',
            }}
          >
            {renderAvatarOptions(avatars)}
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}

const AvatarOptionRow = (props: { avatars: { alt: string; src: string }[]; handleAvatarChange: Function }) => {
  return (
    <Grid
      container
      spacing={0.5}
    >
      {props.avatars.map(i => (
        <Grid
          item
          key={i.alt}
        >
          <Avatar
            alt={i.alt}
            src={i.src}
            onClick={() => props.handleAvatarChange(i.src)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
